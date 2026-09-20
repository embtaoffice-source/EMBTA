import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  ArrowLeft,
  Share2,
  Tag,
  ShieldCheck,
  Building2,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { newsData } from '../data/newsData';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { GlassCard } from '../components/common/GlassCard';
import { TiltCard } from '../components/3d/TiltCard';
import { Button3D } from '../components/common/Button3D';
import { SEOHead } from '../components/layout/SEOHead';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = newsData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const relatedArticles = newsData
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-embta-navy text-embta-light pt-20">
      <SEOHead
        title={article.title}
        description={article.summary}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-embta-navy-dark border-b border-embta-surface-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: 'News', to: '/news' },
              { label: article.category, to: '/news' },
            ]}
          />
          <Link
            to="/news"
            className="text-xs font-semibold text-embta-slate-dim hover:text-white flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to News</span>
          </Link>
        </div>
      </div>

      {/* Demo Notice */}
      {article.isDemo && (
        <div className="bg-embta-red/10 border-b border-embta-red/20 py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>
              <strong>DEMO ARTICLE:</strong> This publication is sample material demonstrating the association gazette reader format.
            </span>
          </div>
        </div>
      )}

      {/* Article Header & Main Content */}
      <article className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Metadata & Categories */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded bg-embta-green/20 text-embta-green-light border border-embta-green/40 text-xs font-extrabold uppercase">
                {article.category}
              </span>
              <span className="text-embta-surface-border">•</span>
              <span className="flex items-center gap-1.5 text-xs text-embta-slate font-mono">
                <Calendar className="w-3.5 h-3.5 text-embta-green" />
                {article.date}
              </span>
              <span className="text-embta-surface-border">•</span>
              <span className="text-xs text-embta-slate-dim">
                Issued by <strong className="text-white">{article.author}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-xl text-embta-slate leading-relaxed border-l-4 border-embta-green pl-4 italic">
              {article.summary}
            </p>
          </div>

          {/* Featured Image Frame with 3D Depth */}
          <div className="relative rounded-2xl overflow-hidden border border-embta-surface-border shadow-3d-card aspect-video max-h-[480px]">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-embta-navy/90 border border-embta-surface-border px-2.5 py-1 rounded text-[11px] text-embta-slate font-mono">
              OFFICIAL ARCHIVAL PHOTOGRAPH
            </div>
          </div>

          {/* Body Paragraphs */}
          <div className="prose prose-invert max-w-none space-y-6 text-base sm:text-lg text-embta-slate leading-relaxed pt-4">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags & Attestation Box */}
          <div className="pt-8 border-t border-embta-surface-border space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-embta-green" />
              <span className="text-xs font-bold uppercase text-embta-slate-dim mr-2">
                Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-embta-navy-light text-embta-slate text-xs font-medium border border-embta-surface-border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <GlassCard variant="navy" className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-embta-green/20 flex items-center justify-center text-embta-green-light shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs text-embta-slate-dim space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                  Secretariat Attestation
                </h4>
                <p>
                  Official bulletins are issued under the constitutional authority of the EMBTA General Secretariat for the governance and awareness of registered trade members.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Related Articles Section */}
          <div className="pt-12 border-t border-embta-surface-border space-y-6">
            <h3 className="text-xl font-bold text-white">Related Bulletins</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link key={rel.id} to={`/news/${rel.slug}`}>
                  <TiltCard maxTilt={5}>
                    <GlassCard variant="interactive" className="p-5 h-full space-y-3">
                      <div className="flex items-center justify-between text-xs text-embta-slate-dim">
                        <span className="text-embta-green-light font-bold">
                          {rel.category}
                        </span>
                        <span>{rel.date}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2">
                        {rel.title}
                      </h4>
                      <div className="text-xs text-embta-green-light font-semibold flex items-center gap-1 pt-1">
                        <span>Read Statement</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </GlassCard>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </div>

          {/* Back Navigation */}
          <div className="pt-8 text-center">
            <Link to="/news">
              <Button3D variant="outline" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
                RETURN TO ALL BULLETINS
              </Button3D>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
