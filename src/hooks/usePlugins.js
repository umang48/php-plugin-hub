import { useState, useEffect, useMemo } from 'react';

// Robust mock JSON data structure representing data from varying APIs.
// We standardize it for our application to use uniformly.
const MOCK_PLUGINS = [
  {
    id: 'wp-acf',
    name: 'Advanced Custom Fields',
    author: 'WP Engine',
    platform: 'WordPress',
    description: 'Customize WordPress with powerful, professional and intuitive fields.',
    version: '6.2.5',
    lastUpdated: '2024-01-15',
    rating: 4.9,
    downloads: 2000000,
    tags: ['fields', 'custom', 'meta'],
    // Mock metric data for charts
    usageData: [
      { month: 'Jan', active: 1800000 },
      { month: 'Feb', active: 1850000 },
      { month: 'Mar', active: 1880000 },
      { month: 'Apr', active: 1900000 },
      { month: 'May', active: 1950000 },
      { month: 'Jun', active: 2000000 },
    ],
    issueData: [
      { name: 'Resolved', value: 850, color: '#10b981' },
      { name: 'Open', value: 150, color: '#ef4444' },
    ]
  },
  {
    id: 'lar-debugbar',
    name: 'Laravel Debugbar',
    author: 'Barry vd. Heuvel',
    platform: 'Laravel',
    description: 'Integrates PHP Debug Bar with Laravel.',
    version: '3.10.0',
    lastUpdated: '2024-02-10',
    rating: 4.8,
    downloads: 50000000,
    tags: ['debug', 'profiler', 'developer-tool'],
    usageData: [
      { month: 'Jan', active: 4500000 },
      { month: 'Feb', active: 4600000 },
      { month: 'Mar', active: 4700000 },
      { month: 'Apr', active: 4800000 },
      { month: 'May', active: 4900000 },
      { month: 'Jun', active: 5000000 },
    ],
    issueData: [
      { name: 'Resolved', value: 1200, color: '#10b981' },
      { name: 'Open', value: 80, color: '#ef4444' },
    ]
  },
  {
    id: 'dr-pathauto',
    name: 'Pathauto',
    author: 'md-systems',
    platform: 'Drupal',
    description: 'Provides a mechanism for modules to automatically generate aliases for the content they manage.',
    version: '8.x-1.11',
    lastUpdated: '2023-11-20',
    rating: 4.5,
    downloads: 600000,
    tags: ['seo', 'url', 'routing'],
    usageData: [
      { month: 'Jan', active: 550000 },
      { month: 'Feb', active: 560000 },
      { month: 'Mar', active: 570000 },
      { month: 'Apr', active: 580000 },
      { month: 'May', active: 590000 },
      { month: 'Jun', active: 600000 },
    ],
    issueData: [
      { name: 'Resolved', value: 450, color: '#10b981' },
      { name: 'Open', value: 120, color: '#ef4444' },
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
    rating: 4.7,
    downloads: 1200000,
    tags: ['backup', 'security', 'restore'],
    usageData: [
      { month: 'Jan', active: 1100000 },
      { month: 'Feb', active: 1120000 },
      { month: 'Mar', active: 1150000 },
      { month: 'Apr', active: 1170000 },
      { month: 'May', active: 1180000 },
      { month: 'Jun', active: 1200000 },
    ],
    issueData: [
      { name: 'Resolved', value: 300, color: '#10b981' },
      { name: 'Open', value: 45, color: '#ef4444' },
    ]
  },
  {
    id: 'wp-elementor',
    name: 'Elementor Website Builder',
    author: 'Elementor.com',
    platform: 'WordPress',
    description: 'The Elementor Website Builder has it all: drag and drop page builder, pixel perfect design, mobile responsive editing, and more.',
    version: '3.20.0',
    lastUpdated: '2024-03-10',
    rating: 4.6,
    downloads: 5000000,
    tags: ['page-builder', 'design', 'drag-drop'],
    usageData: [
      { month: 'Jan', active: 4800000 },
      { month: 'Feb', active: 4850000 },
      { month: 'Mar', active: 4900000 },
      { month: 'Apr', active: 4950000 },
      { month: 'May', active: 4980000 },
      { month: 'Jun', active: 5000000 },
    ],
    issueData: [
      { name: 'Resolved', value: 3500, color: '#10b981' },
      { name: 'Open', value: 400, color: '#ef4444' },
    ]
  }
];

export function usePlugins() {
  // useState manages local state within our functional component.
  // We initialize with empty arrays and a loading state to simulate network latency.
  const [plugins, setPlugins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect is used for side effects, like fetching data.
  // The empty dependency array [] means this runs exactly once when the component mounts.
  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        // Simulate network request delay (800ms)
        await new Promise(resolve => setTimeout(resolve, 800));
        setPlugins(MOCK_PLUGINS);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch plugins data');
        setIsLoading(false);
      }
    };

    fetchPlugins();
  }, []);

  // useMemo caches the return value so it's only recalculated when 'plugins' changes.
  // We provide a helper to grab a single plugin by ID.
  const getPluginById = useMemo(() => {
    return (id) => plugins.find(p => p.id === id);
  }, [plugins]);

  return { plugins, isLoading, error, getPluginById };
}
