import Image from 'next/image';
import { CaravanSite } from '@/types';

interface CaravanSiteCardProps {
  site: CaravanSite;
}

export default function CaravanSiteCard({ site }: CaravanSiteCardProps) {
  return (
    <div className="card group">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {site.image ? (
          <Image
            src={site.image}
            alt={site.name}
            fill
            className="object-cover card-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              console.error('Image failed to load:', site.image);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {site.rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-900">{site.rating}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300 tracking-tight">
            {site.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <svg className="w-4 h-4 mr-1 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">{site.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">
          {site.description}
        </p>

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Features</p>
          <div className="flex flex-wrap gap-2">
            {site.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <a
            href={site.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center block"
          >
            Book at {site.name} →
          </a>
        </div>
      </div>
    </div>
  );
}







