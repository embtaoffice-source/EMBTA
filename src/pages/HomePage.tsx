import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  TrendingUp,
  Scale,
  Sparkles,
  ExternalLink,
  Store,
  Truck,
  Trees,
  Briefcase,
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
  // 4 Wings icon map
  const wingIcons: Record<string, React.ReactNode> = {
    Store: <Store className="w-7 h-7 text-embta-green-light" />,
    Truck: <Truck className="w-7 h-7 text-embta-green-light" />,
    Trees: <Trees className="w-7 h-7 text-embta-green-light" />,
    Briefcase: <Briefcase className="w-7 h-7 text-embta-green-light" />,
  };

  // Core values icon map
  const valueIcons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-embta-green-light" />,
    Users: <Users className="w-8 h-8 text-embta-green-light" />,
    Scale: <Scale className="w-8 h-8 text-embta-green-light" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-embta-green-light" />,
  };

  return (
    <div className="relative min-h-screen bg-embta-navy text-embta-light overflow-hidden">
      <SEOHead
        title="Official Portal"
        description="Official Digital Portal of the Eastern Maring Business & Traders Association. Connecting Businesses, Strengthening Communities."
      />

      {/* 1. Official Notice Gazette Bar */}
      <div className="pt-20 bg-embta-navy-dark/90 border-b border-embta-surface-border text-xs py-2 px-4 sm:px-6">
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

      {/* 3. Welcome to EMBTA Section */}
      <section className="py-20 bg-embta-navy-dark/70 border-y border-embta-surface-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <SectionTitle
                badge="INSTITUTIONAL FOUNDATION"
                title="Welcome to EMBTA"
                subtitle="Uniting regional merchants, logistics syndicates, and local entrepreneurs under a shared umbrella of governance and mutual trust."
              />
              <p className="text-base text-embta-slate-dim leading-relaxed">
                The Eastern Maring Business & Traders Association (EMBTA) is established to serve as the authentic commercial voice of the Maring regional trading jurisdiction. By synchronizing business efforts, mitigating supply disruptions, and liaising with administrative authorities, EMBTA provides a solid foundation for sustainable growth.
              </p>
              <div className="p-4 rounded-xl bg-embta-navy/80 border-l-4 border-embta-green border-r border-t border-b border-embta-surface-border">
                <p className="text-sm font-semibold text-white italic">
                  “Our priority is ensuring fair competition, highway security, and collective economic empowerment across every market node.”
                </p>
              </div>
              <div className="pt-2">
                <Link to="/about">
                  <Button3D variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                    EXPLORE ABOUT EMBTA
                  </Button3D>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TiltCard>
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-lg bg-embta-green/20 flex items-center justify-center mb-4 text-embta-green-light">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Commerce Synergy</h3>
                  <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                    Bridging wholesale suppliers, retail bazars, and rural producers to eliminate intermediary bottlenecks.
                  </p>
                </GlassCard>
              </TiltCard>

              <TiltCard>
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-lg bg-embta-blue/40 flex items-center justify-center mb-4 text-embta-slate">
                    <Truck className="w-6 h-6 text-embta-green-light" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Transit Security</h3>
                  <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                    Dedicated highway monitoring and freight facilitation for uninterrupted interstate commercial transit.
                  </p>
                </GlassCard>
              </TiltCard>

              <TiltCard>
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-lg bg-embta-blue/40 flex items-center justify-center mb-4 text-embta-slate">
                    <Scale className="w-6 h-6 text-embta-green-light" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Dispute Conciliation</h3>
                  <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                    Objective arbitration machinery resolving commercial friction peacefully and expeditiously.
                  </p>
                </GlassCard>
              </TiltCard>

              <TiltCard>
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-lg bg-embta-red/20 flex items-center justify-center mb-4 text-red-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Statutory Advocacy</h3>
                  <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                    Representing merchant rights before municipal, state, and statutory tax authorities.
                  </p>
                </GlassCard>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Focus: The 4 Strategic Wings */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="PORTFOLIO ARCHITECTURE"
            title="Our Focus: 4 Strategic Wings"
            subtitle="Specialized operational divisions structured to address distinct regulatory and commercial domains."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.wings.map((wing) => (
              <TiltCard key={wing.code} className="h-full">
                <GlassCard
                  variant="interactive"
                  className="p-6 h-full flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-3 opacity-15 group-hover:opacity-30 transition-opacity">
                    <span className="font-mono text-4xl font-extrabold text-white">#</span>
                  </div>

                  <div>
                    <div className="w-14 h-14 rounded-xl bg-embta-navy-dark border border-embta-surface-border flex items-center justify-center mb-5 group-hover:border-embta-green/60 transition-colors shadow-sm">
                      {wingIcons[wing.icon]}
                    </div>
                    <span className="text-[11px] font-extrabold tracking-widest text-embta-green-light uppercase font-mono block mb-1">
                      {wing.code}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-embta-slate transition-colors">
                      {wing.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                      {wing.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-embta-surface-border/50 flex items-center justify-between text-xs text-embta-green-light font-semibold">
                    <span>Active Secretariat Wing</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Business Network Conceptual Showcase */}
      <section className="py-20 bg-embta-navy-dark/90 border-y border-embta-surface-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <SectionTitle
                badge="SYNDICATED INFRASTRUCTURE"
                title="The EMBTA Business Network"
                subtitle="A unified commercial ecosystem linking micro-enterprises with major supply networks."
              />
              <p className="text-base text-embta-slate-dim leading-relaxed">
                Through our coordinated network architecture, members gain access to verified trade partnerships, streamlined bulk procurement syndicates, legal dispute resolution, and regulatory compliance assistance.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-embta-navy/70 border border-embta-surface-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-embta-green shrink-0 animate-pulse" />
                  <span className="text-sm font-semibold text-white">
                    Verified Traders Registry & Credentialing
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-embta-navy/70 border border-embta-surface-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-embta-green shrink-0 animate-pulse" />
                  <span className="text-sm font-semibold text-white">
                    24/7 Highway Logistical Coordination Desk
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-embta-navy/70 border border-embta-surface-border">
                  <div className="w-2.5 h-2.5 rounded-full bg-embta-green shrink-0 animate-pulse" />
                  <span className="text-sm font-semibold text-white">
                    Cross-Border Market Arbitrations & Bilateral Accords
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/contact">
                  <Button3D variant="primary" icon={<ExternalLink className="w-4 h-4" />}>
                    JOIN THE NETWORK
                  </Button3D>
                </Link>
              </div>
            </div>

            {/* Interactive 3D Orbit Visual Display */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl bg-embta-navy border border-embta-surface-border shadow-3d-card p-6 flex items-center justify-center overflow-hidden">
                {/* Concentric glowing rings */}
                <div className="absolute inset-8 rounded-full border border-dashed border-embta-green/30 animate-spin" style={{ animationDuration: '40s' }} />
                <div className="absolute inset-20 rounded-full border border-embta-surface-border" />
                <div className="absolute inset-32 rounded-full border border-embta-green/20" />

                {/* Central Emblem Core */}
                <div className="relative z-10 w-28 h-28 rounded-full bg-embta-navy-dark border-2 border-embta-green flex flex-col items-center justify-center p-3 shadow-glow-green">
                  <img
                    src={siteConfig.logoUrl}
                    alt="EMBTA Nucleus"
                    className="w-12 h-12 object-contain filter drop-shadow"
                  />
                  <span className="text-[10px] font-black tracking-widest text-white mt-1">EMBTA</span>
                </div>

                {/* Orbiting Nodes */}
                <div className="absolute top-10 left-12 px-3 py-1 rounded-lg bg-embta-navy-light border border-embta-green/50 text-xs font-bold text-white shadow-md animate-float">
                  Businesses
                </div>
                <div className="absolute top-12 right-10 px-3 py-1 rounded-lg bg-embta-navy-light border border-embta-green/50 text-xs font-bold text-white shadow-md animate-float" style={{ animationDelay: '1s' }}>
                  Traders
                </div>
                <div className="absolute bottom-12 right-12 px-3 py-1 rounded-lg bg-embta-navy-light border border-embta-surface-border text-xs font-bold text-embta-slate shadow-md animate-float" style={{ animationDelay: '2s' }}>
                  Community
                </div>
                <div className="absolute bottom-10 left-10 px-3 py-1 rounded-lg bg-embta-navy-light border border-embta-surface-border text-xs font-bold text-embta-slate shadow-md animate-float" style={{ animationDelay: '3s' }}>
                  Growth
                </div>
                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 px-3 py-1 rounded-lg bg-embta-green text-white text-[11px] font-bold shadow-glow-green">
                  Collaboration
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Core Values Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="CONSTITUTIONAL PRINCIPLES"
            title="Our Core Values"
            subtitle="The fundamental ethical pillars guiding all association deliberations, agreements, and decisions."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.coreValues.map((val) => (
              <TiltCard key={val.title} className="h-full">
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-embta-navy-dark border border-embta-surface-border flex items-center justify-center mb-4">
                      {valueIcons[val.icon]}
                    </div>
                    <span className="text-xs font-bold text-embta-green-light uppercase tracking-wider block mb-1">
                      {val.tagline}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Latest News Preview */}
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

      {/* 8. Gallery Preview */}
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

      {/* 9. Final Call to Action Section */}
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
