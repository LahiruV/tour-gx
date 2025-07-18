import { useMutation } from '@tanstack/react-query';
import { BookingFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';


export const useBooking = () => {
    const { mutate: bookingMutate } = useMutation({
        mutationFn: async (payload: BookingFormData) => {
            const response = await axios.post<BookingFormData>(`${import.meta.env.VITE_API_URL}/booking/add`, payload);
            return response.data;
        },
        onSuccess: (response: BookingFormData) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        bookingMutate,
    };
};