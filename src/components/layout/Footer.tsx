import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#2C3538] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div>
                        <div className="text-2xl font-serif mb-3">
                            <span className="font-light">eco</span>
                            <span className="text-[#C19A6B] font-semibold"> ITALIA</span>
                        </div>
                        <p className="text-white/70 text-sm mb-4">
                            Branduri premium din Europa pentru casa ta
                        </p>
                        <div className="flex gap-3">
                            {/* Social Links - placeholder */}
                            <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Facebook">

                            <span className="text-sm">f</span>
                        </a>
                        <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        aria-label="Instagram">
                        <span className="text-sm">ig</span>
                    </a>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h4 className="font-semibold text-lg mb-4">Link-uri Rapide</h4>
                <nav className="space-y-2">
                    {[
                        { href: '/produse', label: 'Toate Produsele' },
                        { href: '/marci', label: 'Branduri' },
                        { href: '/oferte', label: 'Oferte Speciale' },
                        { href: '/despre', label: 'Despre Noi' },
                        { href: '/contact', label: 'Contact' },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block text-white/70 hover:text-white transition-colors text-sm"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Magazine */}
            <div>
                <h4 className="font-semibold text-lg mb-4">Magazine Fizice</h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-start gap-2 mb-2">
                            <MapPin size={18} className="text-[#C19A6B] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Brasov</p>
                                <p className="text-white/70 text-sm">
                                    Showroom Produse Premium
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start gap-2">
                            <MapPin size={18} className="text-[#C19A6B] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Focsani</p>
                                <p className="text-white/70 text-sm">
                                    Distribuitor Oficial FreeBubbles
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div>
                <h4 className="font-semibold text-lg mb-4">Contact</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Mail size={18} className="text-[#C19A6B] flex-shrink-0" />
                        <a
                        href="mailto:contact@ecoitalia.ro"
                        className="text-white/70 hover:text-white transition-colors text-sm"
                        >
                        contact@ecoitalia.ro
                    </a>
                </div>
                <div className="flex items-start gap-2">
                    <Clock size={18} className="text-[#C19A6B] flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="text-white/70">L-V: 9:00 - 18:00</p>
                        <p className="text-white/70">S: 9:00 - 14:00</p>
                    </div>
                </div>
            </div>
        </div>
</div>

    {/* Bottom Bar */}
    <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>
                © {new Date().getFullYear()} EcoItalia. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6">
                <Link href="/termeni" className="hover:text-white transition-colors">
                    Termeni si Conditii
                </Link>
                <Link href="/confidentialitate" className="hover:text-white transition-colors">
                    Confidentialitate
                </Link>
            </div>
        </div>
    </div>
</div>
</footer>
);
}