import { useMutation } from '@tanstack/react-query';
import { LoginCredentials, RegisterCredentials, DefaultResponse } from '@zenra/models';
import axios, { AxiosError } from 'axios';


export const useLogin = () => {
  const { mutate: loginMutate } = useMutation({
    mutationFn: async (payload: LoginCredentials) => {
      const response = await axios.post<DefaultResponse>(`${import.meta.env.VITE_API_URL}/auth/login`, payload);
      return response.data;
    },
    onSuccess: (response: DefaultResponse) => response,
    onError: (err: AxiosError) => err,
  });
  return {
    loginMutate,
  };
};


export const useRegister = () => {
  const { mutate: registerMutate } = useMutation({
    mutationFn: async (payload: RegisterCredentials) => {
      const response = await axios.post<DefaultResponse>(`${import.meta.env.VITE_API_URL}/auth/register`, payload);
      return response.data;
    },
    onSuccess: (response: DefaultResponse) => response,
    onError: (err: AxiosError) => err,
  });
  return {
    registerMutate,
  };
}