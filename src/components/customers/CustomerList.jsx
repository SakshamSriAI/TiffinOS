import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  PauseCircle, 
  PlayCircle, 
  Phone, 
  MapPin, 
  Plus,
  CheckCircle2,
  Calendar,
  IndianRupee,
  MoreVertical
} from 'lucide-react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../common/Table';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useApp } from '../../context/AppContext';
import { useSecurity } from '../../context/SecurityContext';
import { formatINR } from '../../utils/currency';

export const CustomerList = ({ onViewProfile, onEditCustomer }) => {
  const { customers, pauseCustomer, reactivateCustomer } = useApp();
  const { maskPhone } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'paused' | 'archived'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'regular' | 'occasional'

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      // Search
      const matchesSearch =
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.phone.includes(searchQuery) ||
        cust.address.toLowerCase().includes(searchQuery.toLowerCase());

      // Status
      const matchesStatus =
        statusFilter === 'all' || cust.status === statusFilter;

      // Type
      const matchesType =
        typeFilter === 'all' || cust.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [customers, searchQuery, statusFilter, typeFilter]);

  // Helper to summarize weekly schedule
  const formatScheduleSummary = (cust) => {
    if (cust.type === 'occasional') {
      return 'Ad-hoc on-demand';
    }

    if (!cust.schedule) return 'Mon–Sat';

    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const activeDays = days.filter((d) => cust.schedule[d]?.lunch || cust.schedule[d]?.dinner);

    if (activeDays.length === 7) return 'All 7 Days';
    if (activeDays.length === 6 && !cust.schedule.sun?.lunch && !cust.schedule.sun?.dinner) {
      return 'Mon–Sat';
    }
    if (activeDays.length === 5 && !cust.schedule.sat?.lunch && !cust.schedule.sun?.lunch) {
      return 'Mon–Fri';
    }

    return `${activeDays.length} days/week`;
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-card border border-border shadow-subtle flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="w-full md:max-w-md">
          <Input
            placeholder="Search by customer name, phone, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            iconLeft={Search}
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Tabs */}
          <div className="inline-flex rounded-button bg-surface-subtle p-1 border border-border">
            {[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Active' },
              { id: 'paused', label: 'Paused' },
              { id: 'archived', label: 'Archived' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-button transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-forest text-white shadow-xs'
                    : 'text-muted-text hover:text-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="text-xs bg-white border border-border rounded-button px-3 py-2 text-charcoal focus:ring-forest/20 focus:border-forest"
          >
            <option value="all">All Types</option>
            <option value="regular">Regular Only</option>
            <option value="occasional">Occasional Only</option>
          </select>
        </div>

      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-muted-text px-1">
        <span>
          Showing <strong>{filteredCustomers.length}</strong> of {customers.length} registered customers
        </span>
      </div>

      {/* DESKTOP TABLE VIEW (Visible on tablet & desktop >= 768px) */}
      <div className="hidden md:block">
        <Table>
          <TableHead>
            <TableRow hover={false}>
              <TableHeader>Customer & Delivery Address</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Agreed Pricing</TableHeader>
              <TableHeader>Weekly Schedule</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow hover={false}>
                <TableCell colSpan={7} className="text-center py-12 text-muted-text">
                  No customers found matching your search and filter criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((cust) => {
                const isActive = cust.status === 'active';
                const isPaused = cust.status === 'paused';
                const isArchived = cust.status === 'archived';

                return (
                  <TableRow key={cust.id}>
                    {/* Name & Address */}
                    <TableCell>
                      <button
                        onClick={() => onViewProfile(cust)}
                        className="text-left font-bold text-forest-deep hover:text-forest hover:underline block"
                      >
                        {cust.name}
                      </button>
                      <p className="text-xs text-muted-text truncate max-w-xs mt-0.5">
                        {cust.address}
                      </p>
                    </TableCell>

                    {/* Phone */}
                    <TableCell className="text-xs font-mono text-charcoal">
                      {maskPhone(cust.phone)}
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <Badge variant={cust.type === 'regular' ? 'forest' : 'mint'} size="sm">
                        {cust.type === 'regular' ? 'Regular' : 'Occasional'}
                      </Badge>
                    </TableCell>

                    {/* Agreed Pricing */}
                    <TableCell>
                      <div className="text-xs font-mono">
                        <span className="font-semibold text-charcoal">L: {formatINR(cust.lunchPrice)}</span>
                        <span className="text-muted-light mx-1">·</span>
                        <span className="font-semibold text-charcoal">D: {formatINR(cust.dinnerPrice)}</span>
                      </div>
                    </TableCell>

                    {/* Weekly Schedule */}
                    <TableCell className="text-xs text-charcoal">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-muted-light" />
                        {formatScheduleSummary(cust)}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant={isActive ? 'success' : isPaused ? 'pending' : 'neutral'}
                        size="sm"
                        dot={true}
                      >
                        {cust.status.toUpperCase()}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconLeft={Eye}
                          onClick={() => onViewProfile(cust)}
                          title="View complete customer profile"
                        >
                          View
                        </Button>

                        <Button
                          variant="secondary"
                          size="sm"
                          iconLeft={Edit}
                          onClick={() => onEditCustomer(cust)}
                          title="Edit pricing and agreement"
                        >
                          Edit
                        </Button>

                        {isActive ? (
                          <button
                            type="button"
                            onClick={() => pauseCustomer(cust.id)}
                            className="p-1.5 text-muted-text hover:text-amber-dark hover:bg-amber-50 rounded transition-colors"
                            title="Pause meal delivery"
                          >
                            <PauseCircle className="w-4 h-4" />
                          </button>
                        ) : isPaused ? (
                          <button
                            type="button"
                            onClick={() => reactivateCustomer(cust.id)}
                            className="p-1.5 text-status-success hover:bg-emerald-50 rounded transition-colors"
                            title="Reactivate meal delivery"
                          >
                            <PlayCircle className="w-4 h-4" />
                          </button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE CARD VIEW (< 768px) */}
      <div className="md:hidden space-y-3">
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-text bg-white rounded-card border border-border">
            No customers found.
          </div>
        ) : (
          filteredCustomers.map((cust) => {
            const isActive = cust.status === 'active';
            const isPaused = cust.status === 'paused';

            return (
              <div
                key={cust.id}
                className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3
                      onClick={() => onViewProfile(cust)}
                      className="font-bold text-forest-deep text-base cursor-pointer"
                    >
                      {cust.name}
                    </h3>
                    <p className="text-xs text-muted-text flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-muted-light" />
                      <span className="truncate">{cust.address}</span>
                    </p>
                  </div>

                  <Badge
                    variant={isActive ? 'success' : isPaused ? 'pending' : 'neutral'}
                    size="sm"
                    dot={true}
                  >
                    {cust.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-border/60 bg-surface-subtle/50 -mx-4 px-4">
                  <div>
                    <span className="text-[10px] text-muted-text uppercase font-semibold block">Agreed Rates</span>
                    <span className="font-mono font-bold text-forest">
                      L: {formatINR(cust.lunchPrice)} · D: {formatINR(cust.dinnerPrice)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-text uppercase font-semibold block">Schedule</span>
                    <span className="text-charcoal font-medium">
                      {formatScheduleSummary(cust)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs font-mono text-muted-text">
                    {maskPhone(cust.phone)}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onViewProfile(cust)}
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onEditCustomer(cust)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default CustomerList;
