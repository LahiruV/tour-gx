export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelDate: string;
  adults: number;
  children: number;
  includeMeals: boolean;
  includeTransport: boolean;
  includeAccommodation: boolean;
  specialRequests?: string;
}

export interface BookingFormProps {
  packageId: string;
  packageName: string;
  onSubmit: (data: BookingFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  packageName: string;
  bookingDate: string;
  travelDate: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  adults: number;
  children: number;
  email: string;
  phone: string;
  specialRequests?: string;
}