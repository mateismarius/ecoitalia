import { wooCommerce } from './client';
import { WCCategory } from './types';

export const categoryService = {
    /**
     * Get all categories
     */
    async getCategories(params?: {
        parent?: number;
        per_page?: number;
        orderby?: string;
        order?: 'asc' | 'desc';
    }): Promise<WCCategory[]> {
        return wooCommerce.get<WCCategory[]>('/products/categories', {
            per_page: params?.per_page || 100,
            parent: params?.parent,
            orderby: params?.orderby || 'name',
            order: params?.order || 'asc',
            hide_empty: true, // Doar categorii cu produse
        });
    },

    /**
     * Get single category
     */
    async getCategory(id: number): Promise<WCCategory> {
        return wooCommerce.get<WCCategory>(`/products/categories/${id}`);
    },

    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug: string): Promise<WCCategory | null> {
        const categories = await wooCommerce.get<WCCategory[]>(
            '/products/categories',
            { slug }
        );
        return categories[0] || null;
    },

    /**
     * Get parent categories (top-level)
     */
    async getParentCategories(): Promise<WCCategory[]> {
        return this.getCategories({ parent: 0 });
    },

    /**
     * Get subcategories pentru o categorie
     */
    async getSubcategories(parentId: number): Promise<WCCategory[]> {
        return this.getCategories({ parent: parentId });
    },

    /**
     * Build category tree (nested structure)
     */
    async getCategoryTree(): Promise<WCCategory[]> {
        const allCategories = await this.getCategories({ per_page: 100 });

        // Functie helper pentru building tree
        const buildTree = (
            categories: WCCategory[],
            parentId: number = 0
        ): any[] => {
            return categories
                .filter((cat) => cat.parent === parentId)
                .map((cat) => ({
                    ...cat,
                    children: buildTree(categories, cat.id),
                }));
        };

        return buildTree(allCategories);
    },
};