import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Compass,
  ArrowRight,
  Layers,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building,
} from 'lucide-react';
import { aboutData } from '../data/aboutData';
import { siteConfig } from '../data/siteConfig';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SectionTitle } from '../components/common/SectionTitle';
import { GlassCard } from '../components/common/GlassCard';
import { TiltCard } from '../components/3d/TiltCard';
import { Button3D } from '../components/common/Button3D';
import { SEOHead } from '../components/layout/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-embta-navy text-embta-light pt-20">
      <SEOHead
        title="About EMBTA"
        description="Learn about the history, mission, vision, purpose, and constitutional objectives of the Eastern Maring Business & Traders Association."
      />

      {/* Breadcrumb Bar */}
      <div className="bg-embta-navy-dark border-b border-embta-surface-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Breadcrumb items={[{ label: 'About EMBTA' }]} />
          <span className="hidden sm:inline-block text-xs font-mono text-embta-green-light">
            CHARTER ID: EMBTA/ADM-2026
          </span>
        </div>
      </div>

      {/* 1. Page Hero: 3D Network Conceptual Visual */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-embta-navy-dark via-embta-navy to-embta-navy border-b border-embta-surface-border overflow-hidden">
        {/* Ambient 3D lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-embta-green/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-embta-blue/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-embta-green/15 border border-embta-green/30 text-xs font-bold uppercase tracking-wider text-embta-green-light">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aboutData.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {aboutData.hero.title}
              </h1>

              <p className="text-base sm:text-xl text-embta-slate leading-relaxed">
                {aboutData.hero.subtitle}
              </p>

              <div className="p-4 rounded-xl bg-embta-navy-light/50 border border-embta-surface-border text-xs sm:text-sm text-embta-slate-dim flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-embta-green shrink-0" />
                <span>
                  All institutional mandates are democratically ratified under the registered constitution of the association.
                </span>
              </div>
            </div>

            {/* Conceptual 3D Business Network (Section 11) */}
            <div className="lg:col-span-5 flex justify-center">
              <TiltCard maxTilt={12} className="w-full max-w-md">
                <div className="relative aspect-square rounded-2xl bg-embta-navy-dark/90 border border-embta-surface-border shadow-3d-card p-6 flex items-center justify-center overflow-hidden">
                  {/* Glowing Connection Rays SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#1b873f" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
                    <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#24a14d" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
                    <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="#8ca4c2" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
                    <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="#8ca4c2" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
                    <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#1b873f" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
                  </svg>

                  {/* Central Nucleus: EMBTA */}
                  <div className="relative z-10 w-28 h-28 rounded-full bg-embta-navy border-2 border-embta-green flex flex-col items-center justify-center p-3 shadow-glow-green animate-pulse-slow">
                    <img
                      src={siteConfig.logoUrl}
                      alt="EMBTA Central Nucleus"
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-[11px] font-black text-white mt-1">EMBTA</span>
                  </div>

                  {/* 5 Outer Nodes: Businesses, Traders, Community, Collaboration, Growth */}
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-embta-navy-light/90 border border-embta-green/50 text-xs font-bold text-white shadow-md">
                    Businesses
                  </div>
                  <div className="absolute top-6 right-6 px-3 py-1.5 rounded-lg bg-embta-navy-light/90 border border-embta-green/50 text-xs font-bold text-white shadow-md">
                    Traders
                  </div>
                  <div className="absolute bottom-14 right-4 px-3 py-1.5 rounded-lg bg-embta-navy-light/90 border border-embta-surface-border text-xs font-bold text-embta-slate shadow-md">
                    Community
                  </div>
                  <div className="absolute bottom-14 left-4 px-3 py-1.5 rounded-lg bg-embta-navy-light/90 border border-embta-surface-border text-xs font-bold text-embta-slate shadow-md">
                    Growth
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-lg bg-embta-green text-white text-xs font-bold shadow-glow-green">
                    Collaboration
                  </div>
                </div>
                <p className="text-[11px] text-center text-embta-slate-dim mt-2 italic">
                  *Conceptual representation of institutional synergies (not live member census).
                </p>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <SectionTitle
                badge="INSTITUTIONAL IDENTITY"
                title={aboutData.whoWeAre.title}
                subtitle={aboutData.whoWeAre.lead}
              />
              <p className="text-base text-embta-slate-dim leading-relaxed">
                {aboutData.whoWeAre.body}
              </p>
              <blockquote className="p-4 rounded-xl bg-embta-navy-light border-l-4 border-embta-green text-lg font-bold text-white italic">
                {aboutData.whoWeAre.quote}
              </blockquote>
            </div>

            <div className="lg:col-span-6">
              <GlassCard variant="navy" className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-embta-green/20 flex items-center justify-center text-embta-green-light shrink-0">
                    <Building className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Apex Commercial Umbrella</h3>
                    <span className="text-xs text-embta-slate-dim">Regional Syndicate Framework</span>
                  </div>
                </div>
                <div className="space-y-3 pt-2 text-sm text-embta-slate-dim">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-embta-green mt-0.5 shrink-0" />
                    <span>Democratic representation across all commercial guilds and market sectors.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-embta-green mt-0.5 shrink-0" />
                    <span>Active liaison with district and transit enforcement commissioners.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-embta-green mt-0.5 shrink-0" />
                    <span>Capacity development programs for budding local entrepreneurs and traders.</span>
                  </div>
                </div>
              </GlassCard>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BACKGROUND: 3D Timeline (Section 12) */}
      <section className="py-20 bg-embta-navy-dark/80 border-y border-embta-surface-border relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="HISTORICAL CHRONOLOGY"
            title={aboutData.background.title}
            subtitle={aboutData.background.description}
            align="center"
          />

          <div className="relative max-w-4xl mx-auto mt-12">
            {/* Timeline center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-embta-green via-teal-400 to-embta-surface-border md:-translate-x-1/2" />

            <div className="space-y-10">
              {aboutData.background.milestones.map((milestone, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    } gap-8`}
                  >
                    {/* Node Dot */}
                    <div className="absolute left-4 md:left-1/2 top-1.5 w-6 h-6 rounded-full bg-embta-navy border-4 border-embta-green shadow-glow-green -translate-x-1/2 z-10" />

                    {/* Content Card */}
                    <div className="ml-12 md:ml-0 md:w-1/2 px-2">
                      <TiltCard maxTilt={5}>
                        <GlassCard className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-embta-green-light" />
                            <span className="font-mono text-xs font-bold text-embta-green-light uppercase px-2 py-0.5 rounded bg-embta-green/20">
                              {milestone.year}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                            {milestone.description}
                          </p>
                        </GlassCard>
                      </TiltCard>
                    </div>

                    {/* Empty half for spacing */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION (Sections 13 & 14) */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Section 13: Large Floating Glass 3D Panel for MISSION */}
            <TiltCard maxTilt={6} className="h-full">
              <GlassCard
                variant="navy"
                className="p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden border-embta-green/40 shadow-3d-card"
              >
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-embta-green/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-embta-green/20 border border-embta-green/40 flex items-center justify-center text-embta-green-light mb-6 shadow-glow-green">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-embta-green-light block mb-2">
                    Constitutional Charter
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                    {aboutData.mission.title}
                  </h2>
                  <div className="p-5 rounded-xl bg-embta-navy-dark/90 border border-embta-surface-border mb-4">
                    <p className="text-lg font-mono font-bold text-embta-green-light">
                      {aboutData.mission.content}
                    </p>
                  </div>
                  <p className="text-sm text-embta-slate-dim leading-relaxed">
                    {aboutData.mission.supportingText}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-embta-surface-border text-xs text-embta-slate-dim flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-embta-green" />
                  <span>Mandated by General Assembly Resolution</span>
                </div>
              </GlassCard>
            </TiltCard>

            {/* Section 14: VISION with 3D Path toward Bright Focal Point */}
            <TiltCard maxTilt={6} className="h-full">
              <GlassCard
                variant="navy"
                className="p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden border-embta-surface-border shadow-3d-card"
              >
                {/* 3D Path toward a bright focal point visual */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-embta-blue/40 border border-embta-surface-border flex items-center justify-center text-white mb-6">
                    <Compass className="w-7 h-7 text-embta-green-light" />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-embta-slate block mb-2">
                    Strategic Horizon
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                    {aboutData.vision.title}
                  </h2>
                  <div className="p-5 rounded-xl bg-embta-navy-dark/90 border border-embta-surface-border mb-4">
                    <p className="text-lg font-mono font-bold text-embta-slate">
                      {aboutData.vision.content}
                    </p>
                  </div>
                  <p className="text-sm text-embta-slate-dim leading-relaxed">
                    {aboutData.vision.supportingText}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-embta-surface-border flex items-center justify-between text-xs text-embta-slate-dim">
                  <span>Guiding 2026–2030 Roadmap</span>
                  <span className="text-embta-green-light font-bold">Progressive Horizon →</span>
                </div>
              </GlassCard>
            </TiltCard>

          </div>
        </div>
      </section>

      {/* 5. PURPOSE AND OBJECTIVES: 3D Cards (Section 15) */}
      <section className="py-20 bg-embta-navy-dark/80 border-t border-embta-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="DEMO CONCEPTS"
            title="Purpose & Objectives"
            subtitle="Operational pillars driving day-to-day secretariat initiatives and community impact."
          />

          {/* Purpose Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {aboutData.purposeItems.map((item) => (
              <TiltCard key={item.title} className="h-full">
                <GlassCard className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-embta-green/15 text-embta-green-light border border-embta-green/30">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-embta-slate-dim bg-white/5 px-2 py-0.5 rounded">
                        DEMO
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-embta-slate-dim leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>

          {/* Objectives List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.objectives.map((obj) => (
              <GlassCard key={obj.id} className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-embta-green/20 text-embta-green-light flex items-center justify-center font-mono font-bold text-xs shrink-0">
                  {obj.id.slice(-2)}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                    {obj.title}
                  </h4>
                  <p className="text-xs text-embta-slate-dim leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-20 bg-embta-navy border-t border-embta-surface-border text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engage with the EMBTA Secretariat
          </h2>
          <p className="text-base text-embta-slate-dim max-w-xl mx-auto">
            Review the executive leadership team or connect directly with our contact desk for business registration and inquiries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/executive">
              <Button3D variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                EXECUTIVE PROFILE
              </Button3D>
            </Link>
            <Link to="/contact">
              <Button3D variant="secondary">
                CONTACT DESK
              </Button3D>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
