import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Quote,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';
import { executiveData } from '../data/executiveData';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SectionTitle } from '../components/common/SectionTitle';
import { GlassCard } from '../components/common/GlassCard';
import { TiltCard } from '../components/3d/TiltCard';
import { Button3D } from '../components/common/Button3D';
import { SEOHead } from '../components/layout/SEOHead';

export const ExecutivePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-embta-navy text-embta-light pt-20">
      <SEOHead
        title="Executive Profile"
        description="Meet the executive leadership and constitutional directorate of the Eastern Maring Business & Traders Association."
      />

      {/* Breadcrumb Bar */}
      <div className="bg-embta-navy-dark border-b border-embta-surface-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <Breadcrumb items={[{ label: 'Executive Profile' }]} />
          <div className="flex items-center gap-2 text-xs font-mono text-embta-green-light">
            <span className="w-2 h-2 rounded-full bg-embta-green animate-pulse" />
            <span>{executiveData.hero.tenureNote}</span>
          </div>
        </div>
      </div>

      {/* 1. Page Hero */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-b from-embta-navy-dark via-embta-navy to-embta-navy border-b border-embta-surface-border overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-embta-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-embta-blue/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-embta-blue/50 border border-embta-surface-border text-xs font-bold uppercase tracking-wider text-embta-slate">
              <Sparkles className="w-3.5 h-3.5 text-embta-green" />
              <span>{executiveData.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {executiveData.hero.title}
            </h1>

            <p className="text-base sm:text-xl text-embta-slate leading-relaxed">
              {executiveData.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Executive Council Address Feature */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard maxTilt={4} className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-embta-navy-dark via-embta-surface to-embta-navy-dark border border-embta-surface-border shadow-3d-card p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-embta-green/20 flex items-center justify-center text-embta-green-light">
                      <Quote className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-embta-green-light block">
                        {executiveData.councilMessage.tagline}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {executiveData.councilMessage.title}
                      </h2>
                    </div>
                  </div>

                  <blockquote className="text-base sm:text-lg text-embta-slate leading-relaxed italic border-l-4 border-embta-green pl-4">
                    {executiveData.councilMessage.quote}
                  </blockquote>

                  <div className="pt-2 text-xs font-mono text-embta-slate-dim space-y-1">
                    <p className="text-white font-bold">{executiveData.councilMessage.signatory}</p>
                    <p>{executiveData.councilMessage.jurisdiction}</p>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-xl bg-embta-navy/80 border border-embta-surface-border space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-embta-green" />
                    <span>Constitutional Tenets</span>
                  </h3>
                  <div className="space-y-3 text-xs text-embta-slate-dim">
                    {executiveData.councilMessage.tenets.map((tenet, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-embta-green-light mt-0.5 shrink-0" />
                        <span>{tenet}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 3. 3D Executive Cards Grid (Section 17) */}
      <section className="py-16 bg-embta-navy-dark/70 border-t border-embta-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="LEADERSHIP DIRECTORY"
            title="Appointed Executive Directorate"
            subtitle="The 6 constitutional portfolios responsible for administrative stewardship."
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveData.executives.map((exec) => (
              <TiltCard
                key={exec.id}
                maxTilt={8}
                scale={1.025}
                className="h-full"
              >
                <GlassCard
                  variant="interactive"
                  className="p-7 h-full flex flex-col justify-between relative overflow-hidden group shadow-3d-card"
                >
                  {/* Top accent badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    {/* Placeholder Avatar Frame */}
                    <div className="relative w-20 h-20 rounded-2xl bg-embta-navy-dark border-2 border-embta-surface-border flex items-center justify-center text-xl font-extrabold text-white shadow-inner group-hover:border-embta-green transition-colors shrink-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-embta-green/20 via-transparent to-transparent opacity-60" />
                      <span className="relative z-10 tracking-wider font-mono">
                        {exec.initials}
                      </span>
                      <div className="absolute bottom-1 right-1 bg-embta-green text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        OFFICIAL
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider bg-embta-green/15 text-embta-green-light border border-embta-green/30">
                        {exec.officialBadge}
                      </span>
                      <span className="block text-[11px] font-mono text-embta-slate-dim mt-1.5">
                        Tenure: {exec.tenure}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <span className="text-xs font-extrabold text-embta-green-light uppercase tracking-wider block">
                        {exec.position}
                      </span>
                      <h3 className="text-xl font-black text-white group-hover:text-embta-slate transition-colors">
                        {exec.name}
                      </h3>
                      <p className="text-xs text-embta-slate font-medium mt-0.5">
                        {exec.department}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-embta-navy-dark/90 border border-embta-surface-border">
                      <p className="text-xs text-embta-slate-dim leading-relaxed font-mono">
                        {exec.bio}
                      </p>
                    </div>

                    <div className="pt-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-embta-slate block mb-2">
                        Core Responsibilities:
                      </span>
                      <ul className="space-y-1.5 text-xs text-embta-slate-dim">
                        {exec.coreResponsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-embta-green mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Verification Footer */}
                  <div className="pt-6 mt-6 border-t border-embta-surface-border/60 flex items-center justify-between text-xs text-embta-slate-dim">
                    <span className="flex items-center gap-1 text-embta-green-light font-semibold">
                      <UserCheck className="w-3.5 h-3.5" />
                      Constitutional Portfolio
                    </span>
                    <span className="font-mono text-[10px] text-embta-slate-dim">
                      STATUS: ACTIVE
                    </span>
                  </div>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom Secretariat CTA */}
      <section className="py-20 bg-embta-navy border-t border-embta-surface-border text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Award className="w-12 h-12 text-embta-green mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Connect with the Executive Council
          </h2>
          <p className="text-sm sm:text-base text-embta-slate-dim">
            For formal representation, administrative hearings, or memorandum submissions, please route inquiries via the official Contact Desk.
          </p>
          <div className="pt-2">
            <Link to="/contact">
              <Button3D variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                PROCEED TO CONTACT DESK
              </Button3D>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
