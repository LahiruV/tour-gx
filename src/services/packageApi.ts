import { useMutation, useQuery } from '@tanstack/react-query';
import { PackageFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';

export const usePackage = () => {
    const { mutate: packageAddMutate, ...addRest } = useMutation({
        mutationFn: async (payload: PackageFormData) => {
            const response = await axios.post<PackageFormData>(
                `${import.meta.env.VITE_API_URL}/packages/add`,
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
                `${import.meta.env.VITE_API_URL}/packages/update`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: PackageFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package update'],
    });

    const { mutate: packageDeleteMutate, ...deleteRest } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/packages/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: PackageFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package delete'],
    });

    return {
        packageAddMutate,
        packageUpdateMutate,
        packageDeleteMutate,
        ...deleteRest,
        ...addRest,
        ...updateRest,
    };
};

export const getPackages = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<PackageFormData>(`${import.meta.env.VITE_API_URL}/packages`);
        return data;
    };
    const { data: response, status, error, refetch } = useQuery({
        queryKey: ['get-packages'],
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