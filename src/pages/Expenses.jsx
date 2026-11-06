import React, { useState, useMemo } from 'react';
import { TrendingDown, Plus, Filter, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExpenseStatsBar } from '../components/expenses/ExpenseStatsBar';
import { ExpenseFilterBar } from '../components/expenses/ExpenseFilterBar';
import { ExpenseTable } from '../components/expenses/ExpenseTable';
import { ExpenseModal } from '../components/expenses/ExpenseModal';
import { ExpenseDeleteModal } from '../components/expenses/ExpenseDeleteModal';

export const Expenses = () => {
  const { expenses } = useApp();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);

  // Check if any filter is active
  const isFiltered = Boolean(
    searchQuery.trim() || categoryFilter !== 'all' || paymentMethodFilter !== 'all'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('all');
    setPaymentMethodFilter('all');
  };

  // Filtered & sorted expenses
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        // Category filter
        if (categoryFilter !== 'all' && expense.category !== categoryFilter) {
          return false;
        }

        // Payment method filter
        if (paymentMethodFilter !== 'all' && expense.paymentMethod !== paymentMethodFilter) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = expense.title?.toLowerCase().includes(query);
          const matchVendor = expense.vendor?.toLowerCase().includes(query);
          const matchNotes = expense.notes?.toLowerCase().includes(query);
          if (!matchTitle && !matchVendor && !matchNotes) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Default newest first
  }, [expenses, categoryFilter, paymentMethodFilter, searchQuery]);

  const handleOpenAddModal = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (expense) => {
    setDeletingExpense(expense);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">
            Business Expense Management
          </h1>
          <p className="text-sm text-muted-text mt-0.5">
            Log and categorize kitchen supplies, groceries, LPG cylinders, staff wages, and operational costs.
          </p>
        </div>
      </div>

      {/* KPI Stats & Category Distribution Bar */}
      <ExpenseStatsBar expenses={expenses} />

      {/* Search & Filter Bar */}
      <ExpenseFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        paymentMethodFilter={paymentMethodFilter}
        setPaymentMethodFilter={setPaymentMethodFilter}
        onOpenAddModal={handleOpenAddModal}
        onResetFilters={handleResetFilters}
        isFiltered={isFiltered}
      />

      {/* Expenses Table & Mobile Cards */}
      <ExpenseTable
        expenses={filteredExpenses}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
      />

      {/* Add / Edit Expense Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingExpense(null);
        }}
        expense={editingExpense}
      />

      {/* Delete Confirmation Modal */}
      <ExpenseDeleteModal
        isOpen={Boolean(deletingExpense)}
        onClose={() => setDeletingExpense(null)}
        expense={deletingExpense}
      />

    </div>
  );
};

export default Expenses;
