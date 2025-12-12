'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WCProduct } from '@/lib/woocommerce/types';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

interface RelatedProductsProps {
    products: WCProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Check scroll position
    const checkScrollPosition = () => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        checkScrollPosition();
        window.addEventListener('resize', checkScrollPosition);
        return () => window.removeEventListener('resize', checkScrollPosition);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;

        const scrollAmount = 300;
        const newScrollLeft =
            direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

        scrollContainerRef.current.scrollTo({
            left: newScrollLeft,
            behavior: 'smooth',
        });
    };

    if (products.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#2C3538]">
                    Produse Similare
                </h3>

                {/* Navigation Arrows - Desktop */}
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#1C4E80] hover:bg-[#1C4E80] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-inherit"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#1C4E80] hover:bg-[#1C4E80] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-inherit"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Products Carousel */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScrollPosition}
                className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {products.map((product) => (
                    <RelatedProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="md:hidden flex justify-center gap-2 mt-4">
                {products.map((_, index) => (
                    <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-gray-300"
                    />
                ))}
            </div>
        </div>
    );
}

// Related Product Card Component
function RelatedProductCard({ product }: { product: WCProduct }) {
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
            className="flex-shrink-0 w-[200px] md:w-[240px] snap-start group"
        >
            <div className="bg-white rounded-xl border-2 border-gray-100 hover:border-[#C19A6B] transition-all overflow-hidden hover:shadow-lg">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="240px"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {isOnSale && (
                            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                -{discountPercent}%
              </span>
                        )}
                        {!inStock && (
                            <span className="bg-gray-800 text-white px-2 py-0.5 rounded text-xs font-semibold">
                Stoc Epuizat
              </span>
                        )}
                    </div>

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#1C4E80] px-4 py-2 rounded-lg font-medium text-sm shadow-lg">
              Vezi Detalii
            </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-4">
                    {/* Category */}
                    {product.categories[0] && (
                        <p className="text-[10px] md:text-xs text-[#7C8B96] mb-1 truncate uppercase tracking-wide">
                            {product.categories[0].name}
                        </p>
                    )}

                    {/* Title */}
                    <h4 className="font-semibold text-sm md:text-base text-[#2C3538] mb-2 line-clamp-2 group-hover:text-[#1C4E80] transition-colors min-h-[2.5rem]">
                        {product.name}
                    </h4>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg md:text-xl font-bold text-[#1C4E80]">
              {parseFloat(product.price).toFixed(0)} RON
            </span>
                        {isOnSale && (
                            <span className="text-xs text-[#7C8B96] line-through">
                {parseFloat(product.regular_price).toFixed(0)} RON
              </span>
                        )}
                    </div>

                    {/* Stock */}
                    <div className="flex items-center gap-1 text-xs mb-3">
                        {inStock ? (
                            <>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-700 font-medium">In stoc</span>
                            </>
                        ) : (
                            <>
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-red-700 font-medium">Indisponibil</span>
                            </>
                        )}
                    </div>

                    {/* CTA */}
                    <button className="w-full bg-[#F8F7F4] group-hover:bg-[#1C4E80] text-[#2C3538] group-hover:text-white px-3 py-2 rounded-lg transition-all text-xs md:text-sm font-medium flex items-center justify-center gap-2">
                        <ShoppingCart size={14} />
                        <span>Vezi Produs</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}