// middleware.ts (root directory)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Cache headers pentru static assets
    if (
        request.nextUrl.pathname.startsWith('/_next/static') ||
        request.nextUrl.pathname.startsWith('/_next/image') ||
        request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|woff|woff2)$/)
    ) {
        response.headers.set(
            'Cache-Control',
            'public, max-age=31536000, immutable'
        );
    }

    // Cache headers pentru pagini
    if (request.nextUrl.pathname.startsWith('/produse/')) {
        response.headers.set(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=86400'
        );
    }

    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-DNS-Prefetch-Control', 'on');

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};