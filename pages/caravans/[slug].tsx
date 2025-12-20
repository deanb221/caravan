import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCaravanBySlug } from '@/data/caravans';
import BookingCalendar from '@/components/BookingCalendar';
import { format } from 'date-fns';

export default function CaravanDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const caravan = router.isReady && slug ? getCaravanBySlug(slug as string) : null;
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  if (!caravan) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-3xl font-bold mb-4">Caravan Not Found</h1>
        <p className="text-gray-600 mb-8">The caravan you're looking for doesn't exist.</p>
        <a href="/caravans" className="btn-primary">View All Caravans</a>
      </div>
    );
  }

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    // Calculate total price (simplified - same logic as in BookingCalendar)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let totalPrice = 0;
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        totalPrice += caravan.pricing.weekend;
      } else {
        totalPrice += caravan.pricing.weekday;
      }
    }

    if (days >= 7) {
      const weeklyRate = Math.floor(days / 7) * caravan.pricing.weekly;
      const remainingDays = days % 7;
      const remainingCost = remainingDays * caravan.pricing.weekday;
      totalPrice = weeklyRate + remainingCost;
    }

    // In a real app, this would send to an API
    console.log('Booking submitted:', {
      caravanId: caravan.id,
      caravanName: caravan.name,
      ...formData,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      totalPrice,
    });

    alert(`Thank you ${formData.name}! Your booking request has been submitted. We'll contact you at ${formData.email} to confirm.`);
    
    // Reset form
    setFormData({ name: '', email: '', phone: '' });
    setStartDate(null);
    setEndDate(null);
    setShowBookingForm(false);
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
          />
        )}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{caravan.name}</h1>
          <p className="text-xl text-gray-200">{caravan.shortDescription}</p>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
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
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {caravan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
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
                      <td className="py-3 px-4 text-gray-700">Weekday (Mon-Thu)</td>
                      <td className="py-3 px-4 text-right font-semibold text-primary-600">£{caravan.pricing.weekday}/night</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Weekend (Fri-Sun)</td>
                      <td className="py-3 px-4 text-right font-semibold text-primary-600">£{caravan.pricing.weekend}/night</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700">Weekly (7+ nights)</td>
                      <td className="py-3 px-4 text-right font-semibold text-primary-600">£{caravan.pricing.weekly}/week</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700">Peak Season</td>
                      <td className="py-3 px-4 text-right font-semibold text-primary-600">£{caravan.pricing.peakSeason}/night</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingCalendar
              caravan={caravan}
              onDateChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
            />

            {startDate && endDate && (
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Your Booking</h3>
                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="btn-primary w-full"
                  >
                    Request Booking
                  </button>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="btn-primary flex-1"
                      >
                        Submit Booking
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

