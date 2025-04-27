import { useState } from 'react';
import { PageTransition } from '@zenra/components';
import {
  Paper,
  IconButton,
  Chip,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Booking, Column } from '@zenra/models';
import { TextField, Table } from '@zenra/widgets';

const mockBookings: Booking[] = [
  {
    id: '1',
    customerName: 'John Doe',
    packageName: 'Cultural Heritage Tour',
    bookingDate: '2025-04-15',
    travelDate: '2025-05-20',
    amount: 1299,
    status: 'confirmed',
    adults: 2,
    children: 1,
    email: 'john@example.com',
    phone: '+1234567890',
    specialRequests: 'Vegetarian meals'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    packageName: 'Beach Paradise Escape',
    bookingDate: '2025-04-16',
    travelDate: '2025-06-10',
    amount: 999,
    status: 'pending',
    adults: 2,
    children: 0,
    email: 'jane@example.com',
    phone: '+1234567891'
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    packageName: 'Wildlife Safari Adventure',
    bookingDate: '2025-04-17',
    travelDate: '2025-05-25',
    amount: 1499,
    status: 'cancelled',
    adults: 1,
    children: 0,
    email: 'mike@example.com',
    phone: '+1234567892',
    specialRequests: 'Early check-in requested'
  },
];

const getStatusColor = (status: Booking['status']) => {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

interface Filters {
  status: string;
  startDate: string;
  endDate: string;
  packageName: string;
  search: string;
}

const columns: Column<Booking>[] = [
  {
    id: 'customer',
    label: 'Customer',
    render: (booking) => (
      <div>
        <div className="font-medium">{booking.customerName}</div>
        <div className="text-sm text-gray-500">{booking.email}</div>
      </div>
    ),
  },
  {
    id: 'packageName',
    label: 'Package',
    sortable: true,
  },
  {
    id: 'travelDate',
    label: 'Travel Date',
    sortable: true,
  },
  {
    id: 'amount',
    label: 'Amount',
    render: (booking) => `$${booking.amount}`,
    sortable: true,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    render: (booking) => (
      <Chip
        label={booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        color={getStatusColor(booking.status)}
        size="small"
      />
    ),
    sortable: true,
  },
  {
    id: 'guests',
    label: 'Guests',
    render: (booking) => (
      `${booking.adults + booking.children} (${booking.adults} adults, ${booking.children} children)`
    ),
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'right',
    render: (booking) => (
      <div className="flex justify-end space-x-2">
        <IconButton size="small">
          <EyeIcon className="h-4 w-4" />
        </IconButton>
        <IconButton size="small">
          <PencilIcon className="h-4 w-4" />
        </IconButton>
        <IconButton size="small" color="error">
          <TrashIcon className="h-4 w-4" />
        </IconButton>
      </div>
    ),
  },
];

export const BookingsPage = () => {
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    startDate: '',
    endDate: '',
    packageName: 'all',
    search: '',
  });
  const [sortConfig, setSortConfig] = useState({ field: 'travelDate', direction: 'desc' as const });

  const handleFilterChange = (name: keyof Filters) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [name]: event.target.value
    }));
  };

  const uniquePackages = Array.from(new Set(mockBookings.map(booking => booking.packageName)));

  const filteredBookings = mockBookings.filter(booking => {
    if (filters.status !== 'all' && booking.status !== filters.status) return false;
    if (filters.packageName !== 'all' && booking.packageName !== filters.packageName) return false;
    if (filters.startDate && booking.travelDate < filters.startDate) return false;
    if (filters.endDate && booking.travelDate > filters.endDate) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        booking.customerName.toLowerCase().includes(searchLower) ||
        booking.email.toLowerCase().includes(searchLower) ||
        booking.packageName.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortConfig({ field, direction });
    // Here you would typically sort the data or make an API call with new sort parameters
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Bookings</h1>

          {/* Filters */}
          <Paper className="p-4 mb-4">
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filters.status}
                    label="Status"
                    onChange={handleFilterChange('status')}
                  >
                    <MenuItem value="all">All Statuses</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Package</InputLabel>
                  <Select
                    value={filters.packageName}
                    label="Package"
                    onChange={handleFilterChange('packageName')}
                  >
                    <MenuItem value="all">All Packages</MenuItem>
                    {uniquePackages.map(pkg => (
                      <MenuItem key={pkg} value={pkg}>{pkg}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  type="date"
                  label="Start Date"
                  value={filters.startDate}
                  onChange={handleFilterChange('startDate')}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  type="date"
                  label="End Date"
                  value={filters.endDate}
                  onChange={handleFilterChange('endDate')}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Search"
                  value={filters.search}
                  onChange={handleFilterChange('search')}
                  placeholder="Search bookings..."
                />
              </Grid>
            </Grid>
          </Paper>

          <Table
            columns={columns}
            data={filteredBookings}
            keyExtractor={(booking) => booking.id}
            defaultSort={sortConfig}
            onSort={handleSort}
            rowsPerPageOptions={[5, 10, 25]}
            defaultRowsPerPage={10}
          />
        </div>
      </div>
    </PageTransition>
  );
};