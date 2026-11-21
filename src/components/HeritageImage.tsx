import React, { useState, useEffect } from 'react';
import { CraftCategory } from '../types/heritage';
import { Layers, Sparkles, Feather, Archive, Scissors } from 'lucide-react';

interface HeritageImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  category?: CraftCategory | string;
  fallbackText?: string;
  craftTitle?: string;
  className?: string;
}

// Fallback images matching authentic crafts in Southeast Vietnam
const CATEGORY_DEFAULT_IMAGES: Record<string, string> = {
  pottery: '/assets/images/craft_bienhoa_pottery_1793891481080.jpg',
  lacquer: '/assets/images/craft_tuongbinhhiep_lacquer_1793891481589.jpg',
  weaving: '/assets/images/craft_stieng_weaving_1793891483072.jpg',
  basketry: '/assets/images/craft_bamboo_basketry_1793891483167.jpg',
  woodwork: '/assets/images/craft_tuongbinhhiep_lacquer_1793891481589.jpg',
  default: '/assets/images/hero_craft_artisan_1793891481621.jpg'
};

// Normalize path to handle various legacy/dev/prod forms
export function normalizeImagePath(path?: string): string {
  if (!path) return CATEGORY_DEFAULT_IMAGES.default;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  // Convert /src/assets/images/... to /assets/images/... for production build
  if (path.startsWith('/src/assets/images/')) {
    return path.replace('/src/assets/images/', '/assets/images/');
  }
  return path;
}

export const HeritageImage: React.FC<HeritageImageProps> = ({
  src,
  alt,
  category,
  fallbackText,
  craftTitle,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => normalizeImagePath(src));
  const [retryStage, setRetryStage] = useState<number>(0);
  const [hasRenderError, setHasRenderError] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(normalizeImagePath(src));
    setRetryStage(0);
    setHasRenderError(false);
  }, [src]);

  const handleError = () => {
    if (retryStage === 0) {
      // Stage 1: Try alternative path format (with /src/ or without /src/)
      setRetryStage(1);
      if (currentSrc.startsWith('/assets/images/')) {
        setCurrentSrc(currentSrc.replace('/assets/images/', '/src/assets/images/'));
        return;
      } else if (currentSrc.startsWith('/src/assets/images/')) {
        setCurrentSrc(currentSrc.replace('/src/assets/images/', '/assets/images/'));
        return;
      }
    }

    if (retryStage <= 1) {
      // Stage 2: Try category-specific fallback image
      setRetryStage(2);
      const catKey = (category || 'default').toLowerCase();
      const fallbackImg = CATEGORY_DEFAULT_IMAGES[catKey] || CATEGORY_DEFAULT_IMAGES.default;
      if (fallbackImg !== currentSrc) {
        setCurrentSrc(fallbackImg);
        return;
      }
    }

    // Stage 3: All image URLs failed -> display stylized CSS/SVG museum fallback
    setHasRenderError(true);
  };

  if (hasRenderError) {
    const cat = (category || '').toLowerCase();
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#5E2027]/10 via-[#F5F0E6] to-[#B58A4A]/20 text-[#5E2027] border border-[#B58A4A]/30 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full bg-[#9F3035]/10 flex items-center justify-center text-[#9F3035] mb-2 shrink-0">
          {cat === 'pottery' && <Archive className="w-5 h-5" />}
          {cat === 'lacquer' && <Sparkles className="w-5 h-5" />}
          {cat === 'weaving' && <Feather className="w-5 h-5" />}
          {cat === 'basketry' && <Layers className="w-5 h-5" />}
          {cat === 'woodwork' && <Scissors className="w-5 h-5" />}
          {!['pottery', 'lacquer', 'weaving', 'basketry', 'woodwork'].includes(cat) && (
            <Archive className="w-5 h-5" />
          )}
        </div>
        <span className="font-heritage-serif text-xs sm:text-sm font-bold text-center line-clamp-2">
          {craftTitle || fallbackText || alt || 'Di sản Thủ công Đông Nam Bộ'}
        </span>
        <span className="text-[10px] text-[#986C4C] mt-1 font-sans uppercase tracking-wider">
          Tư liệu bảo tàng văn hoá
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
};
