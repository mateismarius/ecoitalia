import React from 'react';
import { ShoppingCart, MapPin, Phone, Mail, Clock, Navigation, Store, CheckCircle, Truck, Heart, Star } from 'lucide-react';

const SITE_CONFIG = {
    name: "EcoItalia",
    phone: "0739 77 88 77",
    email: "contact@ecoitalia.ro",
    shopUrl: "https://ecoitalia.ro/magazin",
    locations: [
        {
            city: "Brasov",
            address: "Str. Republican nr. 43",
            fullAddress: "Strada Republican, nr. 43, Brasov, Judetul Brasov",
            hours: "Luni - Vineri: 9:00 - 18:00\nSambata: 9:00 - 14:00\nDuminica: Inchis",
            phone: "0739 77 88 77",
            email: "brasov@ecoitalia.ro",
            mapUrl: "https://maps.google.com/?q=Brasov+Republican+43",
            features: [
                "Showroom complet cu toate produsele",
                "Testare produse inainte de cumparare",
                "Consultanta specializata",
                "Parcare gratuita",
                "Livrare gratuita in Brasov"
            ],
            image: "/locations/brasov.jpg"
        },
        {
            city: "Focsani",
            address: "Piata Moldovei",
            fullAddress: "Piata Moldovei, langa frizeria Sporul, vis-a-vis de fosta pescarie Pescarusul, Focsani, Judetul Vrancea",
            hours: "Luni - Vineri: 9:00 - 18:00\nSambata: 9:00 - 14:00\nDuminica: Inchis",
            phone: "0739 77 88 77",
            email: "focsani@ecoitalia.ro",
            mapUrl: "https://maps.google.com/?q=Focsani+Piata+Moldovei",
            features: [
                "Magazin Freebubbles - detergenti la robinet",
                "Concept ecologic si sustenabil",
                "Aduci recipientul tau si umplem produsul",
                "Consultanta pentru alegerea produselor",
                "Livrare gratuita in Focsani"
            ],
            image: "/locations/focsani.jpg"
        }
    ]
};

