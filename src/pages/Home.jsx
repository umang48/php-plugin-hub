import React, { useState, useMemo } from 'react';
import { usePlugins } from '../hooks/usePlugins';
import { PluginCard } from '../components/PluginCard';
import { Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';

const CATEGORIES = ['All', 'WordPress', 'Laravel', 'Joomla', 'Drupal'];

export function Home() {
  const { plugins, isLoading, error } = usePlugins();
  
  // State for the currently selected platform filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // useMemo ensures we only filter the array when either plugins or selectedCategory changes
  const filteredPlugins = useMemo(() => {
    if (selectedCategory === 'All') return plugins;
    return plugins.filter(p => p.platform === selectedCategory);
  }, [plugins, selectedCategory]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SEO />
      {/* Header section with title and description */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50 mb-4">
            Discover Top <span className="text-brand-400">PHP Packages</span>
          </h1>
          <p className="text-lg text-slate-400">
            Explore and analyze the best extensions, plugins, and libraries across major PHP ecosystems. 
            Curated metrics to help you make informed architectural decisions.
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="w-10 h-10 animate-spin text-brand-500 mb-4" />
          <p>Loading registry data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl text-center">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map(plugin => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
          {filteredPlugins.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800 border-dashed">
              No plugins found for this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
