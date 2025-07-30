import { useMutation, useQuery } from '@tanstack/react-query';
import { FeedbackFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';


export const useFeedback = () => {
    const { mutate: feedBackMutate } = useMutation({
        mutationFn: async (payload: FeedbackFormData) => {
            const response = await axios.post<FeedbackFormData>(`${import.meta.env.VITE_API_URL}/feedback/add`, payload);
            return response.data;
        },
        onSuccess: (response: FeedbackFormData) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        feedBackMutate,
    };
};

export const getFeedbacks = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<FeedbackFormData[]>(`${import.meta.env.VITE_API_URL}/feedback`);
        return data;
    };
    const { data: response, status, error, refetch } = useQuery({
        queryKey: ['get-feedbacks'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error,
        refetch
    };
};