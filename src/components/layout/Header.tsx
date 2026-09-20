import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-embta-navy/95 backdrop-blur-md shadow-glass-sm border-b border-embta-surface-border/80 py-2.5'
          : 'bg-gradient-to-b from-embta-navy-dark/90 via-embta-navy/70 to-transparent backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Association Title */}
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-embta-green rounded-lg p-1"
          >
            {/* EMBTA Logo with subtle depth and glow */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full bg-embta-green/20 blur-md group-hover:bg-embta-green/35 transition-colors" />
              <img
                src={siteConfig.logoUrl}
                alt="EMBTA Official Logo"
                className="relative w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight group-hover:text-embta-slate transition-colors">
                {siteConfig.name}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-extrabold text-embta-green-light tracking-wider">
                  {siteConfig.shortName}
                </span>
                <span className="text-[10px] text-embta-slate-dim font-medium hidden sm:inline">
                  • {siteConfig.motto}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {siteConfig.navLinks.map((item) => {
              const active = isActive(item.href);
              const isContact = item.href === '/contact';

              if (isContact) {
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`ml-3 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                      active
                        ? 'bg-embta-green text-white shadow-glow-green'
                        : 'bg-embta-green/90 hover:bg-embta-green text-white hover:shadow-glow-green hover:-translate-y-0.5'
                    }`}
                  >
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-3.5 py-2 rounded-md text-xs font-bold tracking-wider transition-all duration-200 uppercase ${
                    active
                      ? 'text-white'
                      : 'text-embta-slate hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.title}</span>
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-embta-green rounded-full shadow-[0_0_8px_#1b873f]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-embta-slate hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-embta-green cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-embta-navy-dark/95 backdrop-blur-xl border-b border-embta-surface-border shadow-2xl animate-fade-in">
          <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col space-y-2">
            {siteConfig.navLinks.map((item) => {
              const active = isActive(item.href);
              const isContact = item.href === '/contact';

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-3 rounded-lg text-sm font-bold tracking-wide uppercase transition-colors flex items-center justify-between ${
                    isContact
                      ? 'bg-embta-green text-white mt-2 shadow-glow-green'
                      : active
                      ? 'bg-embta-blue text-white border-l-4 border-embta-green'
                      : 'text-embta-slate hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.title}</span>
                  {isContact && <ArrowUpRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
