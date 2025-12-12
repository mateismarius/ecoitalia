'use client';

import { useRouter } from 'next/navigation';
import { PackageX, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { ProductFilters } from '@/lib/utils/url-state';

interface EmptyStateProps {
    filters: ProductFilters;
}

export default function EmptyState({ filters }: EmptyStateProps) {
    const router = useRouter();

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.brands.length > 0 ||
        filters.minPrice ||
        filters.maxPrice ||
        filters.onSale ||
        filters.inStock ||
        filters.search;

    const clearFilters = () => {
        router.push('/produse');
    };

    // Different messages based on context
    if (filters.search) {
        return (
            <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#7C8B96]/10 flex items-center justify-center mb-6">
                    <Search size={40} className="text-[#7C8B96] md:w-12 md:h-12" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#2C3538] mb-3 text-center">
                    Nu am gasit produse pentru "{filters.search}"
                </h3>

                <p className="text-sm md:text-base text-[#7C8B96] mb-6 md:mb-8 text-center max-w-md">
                    Incearca sa cauti folosind alte cuvinte sau verifica daca ai scris corect.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#153d66] transition-colors font-medium"
                    >
                        Sterge Cautarea
                    </button>
                    <Link
                        href="/produse"
                        className="px-6 py-3 border-2 border-[#C19A6B] text-[#C19A6B] rounded-lg hover:bg-[#C19A6B] hover:text-white transition-colors font-medium text-center"
                    >
                        Vezi Toate Produsele
                    </Link>
                </div>

                {/* Search Suggestions */}
                <div className="mt-12 w-full max-w-2xl">
                    <p className="text-sm text-[#7C8B96] mb-4 text-center">Incerca cautari populare:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            'detergent',
                            'freebubbles',
                            'sapun',
                            'parfum rufe',
                            'curatenie',
                        ].map((suggestion) => (
                            <Link
                                key={suggestion}
                                href={`/produse?search=${suggestion}`}
                                className="px-4 py-2 bg-[#F8F7F4] text-[#2C3538] rounded-full hover:bg-[#1C4E80] hover:text-white transition-colors text-sm"
                            >
                                {suggestion}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (hasActiveFilters) {
        return (
            <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#C19A6B]/10 flex items-center justify-center mb-6">
                    <Filter size={40} className="text-[#C19A6B] md:w-12 md:h-12" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#2C3538] mb-3 text-center">
                    Niciun produs nu corespunde filtrelor tale
                </h3>

                <p className="text-sm md:text-base text-[#7C8B96] mb-6 md:mb-8 text-center max-w-md">
                    Incearca sa modifici sau sa stergi unele filtre pentru a vedea mai multe produse.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#153d66] transition-colors font-medium"
                    >
                        Sterge Toate Filtrele
                    </button>
                    <Link
                        href="/produse"
                        className="px-6 py-3 border-2 border-[#C19A6B] text-[#C19A6B] rounded-lg hover:bg-[#C19A6B] hover:text-white transition-colors font-medium text-center"
                    >
                        Vezi Toate Produsele
                    </Link>
                </div>

                {/* Active Filters Summary */}
                <div className="mt-12 w-full max-w-md">
                    <p className="text-sm text-[#7C8B96] mb-3 text-center">Filtre active:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {filters.categories.map((cat) => (
                            <span
                                key={cat}
                                className="px-3 py-1 bg-[#1C4E80]/10 text-[#1C4E80] rounded-full text-sm"
                            >
                {cat}
              </span>
                        ))}
                        {filters.brands.map((brand) => (
                            <span
                                key={brand}
                                className="px-3 py-1 bg-[#C19A6B]/10 text-[#C19A6B] rounded-full text-sm"
                            >
                {brand}
              </span>
                        ))}
                        {filters.onSale && (
                            <span className="px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm">
                Oferte
              </span>
                        )}
                        {filters.inStock && (
                            <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm">
                In Stoc
              </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Generic empty state (no products at all - unlikely)
    return (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#7C8B96]/10 flex items-center justify-center mb-6">
                <PackageX size={40} className="text-[#7C8B96] md:w-12 md:h-12" />
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[#2C3538] mb-3 text-center">
                Nu avem produse disponibile momentan
            </h3>

            <p className="text-sm md:text-base text-[#7C8B96] mb-6 md:mb-8 text-center max-w-md">
                Se pare ca magazinul este gol. Revino in curand sau contacteaza-ne pentru mai multe informatii.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/"
                    className="px-6 py-3 bg-[#1C4E80] text-white rounded-lg hover:bg-[#153d66] transition-colors font-medium text-center"
                >
                    Inapoi Acasa
                </Link>
                <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-[#C19A6B] text-[#C19A6B] rounded-lg hover:bg-[#C19A6B] hover:text-white transition-colors font-medium text-center"
                >
                    Contacteaza-ne
                </Link>
            </div>
        </div>
    );
}