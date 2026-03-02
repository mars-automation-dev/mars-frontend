import Head from 'next/head';

const DEFAULT_SITE_URL = 'https://marsconsulting.com.br';

export default function SEO({
  title,
  description =
    'Consultoria de operações digitais, automação e IA para empresas que precisam crescer com previsibilidade.',
  canonicalUrl,
  image = '/favicon.ico',
  noIndex = false,
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const resolvedCanonical = canonicalUrl || siteUrl;
  const resolvedTitle = title ? `${title} | Mars Consulting` : 'Mars Consulting';
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const metaTags = [
    { name: 'description', content: description },
    { property: 'og:title', content: resolvedTitle },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: resolvedCanonical },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: resolvedTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ];

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={resolvedCanonical} />
      {metaTags.map((metaTag) => (
        <meta key={`${metaTag.name || metaTag.property}-${metaTag.content}`} {...metaTag} />
      ))}
    </Head>
  );
}

