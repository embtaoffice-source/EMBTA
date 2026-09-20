import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Play,
  Image as ImageIcon,
  Calendar,
  Maximize2,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { galleryData, galleryCategories } from '../data/galleryData';
import { MediaItem } from '../types';
import { getYouTubeThumbnail } from '../utils/youtube';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SectionTitle } from '../components/common/SectionTitle';
import { GlassCard } from '../components/common/GlassCard';
import { TiltCard } from '../components/3d/TiltCard';
import { Lightbox } from '../components/common/Lightbox';
import { SEOHead } from '../components/layout/SEOHead';

export const GalleryPage: React.FC = () => {
  const [activeType, setActiveType] = useState<'ALL' | 'IMAGES' | 'VIDEOS'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  // Filter logic
  const filteredMedia = useMemo(() => {
    return galleryData.filter((item) => {
      const matchesType =
        activeType === 'ALL'
          ? true
          : activeType === 'IMAGES'
          ? item.type === 'IMAGE'
          : item.type === 'VIDEO' || item.type === 'YOUTUBE';

      const matchesCategory =
        selectedCategory === 'ALL' ? true : item.category === selectedCategory;

      return matchesType && matchesCategory;
    });
  }, [activeType, selectedCategory]);

  return (
    <div className="min-h-screen bg-embta-navy text-embta-light pt-20">
      <SEOHead
        title="Official Media Gallery"
        description="Browse photographs, archival recordings, and video broadcasts of Eastern Maring Business & Traders Association events."
      />

      {/* Breadcrumb Bar */}
      <div className="bg-embta-navy-dark border-b border-embta-surface-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <Breadcrumb items={[{ label: 'Media Gallery' }]} />
          <span className="text-xs font-mono text-embta-slate-dim">
            RECORD ID: EMBTA/MED-2026
          </span>
        </div>
      </div>

      {/* 1. Page Header */}
      <section className="relative py-16 bg-gradient-to-b from-embta-navy-dark via-embta-navy to-embta-navy border-b border-embta-surface-border overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-embta-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-embta-blue/50 border border-embta-surface-border text-xs font-bold uppercase tracking-wider text-embta-slate">
              <Sparkles className="w-3.5 h-3.5 text-embta-green" />
              <span>Public Information Archive</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Official Media Gallery
            </h1>

            <p className="text-base sm:text-xl text-embta-slate leading-relaxed">
              Photographs, recordings, and visual documentation of association proceedings, conventions, and trade sector initiatives.
            </p>
          </div>

          {/* Master Filters Architecture */}
          <div className="mt-10 p-4 sm:p-6 rounded-2xl bg-embta-navy-dark/90 border border-embta-surface-border shadow-3d-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Type Switcher: ALL, IMAGES, VIDEOS */}
              <div className="inline-flex p-1 rounded-xl bg-embta-navy border border-embta-surface-border">
                <button
                  onClick={() => setActiveType('ALL')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeType === 'ALL'
                      ? 'bg-embta-green text-white shadow-glow-green'
                      : 'text-embta-slate-dim hover:text-white'
                  }`}
                >
                  ALL ({galleryData.length})
                </button>
                <button
                  onClick={() => setActiveType('IMAGES')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeType === 'IMAGES'
                      ? 'bg-embta-green text-white shadow-glow-green'
                      : 'text-embta-slate-dim hover:text-white'
                  }`}
                >
                  IMAGES ({galleryData.filter((i) => i.type === 'IMAGE').length})
                </button>
                <button
                  onClick={() => setActiveType('VIDEOS')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeType === 'VIDEOS'
                      ? 'bg-embta-green text-white shadow-glow-green'
                      : 'text-embta-slate-dim hover:text-white'
                  }`}
                >
                  VIDEOS ({galleryData.filter((i) => i.type === 'VIDEO' || i.type === 'YOUTUBE').length})
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-embta-slate-dim">
                <ShieldCheck className="w-4 h-4 text-embta-green" />
                <span className="font-mono">VERIFIED ARCHIVAL REPOSITORY</span>
              </div>
            </div>

            {/* Category Sub-Filters */}
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-embta-surface-border/60">
              <span className="text-xs font-bold uppercase tracking-wider text-embta-slate-dim mr-2">
                Categories:
              </span>
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-embta-blue text-white border border-embta-green/50'
                      : 'bg-embta-navy/50 text-embta-slate-dim hover:text-white hover:bg-embta-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Media Grid: 3D Floating Media Wall */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMedia.length === 0 ? (
            <div className="p-12 text-center bg-embta-navy-dark rounded-2xl border border-embta-surface-border">
              <p className="text-embta-slate-dim text-base">
                No media items match the selected filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMedia.map((item) => {
                const isVideo = item.type === 'VIDEO' || item.type === 'YOUTUBE';
                const thumb = item.thumbnailUrl || (item.type === 'YOUTUBE' ? getYouTubeThumbnail(item.url) : item.url);

                return (
                  <TiltCard
                    key={item.id}
                    maxTilt={7}
                    scale={1.02}
                    className="h-full cursor-pointer"
                    onClick={() => setActiveMedia(item)}
                  >
                    <GlassCard
                      variant="interactive"
                      className="h-full flex flex-col justify-between overflow-hidden group shadow-3d-card border-embta-surface-border"
                    >
                      {/* Media Thumbnail Container */}
                      <div className="relative h-60 w-full overflow-hidden bg-black/60">
                        <img
                          src={thumb}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Video Play Overlay */}
                        {isVideo && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                            <div className="w-14 h-14 rounded-full bg-embta-green/90 text-white flex items-center justify-center shadow-glow-green group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 ml-0.5 fill-current" />
                            </div>
                          </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-embta-navy/90 border border-embta-surface-border text-[10px] font-extrabold text-embta-green-light uppercase">
                            {item.type}
                          </span>
                          {item.isDemo && (
                            <span className="px-2 py-0.5 rounded bg-embta-red/90 text-white text-[9px] font-bold">
                              DEMO
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-embta-navy/80 text-embta-slate-dim group-hover:text-white transition-colors">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs text-embta-slate-dim mb-1.5">
                            <span className="flex items-center gap-1">
                              <Tag className="w-3.5 h-3.5 text-embta-green" />
                              {item.category}
                            </span>
                            <span className="flex items-center gap-1 font-mono">
                              <Calendar className="w-3.5 h-3.5" />
                              {item.date}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-white group-hover:text-embta-green-light transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-xs text-embta-slate-dim line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-3 border-t border-embta-surface-border/60 flex items-center justify-between text-xs text-embta-green-light font-semibold">
                          <span>{isVideo ? 'Play Stream' : 'View Full Image'}</span>
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </GlassCard>
                  </TiltCard>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      <Lightbox item={activeMedia} onClose={() => setActiveMedia(null)} />
    </div>
  );
};
