import React from 'react';
import { Edit2, Trash2, Store, CreditCard, Tag, Calendar, AlertCircle } from 'lucide-react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../common/Table';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { formatDateIST } from '../../utils/date';
import { getCategoryById } from '../../utils/expenseCategories';

export const ExpenseTable = ({
  expenses = [],
  onEditExpense,
  onDeleteExpense,
}) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-card border border-border p-12 text-center shadow-subtle">
        <div className="w-12 h-12 rounded-full bg-surface-subtle text-muted-text flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-charcoal">No Expenses Found</h3>
        <p className="text-xs text-muted-text mt-1 max-w-sm mx-auto">
          No expense transactions matched your search query or category filters. Try resetting the filters or add a new expense.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* DESKTOP TABLE VIEW (>= 768px) */}
      <div className="hidden md:block">
        <Table>
          <TableHead>
            <TableRow hover={false}>
              <TableHeader>Date</TableHeader>
              <TableHeader>Item & Description</TableHeader>
              <TableHeader>Category</TableHeader>
              <TableHeader>Vendor / Payee</TableHeader>
              <TableHeader>Payment Mode</TableHeader>
              <TableHeader align="right">Amount</TableHeader>
              <TableHeader align="right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => {
              const category = getCategoryById(expense.category);

              return (
                <TableRow key={expense.id}>
                  
                  {/* Date */}
                  <TableCell className="text-xs text-muted-text font-mono whitespace-nowrap">
                    {formatDateIST(expense.date, 'display')}
                  </TableCell>

                  {/* Title & Notes */}
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-charcoal text-sm">
                        {expense.title}
                      </p>
                      {expense.notes && (
                        <p className="text-xs text-muted-text line-clamp-1 max-w-xs">
                          {expense.notes}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge variant={category.badgeVariant} dot={true}>
                      {category.shortLabel}
                    </Badge>
                  </TableCell>

                  {/* Vendor */}
                  <TableCell className="text-xs text-charcoal">
                    {expense.vendor ? (
                      <div className="flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-muted-text flex-shrink-0" />
                        <span className="truncate max-w-[150px]">{expense.vendor}</span>
                      </div>
                    ) : (
                      <span className="text-muted-text italic">—</span>
                    )}
                  </TableCell>

                  {/* Payment Mode */}
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-subtle text-charcoal border border-border">
                      {expense.paymentMethod || 'Cash'}
                    </span>
                  </TableCell>

                  {/* Amount */}
                  <TableCell align="right" className="font-mono font-bold text-base text-charcoal whitespace-nowrap">
                    {formatINR(expense.amount)}
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconLeft={Edit2}
                        onClick={() => onEditExpense(expense)}
                        title="Edit expense"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconLeft={Trash2}
                        className="text-status-error hover:bg-red-50 hover:text-red-700"
                        onClick={() => onDeleteExpense(expense)}
                        title="Delete expense"
                      />
                    </div>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE CARD VIEW (< 768px) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {expenses.map((expense) => {
          const category = getCategoryById(expense.category);

          return (
            <div
              key={expense.id}
              className="bg-white p-4 rounded-card border border-border shadow-subtle space-y-3"
            >
              {/* Header: Date + Category Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-text font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDateIST(expense.date, 'display')}
                </span>
                <Badge variant={category.badgeVariant} dot={true}>
                  {category.shortLabel}
                </Badge>
              </div>

              {/* Title & Notes */}
              <div>
                <h4 className="font-bold text-charcoal text-base">
                  {expense.title}
                </h4>
                {expense.notes && (
                  <p className="text-xs text-muted-text mt-1">
                    {expense.notes}
                  </p>
                )}
              </div>

              {/* Vendor & Payment Mode */}
              <div className="flex flex-wrap items-center justify-between text-xs text-muted-text pt-2 border-t border-border gap-2">
                <div className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-muted-text" />
                  <span className="truncate max-w-[180px]">{expense.vendor || 'General Vendor'}</span>
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-subtle text-charcoal border border-border">
                  {expense.paymentMethod}
                </span>
              </div>

              {/* Amount & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div>
                  <span className="text-[10px] text-muted-text block uppercase tracking-wider">Amount</span>
                  <span className="font-mono font-bold text-lg text-charcoal">
                    {formatINR(expense.amount)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeft={Edit2}
                    onClick={() => onEditExpense(expense)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconLeft={Trash2}
                    className="text-status-error hover:bg-red-50 hover:text-red-700"
                    onClick={() => onDeleteExpense(expense)}
                  />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ExpenseTable;
