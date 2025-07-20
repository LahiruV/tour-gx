import { useState } from 'react';
import { PageTransition } from '@zenra/components';
import { Button, Table } from '@zenra/widgets';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Package, Column } from '@zenra/models';
import { toast } from 'sonner';
import { AdminPackageForm } from './PackageForm';

interface PackageFormData {
    title: string;
    description: string;
    image: string;
    price: number;
    duration: string;
    groupSize: string;
    startDate: string;
    category: string;
}

const initialFormData: PackageFormData = {
    title: '',
    description: '',
    image: '',
    price: 0,
    duration: '',
    groupSize: '',
    startDate: '',
    category: ''
};

const mockPackages: Package[] = [
    {
        id: '1',
        title: 'Cultural Heritage Tour',
        description: 'Explore ancient temples, historical sites, and traditional villages.',
        image: 'https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 1299,
        duration: '6 Days',
        groupSize: 'Max 12 people',
        startDate: 'Available year-round',
        hotels: []
    },
    {
        id: '2',
        title: 'Beach Paradise Escape',
        description: 'Relax on pristine beaches and enjoy water sports activities.',
        image: 'https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 999,
        duration: '5 Days',
        groupSize: 'Max 10 people',
        startDate: 'Available year-round',
        hotels: []
    },
    {
        id: '3',
        title: 'Wildlife Safari Adventure',
        description: 'Encounter elephants, leopards, and exotic birds in their natural habitat.',
        image: 'https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        price: 1499,
        duration: '7 Days',
        groupSize: 'Max 8 people',
        startDate: 'Available year-round',
        hotels: []
    }
];

export const AdminPackagesPage = () => {
    const [packages, setPackages] = useState<Package[]>(mockPackages);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);
    const [viewingPackage, setViewingPackage] = useState<Package | null>(null);
    const [formData, setFormData] = useState<PackageFormData>(initialFormData);

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setFormData({
            title: pkg.title,
            description: pkg.description,
            image: pkg.image,
            price: pkg.price,
            duration: pkg.duration,
            groupSize: pkg.groupSize,
            startDate: pkg.startDate,
            category: 'cultural'
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            setPackages(prev => prev.filter(pkg => pkg.id !== id));
            toast.success('Package deleted successfully!');
        }
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

    const columns: Column<Package>[] = [
        {
            id: 'image',
            label: 'Image',
            render: (pkg) => (
                <img
                    src={pkg.image}
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
                        onClick={() => handleDelete(pkg.id)}
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
                        keyExtractor={(pkg) => pkg.id}
                        defaultSort={{ field: 'title', direction: 'asc' }}
                        rowsPerPageOptions={[5, 10, 25]}
                        defaultRowsPerPage={10}
                    />
                    <AdminPackageForm
                        packages={packages}
                        setPackages={setPackages}
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
        </PageTransition>
    );
};