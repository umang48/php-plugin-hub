import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Download, Clock } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const platformColors = {
  WordPress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Laravel: 'bg-red-500/10 text-red-400 border-red-500/20',
  Drupal: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Joomla: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export function PluginCard({ plugin }) {
  return (
    <Link 
      to={`/plugin/${plugin.id}`}
      className="card p-6 flex flex-col gap-4 hover:border-brand-500/50 hover:shadow-brand-500/10 transition-all group"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-lg text-slate-100 group-hover:text-brand-400 transition-colors line-clamp-1">
            {plugin.name}
          </h3>
          <p className="text-sm text-slate-400 mt-1">by {plugin.author}</p>
        </div>
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap",
          platformColors[plugin.platform] || 'bg-slate-800 text-slate-300 border-slate-700'
        )}>
          {plugin.platform}
        </span>
      </div>

      <p className="text-sm text-slate-300 line-clamp-2 flex-1">
        {plugin.description}
      </p>

      <div className="flex items-center gap-4 mt-2 pt-4 border-t border-slate-800/50">
        <div className="flex items-center gap-1 text-sm text-slate-400">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="font-medium text-slate-200">{plugin.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-slate-400">
          <Download className="w-4 h-4" />
          <span>{(plugin.downloads / 1000000).toFixed(1)}M</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-slate-400 ml-auto">
          <Clock className="w-4 h-4" />
          <span>v{plugin.version}</span>
        </div>
      </div>
    </Link>
  );
}
