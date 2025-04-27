import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '@heroicons/react/24/solid';

export const CustomerExperience = () => {
  const { t } = useTranslation();

  const feedbackKeys = ['sarah', 'david', 'emma'];
  
  const images = {
    sarah: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    david: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    emma: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  };

  const testimonials = feedbackKeys.map(key => ({
    name: t(`home.testimonials.feedback.${key}.name`),
    country: t(`home.testimonials.feedback.${key}.country`),
    image: images[key as keyof typeof images],
    comment: t(`home.testimonials.feedback.${key}.comment`),
    rating: 5
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{t('home.testimonials.title')}</h2>
          <p className="text-gray-600 text-center mb-12">{t('home.testimonials.subtitle')}</p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.2}>
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-6"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.country}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};