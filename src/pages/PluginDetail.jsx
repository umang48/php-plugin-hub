import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlugins } from '../hooks/usePlugins';
import { 
  ArrowLeft, Star, Download, Clock, User, Code, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export function PluginDetail() {
  // useParams gives us access to URL parameters (e.g., the plugin ID from /plugin/:id)
  const { id } = useParams();
  const { isLoading, error, getPluginById } = usePlugins();
  
  const plugin = getPluginById(id);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !plugin) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Plugin not found</h2>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      {/* Breadcrumb / Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Marketplace
      </Link>

      {/* Hero Header */}
      <div className="card p-8 bg-gradient-to-br from-slate-900 to-slate-900/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-50">{plugin.name}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
                {plugin.platform}
              </span>
            </div>
            <p className="text-lg text-slate-300 max-w-3xl">{plugin.description}</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary">
              <Download className="w-4 h-4 mr-2" /> Install
            </button>
            <button className="px-4 py-2 rounded-md font-medium border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-2">
              <Code className="w-4 h-4" /> Source
            </button>
          </div>
        </div>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-800/50">
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-medium">By {plugin.author}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-5 h-5 text-slate-500" />
            <span className="text-sm font-medium">Updated {plugin.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-brand-500" />
            <span className="text-sm font-medium">v{plugin.version}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium">{plugin.rating} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <h2 className="text-xl font-semibold text-slate-100 mt-8 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-brand-400" /> Performance & Health Dashboard
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Usage Trends Chart (Line Chart) */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-slate-200 mb-6">Active Installations (Last 6 Months)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={plugin.usageData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{fill: '#94a3b8'}} tickLine={false} axisLine={false} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                  itemStyle={{ color: '#14b8a6' }}
                  formatter={(value) => [new Intl.NumberFormat('en').format(value), 'Active Installs']}
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#14b8a6" 
                  strokeWidth={3} 
                  dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Issues Ratio Chart (Pie/Doughnut Chart) */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-slate-200 mb-6">Issues Resolution Ratio</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={plugin.issueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {plugin.issueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text overlay for Doughnut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
              <span className="text-3xl font-bold text-slate-100">
                {Math.round((plugin.issueData[0].value / (plugin.issueData[0].value + plugin.issueData[1].value)) * 100)}%
              </span>
              <span className="text-xs text-slate-400">Resolved</span>
            </div>
          </div>
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:col-span-3">
          <div className="card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-brand-400" />
            </div>
            <div className="text-3xl font-bold text-slate-50">{plugin.rating}</div>
            <div className="text-sm text-slate-400 mt-1">Average Rating</div>
          </div>
          
          <div className="card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-slate-50">
              {(plugin.downloads / 1000000).toFixed(1)}M+
            </div>
            <div className="text-sm text-slate-400 mt-1">Total Downloads</div>
          </div>
          
          <div className="card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-slate-50">
              {plugin.issueData[1].value}
            </div>
            <div className="text-sm text-slate-400 mt-1">Open Issues</div>
          </div>
        </div>
      </div>
    </div>
  );
}
