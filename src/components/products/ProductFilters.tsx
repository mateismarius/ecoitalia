'use client';

import { useState, useTransition, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    buildUrlFromFilters,
    parseSortFromUrlSearchParams,
    ProductFilters as IProductFilters
} from '@/lib/utils/url-state';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface ProductFiltersProps {
    categories: Array<{ id: number; name: string; slug: string; count: number }>;
    brands: Array<{ name: string; slug: string }>;
    currentFilters: IProductFilters;
}

// Debounce hook pentru price filter
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function ProductFilters({
                                           categories,
                                           brands,
                                           currentFilters,
                                       }: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = parseSortFromUrlSearchParams(searchParams);
    const [isPending, startTransition] = useTransition();

    // Optimistic local state
    const [optimisticFilters, setOptimisticFilters] = useState(currentFilters);

    // Sync cu URL când se schimbă
    useEffect(() => {
        setOptimisticFilters(currentFilters);
    }, [currentFilters]);

    // Expanded sections state
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        brands: true,
        price: true,
        availability: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Handle filter changes cu optimistic updates
    const handleFilterChange = useCallback((
        filterType: 'categories' | 'brands' | 'onSale' | 'inStock',
        value: string | boolean
    ) => {
        // Optimistic update imediat
        setOptimisticFilters((prev) => {
            const newFilters = { ...prev };

            if (filterType === 'categories' || filterType === 'brands') {
                const currentArray = newFilters[filterType];
                const stringValue = value as string;

                if (currentArray.includes(stringValue)) {
                    newFilters[filterType] = currentArray.filter((item) => item !== stringValue);
                } else {
                    newFilters[filterType] = [...currentArray, stringValue];
                }
            } else {
                newFilters[filterType] = !newFilters[filterType];
            }

            return newFilters;
        });

        // Apoi facem navigarea
        const newFilters = { ...optimisticFilters };

        if (filterType === 'categories' || filterType === 'brands') {
            const currentArray = newFilters[filterType];
            const stringValue = value as string;

            if (currentArray.includes(stringValue)) {
                newFilters[filterType] = currentArray.filter((item) => item !== stringValue);
            } else {
                newFilters[filterType] = [...currentArray, stringValue];
            }
        } else {
            newFilters[filterType] = !newFilters[filterType];
        }

        const newUrl = `/produse${buildUrlFromFilters(newFilters, currentSort, 1)}`;

        startTransition(() => {
            router.push(newUrl, { scroll: false });
        });
    }, [optimisticFilters, currentSort, router]);

    // Handle price range cu debounce
    const [priceRange, setPriceRange] = useState({
        min: currentFilters.minPrice?.toString() || '',
        max: currentFilters.maxPrice?.toString() || '',
    });

    const debouncedPriceRange = useDebounce(priceRange, 800);

    // Apply price când se schimbă debounced value
    useEffect(() => {
        if (debouncedPriceRange.min === (currentFilters.minPrice?.toString() || '') &&
            debouncedPriceRange.max === (currentFilters.maxPrice?.toString() || '')) {
            return; // Nu face nimic dacă e același
        }

        const finalFilters = { ...currentFilters };

        if (debouncedPriceRange.min) {
            finalFilters.minPrice = Number(debouncedPriceRange.min);
        } else {
            delete finalFilters.minPrice;
        }

        if (debouncedPriceRange.max) {
            finalFilters.maxPrice = Number(debouncedPriceRange.max);
        } else {
            delete finalFilters.maxPrice;
        }

        const newUrl = `/produse${buildUrlFromFilters(finalFilters, currentSort, 1)}`;
        startTransition(() => {
            router.push(newUrl, { scroll: false });
        });
    }, [debouncedPriceRange]); // eslint-disable-line

    // Sync price range cu filter când se schimbă extern
    useEffect(() => {
        setPriceRange({
            min: currentFilters.minPrice?.toString() || '',
            max: currentFilters.maxPrice?.toString() || '',
        });
    }, [currentFilters.minPrice, currentFilters.maxPrice]);

    const hasActiveFilters =
        optimisticFilters.categories.length > 0 ||
        optimisticFilters.brands.length > 0 ||
        optimisticFilters.minPrice ||
        optimisticFilters.maxPrice ||
        optimisticFilters.onSale ||
        optimisticFilters.inStock;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
            {/* Loading indicator */}
            {isPending && (
                <div className="absolute top-4 right-4 z-10">
                    <Loader2 className="animate-spin text-[#1C4E80]" size={20} />
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#2C3538]">Filtre</h3>
                {hasActiveFilters && (
                    <button
                        onClick={() => {
                            setOptimisticFilters({ categories: [], brands: [] });
                            router.push(`/produse${buildUrlFromFilters({
                                categories: [],
                                brands: [],
                            }, currentSort, 1)}`);
                        }}
                        disabled={isPending}
                        className="text-xs text-[#1C4E80] hover:text-[#153d66] font-medium underline disabled:opacity-50"
                    >
                        Șterge Tot
                    </button>
                )}
            </div>

            {/* Categories Filter */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <button
                    onClick={() => toggleSection('categories')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                        Categorii
                    </span>
                    {expandedSections.categories ? (
                        <ChevronUp size={18} className="text-[#7C8B96]" />
                    ) : (
                        <ChevronDown size={18} className="text-[#7C8B96]" />
                    )}
                </button>

                {expandedSections.categories && (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {categories.map((category) => (
                            <label
                                key={category.slug}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8F7F4] cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={optimisticFilters.categories.includes(category.slug)}
                                    onChange={() => handleFilterChange('categories', category.slug)}
                                    disabled={isPending}
                                    className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                                />
                                <span className="text-sm text-[#2C3538] group-hover:text-[#1C4E80] transition-colors flex-1">
                                    {category.name}
                                </span>
                                <span className="text-xs text-[#7C8B96]">({category.count})</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Brands Filter */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <button
                    onClick={() => toggleSection('brands')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                        Branduri
                    </span>
                    {expandedSections.brands ? (
                        <ChevronUp size={18} className="text-[#7C8B96]" />
                    ) : (
                        <ChevronDown size={18} className="text-[#7C8B96]" />
                    )}
                </button>

                {expandedSections.brands && (
                    <div className="space-y-2">
                        {brands.map((brand) => (
                            <label
                                key={brand.slug}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8F7F4] cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={optimisticFilters.brands.includes(brand.slug)}
                                    onChange={() => handleFilterChange('brands', brand.slug)}
                                    disabled={isPending}
                                    className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                                />
                                <span className="text-sm text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                                    {brand.name}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Filter - cu debounce */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                        Preț (RON)
                    </span>
                    {expandedSections.price ? (
                        <ChevronUp size={18} className="text-[#7C8B96]" />
                    ) : (
                        <ChevronDown size={18} className="text-[#7C8B96]" />
                    )}
                </button>

                {expandedSections.price && (
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-xs text-[#7C8B96] mb-1 block">Min</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    disabled={isPending}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-[#1C4E80] outline-none text-sm disabled:opacity-50"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-[#7C8B96] mb-1 block">Max</label>
                                <input
                                    type="number"
                                    placeholder="999"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    disabled={isPending}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-[#1C4E80] outline-none text-sm disabled:opacity-50"
                                />
                            </div>
                        </div>
                        {priceRange.min || priceRange.max ? (
                            <p className="text-xs text-[#7C8B96] italic">
                                Se aplică automat după 0.8s...
                            </p>
                        ) : null}
                    </div>
                )}
            </div>

            {/* Availability Filters */}
            <div>
                <button
                    onClick={() => toggleSection('availability')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
                    <span className="font-semibold text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                        Disponibilitate
                    </span>
                    {expandedSections.availability ? (
                        <ChevronUp size={18} className="text-[#7C8B96]" />
                    ) : (
                        <ChevronDown size={18} className="text-[#7C8B96]" />
                    )}
                </button>

                {expandedSections.availability && (
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8F7F4] cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={optimisticFilters.onSale || false}
                                onChange={() => handleFilterChange('onSale', !optimisticFilters.onSale)}
                                disabled={isPending}
                                className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                            />
                            <span className="text-sm text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                                Doar oferte
                            </span>
                        </label>

                        <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8F7F4] cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={optimisticFilters.inStock || false}
                                onChange={() => handleFilterChange('inStock', !optimisticFilters.inStock)}
                                disabled={isPending}
                                className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                            />
                            <span className="text-sm text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                                Doar în stoc
                            </span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}