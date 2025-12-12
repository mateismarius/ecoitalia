// Base types pentru WooCommerce
export interface WCImage {
    id: number;
    src: string;
    name: string;
    alt: string;
}

export interface WCCategory {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description: string;
    image: WCImage | null;
    count: number;
}

export interface WCProduct {
    id: number;
    name: string;
    slug: string;
    permalink: string;
    type: 'simple' | 'variable' | 'grouped' | 'external';
    status: 'publish' | 'draft' | 'pending';
    featured: boolean;
    tags: string[];
    description: string;
    short_description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    stock_status: 'instock' | 'outofstock' | 'onbackorder';
    stock_quantity: number | null;
    manage_stock: boolean;
    categories: WCCategory[];
    images: WCImage[];
    attributes: WCAttribute[];
    variations: number[];
    average_rating: string;
    rating_count: number;
    related_ids: number[];
    meta_data: WCMetaData[];
}

export interface WCAttribute {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
}

export interface WCMetaData {
    id: number;
    key: string;
    value: string | number | boolean;
}

export interface WCProductVariation {
    id: number;
    date_created: string;
    description: string;
    sku: string;
    price: string;
    regular_price: string;
    sale_price: string;
    on_sale: boolean;
    stock_status: 'instock' | 'outofstock' | 'onbackorder';
    stock_quantity: number | null;
    image: WCImage;
    attributes: Array<{
        id: number;
        name: string;
        option: string;
    }>;
}

export interface WCOrder {
    id: number;
    parent_id: number;
    number: string;
    order_key: string;
    created_via: string;
    version: string;
    status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed';
    currency: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    discount_total: string;
    discount_tax: string;
    shipping_total: string;
    shipping_tax: string;
    cart_tax: string;
    total: string;
    total_tax: string;
    prices_include_tax: boolean;
    customer_id: number;
    customer_ip_address: string;
    customer_user_agent: string;
    customer_note: string;
    billing: WCAddress;
    shipping: WCAddress;
    payment_method: string;
    payment_method_title: string;
    transaction_id: string;
    date_paid: string | null;
    date_paid_gmt: string | null;
    date_completed: string | null;
    date_completed_gmt: string | null;
    cart_hash: string;
    meta_data: WCMetaData[];
    line_items: WCLineItem[];
    tax_lines: WCTaxLine[];
    shipping_lines: WCShippingLine[];
    fee_lines: WCFeeLine[];
    coupon_lines: WCCouponLine[];
    refunds: WCRefund[];
    currency_symbol: string;
}

export interface WCAddress {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
}

export interface WCLineItem {
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    tax_class: string;
    subtotal: string;
    total: string;
    sku: string;
    price: number;
    image: WCImage;
}

// API Response types
export interface WCApiResponse<T> {
    data: T;
    headers: Record<string, string>;
}

export interface WCListParams {
    page?: number;
    per_page?: number;
    search?: string;
    order?: 'asc' | 'desc';
    orderby?: string;
    category?: string;
    featured?: boolean;
    on_sale?: boolean;
    min_price?: number;
    max_price?: number;
    stock_status?: 'instock' | 'outofstock' | 'onbackorder';
}



export interface WCTaxLine {
    id: number;
    rate_code: string;
    rate_id: number;
    label: string;
    compound: boolean;
    tax_total: string;
    shipping_tax_total: string;
    meta_data: WCMetaData[];
}

export interface WCShippingLine {
    id: number;
    method_title: string;
    method_id: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: WCMetaData[];
}

export interface WCFeeLine {
    id: number;
    name: string;
    tax_class: string;
    tax_status: string;
    total: string;
    total_tax: string;
    taxes: any[];
    meta_data: WCMetaData[];
}

export interface WCCouponLine {
    id: number;
    code: string;
    discount: string;
    discount_tax: string;
    meta_data: WCMetaData[];
}

export interface WCRefund {
    id: number;
    reason: string;
    total: string;
}