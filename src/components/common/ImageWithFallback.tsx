import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-stone-800 overflow-hidden">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-stone-800 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-stone-600 border-t-stone-300 rounded-full animate-spin"></div>
        </div>
      )}

      {error ? (
        <div className="w-full h-full bg-stone-900 text-stone-500 flex flex-col items-center justify-center p-4 text-center space-y-2">
          <ImageOff className="w-6 h-6 text-stone-600" />
          <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-500">Image Unavailable</span>
        </div>
      ) : (
        <img
          src={src || fallbackSrc}
          alt={alt || 'Portfolio Work Preview'}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      )}
    </div>
  );
};
