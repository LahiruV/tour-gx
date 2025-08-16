import { useMutation, useQuery } from '@tanstack/react-query';
import { BookingFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';


export const useBooking = () => {
    const { mutate: bookingMutate, ...addMutate } = useMutation({
        mutationFn: async (payload: BookingFormData) => {
            const response = await axios.post<BookingFormData>(`${import.meta.env.VITE_API_URL}/booking/add`, payload);
            return response.data;
        },
        onSuccess: (response: BookingFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['add-booking']
    });
    const { mutate: bookingDeleteMutate, ...deleteMutate } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/booking/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: BookingFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['delete-booking'],
    });
    return {
        bookingMutate,
        ...addMutate,
        bookingDeleteMutate,
        ...deleteMutate,
    };
};

export const getBookings = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<any[]>(`${import.meta.env.VITE_API_URL}/booking`);
        return data;
    };
    const { data: response, status, error, refetch } = useQuery({
        queryKey: ['get-bookings'],
        queryFn: () => fetch(),
        enabled: isExecute,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    return {
        response,
        status,
        error,
        refetch,
    };
};