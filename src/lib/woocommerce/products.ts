import { wooCommerce } from './client';
import {
    WCProduct,
    WCProductVariation,
    WCListParams,
} from './types';

// Helper pentru construirea query params
function buildQueryParams(params: WCListParams): Record<string, any> {
    const query: Record<string, any> = {
        per_page: params.per_page || 20,
        page: params.page || 1,
    };

    if (params.search) query.search = params.search;
    if (params.category) query.category = params.category;
    if (params.featured !== undefined) query.featured = params.featured;
    if (params.on_sale !== undefined) query.on_sale = params.on_sale;
    if (params.order) query.order = params.order;
    if (params.orderby) query.orderby = params.orderby;
    if (params.min_price) query.min_price = params.min_price;
    if (params.max_price) query.max_price = params.max_price;
    if (params.stock_status) query.stock_status = params.stock_status;

    return query;
}

export const productService = {
    /**
     * Get all products cu pagination
     */
    async getProducts(params: WCListParams = {}) {
        const query = buildQueryParams(params);


        const response = await wooCommerce.getWithHeaders<WCProduct[]>(
            '/products',
            query
        );

        // Debug COMPLET pentru primul produs
        if (response.data[0]) {
            console.log('=== PRODUCT STRUCTURE DEBUG ===');
            console.log('Name:', response.data[0].name);
            console.log('Categories:', response.data[0].categories);
            console.log('Tags:', response.data[0].tags);
            console.log('Attributes:', response.data[0].attributes);
            console.log('Meta Data:', response.data[0].meta_data);
            console.log('================================');
        }

        return {
            products: response.data,
            total: parseInt(response.headers['x-wp-total'] || '0'),
            totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
            currentPage: params.page || 1,
        };
    },

    /**
     * Get single product by ID
     */
    async getProduct(id: number): Promise<WCProduct> {
        return wooCommerce.get<WCProduct>(`/products/${id}`);
    },

    /**
     * Get single product by slug
     */
    async getProductBySlug(slug: string): Promise<WCProduct | null> {
        const response = await wooCommerce.get<WCProduct[]>('/products', {
            slug,
            per_page: 1,
        });
        return response[0] || null;
    },

    /**
     * Get product variations (pentru produse variable)
     */
    async getProductVariations(
        productId: number
    ): Promise<WCProductVariation[]> {
        return wooCommerce.get<WCProductVariation[]>(
            `/products/${productId}/variations`,
            { per_page: 100 }
        );
    },

    /**
     * Get featured products
     */
    async getFeaturedProducts(limit: number = 8): Promise<WCProduct[]> {
        return wooCommerce.get<WCProduct[]>('/products', {
            featured: true,
            per_page: limit,
            orderby: 'popularity',
            order: 'desc',
        });
    },

    /**
     * Get products on sale
     */
    async getSaleProducts(limit: number = 12): Promise<WCProduct[]> {
        return wooCommerce.get<WCProduct[]>('/products', {
            on_sale: true,
            per_page: limit,
            orderby: 'date',
            order: 'desc',
        });
    },

    /**
     * Get products by category
     */
    async getProductsByCategory(
        categorySlug: string,
        params: WCListParams = {}
    ) {
        // Mai întâi găsim category ID după slug
        const categories = await wooCommerce.get<any[]>('/products/categories', {
            slug: categorySlug,
        });

        if (!categories[0]) {
            throw new Error(`Category ${categorySlug} not found`);
        }

        const categoryId = categories[0].id;
        const query = buildQueryParams({ ...params, category: categoryId });

        const response = await wooCommerce.getWithHeaders<WCProduct[]>(
            '/products',
            query
        );

        return {
            products: response.data,
            category: categories[0],
            total: parseInt(response.headers['x-wp-total'] || '0'),
            totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
        };
    },

    /**
     * Search products
     */
    async searchProducts(searchTerm: string, limit: number = 20) {
        return wooCommerce.get<WCProduct[]>('/products', {
            search: searchTerm,
            per_page: limit,
            orderby: 'relevance',
        });
    },

    /**
     * Get related products
     */
    async getRelatedProducts(productId: number, limit: number = 4) {
        const product = await this.getProduct(productId);

        if (!product.related_ids || product.related_ids.length === 0) {
            return [];
        }

        // Get primele N produse related
        const relatedIds = product.related_ids.slice(0, limit);

        return wooCommerce.get<WCProduct[]>('/products', {
            include: relatedIds.join(','),
            per_page: limit,
        });
    },

    /**
     * Get products by brand (custom taxonomy)
     * Presupune ca ai taxonomie "pa_brand" in WooCommerce
     */
    async getProductsByBrand(brandSlug: string, params: WCListParams = {}) {
        const query = buildQueryParams(params);
        // query.attribute = 'pa_brand';
        // query.attribute_term = brandSlug;

        query['pwb-brand'] = brandSlug;


        const response = await wooCommerce.getWithHeaders<WCProduct[]>(
            '/products',
            query
        );

        return {
            products: response.data,
            total: parseInt(response.headers['x-wp-total'] || '0'),
            totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
        };
    },
};