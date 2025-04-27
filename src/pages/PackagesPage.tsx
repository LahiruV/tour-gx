import { useState } from 'react';
import { PageTransition, PackageCard, PackageFilters, PackageHero } from '@zenra/components';
import { useTranslation } from 'react-i18next';

interface Package {
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  startDate: string;
}

export const PackagesPage = () => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const packageKeys = ['culturalHeritage', 'beachParadise', 'wildlifeSafari'];
  
  const allPackages = packageKeys.map((key, index) => ({
    id: String(index + 1),
    title: t(`packages.items.${key}.title`),
    description: t(`packages.items.${key}.description`),
    image: t(`packages.items.${key}.image`),
    price: Number(t(`packages.items.${key}.price`)),
    duration: t(`packages.items.${key}.duration`),
    groupSize: t(`packages.items.${key}.groupSize`),
    startDate: t(`packages.items.${key}.startDate`)
  }));

  const filterPackages = (packages: Package[]) => {
    return packages.filter(pkg => {
      // Filter by duration
      if (duration !== 'all') {
        const days = parseInt(pkg.duration);
        switch (duration) {
          case '1-3':
            if (days > 3) return false;
            break;
          case '4-7':
            if (days < 4 || days > 7) return false;
            break;
          case '8+':
            if (days < 8) return false;
            break;
        }
      }

      // Filter by price range
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          if (pkg.price < min || pkg.price > max) return false;
        } else if (pkg.price < min) return false;
      }

      return true;
    });
  };

  const filteredPackages = filterPackages(allPackages);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <PackageHero />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PackageFilters
            duration={duration}
            setDuration={setDuration}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <PackageCard key={index} {...pkg} />
            ))}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};