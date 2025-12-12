import { wooCommerce } from './client';
import { WCOrder, WCAddress, WCLineItem } from './types';

export interface CreateOrderData {
    billing: WCAddress;
    shipping: WCAddress;
    line_items: Array<{
        product_id: number;
        quantity: number;
        variation_id?: number;
    }>;
    shipping_lines?: Array<{
        method_id: string;
        method_title: string;
        total: string;
    }>;
    coupon_lines?: Array<{
        code: string;
    }>;
    payment_method?: string;
    payment_method_title?: string;
    customer_note?: string;
}

export const orderService = {
    /**
     * Create new order
     */
    async createOrder(data: CreateOrderData): Promise<WCOrder> {
        return wooCommerce.post<WCOrder>('/orders', {
            ...data,
            status: 'pending', // Initial status
            set_paid: false,
        });
    },

    /**
     * Get order by ID
     */
    async getOrder(id: number): Promise<WCOrder> {
        return wooCommerce.get<WCOrder>(`/orders/${id}`);
    },

    /**
     * Update order status
     */
    async updateOrderStatus(
        id: number,
        status: string
    ): Promise<WCOrder> {
        return wooCommerce.put<WCOrder>(`/orders/${id}`, { status });
    },

    /**
     * Get customer orders (necesita customer ID)
     */
    async getCustomerOrders(customerId: number): Promise<WCOrder[]> {
        return wooCommerce.get<WCOrder[]>('/orders', {
            customer: customerId,
            per_page: 100,
            orderby: 'date',
            order: 'desc',
        });
    },

    /**
     * Calculate order totals (pentru preview inainte de checkout)
     */
    async calculateTotals(data: {
        line_items: Array<{
            product_id: number;
            quantity: number;
            variation_id?: number;
        }>;
        shipping: {
            city: string;
            postcode?: string;
        };
        coupon_code?: string;
    }): Promise<{
        subtotal: number;
        shipping: number;
        discount: number;
        tax: number;
        total: number;
    }> {
        // Create draft order
        const draftOrder = await this.createOrder({
            billing: {
                city: data.shipping.city,
                postcode: data.shipping.postcode || '',
                first_name: '',
                last_name: '',
                address_1: '',
                address_2: '',
                state: '',
                country: 'RO',
                email: '',
                phone: '',
                company: '',
            },
            shipping: {
                city: data.shipping.city,
                postcode: data.shipping.postcode || '',
                first_name: '',
                last_name: '',
                address_1: '',
                address_2: '',
                state: '',
                country: 'RO',
                company: '',
                phone: '',
                email: '',
            },
            line_items: data.line_items,
            coupon_lines: data.coupon_code
                ? [{ code: data.coupon_code }]
                : undefined,
        });

        const totals = {
            subtotal: parseFloat(draftOrder.line_items.reduce((sum, item) =>
                sum + parseFloat(item.subtotal), 0
            ).toFixed(2)),
            shipping: parseFloat(draftOrder.shipping_total),
            discount: parseFloat(draftOrder.discount_total || '0'),
            tax: parseFloat(draftOrder.total_tax),
            total: parseFloat(draftOrder.total),
        };

        // Delete draft order
        await wooCommerce.delete(`/orders/${draftOrder.id}?force=true`);

        return totals;
    },
};