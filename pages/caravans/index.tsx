import { caravans } from '@/data/caravans';
import CaravanCard from '@/components/CaravanCard';

export default function CaravansPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Caravans for Hire</h1>
          <p className="text-xl text-primary-100">
            Choose from our selection of modern, well-equipped caravans
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caravans.map(caravan => (
              <CaravanCard key={caravan.id} caravan={caravan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

