'use client';

import { WCProduct } from '@/lib/woocommerce/types';
import { ShoppingCart, ExternalLink, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

interface ProductCTAProps {
    product: WCProduct;
}

export default function ProductCTA({ product }: ProductCTAProps) {
    const [copied, setCopied] = useState(false);
    const inStock = product.stock_status === 'instock';

    // WooCommerce shop URL
    const shopUrl = `${process.env.NEXT_PUBLIC_WC_STORE_URL}/produs/${product.slug}`;

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            // Native share API (mobile)
            try {
                await navigator.share({
                    title: product.name,
                    text: `Verifica ${product.name} pe EcoItalia`,
                    url: url,
                });
            } catch (error) {
                console.log('Share cancelled');
            }
        } else {
            // Copy to clipboard (desktop)
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error('Failed to copy');
            }
        }
    };

    return (
        <div className="space-y-4">
            {/* Main CTA - Link to WooCommerce */}
            {inStock ? (

                <a    href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1C4E80] text-white px-8 py-4 rounded-xl hover:bg-[#153d66] transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95"
                >
                <ShoppingCart size={24} />
                <span>Cumpara Acum pe shop.ecoitalia.ro</span>
                <ExternalLink size={18} />
</a>
) : (
        <button
            disabled
            className="w-full bg-gray-300 text-gray-500 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 cursor-not-allowed"
        >
            <ShoppingCart size={24} />
            <span>Stoc Epuizat</span>
        </button>
    )}

{/* Secondary CTA - Direct to Product Page */}
<a
href={shopUrl}
target="_blank"
rel="noopener noreferrer"
className="w-full border-2 border-[#C19A6B] text-[#C19A6B] px-8 py-4 rounded-xl hover:bg-[#C19A6B] hover:text-white transition-all font-semibold text-lg flex items-center justify-center gap-3 active:scale-95"
    >
    Vezi in Magazin
    <ExternalLink size={18} />
</a>

{/* Action Buttons */}
<div className="flex gap-3">
    {/* Wishlist - Placeholder */}
    <button
        className="flex-1 border-2 border-gray-300 text-[#7C8B96] px-4 py-3 rounded-xl hover:border-[#1C4E80] hover:text-[#1C4E80] transition-all font-medium flex items-center justify-center gap-2 active:scale-95"
        aria-label="Adauga la favorite"
    >
        <Heart size={20} />
        <span className="hidden sm:inline">Favorite</span>
    </button>

    {/* Share */}
    <button
        onClick={handleShare}
        className="flex-1 border-2 border-gray-300 text-[#7C8B96] px-4 py-3 rounded-xl hover:border-[#1C4E80] hover:text-[#1C4E80] transition-all font-medium flex items-center justify-center gap-2 active:scale-95 relative"
        aria-label="Distribuie"
    >
        <Share2 size={20} />
        <span className="hidden sm:inline">{copied ? 'Copiat!' : 'Distribuie'}</span>

        {/* Tooltip pentru copied */}
        {copied && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-xs whitespace-nowrap">
              Link copiat!
            </span>
        )}
    </button>
</div>

{/* Info Box */}
<div className="bg-gradient-to-r from-[#6B9F5E]/10 to-[#1C4E80]/10 rounded-xl p-4 space-y-2">
    <p className="text-sm font-semibold text-[#2C3538] flex items-center gap-2">
        <span className="text-[#6B9F5E]">✓</span>
        Livrare gratuita in Brasov si Focsani
    </p>
    <p className="text-sm font-semibold text-[#2C3538] flex items-center gap-2">
        <span className="text-[#6B9F5E]">✓</span>
        Produse originale 100%
    </p>
    <p className="text-sm font-semibold text-[#2C3538] flex items-center gap-2">
        <span className="text-[#6B9F5E]">✓</span>
        Livrare in 24-48h
    </p>
</div>
</div>
);
}