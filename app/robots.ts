import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/interview/*/'],
    },
    sitemap: 'https://interview-ai-agent-nd3yf02x7-nikhilprataps66-gmailcoms-projects.vercel.app/sitemap.xml',
  }
}
