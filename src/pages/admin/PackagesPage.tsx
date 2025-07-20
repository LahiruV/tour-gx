import { useState } from 'react';
import { PageTransition } from '@zenra/components';
import { TextField, Button, Modal, Table } from '@zenra/widgets';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Package, Column } from '@zenra/models';
import { toast } from 'sonner';

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPackage) {
            // Update existing package
            setPackages(prev => prev.map(pkg =>
                pkg.id === editingPackage.id
                    ? { ...pkg, ...formData }
                    : pkg
            ));
            toast.success('Package updated successfully!');
        } else {
            // Add new package
            const newPackage: Package = {
                id: Date.now().toString(),
                ...formData,
                hotels: []
            };
            setPackages(prev => [...prev, newPackage]);
            toast.success('Package added successfully!');
        }

        handleCloseModal();
    };

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
            category: 'cultural' // Default category
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPackage(null);
        setFormData(initialFormData);
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

                    {/* Add/Edit Package Modal */}
                    <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        title={editingPackage ? 'Edit Package' : 'Add New Package'}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <TextField
                                label="Package Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />

                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                multiline
                                rows={3}
                                required
                            />

                            <TextField
                                label="Image URL"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                required
                                helperText="Enter a valid image URL"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Price ($)"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />

                                <TextField
                                    label="Duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    required
                                    helperText="e.g., 5 Days, 1 Week"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Group Size"
                                    name="groupSize"
                                    value={formData.groupSize}
                                    onChange={handleInputChange}
                                    required
                                    helperText="e.g., Max 10 people"
                                />

                                <TextField
                                    label="Availability"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                    helperText="e.g., Available year-round"
                                />
                            </div>

                            <div className="flex justify-end space-x-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                >
                                    {editingPackage ? 'Update Package' : 'Add Package'}
                                </Button>
                            </div>
                        </form>
                    </Modal>

                    {/* View Package Modal */}
                    <Modal
                        open={isViewModalOpen}
                        onClose={() => setIsViewModalOpen(false)}
                        title="Package Details"
                    >
                        {viewingPackage && (
                            <div className="space-y-6">
                                <img
                                    src={viewingPackage.image}
                                    alt={viewingPackage.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                />

                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {viewingPackage.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4">{viewingPackage.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-semibold text-gray-700">Price:</span>
                                        <p className="text-2xl font-bold text-primary">${viewingPackage.price}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Duration:</span>
                                        <p className="text-gray-900">{viewingPackage.duration}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Group Size:</span>
                                        <p className="text-gray-900">{viewingPackage.groupSize}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Availability:</span>
                                        <p className="text-gray-900">{viewingPackage.startDate}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsViewModalOpen(false)}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            setIsViewModalOpen(false);
                                            handleEdit(viewingPackage);
                                        }}
                                        startIcon={<PencilIcon className="h-5 w-5" />}
                                    >
                                        Edit Package
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Modal>
                </div>
            </div>
        </PageTransition>
    );
};