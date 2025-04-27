import { useTranslation } from 'react-i18next';
import { TextField } from '@zenra/widgets';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface DestinationHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const DestinationHero = ({ searchQuery, onSearchChange }: DestinationHeroProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="relative h-[400px] bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1920&auto=format&fit=crop")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">{t('destinations.title')}</h1>
        <p className="text-xl text-center max-w-2xl mb-8">{t('destinations.subtitle')}</p>
        <div className="w-full max-w-xl relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPinIcon className="h-6 w-6" />
          </div>
          <TextField
            label=""
            placeholder={t('destinations.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            inputProps={{
              className: "pl-12 pr-12 py-4 text-lg",
              style: { borderRadius: '9999px' }
            }}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 transition-colors rounded-full p-2 cursor-pointer">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};