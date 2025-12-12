import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function LocationCTA() {
    return (
        <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-[#1C4E80] to-[#153d66] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-3 md:mb-6">
        Livrare Gratuita in Orasul Tau
    </h2>

    {/* Subheading */}
    <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 px-4">
        Comanda astazi si primesti produsele maine la usa ta
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
    <Link
        href="/produse"
    className="bg-white text-[#1C4E80] px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#F8F7F4] transition-all font-semibold text-base md:text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group active:scale-95"
    >
    <MapPin size={20} />
    <span>Brasov - Comanda Acum</span>
    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
    href="/produse"
    className="bg-white text-[#1C4E80] px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-[#F8F7F4] transition-all font-semibold text-base md:text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group active:scale-95"
    >
    <MapPin size={20} />
    <span>Focsani - Comanda Acum</span>
    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        </div>

    {/* Additional Info */}
    <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-6 md:gap-8 text-white/80 text-xs md:text-sm">
    <div className="flex items-center gap-2">
    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Livrare in 24h</span>
    </div>
    <div className="flex items-center gap-2">
    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Fara cost transport</span>
    </div>
    <div className="flex items-center gap-2">
    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Plata la livrare</span>
    </div>
    </div>
    </div>
    </section>
);
}