import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">About NI Caravan Hire</h1>
          <p className="text-xl text-primary-100 font-medium tracking-tight">
            Your trusted local touring caravan hire service in Northern Ireland
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                  NI Caravan Hire was founded with a simple mission: to make exploring Northern Ireland 
                  accessible, comfortable, and memorable for everyone. As a locally-owned and operated 
                  business, we understand the unique beauty and charm of Northern Ireland's landscapes, 
                  from the stunning Antrim Coast to the rolling hills of the countryside.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                  We started with a small fleet of well-maintained touring caravans and a commitment to 
                  exceptional customer service. Today, we continue to grow while maintaining our 
                  focus on quality, reliability, and making your touring holiday experience as smooth as possible.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                  Safety is our top priority. All our touring caravans are Gas Safe certified and undergo 
                  regular electrical inspections to ensure your peace of mind on every journey.
                </p>
                <p className="text-gray-700 leading-relaxed font-medium">
                  Whether you're planning a family adventure, a romantic getaway, or a coastal 
                  exploration, we're here to provide you with a quality touring caravan ready to tow 
                  for your Northern Ireland journey. Create family memories that will last a lifetime 
                  as you discover the beauty of Northern Ireland together.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Quality Assured</h3>
                <p className="text-gray-600 font-medium">
                  All our touring caravans undergo regular maintenance and inspections to ensure they meet 
                  the highest standards of comfort, safety, and towing readiness. Every caravan is Gas Safe certified and electrically inspected.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Local Expertise</h3>
                <p className="text-gray-600 font-medium">
                  As a Northern Ireland-based business, we know the best touring spots and can help you 
                  plan the perfect itinerary for your touring adventure.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our team is available to assist you throughout your booking and stay, ensuring 
                  a stress-free experience from start to finish.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">
                  We offer transparent, competitive pricing with no hidden fees. Book with confidence 
                  knowing exactly what you'll pay.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed mb-4 font-medium">
                At NI Caravan Hire, we're committed to providing exceptional service and quality 
                touring caravans that make your Northern Ireland adventure unforgettable. We believe that 
                everyone should have the opportunity to explore the natural beauty and rich culture 
                of our region in comfort and style, creating family memories that will last a lifetime.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                Thank you for choosing NI Caravan Hire. We look forward to being part of your 
                Northern Ireland journey and helping you create cherished memories with your loved ones!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

