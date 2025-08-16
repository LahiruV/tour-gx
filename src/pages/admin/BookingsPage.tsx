import { useState, useMemo } from 'react';
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
import { Booking, BookingDetails, Column } from '@zenra/models';
import { TextField, Table } from '@zenra/widgets';
import { getBookings } from '@zenra/services';

/* -------------------- Utilities -------------------- */
const getStatusColor = (status: Booking['status'] | string) => {
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

/* -------------------- Types -------------------- */
interface Filters {
  status: string;
  startDate: string;
  endDate: string;
  packageName: string;
  search: string;
}

/* -------------------- Table Columns -------------------- */
const columns: Column<BookingDetails>[] = [
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
    render: () => (
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

/* -------------------- Filters UI -------------------- */
const BookingFilters = ({
  filters,
  onChange,
  onClear,
  packages,
}: {
  filters: Filters;
  onChange: (name: keyof Filters, value: string) => void;
  onClear: () => void;
  packages: string[];
}) => (
  <Paper className="p-4 mb-4">
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            label="Status"
            onChange={(e) => onChange('status', e.target.value)}
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
            onChange={(e) => onChange('packageName', e.target.value)}
          >
            <MenuItem value="all">All Packages</MenuItem>
            {packages.map((pkg) => (
              <MenuItem key={pkg} value={pkg}>
                {pkg}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={2}>
        <TextField
          type="date"
          label="Start Date"
          value={filters.startDate}
          onChange={(e) => onChange('startDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          type="date"
          label="End Date"
          value={filters.endDate}
          onChange={(e) => onChange('endDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          label="Search"
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
          placeholder="Search bookings..."
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} className="flex justify-end mt-2">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
          style={{
            color: 'white',
          }}
          onClick={onClear}
        >
          Clear All Filters
        </button>
      </Grid>
    </Grid>
  </Paper>
);

/* -------------------- Main Page -------------------- */
export const BookingsPage = () => {
  const defaultFilters: Filters = {
    status: 'all',
    startDate: '',
    endDate: '',
    packageName: 'all',
    search: '',
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: 'asc' | 'desc';
  }>({
    field: 'travelDate',
    direction: 'desc',
  });

  const { response } = getBookings(true);
  const bookings = response?.data || [];

  const handleFilterChange = (name: keyof Filters, value: string) =>
    setFilters((prev) => ({ ...prev, [name]: value }));

  const handleClearFilters = () => setFilters(defaultFilters);

  const packages = useMemo(
    () => Array.from(new Set(bookings.map((b) => b.packageName).filter(Boolean))),
    [bookings]
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (filters.status !== 'all' && b.status !== filters.status) return false;
      if (filters.packageName !== 'all' && b.packageName !== filters.packageName) return false;
      if (filters.startDate && b.travelDate < filters.startDate) return false;
      if (filters.endDate && b.travelDate > filters.endDate) return false;

      if (filters.search) {
        const s = filters.search.toLowerCase();
        const name = (b.customerName || `${b.firstName || ''} ${b.lastName || ''}`).toLowerCase();
        const email = (b.email || '').toLowerCase();
        const pkg = (b.packageName || b.packageTitle || '').toLowerCase();

        return name.includes(s) || email.includes(s) || pkg.includes(s);
      }

      return true;
    });
  }, [bookings, filters]);

  /* ----------- Sorting Logic Added Here ----------- */
  const sortedBookings = useMemo(() => {
    const sorted = [...filteredBookings];
    sorted.sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return sorted;
  }, [filteredBookings, sortConfig]);

  const handleSort = (field: string, direction: 'asc' | 'desc') =>
    setSortConfig({ field, direction });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Bookings</h1>

          <BookingFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            packages={packages}
          />

          <Table
            columns={columns}
            data={sortedBookings}
            keyExtractor={(b) => b.id}
            defaultSort={sortConfig}
            onSort={handleSort}
            rowsPerPageOptions={[5, 10, 25]}
            defaultRowsPerPage={5}
          />
        </div>
      </div>
    </PageTransition>
  );
};
