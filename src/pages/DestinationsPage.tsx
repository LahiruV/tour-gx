import { useState, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { DestinationHero, DestinationGrid } from '@zenra/components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface Filters {
  province: string;
  category: string;
  season: string;
}

const destinationIds = [
  {
    id: 'mirissa',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/mirissa.jpg?raw=true",
  },
  {
    id: 'sigiriya',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/sigiriya.jpg?raw=true",
  },
  {
    id: 'ella',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/ella.jpg?raw=true",
  },
  {
    id: 'kandy',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/kandy.jpg?raw=true",
  },
  {
    id: 'jaffna',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/jaffna.avif?raw=true",
  },
  {
    id: 'nilaweli',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/nilaweli.jpeg?raw=true",
  },
  {
    id: 'anuradhapura',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/anuradhapura.jpg?raw=true",
  },
  {
    id: 'unawatuna',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/unawatuna.jpg?raw=true",
  },
  {
    id: 'yala',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/yala.avif?raw=true",
  },
  {
    id: 'polonnaruwa',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/polonnaruwa.avif?raw=true",
  },

  {
    id: 'weligama',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/weligama.avif?raw=true",
  },
  {
    id: 'nuwaraeliya',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/nuwaraeliya.avif?raw=true",
  },
  {
    id: 'rekawa',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/rekawa.jpeg?raw=true",
  },
  {
    id: 'galle',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/galle.jpg?raw=true",
  },
  {
    id: 'arugambay',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/arugambay.jpeg?raw=true"
  },
  {
    id: 'colombo',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/colombo.jpg?raw=true",
  },
  {
    id: 'negombo',
    image: "https://github.com/LahiruV/tour-gx/blob/main/public/images/negombo.avif?raw=true",
  }
];

export const DestinationsPage = () => {
  const [filters, setFilters] = useState<Filters>({
    province: 'all',
    category: 'all',
    season: 'all'
  });
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const selectedDestination = location.state?.selectedDestination;
    if (selectedDestination) {
      const element = document.getElementById(selectedDestination);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const filteredDestinations = destinationIds.filter(destination => {
    const locationData = {
      region: t(`destinations.locations.${destination.id}.region`),
      categories: t(`destinations.locations.${destination.id}.categories`, { returnObjects: true }) as string[],
      bestTime: t(`destinations.locations.${destination.id}.bestTime`).toLowerCase()
    };

    if (filters.province !== 'all') {
      const province = filters.province.replace('-', ' ');
      if (!locationData.region.toLowerCase().includes(province)) {
        return false;
      }
    }

    if (filters.category !== 'all') {
      if (!locationData.categories.some(cat => cat.toLowerCase() === filters.category)) {
        return false;
      }
    }

    if (filters.season !== 'all') {
      const seasonMap = {
        'dec-mar': ['december', 'january', 'february', 'march'],
        'apr-may': ['april', 'may'],
        'jun-sep': ['june', 'july', 'august', 'september'],
        'oct-nov': ['october', 'november']
      };

      const months = seasonMap[filters.season as keyof typeof seasonMap];
      if (!months.some(month => locationData.bestTime.includes(month))) {
        return false;
      }
    }

    return true;
  });

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <DestinationHero
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <DestinationGrid destinations={filteredDestinations} />
      </div>
    </PageTransition>
  );
};