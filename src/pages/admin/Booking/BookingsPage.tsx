import { useState, useMemo } from 'react';
import { PageTransition } from '@zenra/components';
import { BookingDetails, Filters } from '@zenra/models';
import { Table } from '@zenra/widgets';
import { getBookings } from '@zenra/services';
import { BookingPageModal } from './BookingPageModal';
import { BookingFilters } from './BookingFilters';
import { bookingColumns } from './BookingColumns';

export const BookingsPage = () => {
  const defaultFilters: Filters = {
    status: 'all',
    startDate: '',
    endDate: '',
    packageName: 'all',
    search: '',
  };

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);

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
            columns={bookingColumns}
            data={sortedBookings}
            keyExtractor={(b) => b.id}
            defaultSort={sortConfig}
            onSort={handleSort}
            rowsPerPageOptions={[5, 10, 25]}
            defaultRowsPerPage={5}
          />
          <BookingPageModal
            isOpen={isModalOpen}
            setIsClose={setIsModalOpen}
            bookingDetails={selectedBooking}
          />
        </div>
      </div>
    </PageTransition>
  );
};
