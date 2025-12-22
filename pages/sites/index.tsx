'use client';

import { useState, useEffect } from 'react';
import { caravanSites as initialSites } from '@/data/caravanSites';
import CaravanSiteCard from '@/components/CaravanSiteCard';

export default function CaravanSitesPage() {
  const [sites, setSites] = useState(initialSites);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const savedSites = localStorage.getItem('admin_sites');
      if (savedSites) {
        try {
          const parsed = JSON.parse(savedSites);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSites(parsed);
          }
        } catch (e) {
          console.error('Error loading sites from localStorage:', e);
        }
      }
    }
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Top Caravan Sites</h1>
          <p className="text-xl text-primary-100 font-medium tracking-tight">
            Discover Northern Ireland's best caravan sites for your touring adventure
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Recommended Sites
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Premier <span className="gradient-text">Caravan Sites</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
              We've partnered with Northern Ireland's top caravan sites. Click "Book" to reserve your pitch directly with the site.
            </p>
          </div>

          {!isClient ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading caravan sites...</p>
            </div>
          ) : sites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No caravan sites available at the moment.</p>
              <p className="text-sm text-gray-500">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {sites.map(site => (
                <CaravanSiteCard key={site.id} site={site} />
              ))}
            </div>
          )}

          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Booking Information</h3>
            <div className="space-y-3 text-gray-700 font-medium">
              <p>
                All caravan sites listed are independently operated. When you click "Book", you'll be redirected 
                to the site's official website to complete your booking.
              </p>
              <p>
                We recommend booking your caravan site in advance, especially during peak season. Most sites 
                offer online booking for your convenience.
              </p>
              <p className="text-primary-600 font-semibold">
                Don't forget to book your touring caravan with us first, then reserve your pitch at one of these 
                excellent sites!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

