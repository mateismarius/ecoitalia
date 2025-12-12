'use client'

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { WCProduct } from '@/lib/woocommerce/types';
import {
    formatPrice,
    getDiscountPercentage,
    getProductImage,
    isInStock
} from '@/lib/woocommerce/helpers';

interface ProductCardProps {
    product: WCProduct;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const imageUrl = getProductImage(product);
    const discount = getDiscountPercentage(product);
    const inStock = isInStock(product);

    // Link catre magazinul WordPress
    const productUrl = `/magazin/produs/${product.slug}`;

    return (
        <a
            href={productUrl}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#C19A6B] relative"
        >
            {/* Badge reducere */}
            {product.on_sale && discount > 0 && (
                <div className="absolute top-3 right-3 z-10 bg-[#C19A6B] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    -{discount}%
                </div>
            )}

            {/* Imagine produs */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-[#F8F7F4] to-white overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    priority={priority}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />

                {/* Badge stoc */}
                {!inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                            Stoc Epuizat
                        </span>
                    </div>
                )}
            </div>

            {/* Informatii produs */}
            <div className="p-4">
                {/* Categorie */}
                {product.categories[0] && (
                    <p className="text-xs text-[#C19A6B] font-medium mb-1 uppercase tracking-wide">
                        {product.categories[0].name}
                    </p>
                )}

                {/* Nume produs */}
                <h3 className="text-base font-semibold text-[#2C3538] mb-2 line-clamp-2 group-hover:text-[#1C4E80] transition-colors">
                    {product.name}
                </h3>

                {/* Pret */}
                <div className="flex items-baseline gap-2 mb-3">
                    {product.on_sale && product.sale_price ? (
                        <>
                            <span className="text-2xl font-bold text-[#1C4E80]">
                                {formatPrice(product.sale_price)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.regular_price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-2xl font-bold text-[#1C4E80]">
                            {formatPrice(product.price)}
                        </span>
                    )}
                </div>

                {/* Button CTA */}
                <button
                    className="w-full bg-[#1C4E80] text-white py-2.5 rounded-lg hover:bg-[#153d66] transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = productUrl;
                    }}
                    disabled={!inStock}
                >
                    <ShoppingCart size={18} />
                    {inStock ? 'Vezi Detalii' : 'Stoc Epuizat'}
                </button>
            </div>
        </a>
    );
}