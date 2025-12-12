'use client'

import React from 'react';
import { ShoppingCart, Building2, Users, Truck, Briefcase, CheckCircle, Mail, Phone, FileText, Package, Clock, TrendingUp, Award, Handshake } from 'lucide-react';

const SITE_CONFIG = {
    name: "EcoItalia",
    phone: "0739 77 88 77",
    email: "contact@ecoitalia.ro",
    shopUrl: "https://ecoitalia.ro/magazin",
    b2bSectors: [
        {
            icon: Building2,
            title: "HORECA",
            subtitle: "Hoteluri, Restaurante, Cafenele",
            description: "Solutii complete pentru industria ospitalitatii: detergenti profesionali, produse de igienizare, solutii de curatare pentru bucatarii comerciale si spatii publice.",
            benefits: [
                "Preturi speciale pentru cantitati mari",
                "Livrari programate si recurente",
                "Consultanta specializata pentru alegerea produselor",
                "Produse certificate HACCP",
                "Suport tehnic permanent"
            ],
            products: [
                "Detergenti profesionali concentrati",
                "Produse de igienizare si dezinfectare",
                "Solutii curatare bucatarii industriale",
                "Produse pentru curatare textile hoteliere"
            ]
        },
        {
            icon: Truck,
            title: "Spalatorii Auto",
            subtitle: "Produse Profesionale de Curatare",
            description: "Detergenti concentrati, ceara auto, solutii pentru curatare interioare si exterioare. Produse eficiente care protejeaza caroseria si interiorul vehiculelor.",
            benefits: [
                "Produse concentrate - eficienta maxima",
                "Stoc permanent disponibil",
                "Suport tehnic pentru dozare",
                "Raport calitate-pret excelent",
                "Livrare rapida"
            ],
            products: [
                "Sampon auto concentrat",
                "Ceara si polish",
                "Curatare tapiterie si interior",
                "Produse pentru jante si anvelope"
            ]
        },
        {
            icon: Users,
            title: "Firme de Curatenie",
            subtitle: "Solutii Complete pentru Servicii",
            description: "Gama completa de detergenti profesionali, echipamente si consumabile pentru firme de curatenie. Parteneriate pe termen lung cu conditii avantajoase.",
            benefits: [
                "Discount-uri progresive pentru parteneri",
                "Livrare rapida si flexibila",
                "Facturare cu termene avantajoase",
                "Produse eficiente si economice",
                "Training pentru utilizare optima"
            ],
            products: [
                "Detergenti universali si specializati",
                "Produse pentru curatare podele",
                "Solutii pentru geamuri si oglinzi",
                "Dezinfectanti si igienizanti"
            ]
        },
        {
            icon: Briefcase,
            title: "Institutii Publice",
            subtitle: "Comenzi prin SEAP",
            description: "Suntem inregistrati in Sistemul Electronic de Achizitii Publice. Oferim solutii complete pentru scoli, spitale, primarii si alte institutii publice.",
            benefits: [
                "Oferte personalizate pentru licitatii SEAP",
                "Produse certificate conform standarde UE",
                "Livrari contractuale programate",
                "Suport complet pentru documentatie",
                "Experienta in achizitii publice"
            ],
            products: [
                "Detergenti pentru spatii publice",
                "Produse de igienizare medicala",
                "Solutii pentru scoli si gradinite",
                "Consumabile de curatenie"
            ]
        }
    ]
};

