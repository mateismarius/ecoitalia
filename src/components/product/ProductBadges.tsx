import { Truck, Shield, Heart, Award, RotateCcw, CreditCard } from 'lucide-react';

export default function ProductBadges() {
    const badges = [
        {
            icon: Truck,
            title: 'Livrare Rapida',
            description: '24-48h in toata tara',
            color: 'text-[#6B9F5E] bg-[#6B9F5E]/10',
        },
        {
            icon: Shield,
            title: 'Produse Originale',
            description: '100% autentice',
            color: 'text-[#1C4E80] bg-[#1C4E80]/10',
        },
        {
            icon: RotateCcw,
            title: 'Retur Facil',
            description: '14 zile garantie',
            color: 'text-[#C19A6B] bg-[#C19A6B]/10',
        },
        {
            icon: CreditCard,
            title: 'Plata Securizata',
            description: 'Card sau ramburs',
            color: 'text-[#7C8B96] bg-[#7C8B96]/10',
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
            {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                    <div key={index} className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${badge.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#2C3538] leading-tight">
                                {badge.title}
                            </p>
                            <p className="text-xs text-[#7C8B96] mt-0.5">
                                {badge.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}