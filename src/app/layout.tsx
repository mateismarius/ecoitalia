import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: 'swap', // ← CRITICAL: previne FOIT
    preload: true,
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: 'swap',
    preload: true,
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#1C4E80',
};

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
    twitter: {
        card: 'summary_large_image',
        title: 'EcoItalia - Produse Premium din Italia',
        description: 'Produse de curatenie premium. Livrare gratuita.',
        images: ['/og-image.jpg'],
    },
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
            {/* Preconnect pentru performance */}
            <link rel="preconnect" href="https://ecoitalia.ro" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://shop.ecoitalia.ro" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://ecoitalia.ro" />
            <link rel="dns-prefetch" href="https://shop.ecoitalia.ro" />

            {/* PWA Meta Tags */}
            <meta name="application-name" content="EcoItalia" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="EcoItalia" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <title>EcoItalia | Produse premium pentru tine si casa ta</title>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}