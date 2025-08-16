import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Package, Column } from '@zenra/models';

interface PackageColumnsProps {
    handleView: (pkg: Package) => void;
    handleEdit: (pkg: Package) => void;
    handleDelete: (pkgId: string) => void;
}

export const packageColumns = ({ handleView, handleEdit, handleDelete }: PackageColumnsProps): Column<Package>[] => [
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