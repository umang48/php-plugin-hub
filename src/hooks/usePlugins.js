import { useState, useEffect, useMemo } from 'react';

// Helper to generate realistic looking chart data
const generateUsageData = (baseDownloads) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let current = baseDownloads * 0.8; // start at 80% of current
  return months.map(month => {
    current = current + (baseDownloads * 0.05 * Math.random());
    return { month, active: Math.floor(current) };
  });
};

// Helper to decode HTML entities in text (e.g. &#8211; -> -)
const decodeHtml = (html) => {
  if (!html) return '';
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Static mock data for platforms without easily accessible unauthenticated JSON APIs
const MOCK_OTHER_PLUGINS = [
  {
    id: 'dr-pathauto',
    name: 'Pathauto',
    author: 'md-systems',
    platform: 'Drupal',
    description: 'Provides a mechanism for modules to automatically generate aliases for the content they manage.',
    version: '8.x-1.11',
    lastUpdated: '2023-11-20',
    rating: '4.5',
    downloads: 600000,
    link: 'https://www.drupal.org/project/pathauto',
    source: 'https://git.drupalcode.org/project/pathauto',
    tags: ['seo', 'url', 'routing'],
    usageData: generateUsageData(600000),
    issueData: [
      { name: 'Resolved', value: 450, color: '#10b981' },
      { name: 'Open', value: 120, color: '#ef4444' },
    ]
  },
  {
    id: 'dr-token',
    name: 'Token',
    author: 'Dave Reid',
    platform: 'Drupal',
    description: 'Provides a shared API for replacement of textual placeholders with actual data.',
    version: '8.x-1.12',
    lastUpdated: '2023-12-15',
    rating: '4.8',
    downloads: 900000,
    link: 'https://www.drupal.org/project/token',
    source: 'https://git.drupalcode.org/project/token',
    tags: ['api', 'utility'],
    usageData: generateUsageData(900000),
    issueData: [
      { name: 'Resolved', value: 890, color: '#10b981' },
      { name: 'Open', value: 34, color: '#ef4444' },
    ]
  },
  {
    id: 'joom-akeeba',
    name: 'Akeeba Backup',
    author: 'Nicholas K. Dionysopoulos',
    platform: 'Joomla',
    description: 'The most widely used open-source backup component for the Joomla! CMS.',
    version: '9.8.0',
    lastUpdated: '2024-03-01',
    rating: '4.7',
    downloads: 1200000,
    link: 'https://extensions.joomla.org/extension/akeeba-backup/',
    source: 'https://github.com/akeeba/akeebabackupcore',
    tags: ['backup', 'security', 'restore'],
    usageData: generateUsageData(1200000),
    issueData: [
      { name: 'Resolved', value: 300, color: '#10b981' },
      { name: 'Open', value: 45, color: '#ef4444' },
    ]
  },
  {
    id: 'joom-jce',
    name: 'JCE Editor',
    author: 'Ryan Demmer',
    platform: 'Joomla',
    description: 'An award-winning, configurable WYSIWYG editor for Joomla.',
    version: '2.9.60',
    lastUpdated: '2024-02-14',
    rating: '4.9',
    downloads: 2500000,
    link: 'https://extensions.joomla.org/extension/jce/',
    source: 'https://github.com/widgetfactory/jce',
    tags: ['editor', 'wysiwyg', 'content'],
    usageData: generateUsageData(2500000),
    issueData: [
      { name: 'Resolved', value: 1200, color: '#10b981' },
      { name: 'Open', value: 15, color: '#ef4444' },
    ]
  }
];

export function usePlugins() {
  const [plugins, setPlugins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPlugins = async () => {
      setIsLoading(true);
      let wpPlugins = [];
      let laravelPlugins = [];

      // 1. Fetch Real Data from WordPress.org API
      try {
        const wpRes = await fetch('https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request[per_page]=24&request[browse]=popular');
        if (wpRes.ok) {
          const wpData = await wpRes.json();
          wpPlugins = wpData.plugins.map(p => ({
            id: `wp-${p.slug}`,
            name: decodeHtml(p.name),
            author: p.author ? decodeHtml(p.author.replace(/(<([^>]+)>)/gi, "")) : 'Unknown',
            platform: 'WordPress',
            description: decodeHtml(p.short_description),
            version: p.version,
            lastUpdated: p.last_updated ? p.last_updated.substring(0, 10) : 'N/A',
            rating: p.rating ? ((p.rating / 100) * 5).toFixed(1) : '0.0',
            downloads: p.downloaded || p.active_installs || 0,
            link: `https://wordpress.org/plugins/${p.slug}/`,
            source: `https://plugins.trac.wordpress.org/browser/${p.slug}/`,
            tags: Object.values(p.tags || {}).slice(0, 3),
            usageData: generateUsageData(p.active_installs || p.downloaded || 10000),
            issueData: [
              { name: 'Resolved', value: Math.floor(Math.random() * 800) + 100, color: '#10b981' },
              { name: 'Open', value: Math.floor(Math.random() * 100), color: '#ef4444' }
            ]
          }));
        }
      } catch (err) {
        console.error("Failed to fetch WordPress plugins:", err);
      }

      // 2. Fetch Real Data from Packagist (Laravel ecosystem) with CORS Proxy
      try {
        // Using allorigins to bypass strict Packagist CORS CDN caching issues
        const packagistUrl = encodeURIComponent('https://packagist.org/search.json?tags=laravel&per_page=12');
        const packagistRes = await fetch(`https://api.allorigins.win/raw?url=${packagistUrl}`);
        
        if (packagistRes.ok) {
          const packagistData = await packagistRes.json();
          laravelPlugins = packagistData.results.map(p => ({
            id: `lar-${p.name.replace('/', '-')}`,
            name: p.name,
            author: p.name.split('/')[0],
            platform: 'Laravel',
            description: p.description,
            version: 'latest',
            lastUpdated: new Date().toISOString().substring(0, 10),
            rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
            downloads: p.downloads || 0,
            link: p.url,
            source: p.repository,
            tags: ['laravel', 'php'],
            usageData: generateUsageData(p.downloads || 10000),
            issueData: [
              { name: 'Resolved', value: Math.floor(Math.random() * 500) + 50, color: '#10b981' },
              { name: 'Open', value: Math.floor(Math.random() * 80), color: '#ef4444' }
            ]
          }));
        }
      } catch (err) {
        console.error("Failed to fetch Laravel plugins:", err);
      }

      // Combine what we successfully fetched with our Mocked Data
      const allPlugins = [...wpPlugins, ...laravelPlugins, ...MOCK_OTHER_PLUGINS];
      
      if (wpPlugins.length === 0 && laravelPlugins.length === 0) {
        setError('Connected using limited dataset due to network restrictions.');
      }
      
      // Shuffle the array slightly so it looks dynamic
      setPlugins(allPlugins.sort(() => Math.random() - 0.5));
      setIsLoading(false);
    };

    fetchAllPlugins();
  }, []);

  const getPluginById = useMemo(() => {
    return (id) => plugins.find(p => p.id === id);
  }, [plugins]);

  return { plugins, isLoading, error, getPluginById };
}
