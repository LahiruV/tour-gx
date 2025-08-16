import {
    IconButton,
    Chip,
} from '@mui/material';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BookingDetails, Column } from '@zenra/models';
import { getStatusColor } from './BookingFilters';

interface BookingColumnsProps {
    handleView: (booking: BookingDetails) => void;
    handleDelete: (bookingId: string) => void;
}

export const bookingColumns = ({ handleView, handleDelete }: BookingColumnsProps): Column<BookingDetails>[] => [
    {
        id: 'firstName',
        label: 'Customer',
        render: (b) => (
            <div>
                <div className="font-medium">{`${b.firstName || ''} ${b.lastName || ''}`}</div>
                <div className="text-sm text-gray-500">{b.email || ''}</div>
            </div>
        ),
    },
    { id: 'packageTitle', label: 'Package', sortable: true },
    { id: 'travelDate', label: 'Travel Date', sortable: true },
    {
        id: 'totalPrice',
        label: 'Amount',
        render: (b) => `$${b.totalPrice || 0}`,
        sortable: true,
        align: 'right',
    },
    {
        id: 'status',
        label: 'Status',
        render: (b) => (
            <Chip
                label={(b.status || '').charAt(0).toUpperCase() + (b.status || '').slice(1)}
                color={getStatusColor(b.status)}
                size="small"
            />
        ),
        sortable: true,
    },
    {
        id: 'guests',
        label: 'Guests',
        render: (b) =>
            `${(b.adults || 0) + (b.children || 0)} (${b.adults || 0} adults, ${b.children || 0} children)`,
    },
    {
        id: 'actions',
        label: 'Actions',
        align: 'right',
        render: (booking) => (
            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => handleView(booking)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                    <EyeIcon className="h-4 w-4" />
                </button>
                <IconButton size="small">
                    <PencilIcon className="h-4 w-4" />
                </IconButton>
                <button
                    onClick={() => handleDelete(String(booking.id ?? ''))}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <TrashIcon className="h-4 w-4" />
                </button>
            </div>
        ),
    },
];
