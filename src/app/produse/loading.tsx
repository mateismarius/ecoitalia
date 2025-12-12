
export default function Loading() {
    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            {/* Header Skeleton */}
            <div className="bg-white shadow-sm h-20" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
                {/* Page Header Skeleton */}
                <div className="mb-6 md:mb-8">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
                    <div className="h-10 w-64 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
                    {/* Sidebar Skeleton - Desktop */}
                    <aside className="hidden lg:block">
                        <div className="bg-white rounded-xl p-6 space-y-6 animate-pulse">
                            <div className="h-6 w-32 bg-gray-200 rounded" />
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 bg-gray-200 rounded" />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid Skeleton */}
                    <div>
                        {/* Sort Skeleton */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
                            <div className="hidden md:flex gap-2">
                                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse"
                                >
                                    <div className="aspect-square bg-gray-200" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                                        <div className="h-4 bg-gray-200 rounded w-full" />
                                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                                        <div className="h-6 bg-gray-200 rounded w-1/2" />
                                        <div className="h-10 bg-gray-200 rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}