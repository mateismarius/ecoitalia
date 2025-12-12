import Link from 'next/link';
import { ShoppingCart, Truck, Store, Heart } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-white to-[#F8F7F4] py-12 md:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-block bg-[#C19A6B]/10 text-[#C19A6B] px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                            Branduri Premium din Europa
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1C4E80] leading-tight mb-4 md:mb-6">
                            Calitate Premium
                            <br />
                            <span className="text-[#C19A6B]">Livrata la Tine Acasa</span>
                        </h1>

                        {/* Description */}
                        <p className="text-base md:text-lg text-[#7C8B96] mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            FreeBubbles, Chanteclair, Tesori din Italia. Sano, Misavan si alte branduri de top.
                            Totul cu livrare gratuita in Brasov si Focsani.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-10">
                            <Link
                                href="/produse"
                                className="bg-[#1C4E80] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#153d66] transition-all font-medium text-base md:text-lg shadow-lg hover:shadow-xl text-center active:scale-95"
                            >
                                Descopera Gama
                            </Link>
                            <Link
                                href="/contact"
                                className="border-2 border-[#C19A6B] text-[#C19A6B] px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#C19A6B] hover:text-white transition-all font-medium text-base md:text-lg text-center active:scale-95"
                            >
                                Viziteaza Showroom
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 text-xs md:text-sm text-[#7C8B96]">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#6B9F5E]/10 flex items-center justify-center">
                                    <Truck size={16} className="text-[#6B9F5E] md:w-5 md:h-5" />
                                </div>
                                <span className="font-medium">Livrare 24h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#6B9F5E]/10 flex items-center justify-center">
                                    <Store size={16} className="text-[#6B9F5E] md:w-5 md:h-5" />
                                </div>
                                <span className="font-medium">2 Magazine</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#6B9F5E]/10 flex items-center justify-center">
                                    <Heart size={16} className="text-[#6B9F5E] md:w-5 md:h-5" />
                                </div>
                                <span className="font-medium">500+ Clienti</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - Product Showcase */}
                    <div className="relative mt-8 lg:mt-0">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {[
                                    { name: 'FreeBubbles', color: 'from-blue-500/20 to-blue-600/20' },
                                    { name: 'Chanteclair', color: 'from-green-500/20 to-green-600/20' },
                                    { name: 'Tesori', color: 'from-purple-500/20 to-purple-600/20' },
                                    { name: 'Sano', color: 'from-orange-500/20 to-orange-600/20' },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-[#F8F7F4] rounded-lg p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer group active:scale-95"
                                    >
                                        <div className={`w-full aspect-square bg-gradient-to-br ${item.color} rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                                            <ShoppingCart
                                                className="text-[#7C8B96] group-hover:text-[#1C4E80] transition-colors"
                                                size={32}
                                            />
                                        </div>
                                        <p className="text-xs md:text-sm text-[#7C8B96] font-medium text-center">
                                            {item.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-[#6B9F5E] text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg font-semibold text-xs md:text-sm animate-bounce">
                            Livrare GRATUITA
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}