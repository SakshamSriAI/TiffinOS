# 🍱 TiffinOS – Family Edition

> **Run Your Tiffin Business. Without the Daily Chaos.**  
> A professional, production-quality, responsive web application purpose-built for independent tiffin services and meal delivery businesses.

[![React 18](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.14-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E.svg)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Executive Summary

**TiffinOS – Family Edition** replaces manual diaries, paper notebooks, loose registers, and fragmented WhatsApp chats with a single, reliable operating system.

Initially engineered for an independent family tiffin service in Indore, Madhya Pradesh serving 20–50 regular customers, TiffinOS enforces strict billing accuracy, protects pricing integrity, tracks every single dispatched meal, and gives the owner clear visibility over daily operational expenses and net operating profit.

---

## ✨ Core Features & Business Guarantees

### 1. 👥 Customer Management (`/customers`)
- **Recurring Schedule Matrix**: 7-day visual selector for lunch and dinner with 1-click presets (*Mon–Sat Both*, *Mon–Fri Lunch Only*, etc.).
- **Individual Customer Pricing**: Supports different negotiated rates per customer (e.g., Rajesh pays ₹120/lunch while Ananya pays ₹110/lunch).
- **Customer Lifecycle Control**: Seamlessly transition customers between `Active`, `Paused` (out-of-town pauses that halt dispatch generation), and `Archived` (historical records preserved).
- **Full Customer Audit Profile**: Inspect chronological dispatch history, monthly ledger statements, and contact details.

### 2. 🚚 Daily Meal Dispatch & Duplicate Protection (`/dispatch`)
- **Mobile-First Packing Terminal**: Designed for kitchen touchscreens and phones with 1-tap "Mark Dispatched" confirmation.
- **Strict Dispatched-Only Billing Rule**: Only meals with `status === 'dispatched'` are ever billable. Cancelled and pending meals are strictly excluded.
- **Duplicate Prevention Guardrails**: Hard constraint prevents duplicate meal generation for the same customer, date, and meal type.
- **Ad-Hoc / One-Time Bookings**: Book occasional guest meals that instantly appear on the packing list and feed into monthly billing.
- **Dietary Instruction Alerts**: Prominent visual callouts for medical diets (*Diabetic meal, no sugar*), religious restrictions (*No onion on Tuesdays*), and portion preferences.

### 3. 🧾 Monthly Invoices & Payment Ledger (`/billing`)
- **Itemized Dispatched Billing**: 1-click individual or bulk invoice generation strictly derived from verified deliveries.
- **Historical Price Integrity**: Mid-month customer price revisions do **not** average prices. Separate line items preserve historical rates transparently.
- **Partial & Multi-Installment Payments**: Record cash or UPI payments against invoices; calculates real-time `balanceDue` and derives payment status (`Unpaid`, `Partially Paid`, `Paid`).
- **Printable Statements**: Formatted with print CSS (`@media print`) for 1-click clean paper receipts without navigation bars.
- **WhatsApp Share Link**: 1-tap sharing of monthly billing summaries with UPI payment ID directly to customers.

### 4. 🛒 Business Expense Tracking (`/expenses`)
- **Domain-Specific Kitchen Categories**: Groceries & Provisions, Fresh Mandi Vegetables & Dairy, Commercial LPG Gas Cylinders, Staff Wages, Packaging Containers, and Delivery Fuel.
- **Outflow Analytics**: Real-time monthly spend, today's outflow, daily burn rate, and top spending category.
- **Segmented Distribution Bar**: Multi-colored visual distribution showing 100% breakdown across expense areas.

### 5. 📊 Reports, Analytics & CSV Exports (`/reports`)
- **Interactive Recharts Visualizations**:
  - Daily Revenue vs. Operating Expenses with net margin tooltips.
  - Daily Lunch vs. Dinner Dispatch Volume trends.
  - Expense Category Distribution Donut Chart.
- **Monthly Statement of Profit & Loss (P&L)**: Complete accounting summary itemizing meal revenue, operational costs, net operating profit, and cash collection rate.
- **1-Click CSV Exports**:
  - `tiffinos-profit-loss-summary.csv`
  - `tiffinos-meals.csv`
  - `tiffinos-invoices.csv`
  - `tiffinos-expenses.csv`

### 6. ⚙️ Business Settings & Configuration (`/settings`)
- **Kitchen Identity**: Service name, owner contact, kitchen address, and invoice payment UPI ID.
- **Operating Rules**: Weekly active service days toggle and lunch/dinner order cutoff thresholds.
- **Pricing Defaults**: Standard starting prices for new registrations without altering existing agreements.
- **Backend Architecture Hub**: Live Supabase connection status tester, schema versioning, and full JSON database snapshot backup.

---

## 🎨 Design System

Engineered without generic AI templates, purple gradient blobs, or excessive rounding. Built with high-trust design tokens inspired by Linear, Stripe, and Notion:

| Token Name | Hex Code | Purpose |
|---|---|---|
| **Primary Forest Green** | `#173D35` | Primary brand actions, active headers, key accents |
| **Deep Forest Green** | `#172E2A` | High-contrast hero sections, navigation drawers |
| **Warm Off-white** | `#EDEBE4` | Main page body backgrounds |
| **Pure White** | `#FFFFFF` | Cards, tables, modals, interactive surfaces |
| **Soft Mint** | `#D6F1E4` | Subtle highlights, active badges, status chips |
| **Amber Accent** | `#D49A34` | Pending indicators, out-of-town warnings, alerts |
| **Charcoal** | `#252B29` | Primary typography and headlines |
| **Muted Text** | `#737A75` | Captions, secondary labels, dates |
| **Border Gray** | `#E2E4DE` | Subtle component dividers and card borders |
| **Success Green** | `#27845D` | Dispatched states, paid invoices, profit badges |
| **Error Red** | `#C94F4F` | Cancelled orders, unpaid debts, delete warnings |

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 (SPA)
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Data Visualization**: Recharts 2
- **Routing**: React Router DOM 6
- **Backend & Database**: Supabase (PostgreSQL with Row Level Security)
- **Timezone**: Indian Standard Time (`Asia/Kolkata`, IST +5:30)
- **Currency**: Indian Rupee (`INR ₹`)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SakshamSriAI/TiffinOS.git
cd TiffinOS
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment (Optional)
TiffinOS runs **100% out-of-the-box in local mode** without needing an external database. If you wish to connect Supabase:
```bash
cp .env.example .env
```
Edit `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_USE_MOCK_DATA=false
```

### 4. Start local development server
```bash
npm run dev
```

Visit:
- **Public Landing Page**: [http://localhost:5173/](http://localhost:5173/)
- **Business Dashboard**: [http://localhost:5173/dashboard](http://localhost:5173/dashboard)
- **Customers**: [http://localhost:5173/customers](http://localhost:5173/customers)
- **Daily Dispatch**: [http://localhost:5173/dispatch](http://localhost:5173/dispatch)
- **Billing & Invoices**: [http://localhost:5173/billing](http://localhost:5173/billing)
- **Expenses**: [http://localhost:5173/expenses](http://localhost:5173/expenses)
- **Reports & Analytics**: [http://localhost:5173/reports](http://localhost:5173/reports)
- **Settings**: [http://localhost:5173/settings](http://localhost:5173/settings)
- **Design System Showcase**: [http://localhost:5173/design-system](http://localhost:5173/design-system)

### 5. Build for production
```bash
npm run build
```

---

## 🗄️ Database Architecture (Supabase / PostgreSQL)

The database schema is structured for strict data integrity:

| Table | Purpose | Constraints / Key Rules |
|---|---|---|
| `business_settings` | Owner configuration | 1 row per authenticated user (`user_id UNIQUE`) |
| `customers` | Customer directory | Individual lunch/dinner prices, 7-day schedule JSON |
| `meal_orders` | Dispatched tiffins | `UNIQUE (customer_id, date, meal_type)` prevents duplicate orders |
| `expenses` | Kitchen outflow | Positive amount constraint, category classification |
| `invoices` | Monthly billing statements | `UNIQUE (customer_id, period)` prevents duplicate cycle invoices |
| `invoice_line_items` | Non-averaged rate items | Separate rows for distinct historical unit prices |
| `payments` | Customer collections | Links to invoices, tracks UPI/Cash/Bank method |

### Applying Database Migrations:
1. Open your project on [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Copy and run [`supabase/migrations/20261106000000_init_tiffinos_schema.sql`](supabase/migrations/20261106000000_init_tiffinos_schema.sql).
4. (Optional) Run [`supabase/seed.sql`](supabase/seed.sql) to seed default settings.

---

## 🚢 Production Deployment to Vercel

TiffinOS is pre-configured with [`vercel.json`](vercel.json) for 1-click SPA routing:

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"New Project"**.
3. Import `SakshamSriAI/TiffinOS`.
4. Framework Preset: **Vite**.
5. (Optional) Add your Supabase environment variables in the Vercel dashboard.
6. Click **Deploy**.

---

## 📑 Operational Documentation

- **[Paper Register Migration Guide](docs/PAPER_REGISTER_MIGRATION_GUIDE.md)**: A step-by-step onboarding guide for family members moving from paper diaries and registers to TiffinOS.

---

## 🏆 Development Phases Completed

- [x] **Phase 0**: Project Inspection, Directory Setup & Technical Specification
- [x] **Phase 1**: Foundation, Design System Tokens & Atomic UI Primitives
- [x] **Phase 2**: High-Converting Public Landing Page & Interactive Hero Preview
- [x] **Phase 3**: Scroll Reveal Animations & Micro-Interactions
- [x] **Phase 4**: Application Shell, Sidebar Navigation & Live Dashboard
- [x] **Phase 5**: Customer Management, 7-Day Schedule Matrix & Profile Modal
- [x] **Phase 6**: Daily Meal Dispatch Terminal, Packing Cards & Duplicate Protection
- [x] **Phase 7**: Monthly Billing, Itemized Invoices, Print Statement & Payments
- [x] **Phase 8**: Kitchen & Operational Expense Management & Category Outflow
- [x] **Phase 9**: Business Analytics (Recharts), P&L Statement, CSV Exports & Settings
- [x] **Phase 10**: Backend Architecture, Supabase PostgreSQL Schema, RLS & DB Services
- [x] **Phase 11**: Final End-to-End Verification, Paper Migration Guide & Vercel Deployment

---

## 📄 License

MIT License. Designed and engineered for family tiffin services with SaaS-grade standards.
