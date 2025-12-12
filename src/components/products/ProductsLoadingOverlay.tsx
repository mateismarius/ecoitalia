export default function ProductsLoadingOverlay() {
    return (
        <div className="relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-3">
                    {/* Spinner */}
                    <div className="w-12 h-12 border-4 border-[#1C4E80] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-[#7C8B96] font-medium">Se incarca produsele...</p>
                </div>
            </div>

            {/* Skeleton Grid - shown behind overlay */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 opacity-50">
                {Array.from({ length: 8 }).map((_, i) => (
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
    );
}