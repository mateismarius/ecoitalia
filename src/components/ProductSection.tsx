import Link from 'next/link';
import Image from 'next/image';
import { WCProduct } from '@/lib/woocommerce/types';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface ProductSectionProps {
    title: string;
    subtitle?: string;
    products: WCProduct[];
    viewAllLink?: string;
    priority?: boolean;
}

export default function ProductSection({
                                           title,
                                           subtitle,
                                           products,
                                           viewAllLink,
                                           priority = false,
                                       }: ProductSectionProps) {
    if (products.length === 0) return null;

    return (
        <section className="py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 md:mb-12 gap-4">
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1C4E80] mb-2">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-sm md:text-base lg:text-lg text-[#7C8B96]">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {viewAllLink && (
                        <Link
                            href={viewAllLink}
                            className="inline-flex items-center justify-center sm:justify-start gap-2 text-[#1C4E80] hover:text-[#153d66] font-semibold text-sm md:text-base transition-colors group"
                        >
                            Vezi Tot
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>

                {/* Products Grid - Responsive */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            priority={priority}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Product Card Component - Mobile Optimized
function ProductCard({ product, priority }: { product: WCProduct; priority?: boolean }) {
    const imageUrl = product.images[0]?.src || '/placeholder-product.jpg';
    const isOnSale = product.on_sale && parseFloat(product.sale_price) > 0;
    const inStock = product.stock_status === 'instock';

    return (
        <Link
            href={`/produse/${product.slug}`}
            className="group bg-white rounded-lg md:rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:border-[#C19A6B] active:scale-95"
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
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isOnSale && (
                        <span className="bg-red-500 text-white px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-bold">
              -{Math.round(((parseFloat(product.regular_price) - parseFloat(product.sale_price)) / parseFloat(product.regular_price)) * 100)}%
            </span>
                    )}
                    {!inStock && (
                        <span className="bg-gray-800 text-white px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-semibold">
              Stoc Epuizat
            </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 md:p-4">
                {/* Brand/Category */}
                {product.categories[0] && (
                    <p className="text-[10px] md:text-xs text-[#7C8B96] mb-1 truncate">
                        {product.categories[0].name}
                    </p>
                )}

                {/* Title */}
                <h3 className="font-semibold text-xs md:text-sm lg:text-base text-[#2C3538] mb-2 line-clamp-2 group-hover:text-[#1C4E80] transition-colors min-h-[2.5rem] md:min-h-[3rem]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className="text-base md:text-lg lg:text-xl font-bold text-[#1C4E80]">
            {parseFloat(product.price).toFixed(0)} RON
          </span>
                    {isOnSale && (
                        <span className="text-[10px] md:text-xs text-[#7C8B96] line-through">
              {parseFloat(product.regular_price).toFixed(0)} RON
            </span>
                    )}
                </div>

                {/* CTA Button */}
                {inStock && (
                    <button className="w-full bg-[#F8F7F4] hover:bg-[#1C4E80] text-[#2C3538] hover:text-white px-3 md:px-4 py-2 md:py-2.5 rounded-md transition-colors text-xs md:text-sm font-medium flex items-center justify-center gap-2">
                        <ShoppingCart size={14} className="md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Vezi Detalii</span>
                        <span className="sm:hidden">Vezi</span>
                    </button>
                )}
            </div>
        </Link>
    );
}