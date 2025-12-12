'use client';

import {startTransition, useState, useTransition} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    buildUrlFromFilters,
    parseFiltersFromUrlSearchParams,  // ← SCHIMBAT
    parseSortFromUrlSearchParams,      // ← SCHIMBAT
    ProductFilters as IProductFilters
} from '@/lib/utils/url-state';
import {ChevronDown, ChevronUp, Loader2} from 'lucide-react';

interface ProductFiltersProps {
    categories: Array<{ id: number; name: string; slug: string; count: number }>;
    brands: Array<{ name: string; slug: string }>;
    currentFilters: IProductFilters;
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

    // Handle filter changes
    const handleFilterChange = (
        filterType: 'categories' | 'brands' | 'onSale' | 'inStock',
        value: string | boolean
    ) => {
        const newFilters = { ...currentFilters };

        if (filterType === 'categories' || filterType === 'brands') {
            const currentArray = newFilters[filterType];
            const stringValue = value as string;

            if (currentArray.includes(stringValue)) {
                // Remove filter
                newFilters[filterType] = currentArray.filter((item) => item !== stringValue);
            } else {
                // Add filter
                newFilters[filterType] = [...currentArray, stringValue];
            }
        } else {
            // Boolean filters
            newFilters[filterType] = !newFilters[filterType];
        }

        // Build new URL and navigate
        const newUrl = `/produse${buildUrlFromFilters(newFilters, currentSort, 1)}`;
        startTransition(() => {
            router.push(newUrl);
        });
    };

    // Handle price range
    const [priceRange, setPriceRange] = useState({
        min: currentFilters.minPrice?.toString() || '',
        max: currentFilters.maxPrice?.toString() || '',
    });

    const applyPriceFilter = () => {
        const newFilters = { ...currentFilters };

        if (priceRange.min) {
            newFilters.minPrice = Number(priceRange.min);
        } else {
            delete newFilters.minPrice;
        }

        if (priceRange.max) {
            newFilters.maxPrice = Number(priceRange.max);
        } else {
            delete newFilters.maxPrice;
        }

        const newUrl = `/produse${buildUrlFromFilters(newFilters, currentSort, 1)}`;
        router.push(newUrl);
    };

    // Clear all filters
    const clearAllFilters = () => {
        router.push(`/produse${buildUrlFromFilters({
            categories: [],
            brands: [],
        }, currentSort, 1)}`);
    };

    const hasActiveFilters =
        currentFilters.categories.length > 0 ||
        currentFilters.brands.length > 0 ||
        currentFilters.minPrice ||
        currentFilters.maxPrice ||
        currentFilters.onSale ||
        currentFilters.inStock;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {isPending && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-[#1C4E80]" size={24} />
                </div>
            )}
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#2C3538]">Filtre</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-xs text-[#1C4E80] hover:text-[#153d66] font-medium underline"
                    >
                        Sterge Tot
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
                                    checked={currentFilters.categories.includes(category.slug)}
                                    onChange={() => handleFilterChange('categories', category.slug)}
                                    className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer"
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
                                    checked={currentFilters.brands.includes(brand.slug)}
                                    onChange={() => handleFilterChange('brands', brand.slug)}
                                    className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="text-sm text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                  {brand.name}
                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full mb-4 group"
                >
          <span className="font-semibold text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
            Pret (RON)
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-[#1C4E80] outline-none text-sm"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-[#7C8B96] mb-1 block">Max</label>
                                <input
                                    type="number"
                                    placeholder="999"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-[#1C4E80] outline-none text-sm"
                                />
                            </div>
                        </div>
                        <button
                            onClick={applyPriceFilter}
                            className="w-full bg-[#1C4E80] text-white py-2 rounded-lg hover:bg-[#153d66] transition-colors text-sm font-medium"
                        >
                            Aplica
                        </button>
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
                                checked={currentFilters.onSale || false}
                                onChange={() => handleFilterChange('onSale', !currentFilters.onSale)}
                                className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="text-sm text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                Doar oferte
              </span>
                        </label>

                        <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F8F7F4] cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={currentFilters.inStock || false}
                                onChange={() => handleFilterChange('inStock', !currentFilters.inStock)}
                                className="w-4 h-4 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80] focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="text-sm text-[#2C3538] group-hover:text-[#1C4E80] transition-colors">
                Doar in stoc
              </span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}