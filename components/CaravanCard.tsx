import Link from 'next/link';
import Image from 'next/image';
import { Caravan } from '@/types';

interface CaravanCardProps {
  caravan: Caravan;
}

export default function CaravanCard({ caravan }: CaravanCardProps) {
  return (
    <div className="card group">
      <Link href={`/caravans/${caravan.slug}`}>
        <div className="relative h-72 overflow-hidden bg-gray-100">
          {caravan.images && caravan.images.length > 0 && caravan.images[0] ? (
            <Image
              src={caravan.images[0]}
              alt={caravan.name}
              fill
              className="object-cover card-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              loading="eager"
              unoptimized={caravan.images[0].startsWith('http')}
              onError={(e) => {
                console.error('Image failed to load:', caravan.images[0]);
                // Fallback to a placeholder if image fails
                const target = e.target as HTMLImageElement;
                if (target) {
                  target.style.display = 'none';
                }
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
              Gas Safe
            </div>
            <div className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
              EIC Inspected
            </div>
          </div>
          {caravan.petFriendly && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
              Pet Friendly
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300 tracking-tight">{caravan.name}</h3>
          <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed font-medium">{caravan.shortDescription}</p>
          
          <div className="flex items-center space-x-6 mb-5">
            <span className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Sleeps {caravan.sleeps}
            </span>
            <span className="flex items-center text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
              <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {caravan.berths} Berths
            </span>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">From</p>
              <p className="text-3xl font-bold gradient-text">£{caravan.pricing.weekend}</p>
              <p className="text-xs text-gray-500 mt-1">weekend</p>
            </div>
            <span className="btn-primary text-sm font-semibold">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

