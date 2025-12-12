import { Metadata } from 'next';
import { Suspense } from 'react';
import { productService } from '@/lib/woocommerce/products';
import { categoryService } from '@/lib/woocommerce/categories';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import MobileFilters from '@/components/products/MobileFilters';
import ProductSort from '@/components/products/ProductSort';
import ProductPagination from '@/components/products/ProductPagination';
import EmptyState from '@/components/products/EmptyState';
import ActiveFilters from '@/components/products/ActiveFilters';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { parseFiltersFromUrl, parseSortFromUrl, getPaginationInfo } from '@/lib/utils/url-state';
import { Filter, Grid, List } from 'lucide-react';
import Loading from './loading';

export const revalidate = 1800;

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const resolvedParams = await searchParams;
    const filters = parseFiltersFromUrl(resolvedParams);

    let title = 'Produse Premium';

    if (filters.search) {
        title = `Cautare: ${filters.search}`;
    } else if (filters.brands.length > 0) {
        const brandNames = filters.brands.map(slug => {
            const brand = [
                { name: 'FreeBubbles', slug: 'freebubbles' },
                { name: 'Chanteclair', slug: 'chanteclair' },
                { name: 'Tesori', slug: 'tesori' },
                { name: 'Sano', slug: 'sano' },
                { name: 'Misavan', slug: 'misavan' },
            ].find(b => b.slug === slug);
            return brand?.name || slug;
        });
        title = `${brandNames.join(', ')} - Produse`;
    } else if (filters.categories.length > 0) {
        title = `${filters.categories.join(', ')} - Produse`;
    }

    title += ' | EcoItalia';

    const description = filters.search
        ? `Rezultate cautare pentru "${filters.search}" - Produse de curatenie si ingrijire personala premium din Italia.`
        : 'Magazin online cu produse de curatenie si ingrijire personala premium din Italia. FreeBubbles, Chanteclair, Tesori. Livrare gratuita in Brasov si Focsani.';

    return {
        title,
        description,
        openGraph: {
            title,
            description: 'Produse premium din Italia cu livrare gratuita',
            url: `https://ecoitalia.ro/produse`,
            type: 'website',
        },
    };
}

