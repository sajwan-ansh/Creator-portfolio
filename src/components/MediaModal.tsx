import React, { useEffect } from 'react';
import { WorkItem } from '../types/portfolio';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { ImageWithFallback } from './common/ImageWithFallback';
import { X, Download, Film, Camera, Tag, ArrowLeft, ArrowRight } from 'lucide-react';

interface MediaModalProps {
  item: WorkItem | null;
  items?: WorkItem[];
  onClose: () => void;
  onNavigateItem?: (item: WorkItem) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, items = [], onClose, onNavigateItem }) => {
  // Focus Trap Hook defined FIRST at top level
  const containerRef = useFocusTrap<HTMLDivElement>({
    isOpen: item !== null,
    onClose,
  });

  // Keyboard Arrow Navigation Hook
  useEffect(() => {
    if (!item || !onNavigateItem || items.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = items.findIndex((i) => i.id === item.id);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        const nextItem = items[(currentIndex + 1) % items.length];
        onNavigateItem(nextItem);
      } else if (e.key === 'ArrowLeft') {
        const prevItem = items[(currentIndex - 1 + items.length) % items.length];
        onNavigateItem(prevItem);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onNavigateItem]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const hasPrev = items.length > 1;
  const hasNext = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 modal-overlay bg-black/80 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-modal-title"
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl bg-[#12151b] text-stone-100 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 max-h-[90vh] flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 backdrop-blur-md transition-all shadow-md outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          aria-label="Close media view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Arrow Navigation Controls */}
        {hasPrev && onNavigateItem && (
          <button
            onClick={() => onNavigateItem(items[(currentIndex - 1 + items.length) % items.length])}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 backdrop-blur-md transition-all hidden md:flex items-center justify-center shadow-lg"
            aria-label="Previous item"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {hasNext && onNavigateItem && (
          <button
            onClick={() => onNavigateItem(items[(currentIndex + 1) % items.length])}
            className="absolute right-16 md:right-4 top-4 md:top-1/2 md:-translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 backdrop-blur-md transition-all hidden md:flex items-center justify-center shadow-lg"
            aria-label="Next item"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {/* Left Side: Media Viewer */}
        <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative min-h-[320px] md:min-h-[480px]">
          {item.type === 'video' ? (
            <div className="w-full h-full flex flex-col items-center justify-center relative group">
              <video
                src={item.mediaUrl}
                poster={item.thumbnail}
                controls
                autoPlay
                preload="metadata"
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center overflow-hidden p-4">
              <ImageWithFallback
                src={item.mediaUrl || item.thumbnail}
                alt={item.title}
                className="max-h-[75vh] w-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Right Side: Details Panel */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#181c24] border-t md:border-t-0 md:border-l border-stone-800">
          <div className="space-y-6">
            {/* Category & Tag */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full flex items-center gap-1.5">
                {item.type === 'video' ? <Film className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                {item.category}
              </span>
              <span className="text-xs text-stone-400 font-medium">({item.date})</span>
            </div>

            {/* Title */}
            <div>
              <h2 id="media-modal-title" className="font-serif text-3xl font-bold text-white tracking-tight">
                {item.title}
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">About the Project</h3>
              <p className="text-sm text-stone-300 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Tools Used */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" /> Software & Tools
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {item.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium bg-stone-800 text-stone-200 border border-stone-700 rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata Specs */}
            {item.meta && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800 text-xs">
                {item.meta.client && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-stone-500 text-[10px] uppercase font-semibold">Client / Scope</span>
                    <span className="text-stone-300 font-medium">{item.meta.client}</span>
                  </div>
                )}
                {item.meta.duration && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-stone-500 text-[10px] uppercase font-semibold">Runtime</span>
                    <span className="text-stone-300 font-medium">{item.meta.duration}</span>
                  </div>
                )}
                {item.meta.fps && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-stone-500 text-[10px] uppercase font-semibold">Frame Rate</span>
                    <span className="text-stone-300 font-medium">{item.meta.fps}</span>
                  </div>
                )}
                {item.meta.polycount && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-stone-500 text-[10px] uppercase font-semibold">Poly Count</span>
                    <span className="text-stone-300 font-medium">{item.meta.polycount}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between">
            <a
              href={item.mediaUrl || item.thumbnail}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-full border border-stone-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Media</span>
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-stone-900 bg-stone-200 hover:bg-white rounded-full transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
