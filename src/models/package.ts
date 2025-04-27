export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  startDate: string;
}

export interface PackageFilters {
  duration: string;
  setDuration: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
}