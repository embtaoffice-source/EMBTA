import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Polyhedron3D } from '../components/3d/Polyhedron3D';
import { Button3D } from '../components/common/Button3D';
import { GlassCard } from '../components/common/GlassCard';
import { SEOHead } from '../components/layout/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-embta-navy text-embta-light flex items-center justify-center pt-20 pb-16 px-4 relative overflow-hidden">
      <SEOHead
        title="404 Page Not Found"
        description="The requested page could not be located in the EMBTA official digital portal directory."
      />

      {/* Ambient background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-embta-blue/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-embta-green/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-6">
        {/* Tumbling 3D Geometric Object */}
        <Polyhedron3D className="w-48 h-48 sm:w-64 sm:h-64 mx-auto" />

        <div className="space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-embta-red/15 border border-embta-red/30 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
            ERROR 404 • ROUTE UNRESOLVED
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-embta-slate-dim leading-relaxed max-w-md mx-auto">
            The institutional record or directory address you requested does not exist or has been relocated within the EMBTA archives.
          </p>
        </div>

        {/* Action Button: BACK TO HOME */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <Link to="/">
            <Button3D variant="primary" size="lg" icon={<Home className="w-4 h-4" />}>
              BACK TO HOME
            </Button3D>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-embta-slate hover:text-white bg-embta-navy-light/60 hover:bg-embta-navy-light border border-embta-surface-border transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="pt-8 border-t border-embta-surface-border/60 text-xs text-embta-slate-dim font-mono">
          EASTERN MARING BUSINESS & TRADERS ASSOCIATION
        </div>
      </div>
    </div>
  );
};
