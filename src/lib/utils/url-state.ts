/**
 * URL State Management pentru filters & sorting
 * Permite share-able links: /produse?brand=freebubbles&sort=price_asc
 */

export interface ProductFilters {
    categories: string[];
    brands: string[];
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    onSale?: boolean;
    search?: string;
}

export interface ProductSort {
    orderBy: 'date' | 'price' | 'popularity' | 'title';
    order: 'asc' | 'desc';
}

/**
 * Type pentru searchParams în Server Components
 */
type SearchParams = { [key: string]: string | string[] | undefined };

/**
 * Helper pentru a extrage valoare din searchParams
 */
function getParam(searchParams: SearchParams, key: string): string | undefined {
    const value = searchParams[key];
    if (Array.isArray(value)) {
        return value[0];
    }
    return value;
}

/**
 * Parse filters from URL search params (Server Component version)
 */
export function parseFiltersFromUrl(searchParams: SearchParams): ProductFilters {
    const categoryParam = getParam(searchParams, 'category');
    const brandParam = getParam(searchParams, 'brand');
    const minPriceParam = getParam(searchParams, 'min_price');
    const maxPriceParam = getParam(searchParams, 'max_price');
    const inStockParam = getParam(searchParams, 'in_stock');
    const onSaleParam = getParam(searchParams, 'on_sale');
    const searchParam = getParam(searchParams, 'search');

    return {
        categories: categoryParam?.split(',').filter(Boolean) || [],
        brands: brandParam?.split(',').filter(Boolean) || [],
        minPrice: minPriceParam ? Number(minPriceParam) : undefined,
        maxPrice: maxPriceParam ? Number(maxPriceParam) : undefined,
        inStock: inStockParam === 'true',
        onSale: onSaleParam === 'true',
        search: searchParam || undefined,
    };
}

/**
 * Parse sorting from URL search params (Server Component version)
 */
export function parseSortFromUrl(searchParams: SearchParams): ProductSort {
    const sortParam = getParam(searchParams, 'sort') || 'date_desc';
    const [orderBy, order] = sortParam.split('_') as [ProductSort['orderBy'], ProductSort['order']];

    return {
        orderBy: orderBy || 'date',
        order: order || 'desc',
    };
}

/**
 * Build URL search params from filters
 */
export function buildUrlFromFilters(
    filters: ProductFilters,
    sort: ProductSort,
    page: number = 1
): string {
    const params = new URLSearchParams();

    if (filters.categories.length > 0) {
        params.set('category', filters.categories.join(','));
    }

    if (filters.brands.length > 0) {
        params.set('brand', filters.brands.join(','));
    }

    if (filters.minPrice) {
        params.set('min_price', filters.minPrice.toString());
    }

    if (filters.maxPrice) {
        params.set('max_price', filters.maxPrice.toString());
    }

    if (filters.inStock) {
        params.set('in_stock', 'true');
    }

    if (filters.onSale) {
        params.set('on_sale', 'true');
    }

    if (filters.search) {
        params.set('search', filters.search);
    }

    // Sorting
    params.set('sort', `${sort.orderBy}_${sort.order}`);

    // Pagination
    if (page > 1) {
        params.set('page', page.toString());
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
}

/**
 * Get pagination info (Server Component version)
 */
export function getPaginationInfo(searchParams: SearchParams) {
    const pageParam = getParam(searchParams, 'page');
    const page = pageParam ? Number(pageParam) : 1;
    const perPage = 20; // Items per page

    return {
        page,
        perPage,
    };
}

// ============================================
// CLIENT-SIDE VERSIONS (pentru useSearchParams)
// ============================================

/**
 * Parse filters from URLSearchParams (Client Component version)
 * Folosit in componente client cu useSearchParams()
 */
export function parseFiltersFromUrlSearchParams(searchParams: URLSearchParams): ProductFilters {
    return {
        categories: searchParams.get('category')?.split(',').filter(Boolean) || [],
        brands: searchParams.get('brand')?.split(',').filter(Boolean) || [],
        minPrice: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
        maxPrice: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
        inStock: searchParams.get('in_stock') === 'true',
        onSale: searchParams.get('on_sale') === 'true',
        search: searchParams.get('search') || undefined,
    };
}

/**
 * Parse sorting from URLSearchParams (Client Component version)
 */
export function parseSortFromUrlSearchParams(searchParams: URLSearchParams): ProductSort {
    const sortParam = searchParams.get('sort') || 'date_desc';
    const [orderBy, order] = sortParam.split('_') as [ProductSort['orderBy'], ProductSort['order']];

    return {
        orderBy: orderBy || 'date',
        order: order || 'desc',
    };
}