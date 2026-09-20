import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-embta-navy-dark border-t border-embta-surface-border relative overflow-hidden text-embta-slate-dim text-sm">
      {/* Subtle background glow */}
      <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-embta-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-embta-green/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Logo (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={siteConfig.logoUrl}
                  alt="EMBTA Official Logo"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-tight leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-xs font-semibold text-embta-green-light mt-0.5">
                  {siteConfig.shortName} • {siteConfig.motto}
                </span>
              </div>
            </Link>

            <p className="text-embta-slate-dim leading-relaxed max-w-sm pt-2">
              {siteConfig.supportingText}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-embta-slate font-medium">
              <ShieldCheck className="w-4 h-4 text-embta-green" />
              <span>Apex Regional Commercial & Traders Guild</span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Quick Links</span>
              <span className="h-0.5 w-6 bg-embta-green rounded" />
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-2 hover:text-white transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-embta-green opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Placeholders (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>Official Secretariat</span>
              <span className="h-0.5 w-6 bg-embta-green rounded" />
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-embta-green shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-embta-slate font-semibold">
                    Address
                  </span>
                  <span className="text-white font-mono">{siteConfig.contact.address}</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-embta-green shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-embta-slate font-semibold">
                    Phone
                  </span>
                  <span className="text-white font-mono">{siteConfig.contact.phone}</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-embta-green shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-embta-slate font-semibold">
                    Official Email
                  </span>
                  {siteConfig.contact.email.includes('@') && !siteConfig.contact.email.includes('[') ? (
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-white hover:text-embta-green-light font-mono underline transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  ) : (
                    <span className="text-white font-mono">{siteConfig.contact.email}</span>
                  )}
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-embta-slate-dim shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-embta-slate font-semibold">
                    Hours
                  </span>
                  <span className="text-white font-mono">{siteConfig.contact.officeHours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Statutory Tag */}
        <div className="pt-8 mt-8 border-t border-embta-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-embta-slate-dim text-center sm:text-left">
            {siteConfig.copyright}
          </p>

          <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase text-embta-slate-dim">
            <span>Motto: {siteConfig.motto}</span>
            <span>•</span>
            <span className="text-embta-green-light">Statutory Trade Body</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
