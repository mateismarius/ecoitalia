'use client'


import React from 'react';
import { ShoppingCart, MapPin, Phone, Mail, Clock, Send, MessageSquare, User, Building2, FileText } from 'lucide-react';

const SITE_CONFIG = {
    name: "EcoItalia",
    phone: "0739 77 88 77",
    email: "contact@ecoitalia.ro",
    shopUrl: "https://ecoitalia.ro/magazin",
    locations: [
        {
            city: "Brasov",
            address: "Str. Republican nr. 43",
            phone: "0739 77 88 77",
            email: "brasov@ecoitalia.ro",
            hours: "L-V: 9:00-18:00, S: 9:00-14:00"
        },
        {
            city: "Focsani",
            address: "Piata Moldovei, langa frizeria Sporul",
            phone: "0739 77 88 77",
            email: "focsani@ecoitalia.ro",
            hours: "L-V: 9:00-18:00, S: 9:00-14:00"
        }
    ]
};

export default function ContactPage() {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In productie, aici ar fi logica de trimitere a formularului
        const mailtoLink = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Nume: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nMesaj:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                            <a href="/colaborari" className="text-[#2C3538] hover:text-[#1C4E80] transition-colors">Colaborari B2B</a>
                            <a href="/magazine" className="text-[#2C3538] hover:text-[#1C4E80] transition-colors">Magazine</a>
                            <a href="/contact" className="text-[#1C4E80] font-semibold">Contact</a>
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
                            Contacteaza-ne
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                            Suntem Aici Pentru Tine
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Ai intrebari despre produse, comenzi sau colaborari? Echipa noastra este gata sa te ajute.
                            Contacteaza-ne telefonic, prin email sau viziteaza-ne in magazin.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <a href={`tel:${SITE_CONFIG.phone}`} className="bg-gradient-to-br from-[#F8F7F4] to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#1C4E80] group text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1C4E80]/10 text-[#1C4E80] mb-4 group-hover:scale-110 transition-transform">
                                <Phone size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1C4E80] mb-2">Telefon</h3>
                            <p className="text-2xl font-bold text-[#2C3538] mb-2">{SITE_CONFIG.phone}</p>
                            <p className="text-sm text-[#7C8B96]">L-V: 9:00 - 18:00</p>
                        </a>

                        <a href={`mailto:${SITE_CONFIG.email}`} className="bg-gradient-to-br from-[#F8F7F4] to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#C19A6B] group text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C19A6B]/10 text-[#C19A6B] mb-4 group-hover:scale-110 transition-transform">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1C4E80] mb-2">Email</h3>
                            <p className="text-lg font-semibold text-[#2C3538] mb-2">{SITE_CONFIG.email}</p>
                            <p className="text-sm text-[#7C8B96]">Raspundem in 24h</p>
                        </a>

                        <div className="bg-gradient-to-br from-[#F8F7F4] to-white p-8 rounded-xl shadow-lg border-2 border-transparent text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6B9F5E]/10 text-[#6B9F5E] mb-4">
                                <MessageSquare size={32} />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1C4E80] mb-2">Chat Online</h3>
                            <p className="text-lg font-semibold text-[#2C3538] mb-2">WhatsApp / Messenger</p>
                            <p className="text-sm text-[#7C8B96]">Raspuns rapid</p>
                        </div>
                    </div>

                    {/* Contact Form & Info Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Form - 2 columns */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-[#F8F7F4] to-white p-8 rounded-2xl shadow-xl border-2 border-[#C19A6B]/30">
                                <h2 className="text-3xl font-serif font-bold text-[#1C4E80] mb-6">
                                    Trimite-ne un Mesaj
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#2C3538] mb-2">
                                                Nume Complet *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8B96]" size={20} />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-11 pr-4 py-3 border-2 border-[#C19A6B]/20 rounded-lg focus:border-[#1C4E80] focus:outline-none transition-colors"
                                                    placeholder="Ion Popescu"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#2C3538] mb-2">
                                                Email *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8B96]" size={20} />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-11 pr-4 py-3 border-2 border-[#C19A6B]/20 rounded-lg focus:border-[#1C4E80] focus:outline-none transition-colors"
                                                    placeholder="ion@example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#2C3538] mb-2">
                                                Telefon
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8B96]" size={20} />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full pl-11 pr-4 py-3 border-2 border-[#C19A6B]/20 rounded-lg focus:border-[#1C4E80] focus:outline-none transition-colors"
                                                    placeholder="0712 345 678"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#2C3538] mb-2">
                                                Subiect *
                                            </label>
                                            <div className="relative">
                                                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8B96]" size={20} />
                                                <select
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-11 pr-4 py-3 border-2 border-[#C19A6B]/20 rounded-lg focus:border-[#1C4E80] focus:outline-none transition-colors appearance-none bg-white"
                                                >
                                                    <option value="general">Intrebare Generala</option>
                                                    <option value="comanda">Intrebare despre Comanda</option>
                                                    <option value="produse">Informatii Produse</option>
                                                    <option value="colaborare">Oferta Colaborare B2B</option>
                                                    <option value="seap">Achizitie SEAP</option>
                                                    <option value="reclamatie">Reclamatie</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#2C3538] mb-2">
                                            Mesaj *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border-2 border-[#C19A6B]/20 rounded-lg focus:border-[#1C4E80] focus:outline-none transition-colors resize-none"
                                            placeholder="Scrie-ne mesajul tau aici..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#1C4E80] text-white px-8 py-4 rounded-lg hover:bg-[#153d66] transition-all font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    >
                                        <Send size={20} />
                                        Trimite Mesajul
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Locations Info - 1 column */}
                        <div className="space-y-6">
                            {/* Quick Info */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#C19A6B]/20">
                                <h3 className="text-xl font-semibold text-[#1C4E80] mb-4">Informatii Rapide</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-[#2C3538] mb-1">Livrare Gratuita:</p>
                                        <p className="text-[#7C8B96]">Brasov si Focsani</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#2C3538] mb-1">Timp Livrare:</p>
                                        <p className="text-[#7C8B96]">24-48 ore</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#2C3538] mb-1">Program Comenzi:</p>
                                        <p className="text-[#7C8B96]">Non-stop online</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#2C3538] mb-1">Colaborari B2B:</p>
                                        <p className="text-[#7C8B96]">Oferte personalizate</p>
                                    </div>
                                </div>
                            </div>

                            {/* Locations */}
                            {SITE_CONFIG.locations.map((location, i) => (
                                <div key={i} className="bg-gradient-to-br from-[#1C4E80]/5 to-[#C19A6B]/5 p-6 rounded-xl border-2 border-[#C19A6B]/20">
                                    <h3 className="text-lg font-semibold text-[#1C4E80] mb-3 flex items-center gap-2">
                                        <MapPin size={20} />
                                        Magazin {location.city}
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-[#2C3538]">{location.address}</p>
                                        <div className="flex items-center gap-2 text-[#7C8B96]">
                                            <Clock size={16} />
                                            <span>{location.hours}</span>
                                        </div>
                                        <a href={`tel:${location.phone}`} className="flex items-center gap-2 text-[#1C4E80] hover:text-[#153d66] font-medium">
                                            <Phone size={16} />
                                            <span>{location.phone}</span>
                                        </a>
                                        <a href={`mailto:${location.email}`} className="flex items-center gap-2 text-[#C19A6B] hover:text-[#C19A6B]/80 font-medium">
                                            <Mail size={16} />
                                            <span>{location.email}</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 bg-[#F8F7F4]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
                            Intrebari Frecvente
                        </h2>
                        <p className="text-lg text-[#7C8B96]">
                            Raspunsuri rapide la cele mai comune intrebari
                        </p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Cum pot comanda produse?",
                                a: "Poti comanda online pe site-ul nostru ecoitalia.ro/magazin, telefonic la 0739 77 88 77, sau direct din magazinele noastre fizice din Brasov si Focsani."
                            },
                            {
                                q: "Care este timpul de livrare?",
                                a: "Livram in 24-48 ore in Brasov si Focsani. Pentru alte localitati, timpul de livrare este de 2-5 zile lucratoare."
                            },
                            {
                                q: "Livrarea este gratuita?",
                                a: "Da, livrarea este complet gratuita pentru comenzi in Brasov si Focsani, indiferent de valoarea comenzii."
                            },
                            {
                                q: "Oferiti factura?",
                                a: "Da, emitem factura fiscala pentru toate comenzile. Pentru firme, putem emite factura cu datele companiei."
                            },
                            {
                                q: "Ce metode de plata acceptati?",
                                a: "Acceptam plata online cu cardul, transfer bancar, ramburs la livrare, sau plata cash/card in magazinele fizice."
                            },
                            {
                                q: "Pot returna produsele?",
                                a: "Da, conform legislatiei, ai dreptul la returnare in 14 zile de la primirea comenzii, daca produsele sunt nesigilate si nefolosite."
                            },
                            {
                                q: "Oferiti oferte pentru firme?",
                                a: "Da, oferim conditii speciale pentru colaborari B2B, comenzi prin SEAP, firme de curatenie, HORECA si spalatorii auto. Contacteaza-ne pentru o oferta personalizata."
                            },
                            {
                                q: "Ce este conceptul Freebubbles?",
                                a: "Freebubbles este un concept ecologic de detergenti la robinet. Aduci recipientul tau, il umplem cu detergent si platesti doar produsul, nu si ambalajul. Disponibil in magazinul din Focsani."
                            }
                        ].map((faq, i) => (
                            <details key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all group">
                                <summary className="font-semibold text-[#1C4E80] cursor-pointer flex items-center justify-between">
                                    <span>{faq.q}</span>
                                    <span className="text-[#C19A6B] group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-4 text-[#7C8B96] leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Business Hours */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-[#1C4E80] to-[#1C4E80]/90 rounded-3xl p-8 md:p-12 text-white">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-serif font-bold mb-4">
                                Program de Lucru
                            </h2>
                            <p className="text-white/90">
                                Suntem aici pentru tine in programul urmator
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                <Clock size={32} className="mx-auto mb-3" />
                                <h3 className="font-semibold text-lg mb-2">Luni - Vineri</h3>
                                <p className="text-2xl font-bold mb-1">9:00 - 18:00</p>
                                <p className="text-sm text-white/70">Program complet</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                <Clock size={32} className="mx-auto mb-3" />
                                <h3 className="font-semibold text-lg mb-2">Sambata</h3>
                                <p className="text-2xl font-bold mb-1">9:00 - 14:00</p>
                                <p className="text-sm text-white/70">Program redus</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                <Clock size={32} className="mx-auto mb-3" />
                                <h3 className="font-semibold text-lg mb-2">Duminica</h3>
                                <p className="text-2xl font-bold mb-1">Inchis</p>
                                <p className="text-sm text-white/70">Magazin online activ</p>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-white/90 mb-4">
                                Comenzile online pot fi plasate oricand, 24/7
                            </p>
                            <a href={SITE_CONFIG.shopUrl} className="inline-flex items-center gap-2 bg-white text-[#1C4E80] px-8 py-3 rounded-lg hover:bg-[#F8F7F4] transition-all font-semibold">
                                <ShoppingCart size={20} />
                                Comanda Online Acum
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-[#C19A6B]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                        Hai Sa Vorbim!
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Echipa noastra este gata sa raspunda la toate intrebarile tale
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center justify-center gap-2 bg-white text-[#C19A6B] px-8 py-4 rounded-lg hover:bg-[#F8F7F4] transition-colors font-semibold text-lg">
                            <Phone size={20} />
                            Suna Acum
                        </a>
                        <a href={`mailto:${SITE_CONFIG.email}`} className="inline-flex items-center justify-center gap-2 bg-[#1C4E80] text-white px-8 py-4 rounded-lg hover:bg-[#153d66] transition-colors font-semibold text-lg">
                            <Mail size={20} />
                            Trimite Email
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#2C3538] text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-serif mb-2">
                                <span className="font-light">eco</span>
                                <span className="text-[#C19A6B] font-semibold"> ITALIA</span>
                            </div>
                            <p className="text-white/70 text-sm">Distribuitor oficial Freebubbles</p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 text-[#C19A6B]">Contact Principal</h4>
                            <p className="text-white/70 text-sm mb-2 flex items-center gap-2">
                                <Phone size={16} />
                                {SITE_CONFIG.phone}
                            </p>
                            <p className="text-white/70 text-sm flex items-center gap-2">
                                <Mail size={16} />
                                {SITE_CONFIG.email}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 text-[#C19A6B]">Magazine</h4>
                            {SITE_CONFIG.locations.map((location, i) => (
                                <p key={i} className="text-white/70 text-sm mb-2">
                                    📍 {location.city} - {location.address}
                                </p>
                            ))}
                        </div>

                        <div>
                            <h4 className="font-semibold mb-3 text-[#C19A6B]">Program</h4>
                            <p className="text-white/70 text-sm">L-V: 9:00 - 18:00</p>
                            <p className="text-white/70 text-sm">S: 9:00 - 14:00</p>
                            <p className="text-white/70 text-sm">D: Inchis</p>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 text-center">
                        <p className="text-white/60 text-sm">
                            © {new Date().getFullYear()} EcoItalia. Toate drepturile rezervate.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}