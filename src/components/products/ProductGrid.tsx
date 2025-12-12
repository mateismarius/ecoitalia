// src/components/products/ProductGridOptimized.tsx
import ProductCard from './ProductCard';
import { WCProduct } from '@/lib/woocommerce/types';

interface ProductGridProps {
    products: WCProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    // Priority pentru primele 4 produse (above the fold)
                    priority={index < 4}
                    loading={index < 4 ? 'eager' : 'lazy'}
                />
            ))}
        </div>
    );
}