import React, { useEffect } from 'react';
import { X, Calendar, Tag, ShieldCheck } from 'lucide-react';
import { MediaItem } from '../../types';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-embta-navy-dark border border-embta-surface-border rounded-2xl overflow-hidden shadow-2xl preserve-3d"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-embta-surface-border bg-embta-navy/80">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-bold uppercase rounded bg-embta-green/20 text-embta-green-light border border-embta-green/30">
              {item.type}
            </span>
            {item.isDemo && (
              <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-embta-red/20 text-red-400 border border-embta-red/30">
                DEMO CONTENT
              </span>
            )}
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-embta-slate-dim">
              <Calendar className="w-3.5 h-3.5" />
              {item.date}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close media preview"
            className="p-1.5 rounded-lg text-embta-slate-dim hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Media Frame Container */}
        <div className="w-full bg-black/90 flex items-center justify-center min-h-[280px] sm:min-h-[420px] max-h-[70vh]">
          {item.type === 'YOUTUBE' ? (
            <div className="w-full aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(item.url)}
                title={item.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : item.type === 'VIDEO' ? (
            <video
              src={item.url}
              controls
              autoPlay
              className="max-h-[65vh] w-auto max-w-full"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[65vh] w-auto max-w-full object-contain select-none"
            />
          )}
        </div>

        {/* Metadata Footer */}
        <div className="p-6 bg-embta-navy">
          <h3 id="lightbox-title" className="text-xl font-bold text-white mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-embta-slate-dim leading-relaxed mb-4">
            {item.description}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-embta-surface-border text-xs text-embta-slate-dim">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-embta-green" />
              <span>Category: <strong className="text-embta-slate">{item.category}</strong></span>
            </div>
            <div className="flex items-center gap-1 text-embta-green-light font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Secretariat Record</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
