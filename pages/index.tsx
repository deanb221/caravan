import Link from 'next/link';
import Image from 'next/image';
import { caravans } from '@/data/caravans';
import CaravanCard from '@/components/CaravanCard';

export default function Home() {
  const featuredCaravans = caravans.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container-custom section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Explore Northern Ireland with NI Caravan Hire
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Quality caravans for unforgettable adventures across Northern Ireland
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/caravans" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                View Caravans
              </Link>
              <Link href="/caravans" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Adventure Starts Here
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              NI Caravan Hire offers modern, well-maintained caravans across Northern Ireland. 
              Whether you're planning a family holiday, a romantic getaway, or a coastal adventure, 
              we have the perfect caravan for your needs.
            </p>
            <p className="text-lg text-gray-600">
              All our caravans are fully equipped with modern amenities, ensuring a comfortable 
              and memorable stay. Book your caravan today and discover the beauty of Northern Ireland.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Caravans */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Caravans
            </h2>
            <p className="text-lg text-gray-600">
              Explore our selection of quality caravans
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCaravans.map(caravan => (
              <CaravanCard key={caravan.id} caravan={caravan} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/caravans" className="btn-primary">
              View All Caravans
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Availability Checker */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Availability Check
            </h2>
            <p className="text-gray-600 mb-8">
              Check availability and book your perfect caravan in minutes
            </p>
            <Link href="/caravans" className="btn-primary inline-block">
              Check Availability Now
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NI Caravan Hire?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                All our caravans are regularly maintained and fully equipped with modern amenities
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple online booking process with instant availability checking
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Northern Ireland Wide</h3>
              <p className="text-gray-600">
                Serving all of Northern Ireland with convenient locations
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

