import { useState } from 'react';
import { Button, Modal } from '@zenra/widgets';
import { CalendarDaysIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Package, BookingFormData } from '@zenra/models';
import { useTranslation } from 'react-i18next';
import { BookingForm } from './BookingForm';
import { useBooking } from '@zenra/services';
import { toast } from 'sonner';

export const PackageCard = ({
  id,
  title,
  description,
  image,
  price,
  duration,
  groupSize,
  startDate,
  hotels = [],
}: Package) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { bookingMutate } = useBooking();
  const { t } = useTranslation();

  const handleBooking = async (bookingData: BookingFormData) => {
    bookingMutate(bookingData, {
      onSuccess: () => {
        toast.success(t('Packages booked successfully'));
        setIsBookingModalOpen(false);
      },
      onError: (error) => {
        toast.error(t('Packages booking failed'));
        console.error('Booking failed:', error);
      },
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={`data:image/png;base64,${image}`}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              <span>{groupSize}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CalendarDaysIcon className="h-5 w-5 mr-2" />
              <span>{startDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary flex items-baseline">
              <span>${price}</span>
              <span className="text-sm text-text/60 font-normal ml-1">{t('packages.booking.form.perPerson')}</span>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsBookingModalOpen(true)}
            >
              {t('packages.booking.form.submit')}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Book Your Trip"
      >
        <BookingForm
          packageId={id ?? ''}
          packageName={title}
          packageData={{ hotels }}
          onSubmit={handleBooking}
        />
      </Modal>
    </>
  );
};