export default function ColaborariPage() {
    const [selectedSector, setSelectedSector] = React.useState(0);

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
                            <a href="/branduri" className="text-[#2C3538] hover:text-[#1C4E80] transition-colors">Branduri</a>
                            <a href="/colaborari" className="text-[#1C4E80] font-semibold">Colaborari B2B</a>
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
                            Colaborari Profesionale
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            Partener pentru Afacerea Ta
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Solutii complete si personalizate pentru HORECA, firme de curatenie, spalatorii auto si institutii publice.
                            Experienta, calitate si preturi competitive.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Partner With Us */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
                            De Ce Sa Colaboram?
                        </h2>
                        <p className="text-lg text-[#7C8B96] max-w-2xl mx-auto">
                            Suntem mai mult decat un furnizor - suntem partenerul tau de incredere
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <TrendingUp size={32} />,
                                title: "Preturi Competitive",
                                desc: "Conditii speciale pentru parteneri si discount-uri progresive"
                            },
                            {
                                icon: <Package size={32} />,
                                title: "Stoc Permanent",
                                desc: "Garantam disponibilitatea produselor si livrari la timp"
                            },
                            {
                                icon: <Award size={32} />,
                                title: "Calitate Garantata",
                                desc: "Produse certificate, conforme cu standardele UE"
                            },
                            {
                                icon: <Handshake size={32} />,
                                title: "Relatii Durabile",
                                desc: "Parteneriate pe termen lung, suport dedicat"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#F8F7F4] p-8 rounded-xl hover:shadow-xl transition-all text-center group hover:bg-white">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1C4E80]/10 text-[#1C4E80] mb-4 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-[#2C3538] mb-2">{item.title}</h3>
                                <p className="text-[#7C8B96]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sectors Tabs */}
            <section className="py-20 px-4 bg-[#F8F7F4]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
                            Solutii pe Domenii
                        </h2>
                        <p className="text-lg text-[#7C8B96] max-w-2xl mx-auto">
                            Oferte personalizate pentru fiecare industrie
                        </p>
                    </div>

                    {/* Sector Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {SITE_CONFIG.b2bSectors.map((sector, i) => {
                            const Icon = sector.icon;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setSelectedSector(i)}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-lg font-semibold transition-all ${
                                        selectedSector === i
                                            ? 'bg-[#1C4E80] text-white shadow-lg scale-105'
                                            : 'bg-white text-[#2C3538] hover:bg-[#1C4E80]/10'
                                    }`}
                                >
                                    <Icon size={24} />
                                    <span>{sector.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected Sector Details */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Left - Info */}
                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    {React.createElement(SITE_CONFIG.b2bSectors[selectedSector].icon, {
                                        size: 48,
                                        className: "text-[#1C4E80]"
                                    })}
                                    <div>
                                        <h3 className="text-3xl font-serif font-bold text-[#1C4E80]">
                                            {SITE_CONFIG.b2bSectors[selectedSector].title}
                                        </h3>
                                        <p className="text-[#7C8B96]">{SITE_CONFIG.b2bSectors[selectedSector].subtitle}</p>
                                    </div>
                                </div>

                                <p className="text-[#2C3538] text-lg mb-8 leading-relaxed">
                                    {SITE_CONFIG.b2bSectors[selectedSector].description}
                                </p>

                                <h4 className="text-xl font-semibold text-[#1C4E80] mb-4">Avantaje Colaborare:</h4>
                                <div className="space-y-3 mb-8">
                                    {SITE_CONFIG.b2bSectors[selectedSector].benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={20} />
                                            <span className="text-[#2C3538]">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                <a href={`mailto:${SITE_CONFIG.email}?subject=Cerere Oferta ${SITE_CONFIG.b2bSectors[selectedSector].title}`} className="inline-flex items-center gap-2 bg-[#1C4E80] text-white px-6 py-3 rounded-lg hover:bg-[#153d66] transition-all font-medium">
                                    <Mail size={20} />
                                    Solicita Oferta
                                </a>
                            </div>

                            {/* Right - Products */}
                            <div className="bg-gradient-to-br from-[#F8F7F4] to-[#C19A6B]/5 p-8 md:p-12">
                                <h4 className="text-2xl font-semibold text-[#1C4E80] mb-6 flex items-center gap-2">
                                    <Package size={24} />
                                    Produse Disponibile
                                </h4>
                                <div className="space-y-4">
                                    {SITE_CONFIG.b2bSectors[selectedSector].products.map((product, i) => (
                                        <div key={i} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border-l-4 border-[#C19A6B]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-[#6B9F5E] rounded-full"></div>
                                                <span className="text-[#2C3538] font-medium">{product}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-[#C19A6B]/30">
                                    <h5 className="font-semibold text-[#1C4E80] mb-3">Garantii si Suport:</h5>
                                    <ul className="space-y-2 text-sm text-[#7C8B96]">
                                        <li className="flex items-center gap-2">
                                            <Clock size={16} className="text-[#6B9F5E]" />
                                            Livrare in 24-48h in Brasov si Focsani
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Phone size={16} className="text-[#6B9F5E]" />
                                            Suport telefonic dedicat
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <FileText size={16} className="text-[#6B9F5E]" />
                                            Documentatie completa pentru produse
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEAP Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-br from-[#1C4E80] to-[#1C4E80]/90 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C19A6B]/20 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                                        <FileText size={16} />
                                        Achizitii Publice
                                    </div>
                                    <h2 className="text-4xl font-serif font-bold mb-6">
                                        Comenzi prin SEAP
                                    </h2>
                                    <p className="text-xl text-white/90 mb-6 leading-relaxed">
                                        Suntem inregistrati in Sistemul Electronic de Achizitii Publice si oferim solutii complete
                                        pentru institutii publice, scoli, spitale si primarii.
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={24} />
                                            <div>
                                                <p className="font-semibold mb-1">Experienta in Licitatii Publice</p>
                                                <p className="text-white/80 text-sm">Expertiza in participarea la licitatii SEAP</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={24} />
                                            <div>
                                                <p className="font-semibold mb-1">Produse Certificate</p>
                                                <p className="text-white/80 text-sm">Conforme cu standardele UE si legislatia romana</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={24} />
                                            <div>
                                                <p className="font-semibold mb-1">Documentatie Completa</p>
                                                <p className="text-white/80 text-sm">Suport pentru intocmirea caietului de sarcini</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={24} />
                                            <div>
                                                <p className="font-semibold mb-1">Livrari Contractuale</p>
                                                <p className="text-white/80 text-sm">Respectam toate termenele si conditiile contractuale</p>
                                            </div>
                                        </div>
                                    </div>

                                    <a href={`mailto:${SITE_CONFIG.email}?subject=Cerere Informare SEAP`} className="inline-flex items-center gap-2 bg-white text-[#1C4E80] px-8 py-4 rounded-lg hover:bg-[#F8F7F4] transition-all font-semibold text-lg">
                                        <Mail size={20} />
                                        Solicita Oferta SEAP
                                    </a>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                                    <h3 className="text-2xl font-semibold mb-6">Institutii Deservite</h3>
                                    <div className="space-y-4">
                                        {[
                                            { icon: "🏫", title: "Scoli si Gradinite", desc: "Produse sigure pentru copii" },
                                            { icon: "🏥", title: "Spitale si Clinici", desc: "Dezinfectanti medicali" },
                                            { icon: "🏛️", title: "Primarii si Institutii", desc: "Curatenie spatii publice" },
                                            { icon: "📚", title: "Universitati", desc: "Solutii pentru campus" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
                                                <div className="text-3xl">{item.icon}</div>
                                                <div>
                                                    <p className="font-semibold">{item.title}</p>
                                                    <p className="text-sm text-white/80">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 px-4 bg-[#C19A6B]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                        Hai Sa Discutam despre Colaborare
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Echipa noastra este gata sa creeze o oferta personalizata pentru afacerea ta
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center justify-center gap-2 bg-white text-[#C19A6B] px-8 py-4 rounded-lg hover:bg-[#F8F7F4] transition-colors font-semibold text-lg">
                            <Mail size={20} />
                            Trimite Email
                        </a>
                        <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center justify-center gap-2 bg-[#1C4E80] text-white px-8 py-4 rounded-lg hover:bg-[#153d66] transition-colors font-semibold text-lg">
                            <Phone size={20} />
                            Suna Acum
                        </a>
                    </div>
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
                        © {new Date().getFullYear()} EcoItalia. Partenerul tau de incredere.
                    </p>
                </div>
            </footer>
        </div>
    );
}