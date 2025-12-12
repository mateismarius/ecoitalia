/** @type {import('next').NextConfig} */

const nextConfig = {
    // ========================================
    // IMAGE OPTIMIZATION
    // ========================================
    images: {
        // ✅ NOUA configurare (recomandată)
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ecoitalia.ro',
                pathname: '/**', // permite orice path
            },
            {
                protocol: 'https',
                hostname: 'shop.ecoitalia.ro',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },

    // ========================================
    // PERFORMANCE & PWA
    // ========================================
    poweredByHeader: false, // Ascunde header "X-Powered-By"
    compress: true, // Activează gzip compression

    // Reactivity pentru development
    reactStrictMode: true,

    // ========================================
    // EXPERIMENTAL FEATURES (Next 15+)
    // ========================================
    experimental: {
        // Optimistic UI updates
        optimisticClientCache: true,

        // Preload links automatically
        optimizeCss: true,

        // Turbopack pentru builds mai rapide
        // turbo: {
        //     rules: {
        //         '*.svg': ['@svgr/webpack'],
        //     },
        // },
    },

    // ========================================
    // COMPILER OPTIMIZATIONS
    // ========================================
    compiler: {
        // Remove console.log in production
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'],
        } : false,
    },

    // ========================================
    // HEADERS pentru PERFORMANCE
    // ========================================
    async headers() {
        return [
            // PWA Manifest
            {
                source: '/manifest.json',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/manifest+json',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },

            // Static Assets Caching
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },

            // Fonts Caching
            {
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },

            // Performance Headers pentru toate paginile
            {
                source: '/:path*',
                headers: [
                    // DNS Prefetch
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    // Security
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    // Preconnect la WooCommerce
                    {
                        key: 'Link',
                        value: `<${process.env.NEXT_PUBLIC_WC_STORE_URL}>; rel=preconnect`,
                    },
                ],
            },

            // API Routes - Cache Control
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, must-revalidate',
                    },
                ],
            },
        ];
    },

    // ========================================
    // REDIRECTS (dacă e nevoie)
    // ========================================
    async redirects() {
        return [
            // Exemplu: redirect de la /shop la /produse
            // {
            //     source: '/shop',
            //     destination: '/produse',
            //     permanent: true,
            // },
        ];
    },

    // ========================================
    // REWRITES pentru API Proxy (opțional)
    // ========================================
    async rewrites() {
        return [
            // Proxy pentru API WooCommerce (reduce CORS issues)
            // {
            //     source: '/api/wc/:path*',
            //     destination: `${process.env.NEXT_PUBLIC_WC_STORE_URL}/wp-json/wc/v3/:path*`,
            // },
        ];
    },


    // ========================================
    // OUTPUT & BUILD
    // ========================================
    output: 'standalone', // Pentru Docker deployment

    // Logging
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

module.exports = nextConfig;

// ========================================
// ENVIRONMENT VARIABLES VALIDATION
// ========================================
// Verifică că ai toate variabilele necesare
if (!process.env.NEXT_PUBLIC_WC_STORE_URL) {
    throw new Error('NEXT_PUBLIC_WC_STORE_URL is not defined');
}

if (!process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
    console.warn('⚠️ WooCommerce credentials not set. API calls will fail.');
}