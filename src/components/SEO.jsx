import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({ 
  title = "PHP Plugin Hub - The Ultimate Marketplace for PHP Extensions", 
  description = "Discover, analyze, and compare the best plugins, extensions, and packages for WordPress, Laravel, Joomla, and Drupal in one unified marketplace dashboard.",
  url = "https://php-plugin-hub.phptutorialpoints.in",
  image = "https://php-plugin-hub.phptutorialpoints.in/og-image.jpg"
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
