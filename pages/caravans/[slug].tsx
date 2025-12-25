import { GetStaticProps, GetStaticPaths } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCaravanBySlug, caravans as initialCaravans } from '@/data/caravans';
import BookingCalendar from '@/components/BookingCalendar';
import { Caravan } from '@/types';

interface CaravanDetailPageProps {
  caravan: Caravan;
  allCaravans: Caravan[];
}

export default function CaravanDetailPage({ caravan: serverCaravan, allCaravans: serverCaravans }: CaravanDetailPageProps) {
  const router = useRouter();
  const [caravan, setCaravan] = useState<Caravan>(serverCaravan);
  const [caravans, setCaravans] = useState<Caravan[]>(serverCaravans);
  
  useEffect(() => {
    // Load from localStorage if available (progressive enhancement)
    if (typeof window !== 'undefined') {
      const savedCaravans = localStorage.getItem('admin_caravans');
      if (savedCaravans) {
        try {
          const parsed = JSON.parse(savedCaravans);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCaravans(parsed);
            const { slug } = router.query;
            if (slug) {
              const updatedCaravan = parsed.find((c: Caravan) => c.slug === slug);
              if (updatedCaravan) {
                setCaravan(updatedCaravan);
              }
            }
          }
        } catch (e) {
          console.error('Error loading caravans from localStorage:', e);
        }
      }
    }
  }, [router.query]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  if (!caravan) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-3xl font-extrabold mb-4 tracking-tight">Touring Caravan Not Found</h1>
        <p className="text-gray-600 mb-8">The caravan you're looking for doesn't exist.</p>
        <a href="/caravans" className="btn-primary">View All Caravans</a>
      </div>
    );
  }

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 bg-gray-900">
        {caravan.images[selectedImage] && (
          <Image
            src={caravan.images[selectedImage]}
            alt={caravan.name}
            fill
            className="object-cover"
            priority
            unoptimized={caravan.images[selectedImage].startsWith('http')}
          />
        )}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">{caravan.name}</h1>
          <p className="text-xl text-gray-200">{caravan.shortDescription}</p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {caravan.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-32 rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'ring-4 ring-primary-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${caravan.name} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={image.startsWith('http')}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{caravan.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-gray-700">Sleeps {caravan.sleeps}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-gray-700">{caravan.berths} Berths</span>
                </div>
                {caravan.petFriendly && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-700">Pet Friendly</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {caravan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Safety Certifications */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">Safety & Certifications</h3>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-green-700 font-semibold text-sm">Gas Safe Certified</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-blue-700 font-semibold text-sm">Electrically Inspected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fully Equipped Section */}
            <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 rounded-xl shadow-lg p-6 md:p-8 border border-primary-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  Fully Equipped for Your Adventure
                </h2>
                <p className="text-gray-600 font-medium">All caravans come with everything you need</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">Kitchen with fridge, oven & microwave</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">Cutlery</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">Clean bedding</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">Towels</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">Gas</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-6 text-center shadow-lg">
                <p className="text-white text-lg md:text-xl font-bold tracking-tight">
                  All you need to bring is a suitcase with clothes!
                </p>
              </div>
            </div>

            {/* Booking & Damage Deposit */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Booking & Damage Deposit</h2>
              <div className="space-y-3 text-gray-700 font-medium leading-relaxed">
                <p>
                  A £250 deposit is required per booking. This acts as a booking deposit initially, then as a damage deposit 
                  during your hire. The full amount is refundable provided the caravan is returned clean, undamaged, and on time.
                </p>
                <div className="mt-4">
                  <a href="/terms" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center space-x-2">
                    <span>View full terms</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Pricing</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Period</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Weekend Booking<br /><span className="text-xs text-gray-500">Fri 3-4 PM → Mon 10 AM-12 PM (3 nights)</span></td>
                      <td className="py-3 px-4 text-right font-semibold text-primary-600">£{caravan.pricing.weekend}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Weekly Booking<br /><span className="text-xs text-gray-500">Fri 3-4 PM → Fri 10 AM-12 PM</span></td>
                      <td className="py-3 px-4 text-right font-semibold text-primary-600">£{caravan.pricing.weekly}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div id="booking-calendar" className="lg:col-span-1">
            <BookingCalendar
              caravan={caravan}
              onDateChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Try to fetch from API first
  let caravans = initialCaravans;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/caravans`).catch(() => null);
    if (res?.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        caravans = data;
      }
    }
  } catch (error) {
    console.error('Error fetching caravans for paths:', error);
  }

  const paths = caravans.map((caravan) => ({
    params: { slug: caravan.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // Generate new pages on-demand if not found
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Try to fetch from API first
  let caravans = initialCaravans;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/caravans`).catch(() => null);
    if (res?.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        caravans = data;
      }
    }
  } catch (error) {
    console.error('Error fetching caravans:', error);
  }

  const caravan = caravans.find(c => c.slug === slug);

  if (!caravan) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      caravan,
      allCaravans: caravans,
    },
    revalidate: 60, // Revalidate every minute (faster updates)
  };
};

