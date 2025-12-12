'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { buildUrlFromFilters, parseFiltersFromUrl, parseSortFromUrl } from '@/lib/utils/url-state';
import { X, Filter, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface MobileFiltersProps {
    categories: Array<{ id: number; name: string; slug: string; count: number }>;
    brands: Array<{ name: string; slug: string }>;
    currentFilters: ReturnType<typeof parseFiltersFromUrl>;
    currentSort: ReturnType<typeof parseSortFromUrl>;
}

export default function MobileFilters({
                                          categories,
                                          brands,
                                          currentFilters,
                                          currentSort,
                                      }: MobileFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [isApplying, setIsApplying] = useState(false);

    // Local filter state (applied only on "Aplică" button)
    const [localFilters, setLocalFilters] = useState(currentFilters);
    const [priceRange, setPriceRange] = useState({
        min: currentFilters.minPrice?.toString() || '',
        max: currentFilters.maxPrice?.toString() || '',
    });

    // Expanded sections
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        brands: true,
        price: false,
        availability: true,
    });

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Reset local filters when drawer opens
    useEffect(() => {
        if (isOpen) {
            setLocalFilters(currentFilters);
            setPriceRange({
                min: currentFilters.minPrice?.toString() || '',
                max: currentFilters.maxPrice?.toString() || '',
            });
        }
    }, [isOpen, currentFilters]);

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // Handle local filter changes
    const handleLocalFilterChange = useCallback((
        filterType: 'categories' | 'brands' | 'onSale' | 'inStock',
        value: string | boolean
    ) => {
        const newFilters = { ...localFilters };

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

        setLocalFilters(newFilters);
    }, [localFilters]);

    // Apply filters and close drawer - cu feedback vizual
    const applyFilters = async () => {
        setIsApplying(true);

        const finalFilters = { ...localFilters };

        // Apply price range
        if (priceRange.min) {
            finalFilters.minPrice = Number(priceRange.min);
        } else {
            delete finalFilters.minPrice;
        }

        if (priceRange.max) {
            finalFilters.maxPrice = Number(priceRange.max);
        } else {
            delete finalFilters.maxPrice;
        }

        const newUrl = `/produse${buildUrlFromFilters(finalFilters, currentSort, 1)}`;

        // Mic delay pentru feedback vizual
        await new Promise(resolve => setTimeout(resolve, 100));

        router.push(newUrl, { scroll: false });

        // Așteptăm puțin apoi închidem drawer-ul
        setTimeout(() => {
            setIsOpen(false);
            setIsApplying(false);
        }, 200);
    };

    // Clear all filters
    const clearAllFilters = () => {
        setLocalFilters({
            categories: [],
            brands: [],
        });
        setPriceRange({ min: '', max: '' });
    };

    // Count active filters
    const activeFiltersCount =
        localFilters.categories.length +
        localFilters.brands.length +
        (localFilters.onSale ? 1 : 0) +
        (localFilters.inStock ? 1 : 0) +
        (priceRange.min ? 1 : 0) +
        (priceRange.max ? 1 : 0);

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-white border-2 border-[#1C4E80] text-[#1C4E80] px-4 py-2 rounded-lg hover:bg-[#1C4E80] hover:text-white transition-colors font-medium relative active:scale-95"
            >
                <Filter size={18} />
                <span>Filtre</span>
                {activeFiltersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        {activeFiltersCount}
                    </span>
                )}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                    onClick={() => !isApplying && setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-[90%] max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Filter size={20} className="text-[#1C4E80]" />
                            <h2 className="text-lg font-bold text-[#2C3538]">Filtre</h2>
                            {activeFiltersCount > 0 && (
                                <span className="bg-[#1C4E80] text-white text-xs px-2 py-1 rounded-full font-semibold">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            disabled={isApplying}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            <X size={24} className="text-[#2C3538]" />
                        </button>
                    </div>

                    {/* Filters Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* Categories */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('categories')}
                                className="flex items-center justify-between w-full mb-3"
                            >
                                <span className="font-semibold text-[#2C3538]">Categorii</span>
                                {expandedSections.categories ? (
                                    <ChevronUp size={18} className="text-[#7C8B96]" />
                                ) : (
                                    <ChevronDown size={18} className="text-[#7C8B96]" />
                                )}
                            </button>

                            {expandedSections.categories && (
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <label
                                            key={category.slug}
                                            className="flex items-center gap-3 p-3 rounded-lg active:bg-[#F8F7F4] cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={localFilters.categories.includes(category.slug)}
                                                onChange={() => handleLocalFilterChange('categories', category.slug)}
                                                className="w-5 h-5 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80]"
                                            />
                                            <span className="text-sm text-[#2C3538] flex-1">{category.name}</span>
                                            <span className="text-xs text-[#7C8B96]">({category.count})</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Brands */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('brands')}
                                className="flex items-center justify-between w-full mb-3"
                            >
                                <span className="font-semibold text-[#2C3538]">Branduri</span>
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
                                            className="flex items-center gap-3 p-3 rounded-lg active:bg-[#F8F7F4] cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={localFilters.brands.includes(brand.slug)}
                                                onChange={() => handleLocalFilterChange('brands', brand.slug)}
                                                className="w-5 h-5 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80]"
                                            />
                                            <span className="text-sm text-[#2C3538]">{brand.name}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Price Range */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <button
                                onClick={() => toggleSection('price')}
                                className="flex items-center justify-between w-full mb-3"
                            >
                                <span className="font-semibold text-[#2C3538]">Preț (RON)</span>
                                {expandedSections.price ? (
                                    <ChevronUp size={18} className="text-[#7C8B96]" />
                                ) : (
                                    <ChevronDown size={18} className="text-[#7C8B96]" />
                                )}
                            </button>

                            {expandedSections.price && (
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="text-xs text-[#7C8B96] mb-1 block">Min</label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-[#7C8B96] mb-1 block">Max</label>
                                        <input
                                            type="number"
                                            placeholder="999"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Availability */}
                        <div>
                            <button
                                onClick={() => toggleSection('availability')}
                                className="flex items-center justify-between w-full mb-3"
                            >
                                <span className="font-semibold text-[#2C3538]">Disponibilitate</span>
                                {expandedSections.availability ? (
                                    <ChevronUp size={18} className="text-[#7C8B96]" />
                                ) : (
                                    <ChevronDown size={18} className="text-[#7C8B96]" />
                                )}
                            </button>

                            {expandedSections.availability && (
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-3 rounded-lg active:bg-[#F8F7F4] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.onSale || false}
                                            onChange={() => handleLocalFilterChange('onSale', !localFilters.onSale)}
                                            className="w-5 h-5 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80]"
                                        />
                                        <span className="text-sm text-[#2C3538]">Doar oferte</span>
                                    </label>

                                    <label className="flex items-center gap-3 p-3 rounded-lg active:bg-[#F8F7F4] cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={localFilters.inStock || false}
                                            onChange={() => handleLocalFilterChange('inStock', !localFilters.inStock)}
                                            className="w-5 h-5 rounded border-gray-300 text-[#1C4E80] focus:ring-[#1C4E80]"
                                        />
                                        <span className="text-sm text-[#2C3538]">Doar în stoc</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-gray-200 space-y-3">
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearAllFilters}
                                disabled={isApplying}
                                className="w-full border-2 border-gray-300 text-[#2C3538] py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Șterge Filtre
                            </button>
                        )}
                        <button
                            onClick={applyFilters}
                            disabled={isApplying}
                            className="w-full bg-[#1C4E80] text-white py-3 rounded-lg font-semibold hover:bg-[#153d66] transition-colors flex items-center justify-center gap-2 disabled:opacity-75"
                        >
                            {isApplying ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Se aplică...</span>
                                </>
                            ) : (
                                <>
                                    <span>Aplică Filtre</span>
                                    {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}