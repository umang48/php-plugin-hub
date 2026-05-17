import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Search, Code, Activity } from 'lucide-react';

export function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans selection:bg-brand-500/30">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-brand-500/10 rounded-lg group-hover:bg-brand-500/20 transition-colors">
              <Package className="w-6 h-6 text-brand-500" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-400 group-hover:to-slate-300 transition-all">
              PHP Plugin Hub
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link to="/" className={`${isHome ? 'text-brand-400' : 'hover:text-slate-200'} transition-colors`}>
              Marketplace
            </Link>
            <Link to="/" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              <Activity className="w-4 h-4" /> Trending
            </Link>
            <Link to="/" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              <Code className="w-4 h-4" /> Open Source
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search packages..." 
                className="pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 w-64 placeholder:text-slate-600 transition-all focus:w-72"
              />
            </div>
            <button className="btn-primary rounded-full hidden sm:inline-flex">Submit Plugin</button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <footer className="border-t border-slate-800 py-8 mt-auto bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            <span className="font-semibold text-slate-300">PHP Plugin Hub</span>
          </div>
          <p>An aggregator for the best WordPress, Laravel, Joomla, and Drupal packages.</p>
        </div>
      </footer>
    </div>
  );
}
