import Link from 'next/link';

const brands = [
    {
        name: 'FreeBubbles',
        slug: 'freebubbles',
        badge: 'Made in Italy',
        color: 'from-blue-500 to-blue-600'
    },
    {
        name: 'Chanteclair',
        slug: 'chanteclair',
        badge: null,
        color: 'from-green-500 to-green-600'
    },
    {
        name: 'Tesori',
        slug: 'tesori',
        badge: null,
        color: 'from-purple-500 to-purple-600'
    },
    {
        name: 'Sano',
        slug: 'sano',
        badge: null,
        color: 'from-orange-500 to-orange-600'
    },
    {
        name: 'Misavan',
        slug: 'misavan',
        badge: null,
        color: 'from-pink-500 to-pink-600'
    },
];

export default function BrandShowcase() {
    return (
        <section id="brands" className="py-12 md:py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C4E80] mb-3 md:mb-4">
                        Branduri de Incredere
                    </h2>
                    <p className="text-base md:text-lg text-[#7C8B96] max-w-2xl mx-auto px-4">
                        Selectam cu atentie cele mai bune produse din Italia, Romania si Europa
                    </p>
                </div>

                {/* Brands Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {brands.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/marci/${brand.slug}`}
                            className="bg-[#F8F7F4] rounded-xl p-4 md:p-8 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-[#C19A6B] group active:scale-95"
                        >
                            {/* Brand Icon */}
                            <div className="aspect-square bg-white rounded-lg flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 transition-transform overflow-hidden">
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${brand.color} flex items-center justify-center text-white font-bold text-xl md:text-2xl`}>
                                    {brand.name[0]}
                                </div>
                            </div>

                            {/* Brand Name */}
                            <p className="text-center font-semibold text-sm md:text-base text-[#2C3538] mb-1">
                                {brand.name}
                            </p>

                            {/* Badge */}
                            {brand.badge && (
                                <p className="text-xs text-center text-[#C19A6B] font-medium">
                                    {brand.badge}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>

                {/* View All Brands CTA */}
                <div className="text-center mt-8 md:mt-12">
                    <Link
                        href="/marci"
                        className="inline-flex items-center gap-2 text-[#1C4E80] hover:text-[#153d66] font-semibold transition-colors group"
                    >
                        Vezi Toate Brandurile
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}