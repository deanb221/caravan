'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Caravan } from '@/types';
import { format, addDays, isAfter, isBefore, parseISO, eachDayOfInterval } from 'date-fns';

interface BookingCalendarProps {
  caravan: Caravan;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  startDate: Date | null;
  endDate: Date | null;
}

export default function BookingCalendar({ caravan, onDateChange, startDate, endDate }: BookingCalendarProps) {
  const [localStartDate, setLocalStartDate] = useState<Date | null>(startDate);
  const [localEndDate, setLocalEndDate] = useState<Date | null>(endDate);

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

  // Filter out booked dates
  const filterDate = (date: Date): boolean => {
    return !isDateBooked(date) && isAfter(date, new Date());
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
    const dateRange = eachDayOfInterval({ start: localStartDate, end: localEndDate });
    
    let total = 0;
    dateRange.forEach(date => {
      const dayOfWeek = date.getDay();
      // Saturday = 6, Sunday = 0
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        total += caravan.pricing.weekend;
      } else {
        total += caravan.pricing.weekday;
      }
    });

    // Check for weekly discount (7+ days)
    if (days >= 7) {
      const weeklyRate = Math.floor(days / 7) * caravan.pricing.weekly;
      const remainingDays = days % 7;
      const remainingCost = remainingDays * caravan.pricing.weekday;
      return weeklyRate + remainingCost;
    }

    return total;
  };

  const totalPrice = calculatePrice();
  const nights = localStartDate && localEndDate 
    ? Math.ceil((localEndDate.getTime() - localStartDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Check Availability & Book</h3>
      
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
              filterDate={filterDate}
              minDate={new Date()}
              placeholderText="Select check-in date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dateFormat="dd/MM/yyyy"
            />
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
              minDate={localStartDate || new Date()}
              filterDate={filterDate}
              placeholderText="Select check-out date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        {/* Price Summary */}
        {localStartDate && localEndDate && (
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Total Price</span>
              <span className="text-3xl font-bold text-primary-600">£{totalPrice}</span>
            </div>
            <p className="text-sm text-gray-600">
              {nights} {nights === 1 ? 'night' : 'nights'} • {format(localStartDate, 'dd MMM')} - {format(localEndDate, 'dd MMM yyyy')}
            </p>
          </div>
        )}

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

