/**
 * Database abstraction layer for TiffinOS.
 * Provides unified interface for Supabase PostgreSQL operations.
 */
import { supabase, isSupabaseConfigured } from './supabaseClient';

export const db = {
  // 1. Customers
  customers: {
    async getAll() {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    async create(customer) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('customers')
        .insert([customer])
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async update(id, updates) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },

  // 2. Meal Orders & Daily Dispatches
  mealOrders: {
    async getByDate(date) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('meal_orders')
        .select('*, customers(name, phone, address)')
        .eq('date', date)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data;
    },

    async markDispatched(id, dispatchedAt) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('meal_orders')
        .update({ status: 'dispatched', dispatched_at: dispatchedAt })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async cancelOrder(id) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('meal_orders')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },

  // 3. Expenses
  expenses: {
    async getAll() {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return data;
    },

    async create(expense) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('expenses')
        .insert([expense])
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async update(id, updates) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    async delete(id) {
      if (!isSupabaseConfigured()) return null;
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    },
  },

  // 4. Invoices & Payments
  invoices: {
    async getAll() {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('invoices')
        .select('*, invoice_line_items(*), payments(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },

    async create(invoice, lineItems) {
      if (!isSupabaseConfigured()) return null;
      // Insert invoice
      const { data: invData, error: invError } = await supabase
        .from('invoices')
        .insert([invoice])
        .select()
        .single();
      if (invError) throw invError;

      // Insert line items
      if (lineItems && lineItems.length > 0) {
        const itemsWithInvId = lineItems.map((item) => ({
          ...item,
          invoice_id: invData.id,
        }));
        const { error: itemsError } = await supabase
          .from('invoice_line_items')
          .insert(itemsWithInvId);
        if (itemsError) throw itemsError;
      }

      return invData;
    },

    async recordPayment(payment) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('payments')
        .insert([payment])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },

  // 5. Business Settings
  settings: {
    async get() {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('business_settings')
        .select('*')
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },

    async update(updates) {
      if (!isSupabaseConfigured()) return null;
      const { data, error } = await supabase
        .from('business_settings')
        .update(updates)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },
};

export default db;
