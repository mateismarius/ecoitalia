// src/components/products/ProductCardOptimized.tsx
import Link from 'next/link';
import Image from 'next/image';
import { WCProduct } from '@/lib/woocommerce/types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: WCProduct;
    priority?: boolean; // Pentru primele 4 produse
    loading?: 'lazy' | 'eager';
}

export default function ProductCard({
                                        product,
                                        priority = false,
                                        loading = 'lazy'
                                    }: ProductCardProps) {
    const imageUrl = product.images[0]?.src || '/placeholder-product.jpg';
    const isOnSale = product.on_sale && parseFloat(product.sale_price) > 0;
    const inStock = product.stock_status === 'instock';

    const discountPercent = isOnSale
        ? Math.round(
            ((parseFloat(product.regular_price) - parseFloat(product.sale_price)) /
                parseFloat(product.regular_price)) *
            100
        )
        : 0;

    return (
        <Link
            href={`/produse/${product.slug}`}
            className="group bg-white rounded-lg md:rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:border-[#C19A6B] active:scale-[0.98]"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={priority}
                    loading={priority ? 'eager' : loading}
                    quality={priority ? 90 : 75}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                />

                {/* Badges */}
                {(isOnSale || !inStock) && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {isOnSale && (
                            <span className="bg-red-500 text-white px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-bold shadow-lg">
                                -{discountPercent}%
                            </span>
                        )}
                        {!inStock && (
                            <span className="bg-gray-800 text-white px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-semibold shadow-lg">
                                Stoc Epuizat
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content - Simplified pentru performance */}
            <div className="p-3 md:p-4">
                {/* Category - mai mic pentru performanță */}
                {product.categories[0] && (
                    <p className="text-[10px] md:text-xs text-[#7C8B96] mb-1 truncate uppercase tracking-wide">
                        {product.categories[0].name}
                    </p>
                )}

                {/* Title */}
                <h3 className="font-semibold text-xs md:text-sm lg:text-base text-[#2C3538] mb-2 line-clamp-2 group-hover:text-[#1C4E80] transition-colors min-h-[2.5rem] md:min-h-[3rem]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base md:text-lg lg:text-xl font-bold text-[#1C4E80]">
                        {parseFloat(product.price).toFixed(0)} RON
                    </span>
                    {isOnSale && (
                        <span className="text-[10px] md:text-xs text-[#7C8B96] line-through">
                            {parseFloat(product.regular_price).toFixed(0)} RON
                        </span>
                    )}
                </div>

                {/* Stock Badge - Simplified */}
                <div className="flex items-center gap-2 text-xs mb-3">
                    <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`font-medium ${inStock ? 'text-green-700' : 'text-red-700'}`}>
                        {inStock ? 'In stoc' : 'Indisponibil'}
                    </span>
                </div>

                {/* CTA */}
                <button
                    aria-label={`Vezi detalii ${product.name}`}
                    className="w-full bg-[#F8F7F4] group-hover:bg-[#1C4E80] text-[#2C3538] group-hover:text-white px-3 py-2 md:py-2.5 rounded-md transition-all text-xs md:text-sm font-medium flex items-center justify-center gap-2"
                >
                    <ShoppingCart size={14} className="md:w-4 md:h-4" />
                    <span>Vezi Detalii</span>
                </button>
            </div>
        </Link>
    );
}