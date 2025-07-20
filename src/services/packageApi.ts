import { useMutation } from '@tanstack/react-query';
import { PackageFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';

export const usePackage = () => {
    const { mutate: packageAddMutate, ...addRest } = useMutation({
        mutationFn: async (payload: PackageFormData) => {
            const response = await axios.post<PackageFormData>(
                `${import.meta.env.VITE_API_URL}/package/add`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: PackageFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package add'],
    });

    const { mutate: packageUpdateMutate, ...updateRest } = useMutation({
        mutationFn: async (payload: PackageFormData) => {
            const response = await axios.put<PackageFormData>(
                `${import.meta.env.VITE_API_URL}/package/update`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: PackageFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package update'],
    });

    return {
        packageAddMutate,
        packageUpdateMutate,
        ...addRest,
        ...updateRest,
    };
};

// export const useUpdatePackage = () => {
//     const { mutate: packageUpdateMutate } = useMutation({
//         mutationFn: async (payload: PackageFormData) => {
//             const response = await axios.put<PackageFormData>(`${import.meta.env.VITE_API_URL}/package/update`, payload);
//             return response.data;
//         },
//         onSuccess: (response: PackageFormData) => response,
//         onError: (err: AxiosError) => err,
//         mutationKey: ['package update'],
//     });
//     return {
//         packageUpdateMutate,
//     };
// }