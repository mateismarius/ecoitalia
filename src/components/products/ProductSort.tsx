'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react'; // ← ADAUGĂ
import {
    buildUrlFromFilters,
    parseFiltersFromUrlSearchParams,
    ProductSort as IProductSort
} from '@/lib/utils/url-state';
import { ChevronDown, Loader2 } from 'lucide-react'; // ← ADAUGĂ Loader2

interface ProductSortProps {
    currentSort: IProductSort;
}

const sortOptions = [
    { label: 'Cele mai noi', value: 'date_desc' },
    { label: 'Cele mai vechi', value: 'date_asc' },
    { label: 'Pret: mic la mare', value: 'price_asc' },
    { label: 'Pret: mare la mic', value: 'price_desc' },
    { label: 'Popularitate', value: 'popularity_desc' },
    { label: 'Nume: A-Z', value: 'title_asc' },
    { label: 'Nume: Z-A', value: 'title_desc' },
];

export default function ProductSort({ currentSort }: ProductSortProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentFilters = parseFiltersFromUrlSearchParams(searchParams);

    const [isPending, startTransition] = useTransition(); // ← ADAUGĂ

    const currentSortValue = `${currentSort.orderBy}_${currentSort.order}`;

    const handleSortChange = (value: string) => {
        const [orderBy, order] = value.split('_') as [
                'date' | 'price' | 'popularity' | 'title',
                'asc' | 'desc'
        ];

        const newSort = { orderBy, order };
        const newUrl = `/produse${buildUrlFromFilters(currentFilters, newSort, 1)}`;

        // ← WRAPPĂ în transition
        startTransition(() => {
            router.push(newUrl);
        });
    };

    return (
        <div className="relative flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-[#7C8B96]">
                Sorteaza dupa:
            </label>

            {/* ← ADAUGĂ loading indicator */}
            {isPending && (
                <Loader2 size={16} className="text-[#1C4E80] animate-spin" />
            )}

            <select
                id="sort"
                value={currentSortValue}
                onChange={(e) => handleSortChange(e.target.value)}
                disabled={isPending} // ← ADAUGĂ disabled când loading
                className="appearance-none bg-white border border-gray-300 text-[#2C3538] px-4 py-2 pr-10 rounded-lg focus:ring-2 focus:ring-[#1C4E80] focus:border-[#1C4E80] outline-none cursor-pointer text-sm font-medium disabled:opacity-50 disabled:cursor-wait"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8B96] pointer-events-none"
            />
        </div>
    );
}