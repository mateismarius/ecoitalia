export default function ProductLoading() {
    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            {/* Header Skeleton */}
            <div className="bg-white shadow-sm h-20" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
                {/* Breadcrumbs Skeleton */}
                <div className="flex items-center gap-2 mb-6 md:mb-8 animate-pulse">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>

                {/* Product Grid Skeleton */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
                    {/* Gallery Skeleton */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-2xl" />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                            ))}
                        </div>
                    </div>

                    {/* Info Skeleton */}
                    <div className="space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-3/4" />
                        <div className="h-12 bg-gray-200 rounded w-1/2" />
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                            <div className="h-4 bg-gray-200 rounded w-4/6" />
                        </div>
                        <div className="h-14 bg-gray-200 rounded w-full" />
                        <div className="h-14 bg-gray-200 rounded w-full" />
                    </div>
                </div>
            </main>
        </div>
    );
}