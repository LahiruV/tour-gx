import { useState } from 'react';
import { TextField, Button, Modal } from '@zenra/widgets';
import { PencilIcon, } from '@heroicons/react/24/outline';
import { Package } from '@zenra/models';
import { toast } from 'sonner';

interface PackageFormProps {
    packages: Package[];
    setPackages: Function;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    editingPackage: Package | null;
    setEditingPackage: Function;
    isViewModalOpen: boolean;
    setIsViewModalOpen: Function;
    viewingPackage: Package | null;
    setViewingPackage: Function;
    formData: PackageFormData;
    setFormData: Function;
}

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

export const AdminPackageForm = ({
    setPackages,
    isModalOpen,
    setIsModalOpen,
    editingPackage,
    setEditingPackage,
    isViewModalOpen,
    setIsViewModalOpen,
    viewingPackage,
    formData,
    setFormData
}: PackageFormProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: PackageFormData) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingPackage) {
            // Update existing package
            setPackages((prev: Package[]) =>
                prev.map((pkg: Package) =>
                    pkg.id === (editingPackage as Package).id
                        ? { ...pkg, ...formData }
                        : pkg
                )
            );
            toast.success('Package updated successfully!');
        } else {
            // Add new package
            const newPackage: Package = {
                id: Date.now().toString(),
                ...formData,
                hotels: []
            };
            setPackages((prev: Package[]) => [...prev, newPackage]);
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPackage(null);
        setFormData(initialFormData);
    };

    return (
        <div>
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
        </div >
    );
};