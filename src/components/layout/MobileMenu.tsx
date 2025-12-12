'use client';

import Link from 'next/link';
import { X, Home, ShoppingBag, Tag, Award, Phone, MapPin, Truck } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    // Prevent body scroll când menu e deschis
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const menuItems = [
        { href: '/', label: 'Acasa', icon: Home },
        { href: '/produse', label: 'Produse', icon: ShoppingBag },
        { href: '/oferte', label: 'Oferte', icon: Tag },
        { href: '/marci', label: 'Branduri', icon: Award },
        { href: '/despre', label: 'Despre Noi', icon: Phone },
        { href: '/contact', label: 'Contact', icon: MapPin },
    ];

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-50 md:hidden"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div>
                            <div className="text-xl font-serif">
                                <span className="text-[#1C4E80] font-light">eco</span>
                                <span className="text-[#C19A6B] font-semibold"> ITALIA</span>
                            </div>
                            <div className="text-xs text-[#7C8B96] tracking-wider">
                                PREMIUM BRANDS
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={24} className="text-[#2C3538]" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center gap-4 px-6 py-4 text-[#2C3538] hover:bg-[#F8F7F4] hover:text-[#1C4E80] transition-colors border-l-4 border-transparent hover:border-[#1C4E80]"
                                >
                                    <Icon size={22} />
                                    <span className="font-medium text-lg">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom CTA */}
                    <div className="p-4 border-t border-gray-100 space-y-3">
                        {/* Livrare Gratuita Badge */}
                        <div className="bg-[#6B9F5E]/10 rounded-lg p-3 flex items-center gap-3">
                            <Truck className="text-[#6B9F5E]" size={20} />
                            <div>
                                <p className="text-sm font-semibold text-[#2C3538]">
                                    Livrare Gratuita
                                </p>
                                <p className="text-xs text-[#7C8B96]">
                                    In Brasov si Focsani
                                </p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/magazin"
                            onClick={onClose}
                            className="block w-full bg-[#1C4E80] text-white text-center px-6 py-4 rounded-lg hover:bg-[#153d66] transition-colors font-semibold"
                        >
                            Vezi Toate Produsele
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}