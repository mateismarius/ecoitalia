'use client';

import { useRouter } from 'next/navigation';
import {
    buildUrlFromFilters,
    ProductFilters,
    ProductSort
} from '@/lib/utils/url-state';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
    filters: ProductFilters;
    categories: Array<{ id: number; name: string; slug: string }>;
    brands: Array<{ name: string; slug: string }>;
    currentSort: ProductSort;
}

export default function ActiveFilters({
                                          filters,
                                          categories,
                                          brands,
                                          currentSort,
                                      }: ActiveFiltersProps) {
    const router = useRouter();

    const removeFilter = (
        filterType: 'categories' | 'brands' | 'onSale' | 'inStock' | 'price',
        value?: string
    ) => {
        const newFilters = { ...filters };

        if (filterType === 'categories' || filterType === 'brands') {
            newFilters[filterType] = newFilters[filterType].filter((item) => item !== value);
        } else if (filterType === 'price') {
            delete newFilters.minPrice;
            delete newFilters.maxPrice;
        } else {
            newFilters[filterType] = false;
        }

        const newUrl = `/produse${buildUrlFromFilters(newFilters, currentSort, 1)}`;
        router.push(newUrl);
    };

    const clearAllFilters = () => {
        router.push(`/produse${buildUrlFromFilters({
            categories: [],
            brands: [],
        }, currentSort, 1)}`);
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Category filters */}
            {filters.categories.map((catSlug) => {
                const category = categories.find((c) => c.slug === catSlug);
                return category ? (
                    <button
                        key={catSlug}
                        onClick={() => removeFilter('categories', catSlug)}
                        className="inline-flex items-center gap-2 bg-[#1C4E80]/10 text-[#1C4E80] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#1C4E80]/20 transition-colors group"
                    >
                        {category.name}
                        <X size={14} className="group-hover:text-[#153d66]" />
                    </button>
                ) : null;
            })}

            {/* Brand filters */}
            {filters.brands.map((brandSlug) => {
                const brand = brands.find((b) => b.slug === brandSlug);
                return brand ? (
                    <button
                        key={brandSlug}
                        onClick={() => removeFilter('brands', brandSlug)}
                        className="inline-flex items-center gap-2 bg-[#C19A6B]/10 text-[#C19A6B] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#C19A6B]/20 transition-colors group"
                    >
                        {brand.name}
                        <X size={14} className="group-hover:text-[#9d7d54]" />
                    </button>
                ) : null;
            })}

            {/* On Sale filter */}
            {filters.onSale && (
                <button
                    onClick={() => removeFilter('onSale')}
                    className="inline-flex items-center gap-2 bg-red-500/10 text-red-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-500/20 transition-colors group"
                >
                    Oferte
                    <X size={14} className="group-hover:text-red-700" />
                </button>
            )}

            {/* In Stock filter */}
            {filters.inStock && (
                <button
                    onClick={() => removeFilter('inStock')}
                    className="inline-flex items-center gap-2 bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-500/20 transition-colors group"
                >
                    In Stoc
                    <X size={14} className="group-hover:text-green-700" />
                </button>
            )}

            {/* Price filter */}
            {(filters.minPrice || filters.maxPrice) && (
                <button
                    onClick={() => removeFilter('price')}
                    className="inline-flex items-center gap-2 bg-[#7C8B96]/10 text-[#7C8B96] px-3 py-1.5 rounded-full text-sm font-medium hover:bg-[#7C8B96]/20 transition-colors group"
                >
                    Pret: {filters.minPrice || '0'} - {filters.maxPrice || '∞'} RON
                    <X size={14} className="group-hover:text-[#2C3538]" />
                </button>
            )}

            {/* Clear all button */}
            <button
                onClick={clearAllFilters}
                className="text-sm text-[#7C8B96] hover:text-[#2C3538] underline font-medium ml-2"
            >
                Sterge toate filtrele
            </button>
        </div>
    );
}