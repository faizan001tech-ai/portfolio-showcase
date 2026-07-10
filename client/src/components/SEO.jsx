import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path, image }) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://your-portfolio.vercel.app';
  const fullTitle = `${title} | Faizan - MERN Stack Developer`;
  const url = `${siteUrl}${path}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Muhammad Faizan',
    jobTitle: 'MERN Stack Developer',
    url: siteUrl,
    sameAs: [
      'https://github.com/yourusername',
      'https://linkedin.com/in/yourusername',
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