export default async function ProduseListingPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;

    const filters = parseFiltersFromUrl(resolvedParams);
    const sort = parseSortFromUrl(resolvedParams);
    const { page, perPage } = getPaginationInfo(resolvedParams);

    let products: any[] = [];
    let totalProducts = 0;
    let totalPages = 0;
    let categories: any[] = [];
    let error: string | null = null;

    try {
        // STEP 1: Fetch categories first
        categories = await categoryService.getParentCategories();

        // STEP 2: Convert category slugs to IDs
        let categoryIds: string | undefined = undefined;

        if (filters.categories.length > 0) {
            const ids = filters.categories
                .map(slug => {
                    const category = categories.find(cat => cat.slug === slug);
                    console.log(`[DEBUG] Category slug "${slug}" -> ID ${category?.id}`);
                    return category?.id;
                })
                .filter(Boolean);

            categoryIds = ids.length > 0 ? ids.join(',') : undefined;
            console.log('[DEBUG] Final category IDs:', categoryIds);
        }

        // STEP 3: Determine fetch strategy based on filters
        const hasBrandFilter = filters.brands.length > 0;
        const fetchPerPage = hasBrandFilter ? 100 : perPage; // Fetch more if filtering by brand

        // STEP 4: Fetch products from WooCommerce
        const productsData = await productService.getProducts({
            page: hasBrandFilter ? 1 : page, // Always page 1 if brand filtering
            per_page: fetchPerPage,
            orderby: sort.orderBy,
            order: sort.order,
            category: categoryIds,
            search: filters.search,
            on_sale: filters.onSale || undefined,
            min_price: filters.minPrice,
            max_price: filters.maxPrice,
            stock_status: filters.inStock ? 'instock' : undefined,
        });

        let allProducts = productsData.products;

        console.log('[DEBUG] Products fetched:', allProducts.length);
        console.log('[DEBUG] Filters:', filters);

        // STEP 5: CLIENT-SIDE BRAND FILTERING
        if (hasBrandFilter) {
            console.log('[DEBUG] Applying brand filter:', filters.brands);

            allProducts = allProducts.filter(product => {
                // Check in product name (most common for your case)
                const nameMatch = filters.brands.some(brand => {
                    const brandLower = brand.toLowerCase();
                    const nameLower = product.name.toLowerCase();

                    // Exact matches for common brands
                    if (brandLower === 'freebubbles') return nameLower.includes('freebubbles') || nameLower.includes('free bubbles');
                    if (brandLower === 'chanteclair') return nameLower.includes('chanteclair') || nameLower.includes('chante clair');
                    if (brandLower === 'tesori') return nameLower.includes('tesori');
                    if (brandLower === 'sano') return nameLower.includes('sano');
                    if (brandLower === 'misavan') return nameLower.includes('misavan');

                    // Fallback: generic includes
                    return nameLower.includes(brandLower);
                });

                // Check in categories (in case brand is a category)
                const categoryMatch = product.categories?.some((cat: any) =>
                    filters.brands.some(brand =>
                        cat.name.toLowerCase().includes(brand.toLowerCase()) ||
                        cat.slug.toLowerCase().includes(brand.toLowerCase())
                    )
                );

                // Check in attributes (if you ever add them)
                const attributeMatch = product.attributes?.some((attr: any) =>
                    attr.name.toLowerCase() === 'brand' &&
                    filters.brands.some(brand =>
                        attr.options.some((opt: string) =>
                            opt.toLowerCase().includes(brand.toLowerCase())
                        )
                    )
                );

                const matched = nameMatch || categoryMatch || attributeMatch;

                if (matched) {
                    console.log(`[DEBUG] ✓ Matched product: ${product.name}`);
                }

                return matched;
            });

            console.log('[DEBUG] After brand filter:', allProducts.length, 'products');
        }

        // STEP 6: Pagination for filtered results
        if (hasBrandFilter) {
            const startIndex = (page - 1) * perPage;
            products = allProducts.slice(startIndex, startIndex + perPage);
            totalProducts = allProducts.length;
            totalPages = Math.ceil(totalProducts / perPage);
        } else {
            products = allProducts;
            totalProducts = productsData.total;
            totalPages = productsData.totalPages;
        }

        console.log('[DEBUG] Final results:', {
            totalProducts,
            totalPages,
            currentPage: page,
            productsShown: products.length
        });

    } catch (err) {
        console.error('Error fetching products:', err);
        error = 'Nu am putut incarca produsele. Te rugam sa incerci din nou.';
    }

    const availableBrands = [
        { name: 'FreeBubbles', slug: 'freebubbles' },
        { name: 'Chanteclair', slug: 'chanteclair' },
        { name: 'Tesori', slug: 'tesori' },
        { name: 'Sano', slug: 'sano' },
        { name: 'Misavan', slug: 'misavan' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
                <div className="mb-6 md:mb-8">
                    <nav className="text-sm text-[#7C8B96] mb-4">
                        <a href="/" className="hover:text-[#1C4E80] transition-colors">
                            Acasa
                        </a>
                        <span className="mx-2">/</span>
                        <span className="text-[#2C3538] font-medium">Produse</span>
                    </nav>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1C4E80] mb-2">
                                {filters.search ? `Rezultate pentru "${filters.search}"` : 'Toate Produsele'}
                            </h1>
                            <p className="text-sm md:text-base text-[#7C8B96]">
                                {totalProducts} {totalProducts === 1 ? 'produs' : 'produse'} disponibile
                            </p>
                        </div>

                        <div className="sm:hidden">
                            <MobileFilters
                                categories={categories}
                                brands={availableBrands}
                                currentFilters={filters}
                                currentSort={sort}
                            />
                        </div>
                    </div>

                    {(filters.categories.length > 0 ||
                        filters.brands.length > 0 ||
                        filters.onSale ||
                        filters.inStock) && (
                        <ActiveFilters
                            filters={filters}
                            categories={categories}
                            brands={availableBrands}
                            currentSort={sort}
                        />
                    )}
                </div>

                <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <ProductFilters
                                categories={categories}
                                brands={availableBrands}
                                currentFilters={filters}
                            />
                        </div>
                    </aside>

                    <div>
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <ProductSort currentSort={sort} />

                            <div className="hidden md:flex items-center gap-2">
                                <button
                                    className="p-2 rounded-lg bg-[#1C4E80] text-white"
                                    aria-label="Grid view"
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    className="p-2 rounded-lg hover:bg-gray-100 text-[#7C8B96]"
                                    aria-label="List view"
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                <p className="text-red-600">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Incearca Din Nou
                                </button>
                            </div>
                        )}

                        {!error && products.length === 0 && (
                            <EmptyState filters={filters} />
                        )}

                        {!error && products.length > 0 && (
                            <>
                                <Suspense fallback={<Loading />}>
                                    <ProductGrid products={products} />
                                </Suspense>

                                {totalPages > 1 && (
                                    <div className="mt-8 md:mt-12">
                                        <ProductPagination
                                            currentPage={page}
                                            totalPages={totalPages}
                                            totalItems={totalProducts}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}