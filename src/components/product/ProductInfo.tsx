import { WCProduct } from '@/lib/woocommerce/types';
import { Tag, Package } from 'lucide-react';

interface ProductInfoProps {
    product: WCProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
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
        <div className="space-y-4">
            {/* Category */}
            {product.categories[0] && (
                <div className="flex items-center gap-2 text-sm text-[#7C8B96]">
                    <Tag size={16} />
                    <span>{product.categories[0].name}</span>
                </div>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#2C3538] leading-tight">
                {product.name}
            </h1>

            {/* SKU & Rating */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
                {product.sku && (
                    <div className="flex items-center gap-2 text-[#7C8B96]">
                        <Package size={16} />
                        <span>COD: {product.sku}</span>
                    </div>
                )}

                {product.rating_count > 0 && (
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={
                                        i < Math.round(parseFloat(product.average_rating))
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                    }
                                >
                  ★
                </span>
                            ))}
                        </div>
                        <span className="text-[#7C8B96]">
              ({product.rating_count} {product.rating_count === 1 ? 'recenzie' : 'recenzii'})
            </span>
                    </div>
                )}
            </div>

            {/* Price */}
            <div className="space-y-2">
                <div className="flex items-baseline gap-3">
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C4E80]">
            {parseFloat(product.price).toFixed(0)} RON
          </span>
                    {isOnSale && (
                        <>
              <span className="text-xl md:text-2xl text-[#7C8B96] line-through">
                {parseFloat(product.regular_price).toFixed(0)} RON
              </span>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{discountPercent}%
              </span>
                        </>
                    )}
                </div>
                <p className="text-sm text-[#7C8B96]">* Pretul include TVA</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-gray-100">
                {inStock ? (
                    <>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                            <p className="text-green-700 font-semibold">In stoc</p>
                            <p className="text-xs text-[#7C8B96]">
                                Livrare gratuita in Brasov si Focsani
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div>
                            <p className="text-red-700 font-semibold">Stoc epuizat</p>
                            <p className="text-xs text-[#7C8B96]">
                                Contacteaza-ne pentru disponibilitate
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Short Description */}
            {product.short_description && (
                <div
                    className="prose prose-sm max-w-none text-[#7C8B96]"
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
            )}
        </div>
    );
}