import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productService } from '@/lib/woocommerce/products';
import { WCProduct } from '@/lib/woocommerce/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductCTA from '@/components/product/ProductCTA';
import ProductDescription from '@/components/product/ProductDescription';
import ProductBadges from '@/components/product/ProductBadges';
import RelatedProducts from '@/components/product/RelatedProducts';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// ISR - Revalidare la 1 ora
export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>; // ← CHANGED: Promise
}

// Generate static params
export async function generateStaticParams() {
    try {
        const { products } = await productService.getProducts({ per_page: 20 });
        return products.map((product) => ({
            slug: product.slug,
        }));
    } catch (error) {
        return [];
    }
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params; // ← AWAIT params

    try {
        const product = await productService.getProductBySlug(slug);

        if (!product) {
            return {
                title: 'Produs Negasit | EcoItalia',
            };
        }

        const title = `${product.name} - ${parseFloat(product.price).toFixed(0)} RON | EcoItalia`;
        const description = product.short_description
            ? product.short_description.replace(/<[^>]*>/g, '').substring(0, 160)
            : `Cumpara ${product.name} online. Livrare gratuita in Brasov si Focsani.`;

        return {
            title,
            description,
            openGraph: {
                title: product.name,
                description,
                images: product.images.map(img => ({
                    url: img.src,
                    width: 800,
                    height: 800,
                    alt: product.name,
                })),
                type: 'website',
                siteName: 'EcoItalia',
                locale: 'ro_RO',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description,
                images: [product.images[0]?.src],
            },
            other: {
                'product:price:amount': product.price,
                'product:price:currency': 'RON',
                'product:availability': product.stock_status === 'instock' ? 'in stock' : 'out of stock',
                'product:brand': product.categories[0]?.name || 'EcoItalia',
            },
        };
    } catch (error) {
        return {
            title: 'Produs | EcoItalia',
        };
    }
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { slug } = await params; // ← AWAIT params

    let product: WCProduct | null = null;
    let relatedProducts: WCProduct[] = [];

    try {
        product = await productService.getProductBySlug(slug);

        if (!product) {
            notFound();
        }

        // Fetch related products
        try {
            relatedProducts = await productService.getRelatedProducts(product.id, 4);
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            <Header />

            {/* Product Schema.org JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org/',
                        '@type': 'Product',
                        name: product.name,
                        image: product.images.map(img => img.src),
                        description: product.short_description || product.description,
                        sku: product.sku,
                        brand: {
                            '@type': 'Brand',
                            name: product.categories[0]?.name || 'EcoItalia',
                        },
                        offers: {
                            '@type': 'Offer',
                            url: `https://ecoitalia.ro/produse/${product.slug}`,
                            priceCurrency: 'RON',
                            price: product.price,
                            availability: product.stock_status === 'instock'
                                ? 'https://schema.org/InStock'
                                : 'https://schema.org/OutOfStock',
                            seller: {
                                '@type': 'Organization',
                                name: 'EcoItalia',
                            },
                        },
                        aggregateRating: product.rating_count > 0 ? {
                            '@type': 'AggregateRating',
                            ratingValue: product.average_rating,
                            reviewCount: product.rating_count,
                        } : undefined,
                    }),
                }}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-[#7C8B96] mb-6 md:mb-8 overflow-x-auto">
                    <Link href="/" className="hover:text-[#1C4E80] transition-colors whitespace-nowrap">
                        Acasa
                    </Link>
                    <ChevronRight size={16} className="flex-shrink-0" />
                    <Link href="/produse" className="hover:text-[#1C4E80] transition-colors whitespace-nowrap">
                        Produse
                    </Link>
                    {product.categories[0] && (
                        <>
                            <ChevronRight size={16} className="flex-shrink-0" />
                            <Link
                                href={`/categorii/${product.categories[0].slug}`}
                                className="hover:text-[#1C4E80] transition-colors whitespace-nowrap"
                            >
                                {product.categories[0].name}
                            </Link>
                        </>
                    )}
                    <ChevronRight size={16} className="flex-shrink-0" />
                    <span className="text-[#2C3538] font-medium truncate">{product.name}</span>
                </nav>

                {/* Main Product Section */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16">
                    <ProductGallery images={product.images} productName={product.name} />

                    <div className="space-y-6">
                        <ProductInfo product={product} />
                        <ProductCTA product={product} />
                        <ProductBadges />
                    </div>
                </div>

                <ProductDescription product={product} />

                {relatedProducts.length > 0 && (
                    <div className="mt-12 md:mt-16">
                        <RelatedProducts products={relatedProducts} />
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}