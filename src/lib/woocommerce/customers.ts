import { wooCommerce } from './client';

export interface WCCustomer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    billing: any;
    shipping: any;
    avatar_url: string;
}

export const customerService = {
    /**
     * Get customer by ID
     */
    async getCustomer(id: number): Promise<WCCustomer> {
        return wooCommerce.get<WCCustomer>(`/customers/${id}`);
    },

    /**
     * Get customer by email
     */
    async getCustomerByEmail(email: string): Promise<WCCustomer | null> {
        const customers = await wooCommerce.get<WCCustomer[]>('/customers', {
            email,
        });
        return customers[0] || null;
    },

    /**
     * Create customer
     */
    async createCustomer(data: {
        email: string;
        first_name: string;
        last_name: string;
        username?: string;
        password?: string;
        billing?: any;
        shipping?: any;
    }): Promise<WCCustomer> {
        return wooCommerce.post<WCCustomer>('/customers', data);
    },

    /**
     * Update customer
     */
    async updateCustomer(id: number, data: Partial<WCCustomer>): Promise<WCCustomer> {
        return wooCommerce.put<WCCustomer>(`/customers/${id}`, data);
    },
};