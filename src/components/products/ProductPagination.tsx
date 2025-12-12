'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';
import {
    buildUrlFromFilters,
    parseFiltersFromUrlSearchParams,
    parseSortFromUrlSearchParams
} from '@/lib/utils/url-state';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react';

interface ProductPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
}

export default function ProductPagination({
                                              currentPage,
                                              totalPages,
                                              totalItems,
                                          }: ProductPaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentFilters = parseFiltersFromUrlSearchParams(searchParams);
    const currentSort = parseSortFromUrlSearchParams(searchParams);

    const [isPending, startTransition] = useTransition();
    const [optimisticPage, setOptimisticPage] = useState(currentPage);

    // Reset optimistic state când se primește pagina reală
    useEffect(() => {
        setOptimisticPage(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || isPending) return;

        // Optimistic update - arată imediat noua pagină
        setOptimisticPage(page);

        const newUrl = `/produse${buildUrlFromFilters(currentFilters, currentSort, page)}`;

        startTransition(() => {
            router.push(newUrl, { scroll: false }); // Nu mai facem scroll automat
            // Scroll manual după un mic delay pentru smooth effect
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        });
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Folosim optimisticPage pentru a calcula paginile vizibile
            const current = optimisticPage;

            if (current <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (current >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', current - 1, current, current + 1, '...', totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const itemsPerPage = 20;
    const startItem = (optimisticPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(optimisticPage * itemsPerPage, totalItems);

    return (
        <div className="space-y-4">
            {/* Loading overlay - mai vizibil */}
            {isPending && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white shadow-lg rounded-full px-6 py-3 flex items-center gap-3 border-2 border-[#1C4E80]">
                    <Loader2 size={20} className="animate-spin text-[#1C4E80]" />
                    <span className="text-sm font-semibold text-[#1C4E80]">Încarc produsele...</span>
                </div>
            )}

            {/* Items info - Mobile */}
            <div className="text-center text-sm text-[#7C8B96] md:hidden">
                Produsele {startItem}-{endItem} din {totalItems}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2">
                {/* First Page - Desktop only */}
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={optimisticPage === 1 || isPending}
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-[#F8F7F4] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                    aria-label="First page"
                >
                    <ChevronsLeft size={18} className="text-[#7C8B96]" />
                </button>

                {/* Previous Page */}
                <button
                    onClick={() => handlePageChange(optimisticPage - 1)}
                    disabled={optimisticPage === 1 || isPending}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-[#F8F7F4] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                    aria-label="Previous page"
                >
                    <ChevronLeft size={18} className="text-[#7C8B96]" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1 md:gap-2">
                    {pageNumbers.map((page, index) => {
                        if (page === '...') {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="w-10 h-10 flex items-center justify-center text-[#7C8B96]"
                                >
                  ...
                </span>
                            );
                        }

                        const pageNum = page as number;
                        const isActive = pageNum === optimisticPage;
                        const isLoading = isPending && pageNum === optimisticPage;

                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                disabled={isPending}
                                className={`w-10 h-10 rounded-lg font-medium transition-all disabled:cursor-wait relative ${
                                    isActive
                                        ? 'bg-[#1C4E80] text-white shadow-lg'
                                        : 'border border-gray-300 text-[#2C3538] hover:bg-[#F8F7F4] active:scale-95 disabled:opacity-50'
                                }`}
                                aria-label={`Page ${pageNum}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {isLoading ? (
                                    <Loader2 size={16} className="animate-spin mx-auto" />
                                ) : (
                                    pageNum
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Next Page */}
                <button
                    onClick={() => handlePageChange(optimisticPage + 1)}
                    disabled={optimisticPage === totalPages || isPending}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-[#F8F7F4] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                    aria-label="Next page"
                >
                    <ChevronRight size={18} className="text-[#7C8B96]" />
                </button>

                {/* Last Page - Desktop only */}
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={optimisticPage === totalPages || isPending}
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-[#F8F7F4] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                    aria-label="Last page"
                >
                    <ChevronsRight size={18} className="text-[#7C8B96]" />
                </button>
            </div>

            {/* Items info - Desktop */}
            <div className="hidden md:block text-center text-sm text-[#7C8B96]">
                Afișezi produsele {startItem}-{endItem} din {totalItems}
            </div>

            {/* Quick Jump */}
            {totalPages > 10 && (
                <div className="hidden md:flex items-center justify-center gap-3">
                    <label htmlFor="page-jump" className="text-sm text-[#7C8B96]">
                        Sari la pagina:
                    </label>
                    <input
                        id="page-jump"
                        type="number"
                        min={1}
                        max={totalPages}
                        value={optimisticPage}
                        disabled={isPending}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= totalPages) {
                                setOptimisticPage(value);
                            }
                        }}
                        onKeyDown={(e) => {  // ✅ SCHIMBAT de la onKeyPress
                            if (e.key === 'Enter' && !isPending) {
                                e.preventDefault(); // ✅ ADĂUGAT pentru a preveni submit-ul formularului
                                handlePageChange(optimisticPage);
                            }
                        }}
                        className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-[#1C4E80] focus:border-[#1C4E80] outline-none text-sm disabled:opacity-50 disabled:cursor-wait"
                    />
                    <span className="text-sm text-[#7C8B96]">din {totalPages}</span>
                </div>
            )}
        </div>
    );
}