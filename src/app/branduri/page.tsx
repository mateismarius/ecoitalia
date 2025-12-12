import React from 'react';
import { ShoppingCart, Star, CheckCircle, ExternalLink, Package, Leaf, Heart, Sparkles, Award, ShieldCheck } from 'lucide-react';

// Import config (in proiect ar fi: import { SITE_CONFIG } from './constants')
const SITE_CONFIG = {
    name: "EcoItalia",
    tagline: "Distribuitor oficial Freebubbles",
    phone: "0739 77 88 77",
    email: "contact@ecoitalia.ro",
    shopUrl: "https://ecoitalia.ro/magazin",
    freeBubblesUrl: "https://freebubbles.ro",
    brands: {
        freebubbles: {
            name: "Freebubbles",
            country: "Italia",
            description: "Detergenti la robinet, 90% biodegradabili, hipoalergenici, fabricati in Italia",
            features: [
                "90% biodegradabili",
                "Hipoalergenici si fara nichel",
                "Netestate pe animale",
                "Made in Italy",
                "Concept la robinet - fara risipa de ambalaje"
            ],
            categories: [
                "Detergenti de rufe",
                "Balsam de rufe",
                "Detergent vase",
                "Detergent podele",
                "Degresant",
                "Solutii curatare rosturi",
                "Sapun lichid",
                "Gel de dus",
                "Sampon si balsam"
            ]
        },
        premium: [
            {
                name: "Chanteclair",
                country: "Italia",
                description: "Brand italian premium de detergenti si produse de curatenie, cu peste 60 de ani de experienta",
                categories: ["Detergenti vase", "Degresanti", "Curatare suprafete"]
            },
            {
                name: "Tesori d'Oriente",
                country: "Italia",
                description: "Parfumuri orientale rafinate pentru rufe si ingrijire personala",
                categories: ["Parfumuri rufe", "Gel de dus", "Sapunuri lichide", "Creme"]
            },
            {
                name: "Clemente",
                country: "Italia",
                description: "Produse de curatenie profesionale din Italia",
                categories: ["Detergenti profesionali", "Solutii HORECA"]
            },
            {
                name: "Horomia",
                country: "Italia",
                description: "Parfumuri de ambient si odorizante premium",
                categories: ["Odorizante", "Parfumuri ambient", "Difuzoare"]
            }
        ],
        standard: [
            {
                name: "Misavan",
                country: "Romania",
                description: "Brand romanesc de incredere pentru produse de curatenie",
                categories: ["Detergenti", "Produse curatenie"]
            },
            {
                name: "Puresimple",
                country: "Romania",
                description: "Solutii simple si eficiente pentru curatenie",
                categories: ["Detergenti ecologici", "Produse naturale"]
            },
            {
                name: "Sano",
                country: "Israel",
                description: "Brand international recunoscut pentru calitate",
                categories: ["Detergenti", "Produse igienizare"]
            }
        ]
    }
};

