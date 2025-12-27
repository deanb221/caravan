'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Caravan } from '@/types';
import { format, addDays, isAfter, isBefore, parseISO, eachDayOfInterval } from 'date-fns';
import { generateBookingLink, bookingConfig } from '@/config/booking';

interface BookingCalendarProps {
  caravan: Caravan;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  startDate: Date | null;
  endDate: Date | null;
}

export default function BookingCalendar({ caravan, onDateChange, startDate, endDate }: BookingCalendarProps) {
  const [localStartDate, setLocalStartDate] = useState<Date | null>(startDate);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(endDate);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Minimum booking date: March 1st (always the next/current March 1st)
  const getMinBookingDate = (): Date => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const marchFirstThisYear = new Date(currentYear, 2, 1); // Month 2 = March (0-indexed)
    // Set time to start of day for accurate comparison
    marchFirstThisYear.setHours(0, 0, 0, 0);
    const nowStartOfDay = new Date(now);
    nowStartOfDay.setHours(0, 0, 0, 0);
    
    // If we're past March 1st this year, use next year's March 1st
    // Otherwise use this year's March 1st
    if (nowStartOfDay > marchFirstThisYear) {
      return new Date(currentYear + 1, 2, 1);
    }
    
    return marchFirstThisYear;
  };

  const minBookingDate = getMinBookingDate();

  // Convert booked dates to Date objects
  const bookedDates = caravan.availability.bookedDates.map(date => parseISO(date));

  // Check if a date is booked
  const isDateBooked = (date: Date): boolean => {
    return bookedDates.some(bookedDate => 
      format(bookedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  // Check if a date range overlaps with booked dates
  const hasBookingConflict = (start: Date, end: Date): boolean => {
    const range = eachDayOfInterval({ start, end });
    return range.some(date => isDateBooked(date));
  };

  // Check if date is a Friday
  const isFriday = (date: Date): boolean => {
    return date.getDay() === 5; // Friday = 5
  };

  // Check if date is a Monday
  const isMonday = (date: Date): boolean => {
    return date.getDay() === 1; // Monday = 1
  };

  // Filter check-in dates - only allow Fridays on or after March 1st
  const filterCheckInDate = (date: Date): boolean => {
    if (isDateBooked(date)) return false;
    if (!isFriday(date)) return false;
    // Allow dates on or after March 1st (inclusive)
    const dateStr = format(date, 'yyyy-MM-dd');
    const minDateStr = format(minBookingDate, 'yyyy-MM-dd');
    return dateStr >= minDateStr;
  };

  // Filter check-out dates - only allow Mondays (for weekend) or Fridays (for weekly)
  const filterCheckOutDate = (date: Date): boolean => {
    if (!localStartDate) return false;
    if (isDateBooked(date)) return false;
    
    const dayOfWeek = date.getDay();
    const daysDiff = Math.ceil((date.getTime() - localStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Weekend booking: Friday to Monday (3 nights)
    if (daysDiff === 3 && isMonday(date)) {
      return true;
    }
    // Weekly booking: Friday to Friday (7 nights)
    if (daysDiff === 7 && isFriday(date)) {
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    onDateChange(localStartDate, localEndDate);
  }, [localStartDate, localEndDate, onDateChange]);

  const handleStartDateChange = (date: Date | null) => {
    setLocalStartDate(date);
    if (date && localEndDate && (isBefore(localEndDate, date) || hasBookingConflict(date, localEndDate))) {
      setLocalEndDate(null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date && localStartDate) {
      if (hasBookingConflict(localStartDate, date)) {
        alert('Selected dates include booked dates. Please choose different dates.');
        return;
      }
    }
    setLocalEndDate(date);
  };

  // Calculate total price
  const calculatePrice = (): number => {
    if (!localStartDate || !localEndDate) return 0;

    const days = Math.ceil((localEndDate.getTime() - localStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Weekend booking (Friday to Monday = 3 nights: Fri, Sat, Sun)
    if (days === 3) {
      // Weekend price is already the total for 3 nights
      return caravan.pricing.weekend;
    }
    
    // Weekly booking (Friday to Friday = 7 nights)
    if (days === 7) {
      return caravan.pricing.weekly;
    }

    return 0;
  };
  
  // Get booking type
  const getBookingType = (): string => {
    if (!localStartDate || !localEndDate) return '';
    const days = Math.ceil((localEndDate.getTime() - localStartDate.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 3) return 'Weekend';
    if (days === 7) return 'Weekly';
    return '';
  };

  const totalPrice = calculatePrice();
  const nights = localStartDate && localEndDate 
    ? Math.ceil((localEndDate.getTime() - localStartDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!localStartDate || !localEndDate) {
      alert('Please select check-in and check-out dates');
      return;
    }

    const bookingData = {
      caravanName: caravan.name,
      startDate: format(localStartDate, 'yyyy-MM-dd'),
      endDate: format(localEndDate, 'yyyy-MM-dd'),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      totalPrice,
    };

    // Generate booking link based on configuration
    const bookingLink = generateBookingLink(bookingData);

    // Handle different booking methods
    if (bookingConfig.method === 'api') {
      // For API method, send POST request
      fetch(bookingConfig.api.endpoint, {
        method: bookingConfig.api.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
        .then(response => response.json())
        .then(data => {
          alert(`Thank you ${formData.name}! Your booking request has been submitted. We'll contact you at ${formData.email} to confirm.`);
          setFormData({ name: '', email: '', phone: '' });
          setLocalStartDate(null);
          setLocalEndDate(null);
          onDateChange(null, null);
          setShowBookingForm(false);
        })
        .catch(error => {
          console.error('Booking error:', error);
          alert('There was an error submitting your booking. Please try again or contact us directly.');
        });
    } else {
      // For email, Calendly, Google Calendar, or custom - open link
      window.open(bookingLink, bookingConfig.method === 'email' ? '_self' : '_blank');
      
      // Show confirmation message
      if (bookingConfig.method === 'email') {
        alert(`Thank you ${formData.name}! Your email client should open with booking details. If not, please email us at ${bookingConfig.email.to}`);
      } else {
        alert(`Thank you ${formData.name}! You'll be redirected to complete your booking.`);
      }
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '' });
        setLocalStartDate(null);
        setLocalEndDate(null);
        onDateChange(null, null);
        setShowBookingForm(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Check Availability & Book</h3>
        <p className="text-gray-600 text-sm mb-3">Weekend bookings: Friday to Monday | Weekly bookings: Friday to Friday</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2 text-sm">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-blue-900 mb-1">Booking Options:</p>
              <ul className="text-blue-800 space-y-1 text-xs">
                <li>• Weekend: Friday 3-4 PM → Monday 10 AM-12 PM</li>
                <li>• Weekly: Friday 3-4 PM → Friday 10 AM-12 PM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Date Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Check-in Date
            </label>
            <DatePicker
              selected={localStartDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={localStartDate}
              endDate={localEndDate}
              filterDate={filterCheckInDate}
              minDate={minBookingDate}
              placeholderText="Select Friday (check-in)"
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white font-medium"
              dateFormat="dd/MM/yyyy"
            />
            <p className="text-xs text-gray-500 mt-1">Collection: 3:00 PM - 4:00 PM</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Check-out Date
            </label>
            <DatePicker
              selected={localEndDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={localStartDate}
              endDate={localEndDate}
              minDate={localStartDate || minBookingDate}
              filterDate={filterCheckOutDate}
              placeholderText="Select Monday or Friday (check-out)"
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white font-medium"
              dateFormat="dd/MM/yyyy"
              disabled={!localStartDate}
            />
            <p className="text-xs text-gray-500 mt-1">Return: 10:00 AM - 12:00 PM</p>
          </div>
        </div>

        {/* Price Summary */}
        {localStartDate && localEndDate && (
          <>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border-2 border-primary-200 shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-gray-700 font-semibold text-lg block">{getBookingType()} Booking</span>
                  <span className="text-4xl font-bold gradient-text">£{totalPrice}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 border-t border-primary-200 pt-3 mt-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    {format(localStartDate, 'EEEE, dd MMM')} - {format(localEndDate, 'EEEE, dd MMM yyyy')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">
                    Collection: {format(localStartDate, 'dd MMM')} 3:00 PM - 4:00 PM
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">
                    Return: {format(localEndDate, 'dd MMM yyyy')} 10:00 AM - 12:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            {!showBookingForm ? (
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transform transition-all duration-300 tracking-tight text-base"
              >
                Request Booking Dates
              </button>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 bg-white rounded-xl p-6 border-2 border-primary-200">
                {/* Booking Summary */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-5 border-2 border-primary-200 mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Booking Summary</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Caravan</p>
                      <p className="text-lg font-bold text-gray-900">{caravan.name}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Check-in</p>
                        <p className="text-sm font-semibold text-gray-900">{format(localStartDate!, 'EEEE, dd MMM yyyy')}</p>
                        <p className="text-xs text-gray-600">3:00 PM - 4:00 PM</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Check-out</p>
                        <p className="text-sm font-semibold text-gray-900">{format(localEndDate!, 'EEEE, dd MMM yyyy')}</p>
                        <p className="text-xs text-gray-600">10:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-primary-200 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Booking Type</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {getBookingType()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Total Price</p>
                        <p className="text-2xl font-bold gradient-text">
                          £{totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

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
          </>
        )}

        {/* Deposit Information */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold text-amber-900 mb-1 text-sm">Booking & Damage Deposit</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                A £250 deposit is required per booking. This acts as a booking deposit initially, then as a damage deposit 
                during your hire. The full amount is refundable provided the caravan is returned clean, undamaged, and on time.
              </p>
              <a href="/terms" className="text-amber-700 hover:text-amber-900 font-semibold text-xs mt-2 inline-block underline">
                View full terms →
              </a>
            </div>
          </div>
        </div>

        {/* Booked Dates Info */}
        {bookedDates.length > 0 && (
          <div className="text-sm text-gray-600">
            <p className="font-semibold mb-1">Unavailable dates:</p>
            <div className="flex flex-wrap gap-2">
              {bookedDates.map((date, idx) => (
                <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                  {format(date, 'dd MMM')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