export default function MagazinePage() {
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
    <a href="/magazine" className="text-[#1C4E80] font-semibold">Magazine</a>
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
        Viziteaza-ne
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
        Magazinele Noastre
    </h1>
    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
        Vino sa testezi produsele inainte sa cumperi. Te asteptam in showroom-urile noastre
    din Brasov si Focsani cu consultanta specializata.
    </p>
    </div>
    </div>
    </section>

    {/* Locations */}
    <section className="py-20 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12">
        {SITE_CONFIG.locations.map((location, i) => (
                <div key={i} className="bg-gradient-to-br from-[#F8F7F4] to-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#C19A6B]/30 hover:shadow-2xl transition-all">
                {/* Location Header */}
                <div className="bg-gradient-to-br from-[#1C4E80] to-[#1C4E80]/90 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Store size={32} />
    </div>
    <div>
    <h2 className="text-3xl font-serif font-bold">Magazin {location.city}</h2>
    <p className="text-white/80">EcoItalia Showroom</p>
    </div>
    </div>
    <div className="flex items-start gap-3 text-white/90">
    <MapPin size={20} className="flex-shrink-0 mt-1" />
    <div>
        <p className="font-semibold">{location.address}</p>
        <p className="text-sm text-white/70">{location.fullAddress}</p>
        </div>
        </div>
        </div>

    {/* Location Details */}
    <div className="p-8">
        {/* Contact Info */}
        <div className="mb-8">
    <h3 className="text-xl font-semibold text-[#1C4E80] mb-4">Contact</h3>
        <div className="space-y-3">
    <a href={`tel:${location.phone}`} className="flex items-center gap-3 text-[#2C3538] hover:text-[#1C4E80] transition-colors group">
    <div className="w-10 h-10 bg-[#6B9F5E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#6B9F5E]/20 transition-colors">
    <Phone size={18} className="text-[#6B9F5E]" />
        </div>
        <span>{location.phone}</span>
        </a>
        <a href={`mailto:${location.email}`} className="flex items-center gap-3 text-[#2C3538] hover:text-[#1C4E80] transition-colors group">
    <div className="w-10 h-10 bg-[#C19A6B]/10 rounded-lg flex items-center justify-center group-hover:bg-[#C19A6B]/20 transition-colors">
    <Mail size={18} className="text-[#C19A6B]" />
        </div>
        <span>{location.email}</span>
        </a>
        </div>
        </div>

    {/* Hours */}
    <div className="mb-8">
    <h3 className="text-xl font-semibold text-[#1C4E80] mb-4 flex items-center gap-2">
    <Clock size={20} />
    Program
    </h3>
    <div className="bg-white p-4 rounded-lg border border-[#C19A6B]/20">
    <div className="space-y-2 text-[#2C3538]">
        {location.hours.split('\n').map((line, j) => (
                <p key={j} className="flex justify-between">
            <span className="font-medium">{line.split(':')[0]}:</span>
    <span className="text-[#7C8B96]">{line.split(':').slice(1).join(':')}</span>
        </p>
))}
    </div>
    </div>
    </div>

    {/* Features */}
    <div className="mb-8">
    <h3 className="text-xl font-semibold text-[#1C4E80] mb-4">Ce gasesti aici:</h3>
    <div className="space-y-3">
        {location.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3">
            <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={20} />
    <span className="text-[#2C3538]">{feature}</span>
        </div>
))}
    </div>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-3">
    <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#1C4E80] text-white px-6 py-3 rounded-lg hover:bg-[#153d66] transition-all font-medium text-center flex items-center justify-center gap-2">
    <Navigation size={18} />
    Navigheaza
    </a>
    <a href={`tel:${location.phone}`} className="flex-1 border-2 border-[#C19A6B] text-[#C19A6B] px-6 py-3 rounded-lg hover:bg-[#C19A6B] hover:text-white transition-all font-medium text-center flex items-center justify-center gap-2">
    <Phone size={18} />
    Suna
    </a>
    </div>
    </div>
    </div>
))}
    </div>
    </div>
    </section>

    {/* Why Visit Us */}
    <section className="py-20 px-4 bg-[#F8F7F4]">
    <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12">
    <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
        De Ce Sa Ne Vizitezi?
        </h2>
        <p className="text-lg text-[#7C8B96] max-w-2xl mx-auto">
            Mai mult decat un magazin - o experienta completa
    </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
                {
                    icon: <Store size={32} />,
            title: "Showroom Complet",
            desc: "Vezi si testeaza toate produsele disponibile"
        },
        {
            icon: <Heart size={32} />,
    title: "Consultanta Gratuita",
        desc: "Specialistii nostri te ajuta sa alegi produsul potrivit"
},
    {
        icon: <Truck size={32} />,
        title: "Livrare Gratuita",
            desc: "Cumperi din magazin, livram acasa gratuit"
    },
    {
        icon: <Star size={32} />,
        title: "Preturi Showroom",
            desc: "Aceleasi preturi ca in magazinul online"
    }
].map((item, i) => (
        <div key={i} className="bg-white p-8 rounded-xl hover:shadow-xl transition-all text-center group">
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

    {/* Freebubbles Concept in Focsani */}
    <section className="py-20 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
    <div className="bg-gradient-to-br from-[#6B9F5E]/10 to-[#1C4E80]/5 rounded-3xl p-8 md:p-12 border-2 border-[#6B9F5E]/30">
    <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
        <div className="inline-block bg-[#6B9F5E] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
        Concept Ecologic
    </div>
    <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
        Freebubbles in Focsani
        </h2>
        <h3 className="text-2xl font-semibold text-[#C19A6B] mb-6">
        Detergenti la Robinet
    </h3>
    <p className="text-[#2C3538] text-lg mb-6 leading-relaxed">
        Magazinul nostru din Focsani foloseste conceptul revolutionar Freebubbles:
        aduci recipientul tau, il umplem cu detergent si platesti doar produsul, nu si ambalajul!
    </p>

    <div className="space-y-4 mb-8">
    <div className="flex items-start gap-3">
    <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={24} />
    <div>
    <p className="font-semibold text-[#2C3538]">Zero risipa de plastic</p>
    <p className="text-[#7C8B96] text-sm">Reutilizeaza recipientele tale</p>
    </div>
    </div>
    <div className="flex items-start gap-3">
    <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={24} />
    <div>
    <p className="font-semibold text-[#2C3538]">Preturi mai mici</p>
    <p className="text-[#7C8B96] text-sm">Platesti doar continutul, nu ambalajul</p>
    </div>
    </div>
    <div className="flex items-start gap-3">
    <CheckCircle className="text-[#6B9F5E] flex-shrink-0 mt-1" size={24} />
    <div>
    <p className="font-semibold text-[#2C3538]">90% biodegradabil</p>
        <p className="text-[#7C8B96] text-sm">Protejezi mediul cu fiecare cumparatura</p>
    </div>
    </div>
    </div>

    <a href="https://freebubbles.ro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1C4E80] text-white px-6 py-3 rounded-lg hover:bg-[#153d66] transition-all font-medium">
        Afla mai multe despre Freebubbles
    <span className="text-xl">→</span>
    </a>
    </div>

    <div className="bg-white rounded-2xl p-8 shadow-xl">
    <h4 className="text-xl font-semibold text-[#1C4E80] mb-6 text-center">Cum functioneaza?</h4>
        <div className="space-y-6">
    <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-[#1C4E80] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
    1
    </div>
    <div>
    <p className="font-semibold text-[#2C3538] mb-1">Alegi produsul</p>
    <p className="text-sm text-[#7C8B96]">Din gama completa Freebubbles</p>
    </div>
    </div>
    <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-[#C19A6B] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
    2
    </div>
    <div>
    <p className="font-semibold text-[#2C3538] mb-1">Aduci recipientul</p>
    <p className="text-sm text-[#7C8B96]">Sau primesti unul gratuit de la noi</p>
    </div>
    </div>
    <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-[#6B9F5E] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
    3
    </div>
    <div>
    <p className="font-semibold text-[#2C3538] mb-1">Umplem la robinet</p>
    <p className="text-sm text-[#7C8B96]">Cantitatea exacta de care ai nevoie</p>
    </div>
    </div>
    <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-[#1C4E80] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
    4
    </div>
    <div>
    <p className="font-semibold text-[#2C3538] mb-1">Platesti si pleci</p>
    <p className="text-sm text-[#7C8B96]">Simplu, rapid, ecologic!</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>

    {/* Online + Offline */}
    <section className="py-20 px-4 bg-[#F8F7F4]">
    <div className="max-w-5xl mx-auto">
    <div className="text-center mb-12">
    <h2 className="text-4xl font-serif font-bold text-[#1C4E80] mb-4">
        Comanda Online sau Viziteaza Magazinul
    </h2>
    <p className="text-lg text-[#7C8B96]">
        Iti oferim flexibilitatea de a alege cum preferi sa cumperi
    </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
    <div className="bg-white p-8 rounded-xl shadow-lg">
    <div className="w-16 h-16 bg-[#1C4E80]/10 rounded-xl flex items-center justify-center mb-6">
    <ShoppingCart size={32} className="text-[#1C4E80]" />
        </div>
        <h3 className="text-2xl font-semibold text-[#1C4E80] mb-4">Magazin Online</h3>
    <ul className="space-y-3 mb-6 text-[#2C3538]">
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Comanda oricand, 24/7
    </li>
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Livrare gratuita in Brasov si Focsani
    </li>
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Plata online sau ramburs
    </li>
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Livrare in 24-48h
    </li>
    </ul>
    <a href={SITE_CONFIG.shopUrl} className="block bg-[#1C4E80] text-white px-6 py-3 rounded-lg hover:bg-[#153d66] transition-all font-medium text-center">
        Acceseaza Magazinul Online
    </a>
    </div>

    <div className="bg-white p-8 rounded-xl shadow-lg">
    <div className="w-16 h-16 bg-[#C19A6B]/10 rounded-xl flex items-center justify-center mb-6">
    <Store size={32} className="text-[#C19A6B]" />
        </div>
        <h3 className="text-2xl font-semibold text-[#1C4E80] mb-4">Magazin Fizic</h3>
    <ul className="space-y-3 mb-6 text-[#2C3538]">
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Vezi si testeaza produsele
    </li>
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Consultanta fata in fata
    </li>
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Iei produsul acasa imediat
    </li>
    <li className="flex items-center gap-2">
    <CheckCircle size={18} className="text-[#6B9F5E]" />
        Detergenti la robinet (Focsani)
    </li>
    </ul>
    <a href="#magazine" className="block border-2 border-[#C19A6B] text-[#C19A6B] px-6 py-3 rounded-lg hover:bg-[#C19A6B] hover:text-white transition-all font-medium text-center">
        Vezi Adresele Magazinelor
    </a>
    </div>
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
            © {new Date().getFullYear()} EcoItalia. Te asteptam in showroom-urile noastre!
    </p>
    </div>
    </footer>
    </div>
);
}