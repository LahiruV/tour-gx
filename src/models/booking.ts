export interface BookingFormData {
  packageId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelDate: string;
  adults: number;
  children: number;
  mealPlan: 'bb' | 'hb' | 'fb';
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