'use client';

import { useState } from 'react';
import { WCProduct } from '@/lib/woocommerce/types';
import { FileText, Package, Info, MessageCircle, Truck, CreditCard, RotateCcw, ExternalLink } from 'lucide-react';

interface ProductDescriptionProps {
    product: WCProduct;
}

type TabId = 'description' | 'specs' | 'info' | 'reviews';

interface Tab {
    id: TabId;
    label: string;
    icon: typeof FileText;
    count?: number;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
    const [activeTab, setActiveTab] = useState<TabId>('description');

    const tabs: Tab[] = [
        { id: 'description', label: 'Descriere', icon: FileText },
        { id: 'specs', label: 'Specificatii', icon: Package },
        { id: 'info', label: 'Informatii', icon: Info },
        {
            id: 'reviews',
            label: 'Recenzii',
            icon: MessageCircle,
            count: product.rating_count || 0
        },
    ];

    // Extract specifications from attributes
    const specifications = product.attributes || [];

    // WooCommerce shop URL
    const shopUrl = process.env.NEXT_PUBLIC_WC_STORE_URL || 'https://ecoitalia.ro';

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 overflow-x-auto">
                <div className="flex min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 whitespace-nowrap ${
                                    isActive
                                        ? 'border-[#1C4E80] text-[#1C4E80] bg-[#1C4E80]/5'
                                        : 'border-transparent text-[#7C8B96] hover:text-[#2C3538] hover:bg-gray-50'
                                }`}
                            >
                                <Icon size={20} />
                                <span>{tab.label}</span>
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className="bg-[#1C4E80] text-white text-xs px-2 py-0.5 rounded-full">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
                {/* Description Tab */}
                {activeTab === 'description' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[#2C3538]">
                            Descriere Produs
                        </h3>

                        {product.description ? (
                            <div
                                className="prose prose-lg max-w-none text-[#2C3538] prose-headings:text-[#1C4E80] prose-a:text-[#1C4E80]"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        ) : (
                            <p className="text-[#7C8B96]">
                                Nu exista descriere disponibila pentru acest produs.
                            </p>
                        )}

                        {/* FreeBubbles Special Info */}
                        {product.name.toLowerCase().includes('freebubbles') && (
                            <div className="mt-8 p-6 bg-gradient-to-br from-[#1C4E80]/10 to-[#6B9F5E]/10 rounded-xl border-2 border-[#1C4E80]/20">
                                <h4 className="text-xl font-bold text-[#1C4E80] mb-4">
                                    De ce FreeBubbles?
                                </h4>
                                <ul className="space-y-3 text-[#2C3538]">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#6B9F5E] font-bold">✓</span>
                                        <span>Certificat Ecolabel European - protejează mediul și sănătatea ta</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#6B9F5E] font-bold">✓</span>
                                        <span>Formula biodegradabilă 90% - minimal impact asupra naturii</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#6B9F5E] font-bold">✓</span>
                                        <span>Hipoalergenic și fără nichel - sigur pentru piele sensibilă</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#6B9F5E] font-bold">✓</span>
                                        <span>Netestat pe animale - respectă viața în toate formele</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#6B9F5E] font-bold">✓</span>
                                        <span>Made in Italy - calitate premium europeană garantată</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Specifications Tab */}
                {activeTab === 'specs' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[#2C3538]">
                            Specificatii Tehnice
                        </h3>

                        {specifications.length > 0 ? (
                            <div className="grid gap-4">
                                {specifications.map((spec, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-gray-50 rounded-lg"
                                    >
                    <span className="font-semibold text-[#2C3538] sm:w-1/3">
                      {spec.name}:
                    </span>
                                        <span className="text-[#7C8B96] sm:w-2/3">
                      {spec.options.join(', ')}
                    </span>
                                    </div>
                                ))}

                                {/* Always show these */}
                                {product.sku && (
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-[#2C3538] sm:w-1/3">
                      Cod produs:
                    </span>
                                        <span className="text-[#7C8B96] sm:w-2/3">{product.sku}</span>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-[#2C3538] sm:w-1/3">
                    Tip produs:
                  </span>
                                    <span className="text-[#7C8B96] sm:w-2/3 capitalize">{product.type}</span>
                                </div>

                                {product.categories[0] && (
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-[#2C3538] sm:w-1/3">
                      Categorie:
                    </span>
                                        <span className="text-[#7C8B96] sm:w-2/3">
                      {product.categories[0].name}
                    </span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-[#7C8B96]">
                                Nu exista specificatii disponibile pentru acest produs.
                            </p>
                        )}
                    </div>
                )}

                {/* Info Tab */}
                {activeTab === 'info' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[#2C3538]">
                            Informatii Livrare & Retur
                        </h3>

                        <div className="space-y-6">
                            {/* Livrare */}
                            <div className="p-6 bg-[#6B9F5E]/5 rounded-xl border border-[#6B9F5E]/20">
                                <h4 className="text-lg font-bold text-[#2C3538] mb-4 flex items-center gap-2">
                                    <Truck size={20} className="text-[#6B9F5E]" />
                                    Livrare
                                </h4>
                                <ul className="space-y-2 text-[#2C3538]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B9F5E] mt-1">•</span>
                                        <span><strong>Gratuită</strong> în Brașov și Focșani pentru orice comandă</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B9F5E] mt-1">•</span>
                                        <span>Livrare în <strong>24-48 ore</strong> în toată România</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B9F5E] mt-1">•</span>
                                        <span>Cost livrare în rest: <strong>20 RON</strong> (gratuit peste 200 RON)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#6B9F5E] mt-1">•</span>
                                        <span>Comenzi plasate până la ora 14:00 se expediază în aceeași zi</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Plata */}
                            <div className="p-6 bg-[#1C4E80]/5 rounded-xl border border-[#1C4E80]/20">
                                <h4 className="text-lg font-bold text-[#2C3538] mb-4 flex items-center gap-2">
                                    <CreditCard size={20} className="text-[#1C4E80]" />
                                    Metode de Plata
                                </h4>
                                <ul className="space-y-2 text-[#2C3538]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#1C4E80] mt-1">•</span>
                                        <span><strong>Card online</strong> - plată securizată prin Netopia/Stripe</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#1C4E80] mt-1">•</span>
                                        <span><strong>Ramburs</strong> - plată la livrare (cash/card la curier)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#1C4E80] mt-1">•</span>
                                        <span><strong>Transfer bancar</strong> - pentru comenzi corporate</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Retur */}
                            <div className="p-6 bg-[#C19A6B]/5 rounded-xl border border-[#C19A6B]/20">
                                <h4 className="text-lg font-bold text-[#2C3538] mb-4 flex items-center gap-2">
                                    <RotateCcw size={20} className="text-[#C19A6B]" />
                                    Retur & Garantie
                                </h4>
                                <ul className="space-y-2 text-[#2C3538]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#C19A6B] mt-1">•</span>
                                        <span>Drept de retur în <strong>14 zile</strong> de la primire</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#C19A6B] mt-1">•</span>
                                        <span>Produsele trebuie să fie în ambalajul original, nesigilate</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#C19A6B] mt-1">•</span>
                                        <span>Returul se face gratuit prin curier</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#C19A6B] mt-1">•</span>
                                        <span>Banii se returnează în 14 zile lucrătoare</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-[#2C3538]">
                            Recenzii Clienti
                        </h3>

                        {product.rating_count > 0 ? (
                                <div className="space-y-6">
                                    {/* Rating Summary */}
                                    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-[#1C4E80]/5 to-[#C19A6B]/5 rounded-xl">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-[#1C4E80]">
                                                {product.average_rating}
                                            </div>
                                            <div className="flex justify-center mt-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={
                                                            i < Math.round(parseFloat(product.average_rating))
                                                                ? 'text-yellow-400 text-xl'
                                                                : 'text-gray-300 text-xl'
                                                        }
                                                    >
                          ★
                        </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-[#7C8B96] mt-2">
                                                {product.rating_count} {product.rating_count === 1 ? 'recenzie' : 'recenzii'}
                                            </p>
                                        </div>

                                        <div className="flex-1 text-center sm:text-left">

                                        <a    href={`${shopUrl}/produs/${product.slug}#reviews`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[#1C4E80] hover:text-[#153d66] font-semibold"
                                            >
                                            Vezi toate recenziile pe shop.ecoitalia.ro
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>

                            {/* CTA to shop for reviews */}
                            <div className="text-center py-8">
                            <p className="text-[#7C8B96] mb-4">
                            Recenziile sunt disponibile pe magazinul nostru online
                            </p>

                         <a   href={`${shopUrl}/produs/${product.slug}#reviews`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#1C4E80] text-white px-6 py-3 rounded-lg hover:bg-[#153d66] transition-colors font-semibold"
                        >
                        Citeste Recenziile
                        <ExternalLink size={18} />
                    </a>
                    </div>
                    </div>
                    ) : (
                    <div className="text-center py-12">
                    <MessageCircle size={48} className="mx-auto text-[#7C8B96] mb-4" />
            <p className="text-[#7C8B96] text-lg mb-6">
                Acest produs nu are recenzii inca
            </p>
<a
            href={`${shopUrl}/produs/${product.slug}#reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1C4E80] text-white px-6 py-3 rounded-lg hover:bg-[#153d66] transition-colors font-semibold"
            >
            Fi primul care lasa o recenzie
            <ExternalLink size={18} />
        </a>
</div>
)}
</div>
)}
</div>
</div>
);
}