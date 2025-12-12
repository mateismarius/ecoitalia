'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={24} className="text-[#2C3538]" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <div className="text-xl md:text-2xl font-serif">
                                <span className="text-[#1C4E80] font-light">eco</span>
                                <span className="text-[#C19A6B] font-semibold"> ITALIA</span>
                            </div>
                            <div className="text-[10px] md:text-xs text-[#7C8B96] tracking-wider">
                                PREMIUM BRANDS
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            <Link
                                href="/produse"
                                className="text-[#2C3538] hover:text-[#1C4E80] transition-colors font-medium"
                            >
                                Produse
                            </Link>
                            <Link
                                href="/marci"
                                className="text-[#2C3538] hover:text-[#1C4E80] transition-colors font-medium"
                            >
                                Branduri
                            </Link>
                            <Link
                                href="/oferte"
                                className="text-[#2C3538] hover:text-[#1C4E80] transition-colors font-medium"
                            >
                                Oferte
                            </Link>
                            <Link
                                href="/despre"
                                className="text-[#2C3538] hover:text-[#1C4E80] transition-colors font-medium"
                            >
                                Despre
                            </Link>
                            <Link
                                href="/contact"
                                className="text-[#2C3538] hover:text-[#1C4E80] transition-colors font-medium"
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Search - Hidden on mobile */}
                            <button
                                className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Search"
                            >
                                <Search size={20} className="text-[#7C8B96]" />
                            </button>

                            {/* Cart */}
                            <Link
                                href="/cos"
                                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Cos cumparaturi"
                            >
                                <ShoppingCart size={20} className="text-[#7C8B96]" />
                                {/* Cart Badge - va fi dinamic */}
                                <span className="absolute -top-1 -right-1 bg-[#1C4E80] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  0
                </span>
                            </Link>

                            {/* CTA Button - Desktop only */}
                            <Link
                                href="/magazin"
                                className="hidden md:flex bg-[#1C4E80] text-white px-6 py-2.5 rounded-md hover:bg-[#153d66] transition-colors items-center gap-2 font-medium"
                            >
                                <ShoppingCart size={18} />
                                Magazin
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar - Below header */}
                <div className="md:hidden border-t border-gray-100 px-4 py-3">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8B96]" />
                        <input
                            type="search"
                            placeholder="Cauta produse..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#1C4E80] focus:ring-2 focus:ring-[#1C4E80]/20 outline-none transition-all"
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </>
    );
}