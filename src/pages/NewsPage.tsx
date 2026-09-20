import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  ArrowRight,
  ChevronRight,
  FileText,
  AlertCircle,
  Tag,
} from 'lucide-react';
import { newsData, newsCategories } from '../data/newsData';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SectionTitle } from '../components/common/SectionTitle';
import { GlassCard } from '../components/common/GlassCard';
import { TiltCard } from '../components/3d/TiltCard';
import { SEOHead } from '../components/layout/SEOHead';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Bulletins');

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All Bulletins') return newsData;
    return newsData.filter((article) => article.category === selectedCategory);
  }, [selectedCategory]);

  const spotlightArticle = newsData[0];

  return (
    <div className="min-h-screen bg-embta-navy text-embta-light pt-20">
      <SEOHead
        title="Latest News & Bulletins"
        description="Official press communiqués, notices, announcements, and trade sector updates from the Eastern Maring Business & Traders Association."
      />

      {/* Breadcrumb Bar */}
      <div className="bg-embta-navy-dark border-b border-embta-surface-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <Breadcrumb items={[{ label: 'News & Bulletins' }]} />
          <span className="text-xs font-mono text-embta-slate-dim">
            GAZETTE ARCHIVE • CYCLE 2026
          </span>
        </div>
      </div>

      {/* Official Notice Disclaimer Banner */}
      <div className="bg-embta-red/10 border-b border-embta-red/20 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2.5 text-xs text-red-300">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>
            <strong className="uppercase font-bold tracking-wider">Notice:</strong> All articles listed below are formatted demo/sample content illustrating the association's publishing layout. Official binding orders are signed and issued by the EMBTA General Secretariat.
          </span>
        </div>
      </div>

      {/* 1. Page Header */}
      <section className="relative py-14 bg-gradient-to-b from-embta-navy-dark via-embta-navy to-embta-navy border-b border-embta-surface-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-embta-blue/50 border border-embta-surface-border text-xs font-bold uppercase tracking-wider text-embta-slate">
              <Sparkles className="w-3.5 h-3.5 text-embta-green" />
              <span>Public Directorate & Press</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              LATEST NEWS
            </h1>

            <p className="text-base sm:text-xl text-embta-slate leading-relaxed">
              Official announcements, statutory notices, press releases, and trade sector bulletins.
            </p>
          </div>

          {/* Filter Categories Bar */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-embta-green text-white shadow-glow-green'
                    : 'bg-embta-navy-dark text-embta-slate-dim hover:text-white hover:bg-embta-blue border border-embta-surface-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Spotlight Featured Article */}
      {selectedCategory === 'All Bulletins' && spotlightArticle && (
        <section className="py-12 border-b border-embta-surface-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TiltCard maxTilt={4} className="w-full">
              <GlassCard
                variant="navy"
                className="overflow-hidden rounded-2xl border-embta-green/30 shadow-3d-card group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-6 relative min-h-[300px] overflow-hidden bg-black">
                    <img
                      src={spotlightArticle.featuredImage}
                      alt={spotlightArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded bg-embta-green text-white text-xs font-extrabold uppercase shadow-sm">
                        Spotlight Briefing
                      </span>
                      <span className="px-2 py-0.5 rounded bg-embta-red text-white text-[10px] font-bold">
                        DEMO
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-embta-slate-dim">
                        <span className="px-2.5 py-0.5 rounded bg-embta-navy border border-embta-surface-border text-embta-green-light font-bold">
                          {spotlightArticle.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {spotlightArticle.date}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-embta-green-light transition-colors leading-snug">
                        {spotlightArticle.title}
                      </h2>

                      <p className="text-sm sm:text-base text-embta-slate-dim leading-relaxed">
                        {spotlightArticle.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-embta-surface-border flex items-center justify-between">
                      <span className="text-xs font-mono text-embta-slate-dim">
                        By {spotlightArticle.author}
                      </span>
                      <Link
                        to={`/news/${spotlightArticle.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-embta-green text-white text-xs font-bold hover:bg-embta-green-light transition-colors shadow-glow-green"
                      >
                        <span>Read Full Statement</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          </div>
        </section>
      )}

      {/* 3. Articles Grid: 3D News Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="SECRETARIAT RELEASES"
            title="Official News Archive"
            subtitle="Browse statements, communiqués, and advisories published for commercial stakeholders."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <TiltCard
                key={article.id}
                maxTilt={6}
                scale={1.02}
                className="h-full"
              >
                <GlassCard
                  variant="interactive"
                  className="h-full flex flex-col justify-between overflow-hidden group shadow-3d-card border-embta-surface-border"
                >
                  <div className="relative h-52 overflow-hidden bg-embta-navy">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="bg-embta-navy/90 border border-embta-surface-border px-2.5 py-1 rounded text-[10px] font-extrabold text-embta-green-light uppercase">
                        {article.category}
                      </span>
                      {article.isDemo && (
                        <span className="bg-embta-red/90 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                          DEMO
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-embta-slate-dim font-mono">
                        <Calendar className="w-3.5 h-3.5 text-embta-green" />
                        <span>{article.date}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-embta-green-light transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-embta-slate-dim line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-embta-surface-border flex items-center justify-between">
                      <span className="text-[11px] text-embta-slate-dim truncate max-w-[150px]">
                        {article.author}
                      </span>
                      <Link
                        to={`/news/${article.slug}`}
                        className="text-xs font-bold text-embta-green-light hover:underline inline-flex items-center gap-1"
                      >
                        <span>Read More</span>
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
    </div>
  );
};
