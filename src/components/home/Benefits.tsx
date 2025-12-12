import { Store, Truck, CheckCircle, Star, Shield, Heart } from 'lucide-react';

const benefits = [
    {
        icon: Store,
        title: 'Showroom Fizic',
        description: 'Testeaza produsele inainte sa cumperi',
        color: 'text-[#1C4E80] bg-[#1C4E80]/10'
    },
    {
        icon: Truck,
        title: 'Livrare Gratuita',
        description: '24h in Brasov si Focsani',
        color: 'text-[#6B9F5E] bg-[#6B9F5E]/10'
    },
    {
        icon: Shield,
        title: 'Produse Originale',
        description: '100% autentice si certificate',
        color: 'text-[#C19A6B] bg-[#C19A6B]/10'
    },
    {
        icon: Heart,
        title: 'Consultanta',
        description: 'Te ajutam sa alegi cel mai bun produs',
        color: 'text-[#1C4E80] bg-[#1C4E80]/10'
    },
];

export default function Benefits() {
    return (
        <section id="benefits" className="py-12 md:py-20 px-4 bg-gradient-to-b from-[#F8F7F4] to-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1C4E80] mb-3 md:mb-4">
                        De Ce Sa Alegi EcoItalia
                    </h2>
                    <p className="text-base md:text-lg text-[#7C8B96] max-w-2xl mx-auto px-4">
                        Experienta de cumparaturi premium pentru casa ta
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="text-center p-6 md:p-8 rounded-xl hover:bg-white hover:shadow-xl transition-all group cursor-default"
                            >
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full ${benefit.color} mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                                    <Icon size={28} className="md:w-8 md:h-8" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg md:text-xl font-bold text-[#2C3538] mb-2 md:mb-3">
                                    {benefit.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm md:text-base text-[#7C8B96] leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Trust Stats */}
                <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {[
                        { value: '500+', label: 'Clienti Multumiti' },
                        { value: '2000+', label: 'Produse Livrate' },
                        { value: '100%', label: 'Produse Originale' },
                        { value: '24h', label: 'Livrare Rapida' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl md:text-4xl font-bold text-[#1C4E80] mb-1 md:mb-2">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-[#7C8B96] font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}