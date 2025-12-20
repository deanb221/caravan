import Link from 'next/link';
import Image from 'next/image';
import { Caravan } from '@/types';

interface CaravanCardProps {
  caravan: Caravan;
}

export default function CaravanCard({ caravan }: CaravanCardProps) {
  const minPrice = Math.min(
    caravan.pricing.weekday,
    caravan.pricing.weekend,
    caravan.pricing.weekly / 7
  );

  return (
    <div className="card">
      <Link href={`/caravans/${caravan.slug}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={caravan.images[0]}
            alt={caravan.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {caravan.petFriendly && (
            <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Pet Friendly
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{caravan.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{caravan.shortDescription}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Sleeps {caravan.sleeps}
              </span>
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {caravan.berths} Berths
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-2xl font-bold text-primary-600">£{minPrice}</p>
              <p className="text-xs text-gray-500">per night</p>
            </div>
            <span className="btn-primary text-sm py-2 px-4">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

