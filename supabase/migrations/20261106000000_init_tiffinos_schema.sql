-- ==============================================================================
-- TIFFINOS – FAMILY EDITION DATABASE SCHEMA (FOOLPROOF & RE-RUNNABLE)
-- PostgreSQL Schema & Row Level Security (RLS) for Supabase
-- Target Timezone: Asia/Kolkata (IST) | Currency: INR (₹)
-- ==============================================================================

-- 1. BUSINESS PROFILES & SETTINGS
CREATE TABLE IF NOT EXISTS public.business_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL DEFAULT 'Shree Annapurna Tiffin Service',
    owner_name TEXT NOT NULL DEFAULT 'Saksham Srivastava',
    phone TEXT NOT NULL DEFAULT '+91 98260 55432',
    whatsapp_number TEXT DEFAULT '+91 98260 55432',
    upi_id TEXT NOT NULL DEFAULT 'annapurnatiffin@okaxis',
    address TEXT NOT NULL DEFAULT 'Plot 44, Kailash Nagar, Indore, Madhya Pradesh 452001',
    default_lunch_price NUMERIC(10, 2) NOT NULL DEFAULT 110.00,
    default_dinner_price NUMERIC(10, 2) NOT NULL DEFAULT 120.00,
    lunch_cutoff TEXT DEFAULT '11:00 AM',
    dinner_cutoff TEXT DEFAULT '06:30 PM',
    operating_days JSONB DEFAULT '{"mon": true, "tue": true, "wed": true, "thu": true, "fri": true, "sat": true, "sun": false}'::JSONB,
    currency TEXT DEFAULT 'INR (₹)',
    timezone TEXT DEFAULT 'Asia/Kolkata',
    date_format TEXT DEFAULT 'DD/MM/YYYY',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CUSTOMERS
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('regular', 'occasional')) DEFAULT 'regular',
    status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'archived')) DEFAULT 'active',
    lunch_price NUMERIC(10, 2) NOT NULL DEFAULT 110.00,
    dinner_price NUMERIC(10, 2) NOT NULL DEFAULT 120.00,
    schedule JSONB NOT NULL DEFAULT '{}'::JSONB,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. DAILY MEAL ORDERS & DISPATCHES
CREATE TABLE IF NOT EXISTS public.meal_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    meal_type TEXT NOT NULL CHECK (meal_type IN ('lunch', 'dinner')),
    price NUMERIC(10, 2) NOT NULL,
    source TEXT NOT NULL CHECK (source IN ('regular', 'one_time')) DEFAULT 'regular',
    status TEXT NOT NULL CHECK (status IN ('pending', 'dispatched', 'cancelled')) DEFAULT 'pending',
    dispatched_at TEXT,
    instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    
    -- STRICTURE: Enforce duplicate prevention at database level
    CONSTRAINT uq_customer_meal_per_slot UNIQUE (customer_id, date, meal_type)
);

-- 4. BUSINESS EXPENSES
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    category TEXT NOT NULL,
    date DATE NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('UPI', 'Cash', 'Bank Transfer')) DEFAULT 'UPI',
    vendor TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. MONTHLY INVOICES
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    invoice_number TEXT NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE NOT NULL,
    period TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    paid_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    balance_due NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL CHECK (status IN ('unpaid', 'partially_paid', 'paid')) DEFAULT 'unpaid',
    meal_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),

    -- STRICTURE: Prevent duplicate invoice generation for same period
    CONSTRAINT uq_customer_invoice_period UNIQUE (customer_id, period)
);

-- 6. INVOICE LINE ITEMS (Preserves historical prices without averaging)
CREATE TABLE IF NOT EXISTS public.invoice_line_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
    description TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. INVOICE PAYMENTS (Supports partial payments and logs audit trail)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
    date DATE NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('UPI', 'Cash', 'Bank Transfer')) DEFAULT 'UPI',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- INDEXES FOR PRODUCTION QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_customers_status ON public.customers(status);
CREATE INDEX IF NOT EXISTS idx_meal_orders_date ON public.meal_orders(date, status);
CREATE INDEX IF NOT EXISTS idx_meal_orders_customer ON public.meal_orders(customer_id, date);
CREATE INDEX IF NOT EXISTS idx_expenses_date_category ON public.expenses(date, category);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON public.invoices(customer_id, status);
CREATE INDEX IF NOT EXISTS idx_line_items_invoice ON public.invoice_line_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON public.payments(invoice_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enables security with safe re-runnable statements
-- ==============================================================================
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent "policy already exists" errors
DROP POLICY IF EXISTS "Owner manages their business settings" ON public.business_settings;
DROP POLICY IF EXISTS "Owner manages their customers" ON public.customers;
DROP POLICY IF EXISTS "Owner manages their meal dispatches" ON public.meal_orders;
DROP POLICY IF EXISTS "Owner manages their expenses" ON public.expenses;
DROP POLICY IF EXISTS "Owner manages their invoices" ON public.invoices;
DROP POLICY IF EXISTS "Owner manages invoice line items" ON public.invoice_line_items;
DROP POLICY IF EXISTS "Owner manages invoice payments" ON public.payments;

-- Enable access for authenticated owner and public/anon for initial family use
CREATE POLICY "Owner manages their business settings" ON public.business_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Owner manages their customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Owner manages their meal dispatches" ON public.meal_orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Owner manages their expenses" ON public.expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Owner manages their invoices" ON public.invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Owner manages invoice line items" ON public.invoice_line_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Owner manages invoice payments" ON public.payments FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- AUTOMATIC TIMESTAMPS TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_customers_timestamp ON public.customers;
CREATE TRIGGER trigger_update_customers_timestamp
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_update_business_settings_timestamp ON public.business_settings;
CREATE TRIGGER trigger_update_business_settings_timestamp
    BEFORE UPDATE ON public.business_settings
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- ==============================================================================
-- INITIAL SEED (Inserts default settings if not already present)
-- ==============================================================================
INSERT INTO public.business_settings (
    business_name,
    owner_name,
    phone,
    whatsapp_number,
    upi_id,
    address,
    default_lunch_price,
    default_dinner_price
) 
SELECT 
    'Shree Annapurna Tiffin Service',
    'Saksham Srivastava',
    '+91 98260 55432',
    '+91 98260 55432',
    'annapurnatiffin@okaxis',
    'Plot 44, Kailash Nagar, Indore, Madhya Pradesh 452001',
    110.00,
    120.00
WHERE NOT EXISTS (SELECT 1 FROM public.business_settings LIMIT 1);
