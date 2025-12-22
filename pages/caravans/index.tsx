'use client';

import { useState, useEffect } from 'react';
import { caravans as initialCaravans } from '@/data/caravans';
import CaravanCard from '@/components/CaravanCard';

export default function CaravansPage() {
  const [caravans, setCaravans] = useState(initialCaravans);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const savedCaravans = localStorage.getItem('admin_caravans');
      if (savedCaravans) {
        try {
          const parsed = JSON.parse(savedCaravans);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCaravans(parsed);
          }
        } catch (e) {
          console.error('Error loading caravans from localStorage:', e);
        }
      }
    }
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Touring Caravans for Hire</h1>
          <p className="text-xl text-primary-100 font-medium tracking-tight">
            Choose from our selection of modern, well-equipped touring caravans. Create family memories that will last a lifetime.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {!isClient ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading caravans...</p>
            </div>
          ) : caravans.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No caravans available at the moment.</p>
              <p className="text-sm text-gray-500">Please check back later or contact us for availability.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caravans.map(caravan => (
                <CaravanCard key={caravan.id} caravan={caravan} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

