import { useEffect, useState } from 'react';
import { PageTransition } from '@zenra/components';
import { AlertDialogSlide, Button, Table } from '@zenra/widgets';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Package, Column, PackageFormData } from '@zenra/models';
import { toast } from 'sonner';
import { AdminPackageForm } from './PackageForm';
import { getPackages, usePackage } from '@zenra/services';

const initialFormData: PackageFormData = {
    title: '',
    description: '',
    image: '',
    price: 0,
    duration: '',
    groupSize: '',
    startDate: '',
};

export const AdminPackagesPage = () => {

    const { packageDeleteMutate } = usePackage();
    const { response, refetch } = getPackages(true);
    const [packages, setPackages] = useState<Package[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);
    const [viewingPackage, setViewingPackage] = useState<Package | null>(null);
    const [formData, setFormData] = useState<PackageFormData>(initialFormData);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [agreeButtonText, setAgreeButtonText] = useState<string>('Yes');
    const [disagreeButtonText, setDisagreeButtonText] = useState<string>('No');
    const [delID, setDelID] = useState<string>('');

    useEffect(() => {
        if (response) {
            setPackages(Array.isArray(response.data) ? response.data as Package[] : []);
        }
    }, [response]);

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setFormData({
            title: pkg.title,
            description: pkg.description,
            image: pkg.image,
            price: pkg.price,
            duration: pkg.duration,
            groupSize: pkg.groupSize,
            startDate: pkg.startDate
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setIsDeleteDialogOpen(true);
        setTitle('Confirm Deletion');
        setDescription('Are you sure you want to delete this package?');
        setAgreeButtonText('Delete');
        setDisagreeButtonText('Cancel');
        setDelID(id);
    };

    const handleView = (pkg: Package) => {
        setViewingPackage(pkg);
        setIsViewModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingPackage(null);
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const handleDialogClose = () => setIsDeleteDialogOpen(false);

    const handleDeleteConfirmed = () => {
        if (delID) {
            packageDeleteMutate(delID, {
                onSuccess: () => {
                    setPackages(prev => prev.filter(pkg => pkg.id !== delID));
                    toast.success('Package deleted successfully!');
                },
                onError: (error) => {
                    toast.error('Failed to delete package');
                    console.error('Delete failed:', error);
                },
            });
        }
        setIsDeleteDialogOpen(false);
    };
    const handleDeleteCancelled = () => {
        setIsDeleteDialogOpen(false);
        toast.info('Deletion cancelled');
    };


    const columns: Column<Package>[] = [
        {
            id: 'image',
            label: 'Image',
            render: (pkg) => (
                <img
                    src={`data:image/png;base64,${pkg.image}`}
                    alt={pkg.title}
                    className="w-16 h-16 object-cover rounded-lg"
                />
            ),
            width: 80
        },
        {
            id: 'title',
            label: 'Title',
            sortable: true,
        },
        {
            id: 'duration',
            label: 'Duration',
            sortable: true,
        },
        {
            id: 'groupSize',
            label: 'Group Size',
        },
        {
            id: 'price',
            label: 'Price',
            render: (pkg) => `$${pkg.price}`,
            sortable: true,
            align: 'right',
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'right',
            render: (pkg) => (
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => handleView(pkg)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                        <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(pkg.id ?? '')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
                        <Button
                            variant="primary"
                            startIcon={<PlusIcon className="h-5 w-5" />}
                            onClick={handleAddNew}
                        >
                            Add New Package
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        data={packages}
                        keyExtractor={(pkg) => pkg.id ?? ''}
                        defaultSort={{ field: 'title', direction: 'asc' }}
                        rowsPerPageOptions={[5, 10, 25]}
                        defaultRowsPerPage={10}
                    />
                    <AdminPackageForm
                        refetch={refetch}
                        packages={packages}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        editingPackage={editingPackage}
                        setEditingPackage={setEditingPackage}
                        isViewModalOpen={isViewModalOpen}
                        setIsViewModalOpen={setIsViewModalOpen}
                        viewingPackage={viewingPackage}
                        setViewingPackage={setViewingPackage}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>

            <AlertDialogSlide
                open={isDeleteDialogOpen}
                handleAgree={handleDeleteConfirmed}
                handleDisagree={handleDeleteCancelled}
                onClose={handleDialogClose}
                handleClose={handleDialogClose}
                title={title}
                description={description}
                agreeButtonText={agreeButtonText}
                disagreeButtonText={disagreeButtonText}
                aColor='error'
                aVariant='contained'
                aSize='small'
                dColor='primary'
                dVariant='outlined'
                dSize='small'
            />
        </PageTransition>
    );
};