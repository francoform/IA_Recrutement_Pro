import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/recruiter-results/'],
      },
      // GEO — Autoriser les bots IA
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-ai', 'ClaudeBot', 'PerplexityBot', 'cohere-ai', 'YouBot', 'Applebot-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://ia-recrutement-pro.be2web.fr/sitemap.xml',
  };
}
