import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { newsData } from '../data/newsData';
import { galleryData } from '../data/galleryData';
import { Network3D } from '../components/3d/Network3D';
import { TiltCard } from '../components/3d/TiltCard';
import { GlassCard } from '../components/common/GlassCard';
import { SectionTitle } from '../components/common/SectionTitle';
import { Button3D } from '../components/common/Button3D';
import { SEOHead } from '../components/layout/SEOHead';

export const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-embta-navy text-embta-light overflow-hidden pt-20">
      <SEOHead
        title="Official Portal"
        description="Official Digital Portal of the Eastern Maring Business & Traders Association. Connecting Businesses, Strengthening Communities."
      />

      {/* 1. Official Notice Gazette Bar */}
      <div className="bg-embta-navy-dark/95 border-b border-embta-surface-border text-xs py-2.5 px-4 sm:px-6 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-embta-red text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
              OFFICIAL NOTICE
            </span>
            <span className="text-embta-slate-dim font-medium">
              Welcome to the official digital portal of <strong className="text-white">EMBTA</strong>.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-embta-slate-dim font-medium">
            <span className="flex items-center gap-1.5 text-embta-green-light font-semibold">
              <span className="w-2 h-2 rounded-full bg-embta-green animate-pulse" />
              PORTAL ACTIVE
            </span>
            <span>•</span>
            <span>REGIONAL APEX TRADERS REGISTRY</span>
          </div>
        </div>
      </div>

      {/* 2. Spectacular 3D Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24">
        {/* Three.js 3D Business Network Background Scene */}
        <Network3D className="w-full h-full absolute inset-0 z-0" nodeCount={50} />

        {/* Ambient 3D Depth Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-embta-navy/40 via-transparent to-embta-navy pointer-events-none z-10" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-embta-blue/30 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-embta-green/20 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Narrative: 7 Columns */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-embta-blue/50 border border-embta-surface-border text-xs font-bold uppercase tracking-wider text-embta-green-light shadow-glass-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-embta-green animate-pulse" />
                <span>ESTD. 2022 • GOVT. REGD. NO. 5 OF 2023</span>
              </div>

              {/* Title & Acronym */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                  EASTERN MARING BUSINESS & TRADERS ASSOCIATION
                </h1>
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-embta-green-light via-emerald-400 to-teal-200">
                    EMBTA
                  </span>
                  <span className="text-embta-surface-border">•</span>
                  <span className="text-sm font-semibold text-embta-slate tracking-wide italic">
                    {siteConfig.motto}
                  </span>
                </div>
              </div>

              {/* Headline & Supporting Text */}
              <div className="space-y-3 max-w-2xl">
                <p className="text-xl sm:text-2xl font-bold text-embta-slate leading-snug">
                  “{siteConfig.headline}”
                </p>
                <p className="text-base sm:text-lg text-embta-slate-dim leading-relaxed">
                  {siteConfig.supportingText}
                </p>
                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase bg-white/5 text-embta-slate-dim border border-white/10">
                  DEMO CONTENT
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <Link to="/about">
                  <Button3D
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    LEARN MORE
                  </Button3D>
                </Link>
                <Link to="/contact">
                  <Button3D
                    variant="secondary"
                    size="lg"
                    icon={<ChevronRight className="w-4 h-4" />}
                  >
                    CONTACT EMBTA
                  </Button3D>
                </Link>
              </div>

              {/* Key Highlights Metric Strip */}
              <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-embta-surface-border/60">
                <div className="p-3 rounded-lg bg-embta-navy-light/40 border border-embta-surface-border">
                  <span className="block text-xs font-semibold text-embta-slate-dim uppercase tracking-wider">
                    Structure
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-white">4 Key Wings</span>
                </div>
                <div className="p-3 rounded-lg bg-embta-navy-light/40 border border-embta-surface-border">
                  <span className="block text-xs font-semibold text-embta-slate-dim uppercase tracking-wider">
                    Authority
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-embta-green-light">Apex Body</span>
                </div>
                <div className="p-3 rounded-lg bg-embta-navy-light/40 border border-embta-surface-border">
                  <span className="block text-xs font-semibold text-embta-slate-dim uppercase tracking-wider">
                    Governance
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-white">Constitutional</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Floating EMBTA Seal Presentation (5 Columns) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <TiltCard maxTilt={10} scale={1.03} className="w-full max-w-md">
                <div className="relative rounded-2xl p-8 bg-gradient-to-b from-embta-navy-light/80 via-embta-surface to-embta-navy/90 border border-embta-surface-border shadow-3d-card flex flex-col items-center text-center overflow-hidden">
                  {/* Top accent glowing stripe */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-embta-green via-teal-400 to-embta-green" />

                  {/* 3D Floating EMBTA Logo Showcase */}
                  <div className="relative p-6 rounded-2xl bg-embta-navy/80 border border-embta-surface-border shadow-inner mb-6 group animate-float">
                    <div className="absolute inset-0 rounded-2xl bg-embta-green/20 blur-xl group-hover:bg-embta-green/30 transition-colors" />
                    <img
                      src={siteConfig.logoUrl}
                      alt="EMBTA Official Emblem"
                      className="relative w-48 h-48 sm:w-56 sm:h-56 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase text-embta-green-light bg-embta-green/15 border border-embta-green/30 mb-2">
                    Official Insignia
                  </span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase">
                    Eastern Maring Business & Traders Association
                  </h2>
                  <div className="w-12 h-0.5 bg-embta-green my-3 rounded" />
                  <p className="text-sm font-semibold text-red-300 italic uppercase tracking-wider">
                    {siteConfig.motto}
                  </p>

                  <div className="mt-6 pt-4 w-full border-t border-embta-surface-border flex items-center justify-between text-xs text-embta-slate-dim">
                    <span className="flex items-center gap-1.5 font-semibold text-white">
                      <ShieldCheck className="w-4 h-4 text-embta-green" />
                      Statutory Registry
                    </span>
                    <span className="font-mono text-embta-slate">Maring Apex Guild</span>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Latest News Preview */}
      <section className="py-20 bg-embta-navy-dark/70 border-t border-embta-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionTitle
              badge="GAZETTE & BULLETINS"
              title="Latest Association News"
              subtitle="Timely bulletins, regulatory notices, and press communiqués."
              className="mb-0"
            />
            <Link to="/news">
              <Button3D variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                VIEW ALL BULLETINS
              </Button3D>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.slice(0, 3).map((article) => (
              <TiltCard key={article.id} className="h-full">
                <GlassCard
                  variant="interactive"
                  className="h-full flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden bg-embta-navy">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-embta-navy/90 border border-embta-surface-border px-2.5 py-1 rounded text-[11px] font-bold text-embta-green-light uppercase">
                      {article.category}
                    </div>
                    {article.isDemo && (
                      <span className="absolute top-3 right-3 bg-embta-red/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        DEMO
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-embta-slate-dim mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-embta-green-light transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-embta-slate-dim line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-embta-surface-border flex items-center justify-between">
                      <Link
                        to={`/news/${article.slug}`}
                        className="text-xs font-bold text-embta-green-light hover:underline inline-flex items-center gap-1"
                      >
                        <span>Read Statement</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gallery Preview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionTitle
              badge="SECRETARIAT ARCHIVE"
              title="Media Gallery Preview"
              subtitle="Photographic record and video broadcasts of association proceedings."
              className="mb-0"
            />
            <Link to="/gallery">
              <Button3D variant="outline" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                OPEN FULL GALLERY
              </Button3D>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryData.slice(0, 3).map((item) => (
              <TiltCard key={item.id} className="h-full">
                <GlassCard className="h-full flex flex-col overflow-hidden group">
                  <div className="relative h-52 overflow-hidden bg-embta-navy-dark">
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-embta-navy/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-bold text-embta-green-light uppercase tracking-wider block">
                        {item.category} • {item.type}
                      </span>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Final Call to Action Section */}
      <section className="py-20 bg-gradient-to-b from-embta-navy to-embta-navy-dark border-t border-embta-surface-border relative overflow-hidden">
        <div className="absolute inset-0 bg-embta-green/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-embta-green/20 border border-embta-green/30 text-xs font-bold uppercase tracking-wider text-embta-green-light">
            <span>OFFICIAL LIAISON & MEMBERSHIP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stand Together for Regional Trade Prosperity
          </h2>

          <p className="text-base sm:text-lg text-embta-slate-dim max-w-2xl mx-auto leading-relaxed">
            Whether you operate freight logistics, run a local merchant shop, manage timber enterprises, or provide vital trade services, EMBTA is your institutional collective.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button3D variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                CONTACT SECRETARIAT
              </Button3D>
            </Link>
            <Link to="/about">
              <Button3D variant="secondary" size="lg">
                READ ASSOCIATION CHARTER
              </Button3D>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
