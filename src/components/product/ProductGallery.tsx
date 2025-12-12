'use client';

import { useState } from 'react';
import Image from 'next/image';
import { WCImage } from '@/lib/woocommerce/types';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
    images: WCImage[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    if (images.length === 0) {
        return (
            <div className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
            <span className="text-gray-400">Nu exista imagini</span>
        </div>
    );
    }

    const handlePrevious = () => {
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg group">
    <Image
        src={images[selectedImage].src}
    alt={images[selectedImage].alt || productName}
    fill
    className="object-cover"
    priority
    sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoom Button */}
        <button
    onClick={() => setIsZoomOpen(true)}
    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
    aria-label="Mareste imaginea"
    >
    <Maximize2 size={20} className="text-[#2C3538]" />
        </button>

    {/* Navigation Arrows - Mobile */}
    {images.length > 1 && (
        <>
            <button
                onClick={handlePrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white active:scale-95"
        aria-label="Imagine anterioara"
        >
        <ChevronLeft size={20} className="text-[#2C3538]" />
        </button>
        <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white active:scale-95"
        aria-label="Imagine urmatoare"
        >
        <ChevronRight size={20} className="text-[#2C3538]" />
        </button>
        </>
    )}

    {/* Image Counter */}
    {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
            {selectedImage + 1} / {images.length}
    </div>
    )}
    </div>

    {/* Thumbnails */}
    {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:gap-4">
            {images.map((image, index) => (
                    <button
                        key={image.id || index}
                onClick={() => setSelectedImage(index)}
        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
            selectedImage === index
                ? 'border-[#1C4E80] ring-2 ring-[#1C4E80]/20'
                : 'border-gray-200 hover:border-[#C19A6B]'
        }`}
    >
        <Image
            src={image.src}
        alt={image.alt || `${productName} ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 25vw, 12vw"
            />
            </button>
    ))}
        </div>
    )}
    </div>

    {/* Zoom Modal */}
    {isZoomOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
        <button
            onClick={() => setIsZoomOpen(false)}
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
        aria-label="Inchide"
        >
        <X size={24} className="text-white" />
        </button>

        <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
    <Image
        src={images[selectedImage].src}
        alt={images[selectedImage].alt || productName}
        fill
        className="object-contain"
        sizes="100vw"
            />
            </div>

        {/* Navigation in Zoom */}
        {images.length > 1 && (
            <>
                <button
                    onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            aria-label="Imagine anterioara"
            >
            <ChevronLeft size={24} className="text-white" />
            </button>
            <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
            aria-label="Imagine urmatoare"
            >
            <ChevronRight size={24} className="text-white" />
            </button>
            </>
        )}
        </div>
    )}
    </>
);
}