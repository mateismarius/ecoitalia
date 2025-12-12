import axios, { AxiosInstance, AxiosError } from 'axios';

// Error handling personalizat
export class WooCommerceError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public code?: string,
        public data?: any
    ) {
        super(message);
        this.name = 'WooCommerceError';
    }
}

class WooCommerceClient {
    private client: AxiosInstance;
    private consumerKey: string;
    private consumerSecret: string;

    constructor() {
        const storeUrl = process.env.NEXT_PUBLIC_WC_STORE_URL;
        this.consumerKey = process.env.WC_CONSUMER_KEY || '';
        this.consumerSecret = process.env.WC_CONSUMER_SECRET || '';

        if (!storeUrl || !this.consumerKey || !this.consumerSecret) {
            throw new Error('WooCommerce environment variables not configured');
        }

        this.client = axios.create({
            baseURL: `${storeUrl}/wp-json/wc/v3`,
            auth: {
                username: this.consumerKey,
                password: this.consumerSecret,
            },
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 secunde
        });

        // Request interceptor pentru logging
        this.client.interceptors.request.use(
            (config) => {
                console.log(`[WC API] ${config.method?.toUpperCase()} ${config.url}`);
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor pentru error handling
        this.client.interceptors.response.use(
            (response) => {
                console.log(`[WC API] Success: ${response.config.url}`);
                return response;
            },
            (error: AxiosError) => {
                return this.handleError(error);
            }
        );
    }

    private handleError(error: AxiosError): Promise<never> {
        if (error.response) {
            // Server responded cu error status
            const { status, data } = error.response;
            const message = (data as any)?.message || error.message;
            const code = (data as any)?.code;

            console.error(`[WC API Error] ${status}: ${message}`);

            throw new WooCommerceError(message, status, code, data);
        } else if (error.request) {
            // Request făcut dar nu a primit răspuns
            console.error('[WC API Error] No response received:', error.message);
            throw new WooCommerceError(
                'Nu s-a putut conecta la server. Verifica conexiunea.',
                0,
                'NO_RESPONSE'
            );
        } else {
            // Altceva
            console.error('[WC API Error] Request setup failed:', error.message);
            throw new WooCommerceError(error.message, 0, 'REQUEST_FAILED');
        }
    }

    // GET request
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const response = await this.client.get<T>(endpoint, { params });
        return response.data;
    }

    // GET request cu headers (pentru pagination)
    async getWithHeaders<T>(
        endpoint: string,
        params?: Record<string, any>
    ): Promise<{ data: T; headers: Record<string, string> }> {
        const response = await this.client.get<T>(endpoint, { params });
        return {
            data: response.data,
            headers: response.headers as Record<string, string>,
        };
    }

    // POST request
    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await this.client.post<T>(endpoint, data);
        return response.data;
    }

    // PUT request
    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await this.client.put<T>(endpoint, data);
        return response.data;
    }

    // DELETE request
    async delete<T>(endpoint: string): Promise<T> {
        const response = await this.client.delete<T>(endpoint);
        return response.data;
    }

    // Batch requests (pentru multiple operations)
    async batch<T>(operations: {
        create?: any[];
        update?: any[];
        delete?: number[];
    }): Promise<T> {
        const response = await this.client.post<T>('/batch', operations);
        return response.data;
    }
}

// Export singleton instance
export const wooCommerce = new WooCommerceClient();