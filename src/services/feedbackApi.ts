import { useMutation } from '@tanstack/react-query';
import { LoginCredentials, AuthResponse } from '@zenra/models';
import axios, { AxiosError } from 'axios';


export const useLogin = () => {
    const { mutate: feedBackMutate } = useMutation({
        mutationFn: async (payload: LoginCredentials) => {
            const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_API_URL}/feedback/add`, payload);
            return response.data;
        },
        onSuccess: (response: AuthResponse) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        feedBackMutate,
    };
};