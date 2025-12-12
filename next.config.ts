/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'ecoitalia.ro',
            'shop.ecoitalia.ro',
            // Adaugă alte domenii pentru imagini WooCommerce
        ],
        formats: ['image/avif', 'image/webp'],
    },

    // PWA & Performance
    poweredByHeader: false,
    compress: true,

    // Headers pentru PWA
    async headers() {
        return [
            {
                source: '/manifest.json',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json',
                    },
                ],
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;