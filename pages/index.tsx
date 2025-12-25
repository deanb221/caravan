import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { caravans as initialCaravans } from '@/data/caravans';
import { caravanSites as initialSites } from '@/data/caravanSites';
import CaravanCard from '@/components/CaravanCard';
import CaravanSiteCard from '@/components/CaravanSiteCard';
import { Caravan } from '@/types';
import { CaravanSite } from '@/types';

interface HomeProps {
  caravans: Caravan[];
  sites: CaravanSite[];
}

export default function Home({ caravans: serverCaravans, sites: serverSites }: HomeProps) {
  const [caravans, setCaravans] = useState(serverCaravans);
  const [sites, setSites] = useState(serverSites);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load from localStorage if available (progressive enhancement)
    if (typeof window !== 'undefined') {
      const savedCaravans = localStorage.getItem('admin_caravans');
      const savedSites = localStorage.getItem('admin_sites');
      
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

  const featuredCaravans = caravans.slice(0, 3);
  const featuredSites = sites.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30 tracking-tight">
              Northern Ireland's Premier Touring Caravan Hire
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Explore Northern Ireland with{' '}
              <span className="block mt-2 bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                NI Caravan Hire
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-50 leading-relaxed max-w-2xl mx-auto font-medium tracking-tight">
              Quality touring caravans for unforgettable adventures across Northern Ireland's stunning landscapes. 
              Create family memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/caravans" className="bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800 text-white font-bold py-3.5 px-10 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-100 transform tracking-tight text-base border-2 border-secondary-500">
                View Caravans
              </Link>
              <Link href="/caravans" className="btn-outline border-2 border-white text-white hover:bg-white hover:text-primary-600 backdrop-blur-sm bg-white/10">
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            {/* Extra Large Centered Logo */}
            <div className="flex justify-center mb-10">
              <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
                <Image
                  src="/logo.png"
                  alt="NI Caravan Hire Logo"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>
            
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Welcome
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Your Adventure <span className="gradient-text">Starts Here</span>
            </h2>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed font-medium">
              <p>
                NI Caravan Hire offers modern, well-maintained touring caravans across Northern Ireland. 
                Whether you're planning a family holiday, a romantic getaway, or a coastal adventure, 
                we have the perfect touring caravan for your needs.
              </p>
              <p>
                All our touring caravans are fully equipped with modern amenities, Gas Safe certified, and electrically inspected. 
                Ready to tow, ensuring a comfortable and safe journey. Create family memories that will last a lifetime as you explore 
                Northern Ireland's breathtaking landscapes together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Caravan Showcase Images */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/image-1.jpg"
                alt="NI Caravan Hire - Quality Touring Caravans"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Quality Touring Caravans</h3>
                <p className="text-white/90">Modern, well-maintained, ready for your adventure</p>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/image-2.jpg"
                alt="NI Caravan Hire - Explore Northern Ireland"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Explore Northern Ireland</h3>
                <p className="text-white/90">Create memories that will last a lifetime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Caravans */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Our Fleet
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Featured <span className="gradient-text">Touring Caravans</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium tracking-tight">
              Explore our selection of quality touring caravans, each designed for comfort and adventure on the road. 
              Start creating family memories that will last a lifetime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredCaravans.map(caravan => (
              <CaravanCard key={caravan.id} caravan={caravan} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/caravans" className="btn-primary">
              View All Caravans →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Availability Checker */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 md:p-14 text-center shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Quick Availability Check
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto font-medium tracking-tight">
              Check availability and book your perfect touring caravan in minutes. Real-time calendar updates.
            </p>
            <Link href="/caravans" className="btn-primary inline-block">
              Check Availability Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text">NI Caravan Hire?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="feature-icon">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                All our touring caravans are regularly maintained, Gas Safe certified, and electrically inspected. Fully equipped with modern amenities, ready to tow.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="feature-icon">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Easy Booking</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Simple online booking process with instant availability checking for touring caravans
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="feature-icon">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Northern Ireland Wide</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Serving all of Northern Ireland with convenient pickup locations for touring caravans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Caravan Sites Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Recommended Sites
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Top <span className="gradient-text">Caravan Sites</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Discover Northern Ireland's premier caravan sites for your touring adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredSites.map(site => (
              <CaravanSiteCard key={site.id} site={site} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/sites" className="btn-primary">
              View All Caravan Sites →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Try to fetch from database/JSON, fallback to static data
  try {
    const { getCaravans, getCaravanSites } = await import('@/lib/data');
    const [caravans, sites] = await Promise.all([
      getCaravans(),
      getCaravanSites(),
    ]);

    return {
      props: {
        caravans: Array.isArray(caravans) && caravans.length > 0 ? caravans : initialCaravans,
        sites: Array.isArray(sites) && sites.length > 0 ? sites : initialSites,
      },
      revalidate: 60, // Revalidate every minute (faster updates)
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        caravans: initialCaravans,
        sites: initialSites,
      },
      revalidate: 3600,
    };
  }
};

