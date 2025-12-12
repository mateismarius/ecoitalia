// src/components/OptimizedImage.tsx
'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
    priority?: boolean;
    className?: string;
}

export default function OptimizedImage({
                                           src,
                                           alt,
                                           priority = false,
                                           className = '',
                                           ...props
                                       }: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Image
            src={src}
            alt={alt}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            quality={priority ? 90 : 75}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
            onLoad={() => setIsLoading(false)}
            className={`
                ${className}
                ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'}
                transition-all duration-300
            `}
            {...props}
        />
    );
}