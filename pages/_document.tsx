import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nicaravanhire.co.uk';
  
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="NI Caravan Hire - Quality touring caravans for hire across Northern Ireland. Book your perfect caravan holiday today. Gas Safe certified and electrically inspected." />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="NI Caravan Hire - Quality Touring Caravans for Hire" />
        <meta property="og:description" content="Quality touring caravans for hire across Northern Ireland. Gas Safe certified and electrically inspected. Create family memories that will last a lifetime." />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="NI Caravan Hire - Quality Touring Caravans for Hire" />
        <meta name="twitter:description" content="Quality touring caravans for hire across Northern Ireland. Gas Safe certified and electrically inspected." />
        <meta name="twitter:image" content={`${siteUrl}/logo.png`} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Google Search Console Verification - Replace with your verification code */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

