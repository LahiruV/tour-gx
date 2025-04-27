import { useTranslation } from 'react-i18next';

interface TravelFeature {
  image: string;
  key: string;
}

const features: TravelFeature[] = [
  {
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    key: "accommodations"
  },
  {
    image: "https://images.pexels.com/photos/31032898/pexels-photo-31032898/free-photo-of-vibrant-sri-lankan-art-in-galle-market.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    key: "cultural"
  },
  {
    image: "https://images.pexels.com/photos/19073540/pexels-photo-19073540/free-photo-of-peacock-showing-its-majestic-tail.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    key: "wildlife"
  }
];

export const TravelFeatures = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {features.map((feature, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
          <img
            src={feature.image}
            alt={t(`contact.features.${feature.key}.title`)}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-text mb-2">{t(`contact.features.${feature.key}.title`)}</h3>
          <p className="text-text/60">{t(`contact.features.${feature.key}.description`)}</p>
        </div>
      ))}
    </div>
  );
};