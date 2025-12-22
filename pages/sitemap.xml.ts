import { GetServerSideProps } from 'next';
import { caravans } from '@/data/caravans';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nicaravanhire.co.uk';

// Static pages
const staticPages = [
  '',
  '/caravans',
  '/sites',
  '/about',
  '/contact',
  '/terms',
];

function generateSiteMap(caravansData: typeof caravans) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Get all caravan slugs
  const caravanPages = caravansData.map((caravan) => `/caravans/${caravan.slug}`);
  
  // Combine all pages
  const allPages = [...staticPages, ...caravanPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allPages
       .map((path) => {
         // Determine priority based on page type
         let priority = '0.7';
         let changefreq = 'weekly';
         
         if (path === '') {
           priority = '1.0';
           changefreq = 'daily';
         } else if (path === '/caravans') {
           priority = '0.9';
           changefreq = 'daily';
         } else if (path.startsWith('/caravans/')) {
           priority = '0.8';
           changefreq = 'weekly';
         } else if (path === '/sites' || path === '/about' || path === '/contact') {
           priority = '0.7';
           changefreq = 'monthly';
         }

         return `
       <url>
           <loc>${SITE_URL}${path}</loc>
           <lastmod>${currentDate}</lastmod>
           <changefreq>${changefreq}</changefreq>
           <priority>${priority}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate the XML sitemap with all pages
  const sitemap = generateSiteMap(caravans);

  res.setHeader('Content-Type', 'text/xml');
  // Write the XML to the response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;

