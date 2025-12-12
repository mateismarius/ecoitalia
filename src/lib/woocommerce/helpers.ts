import { WCOrder, WCProduct } from './types';

/**
 * Format price in RON
 */
export function formatPrice(price: string | number): string {
    const amount = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('ro-RO', {
        style: 'currency',
        currency: 'RON',
        minimumFractionDigits: 2,
    }).format(amount);
}

/**
 * Calculate order subtotal (fara shipping si discount)
 */
export function getOrderSubtotal(order: WCOrder): number {
    return order.line_items.reduce((sum, item) => {
        return sum + parseFloat(item.subtotal);
    }, 0);
}

/**
 * Get total discount from order
 */
export function getOrderDiscount(order: WCOrder): number {
    return parseFloat(order.discount_total || '0');
}

/**
 * Get total shipping cost
 */
export function getOrderShipping(order: WCOrder): number {
    return parseFloat(order.shipping_total || '0');
}

/**
 * Get total tax
 */
export function getOrderTax(order: WCOrder): number {
    return parseFloat(order.total_tax || '0');
}

/**
 * Get order total
 */
export function getOrderTotal(order: WCOrder): number {
    return parseFloat(order.total);
}

/**
 * Check if product is in stock
 */
export function isInStock(product: WCProduct): boolean {
    return product.stock_status === 'instock';
}

/**
 * Check if product is on sale
 */
export function isOnSale(product: WCProduct): boolean {
    return product.on_sale && parseFloat(product.sale_price) > 0;
}

/**
 * Get product main image
 */
export function getProductImage(product: WCProduct): string {
    return product.images[0]?.src || '/placeholder-product.jpg';
}

/**
 * Get discount percentage
 */
export function getDiscountPercentage(product: WCProduct): number {
    if (!product.on_sale) return 0;

    const regular = parseFloat(product.regular_price);
    const sale = parseFloat(product.sale_price);

    if (regular === 0) return 0;

    return Math.round(((regular - sale) / regular) * 100);
}

/**
 * Format order status in Romanian
 */
export function formatOrderStatus(status: string): string {
    const statusMap: Record<string, string> = {
        pending: 'In asteptare',
        processing: 'In procesare',
        'on-hold': 'In asteptare',
        completed: 'Finalizata',
        cancelled: 'Anulata',
        refunded: 'Rambursata',
        failed: 'Esuata',
    };

    return statusMap[status] || status;
}

/**
 * Get order status color for UI
 */
export function getOrderStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
        pending: 'text-yellow-600 bg-yellow-50',
        processing: 'text-blue-600 bg-blue-50',
        'on-hold': 'text-orange-600 bg-orange-50',
        completed: 'text-green-600 bg-green-50',
        cancelled: 'text-gray-600 bg-gray-50',
        refunded: 'text-purple-600 bg-purple-50',
        failed: 'text-red-600 bg-red-50',
    };

    return colorMap[status] || 'text-gray-600 bg-gray-50';
}

/**
 * Check if city has free shipping (Brasov si Focsani)
 */
export function hasFreeShipping(city: string): boolean {
    const freeShippingCities = ['brasov', 'focsani'];
    return freeShippingCities.includes(city.toLowerCase().trim());
}

/**
 * Calculate shipping cost based on city
 */
export function calculateShipping(city: string, cartTotal: number): number {
    // Livrare gratuita pentru Brasov si Focsani
    if (hasFreeShipping(city)) {
        return 0;
    }

    // Livrare gratuita peste 200 RON
    if (cartTotal >= 200) {
        return 0;
    }

    // Cost implicit livrare
    return 20;
}

/**
 * Validate Romanian phone number
 */
export function isValidRomanianPhone(phone: string): boolean {
    // Remove spaces and special chars
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');

    // Romanian phone: +40... or 07...
    const regex = /^(\+4|4|0)(7[0-9]{8})$/;
    return regex.test(cleaned);
}

/**
 * Format Romanian phone number
 */
export function formatRomanianPhone(phone: string): string {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');

    if (cleaned.startsWith('+4')) {
        return cleaned;
    }

    if (cleaned.startsWith('4')) {
        return '+' + cleaned;
    }

    if (cleaned.startsWith('0')) {
        return '+4' + cleaned.substring(1);
    }

    return phone;
}