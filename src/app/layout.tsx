import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// PWA Viewport Configuration
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#1C4E80',
};

// SEO & PWA Metadata
export const metadata: Metadata = {
    title: "EcoItalia - Produse Premium din Italia | FreeBubbles Distribuitor Oficial",
    description: "Produse de curatenie si ingrijire personala premium din Italia. FreeBubbles, Chanteclair, Tesori. Livrare gratuita in Brasov si Focsani.",
    keywords: [
        "freebubbles romania",
        "produse curatenie italia",
        "detergent ecologic",
        "livrare gratuita brasov",
        "livrare gratuita focsani",
        "distribuitor freebubbles"
    ],

    // // PWA Configuration
    // manifest: '/manifest.json',
    // appleWebApp: {
    //     capable: true,
    //     statusBarStyle: 'default',
    //     title: 'EcoItalia',
    // },

    // Open Graph
    openGraph: {
        type: 'website',
        locale: 'ro_RO',
        url: 'https://ecoitalia.ro',
        siteName: 'EcoItalia',
        title: 'EcoItalia - Produse Premium din Italia',
        description: 'Produse de curatenie premium. Livrare gratuita in Brasov si Focsani.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'EcoItalia - Produse Premium',
            },
        ],
    },

    // Twitter Card
    twitter: {
        card: 'summary_large_image',
        title: 'EcoItalia - Produse Premium din Italia',
        description: 'Produse de curatenie premium. Livrare gratuita.',
        images: ['/og-image.jpg'],
    },

    // Icons
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ro">
        <head>
            {/* PWA Meta Tags */}
            <meta name="application-name" content="EcoItalia" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="EcoItalia" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />

            {/* Preconnect pentru performance */}
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_WC_STORE_URL} />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_WC_STORE_URL} />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}