import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  categoryName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Antique Jewellery',
  fallbackTitle,
  categoryName,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#2A231D] via-[#1E1915] to-[#14110E] text-[#E8D8C3] overflow-hidden select-none ${className}`}
        style={{ minHeight: '180px' }}
      >
        {/* Subtle royal damask / ornamental filigree background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="#C5A262" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" stroke="#C5A262" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Intricate Antique Gold Medallion Icon */}
        <div className="relative z-10 w-14 h-14 mb-3 rounded-full border border-[#C5A262]/40 flex items-center justify-center bg-[#C5A262]/10 backdrop-blur-xs shadow-inner">
          <svg className="w-7 h-7 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
            <circle cx="12" cy="12" r="3" stroke="#C5A262" strokeWidth="1" />
          </svg>
        </div>

        {categoryName && (
          <span className="relative z-10 text-[10px] tracking-[0.25em] uppercase text-[#C5A262] font-medium mb-1">
            {categoryName}
          </span>
        )}
        <span className="relative z-10 font-serif text-sm tracking-wide text-center text-[#F5EFEB] max-w-[200px] line-clamp-2">
          {fallbackTitle || alt}
        </span>
        <span className="relative z-10 text-[9px] tracking-wider text-[#A39482] mt-1">
          22K Antique Heritage
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F4EFEA] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4EFEA] via-[#EAE2D8] to-[#F4EFEA] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