export default function BranduriPage() {
    return (
        <div className="min-h-screen bg-[#F8F7F4] text-[#2C3538]">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0">
                            <a href="/" className="text-2xl font-serif">
                                <span className="text-[#1C4E80] font-light">eco</span>
                                <span className="text-[#C19A6B] font-semibold"> ITALIA</span>
                            </a>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="/" className="text-[#2C3538] hover:text-[#1C4E80] transition-colors">Acasa</a>
                            <a href="/branduri" className="text-[#1C4E80] font-semibold">Branduri</a>
                            <a href="/colaborari" className="text-[#2C3538] hover:text-[#1C4E80] transition-colors">Colaborari B2B</a>
                            <a href="/magazine" className="text-[#2C3538] hover:text-[#1C4E80] transition-colors">Magazine</a>
                            <a href="/contact" className="text-[#2C3538] hover:text-[#1C4E80] transition-colors">Contact</a>
                        </div>
                        <a href={SITE_CONFIG.shopUrl} className="bg-[#1C4E80] text-white px-6 py-2.5 rounded-md hover:bg-[#153d66] transition-colors flex items-center gap-2">
                            <ShoppingCart size={18} />
                            Magazin Online
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#1C4E80] to-[#1C4E80]/90 py-20 px-4 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C19A6B]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center">
                        <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            Branduri Premium
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            Brandurile Noastre
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Selectam cu atentie cele mai bune produse ecologice din Italia si Europa.
                            Calitate premium, preturi accesibile, livrare gratuita in Brasov si Focsani.
                        </p>
                    </div>
                </div>
            </section>

            {/* Freebubbles - Featured Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-[#C19A6B]/10 text-[#C19A6B] px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Star size={16} fill="currentColor" />
                            Distribuitor Oficial
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
                            Freebubbles - Partenul Nostru Principal
                        </h2>
                        <p className="text-lg text-[#7C8B96] max-w-2xl mx-auto">
                            Singurul distribuitor oficial Freebubbles pentru Brasov si Focsani
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#1C4E80]/5 via-[#F8F7F4] to-[#C19A6B]/5 rounded-3xl overflow-hidden border-2 border-[#C19A6B]/30 shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Left - Info */}
                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#1C4E80] to-[#1C4E80]/80 rounded-xl flex items-center justify-center">
                                        <span className="text-white font-bold text-3xl">FB</span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-serif font-bold text-[#1C4E80]">Freebubbles</h3>
                                        <p className="text-[#7C8B96]">🇮🇹 Made in Italy</p>
                                    </div>
                                </div>

                                <p className="text-[#2C3538] text-lg mb-6 leading-relaxed">
                                    {SITE_CONFIG.brands.freebubbles.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {SITE_CONFIG.brands.freebubbles.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={20} />
                                            <span className="text-[#2C3538]">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href={SITE_CONFIG.shopUrl} className="bg-[#1C4E80] text-white px-6 py-3 rounded-lg hover:bg-[#153d66] transition-all font-medium text-center">
                                        Cumpara Freebubbles
                                    </a>
                                    <a href={SITE_CONFIG.freeBubblesUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-[#C19A6B] text-[#C19A6B] px-6 py-3 rounded-lg hover:bg-[#C19A6B] hover:text-white transition-all font-medium text-center flex items-center justify-center gap-2">
                                        Afla mai multe
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>

                            {/* Right - Categories */}
                            <div className="bg-white/50 backdrop-blur-sm p-8 md:p-12 border-l border-[#C19A6B]/20">
                                <h4 className="text-2xl font-semibold text-[#1C4E80] mb-6 flex items-center gap-2">
                                    <Package size={24} />
                                    Produse Disponibile
                                </h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {SITE_CONFIG.brands.freebubbles.categories.map((category, i) => (
                                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#C19A6B]/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-[#6B9F5E] rounded-full"></div>
                                                <span className="text-[#2C3538] font-medium">{category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Italian Brands */}
            <section className="py-20 px-4 bg-[#F8F7F4]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
                            Branduri Premium din Italia
                        </h2>
                        <p className="text-lg text-[#7C8B96] max-w-2xl mx-auto">
                            Calitate italiana, traditie si inovatie in fiecare produs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {SITE_CONFIG.brands.premium.map((brand, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-[#C19A6B] group">
                                <div className="flex items-start gap-6 mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#1C4E80]/10 to-[#C19A6B]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="text-[#1C4E80] font-bold text-3xl">{brand.name[0]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold text-[#1C4E80] mb-2">{brand.name}</h3>
                                        <p className="text-[#7C8B96] text-sm flex items-center gap-2">
                                            🇮🇹 {brand.country}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-[#2C3538] mb-6 leading-relaxed">
                                    {brand.description}
                                </p>

                                <div className="space-y-2 mb-6">
                                    <p className="text-sm font-semibold text-[#1C4E80] mb-2">Categorii:</p>
                                    {brand.categories.map((cat, j) => (
                                        <div key={j} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-[#C19A6B] rounded-full"></div>
                                            <span className="text-[#7C8B96] text-sm">{cat}</span>
                                        </div>
                                    ))}
                                </div>

                                <a href={SITE_CONFIG.shopUrl} className="inline-flex items-center gap-2 text-[#1C4E80] hover:text-[#153d66] font-medium transition-colors">
                                    Vezi produsele
                                    <span className="text-xl">→</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standard Brands */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
                            Alte Branduri de Calitate
                        </h2>
                        <p className="text-lg text-[#7C8B96] max-w-2xl mx-auto">
                            Selectie diversa pentru toate nevoile tale
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {SITE_CONFIG.brands.standard.map((brand, i) => (
                            <div key={i} className="bg-[#F8F7F4] rounded-xl p-8 hover:shadow-xl transition-all group">
                                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-sm">
                                    <span className="text-[#1C4E80] font-bold text-3xl">{brand.name[0]}</span>
                                </div>

                                <h3 className="text-xl font-semibold text-[#1C4E80] mb-2 text-center">{brand.name}</h3>
                                <p className="text-[#7C8B96] text-sm text-center mb-4">
                                    {brand.country === 'Romania' ? '🇷🇴' : '🇮🇱'} {brand.country}
                                </p>

                                <p className="text-[#2C3538] text-center mb-6 leading-relaxed">
                                    {brand.description}
                                </p>

                                <div className="space-y-2">
                                    {brand.categories.map((cat, j) => (
                                        <div key={j} className="text-center text-[#7C8B96] text-sm">
                                            • {cat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Our Brands */}
            <section className="py-20 px-4 bg-gradient-to-br from-[#1C4E80] to-[#1C4E80]/90 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold mb-4">
                            De Ce Sa Alegi Brandurile Noastre?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Leaf size={32} />,
                                title: "Ecologice",
                                desc: "Produse biodegradabile si prietenoase cu mediul"
                            },
                            {
                                icon: <Star size={32} />,
                                title: "Calitate Premium",
                                desc: "Doar branduri verificate si certificate"
                            },
                            {
                                icon: <Heart size={32} />,
                                title: "Sigure",
                                desc: "Hipoalergenice, testate dermatologic"
                            },
                            {
                                icon: <Sparkles size={32} />,
                                title: "Eficiente",
                                desc: "Rezultate excelente cu cantitati mici"
                            }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-white/80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificates & Quality */}
            <section className="py-20 px-4 bg-[#F8F7F4]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
                            Certificari si Garantii
                        </h2>
                        <p className="text-lg text-[#7C8B96]">
                            Toate produsele noastre respecta cele mai inalte standarde de calitate
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6B9F5E]/10 mb-4">
                                <Award size={32} className="text-[#6B9F5E]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1C4E80] mb-3">Made in Italy</h3>
                            <p className="text-[#7C8B96]">Produse fabricate in Italia conform standardelor europene cele mai stricte</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1C4E80]/10 mb-4">
                                <ShieldCheck size={32} className="text-[#1C4E80]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1C4E80] mb-3">Certificate UE</h3>
                            <p className="text-[#7C8B96]">Toate produsele sunt certificate si conforme cu legislatia europeana</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C19A6B]/10 mb-4">
                                <Leaf size={32} className="text-[#C19A6B]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1C4E80] mb-3">Eco-Friendly</h3>
                            <p className="text-[#7C8B96]">Biodegradabile, netestate pe animale, fara substante toxice</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-[#C19A6B]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                        Gaseste Produsele Tale Preferate
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Exploreaza gama completa in magazinul nostru online
                    </p>
                    <a href={SITE_CONFIG.shopUrl} className="inline-flex items-center gap-2 bg-white text-[#C19A6B] px-8 py-4 rounded-lg hover:bg-[#F8F7F4] transition-colors font-semibold text-lg">
                        <ShoppingCart size={20} />
                        Viziteaza Magazinul Online
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#2C3538] text-white py-8 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="text-2xl font-serif mb-2">
                        <span className="font-light">eco</span>
                        <span className="text-[#C19A6B] font-semibold"> ITALIA</span>
                    </div>
                    <p className="text-white/70 text-sm">
                        © {new Date().getFullYear()} EcoItalia. Toate drepturile rezervate.
                    </p>
                </div>
            </footer>
        </div>
    );
}