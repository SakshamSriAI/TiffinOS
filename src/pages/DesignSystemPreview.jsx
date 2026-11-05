import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  IndianRupee, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Modal } from '../components/common/Modal';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/common/Table';
import { EmptyState } from '../components/common/EmptyState';
import { formatINR } from '../utils/currency';
import { formatDateIST, getTodayIST } from '../utils/date';

const COLOR_TOKENS = [
  { name: 'Primary Forest Green', hex: '#173D35', role: 'Primary buttons, main brand accents', class: 'bg-[#173D35] text-white' },
  { name: 'Deep Forest Green', hex: '#172E2A', role: 'Sidebar background, dark headers', class: 'bg-[#172E2A] text-white' },
  { name: 'Warm Off-white', hex: '#EDEBE4', role: 'Main app background', class: 'bg-[#EDEBE4] text-[#252B29] border border-[#E2E4DE]' },
  { name: 'Pure White', hex: '#FFFFFF', role: 'Cards, tables, modal surfaces', class: 'bg-[#FFFFFF] text-[#252B29] border border-[#E2E4DE]' },
  { name: 'Soft Mint', hex: '#D6F1E4', role: 'Highlights, success badges, pill accents', class: 'bg-[#D6F1E4] text-[#172E2A]' },
  { name: 'Amber Accent', hex: '#D49A34', role: 'Pending indicators, attention badges', class: 'bg-[#D49A34] text-white' },
  { name: 'Charcoal Text', hex: '#252B29', role: 'Primary readable typography', class: 'bg-[#252B29] text-white' },
  { name: 'Muted Text', hex: '#737A75', role: 'Secondary descriptions, placeholders', class: 'bg-[#737A75] text-white' },
  { name: 'Borders & Dividers', hex: '#E2E4DE', role: 'Table borders, card borders', class: 'bg-[#E2E4DE] text-[#252B29]' },
  { name: 'Success Green', hex: '#27845D', role: 'Dispatched status, paid invoices', class: 'bg-[#27845D] text-white' },
  { name: 'Error Red', hex: '#C94F4F', role: 'Cancellations, overdue amounts', class: 'bg-[#C94F4F] text-white' },
];

export const DesignSystemPreview = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('lunch');

  return (
    <div className="space-y-12 pb-16">
      {/* Overview Banner */}
      <div className="bg-forest-deep text-white rounded-card p-6 sm:p-8 relative overflow-hidden shadow-card">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="mint" size="sm">Phase 1 Foundation Complete</Badge>
            <span className="text-xs text-mint/80">Vite + React + Tailwind CSS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            TiffinOS Design System & Foundation Tokens
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Engineered exclusively for TiffinOS. Features the exact forest-green, warm off-white, and amber color tokens, high-contrast typography, and accessible atomic UI primitives for our family tiffin operations.
          </p>
        </div>
      </div>

      {/* Responsive Breakpoint Helper */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Breakpoint Tester</CardTitle>
          <CardDescription>Resize your browser window to verify active Tailwind breakpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">Active Screen Size:</span>
            <span className="block sm:hidden px-3 py-1 bg-amber-accent/15 text-amber-dark font-bold text-xs rounded-full border border-amber-accent/30">
              Mobile (&lt; 640px)
            </span>
            <span className="hidden sm:block md:hidden px-3 py-1 bg-mint text-forest-deep font-bold text-xs rounded-full border border-mint-dark">
              Small Screen (640px - 767px)
            </span>
            <span className="hidden md:block lg:hidden px-3 py-1 bg-forest/15 text-forest font-bold text-xs rounded-full border border-forest/30">
              Tablet (768px - 1023px)
            </span>
            <span className="hidden lg:block xl:hidden px-3 py-1 bg-forest text-white font-bold text-xs rounded-full">
              Desktop (1024px - 1279px)
            </span>
            <span className="hidden xl:block px-3 py-1 bg-forest-deep text-white font-bold text-xs rounded-full">
              Large Desktop (&gt;= 1280px)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-charcoal">1. Color Palette & Tokens</h2>
          <p className="text-sm text-muted-text">Exact color tokens mapped to the requirements</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COLOR_TOKENS.map((token) => (
            <div
              key={token.hex}
              className="bg-white rounded-card border border-border p-4 shadow-subtle flex flex-col justify-between"
            >
              <div className={`h-16 rounded-md mb-3 flex items-center justify-center font-mono text-xs font-semibold ${token.class}`}>
                {token.hex}
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal">{token.name}</p>
                <p className="text-xs text-muted-text mt-1">{token.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Typography Scale */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-charcoal">2. Typography Hierarchy (Inter / Manrope)</h2>
          <p className="text-sm text-muted-text">Standardized weights, line-heights, and responsive tracking</p>
        </div>

        <Card>
          <CardContent className="space-y-6">
            <div className="border-b border-border/60 pb-4">
              <span className="text-[11px] font-mono text-muted-text block mb-1">Display H1 (text-3xl font-bold)</span>
              <p className="text-3xl font-bold tracking-tight text-forest-deep">
                Run Your Tiffin Business. Without the Daily Chaos.
              </p>
            </div>
            <div className="border-b border-border/60 pb-4">
              <span className="text-[11px] font-mono text-muted-text block mb-1">Heading H2 (text-2xl font-bold)</span>
              <p className="text-2xl font-bold tracking-tight text-charcoal">
                Daily Meal Dispatch & Real-time Delivery Status
              </p>
            </div>
            <div className="border-b border-border/60 pb-4">
              <span className="text-[11px] font-mono text-muted-text block mb-1">Heading H3 (text-lg font-semibold)</span>
              <p className="text-lg font-semibold text-charcoal">
                Customer Monthly Invoices and Payment Reconciliation
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-muted-text block mb-1">Body Text (text-sm text-charcoal leading-relaxed)</span>
              <p className="text-sm text-charcoal leading-relaxed max-w-2xl">
                Replace unorganized paper registers and manual spreadsheets with a unified system. TiffinOS records every dispatched tiffin box, tracks customer lunch and dinner pricing separately, and generates accurate end-of-month statements.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 3. Reusable Buttons */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-charcoal">3. Button Primitives</h2>
          <p className="text-sm text-muted-text">All interactive states with hover, active, and loading indicators</p>
        </div>

        <Card>
          <CardContent className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-muted-text uppercase mb-3">Variants</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Primary Forest</Button>
                <Button variant="secondary">Secondary Card</Button>
                <Button variant="mint">Soft Mint Action</Button>
                <Button variant="amber">Amber Action</Button>
                <Button variant="danger">Cancel / Danger</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost Link</Button>
              </div>
            </div>

            <div className="border-t border-border/60 pt-4">
              <p className="text-xs font-semibold text-muted-text uppercase mb-3">Sizes & Icons</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" iconLeft={CheckCircle2}>Small (Dispatch)</Button>
                <Button size="md" iconRight={ArrowRight}>Medium (Standard)</Button>
                <Button size="lg" iconLeft={IndianRupee}>Large (Generate Bills)</Button>
                <Button size="md" loading={true}>Processing...</Button>
                <Button size="md" disabled={true}>Disabled State</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 4. Badges & Status Indicators */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-charcoal">4. Badges & Status Indicators</h2>
          <p className="text-sm text-muted-text">Semantic pill indicators for meal dispatches and invoices</p>
        </div>

        <Card>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Badge variant="success" dot={true}>Dispatched</Badge>
            <Badge variant="pending" dot={true}>Pending Dispatch</Badge>
            <Badge variant="error" dot={true}>Cancelled</Badge>
            <Badge variant="forest">Regular Customer</Badge>
            <Badge variant="mint">Occasional Order</Badge>
            <Badge variant="neutral">Archived</Badge>
            <Badge variant="charcoal">Lunch & Dinner</Badge>
          </CardContent>
        </Card>
      </section>

      {/* 5. Form Elements (Inputs & Selects) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-charcoal">5. Form Primitives</h2>
          <p className="text-sm text-muted-text">Inputs, selects, validation error states, and responsive labels</p>
        </div>

        <Card>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Input
              label="Customer Full Name"
              placeholder="e.g. Ramesh Sharma"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              iconLeft={Search}
              hint="Search existing or enter a new customer"
              required={true}
            />

            <Select
              label="Meal Schedule Slot"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              options={[
                { value: 'lunch', label: 'Lunch Only (12:30 PM - 2:00 PM)' },
                { value: 'dinner', label: 'Dinner Only (7:30 PM - 9:30 PM)' },
                { value: 'both', label: 'Both Lunch & Dinner' },
              ]}
              hint="Default dispatch slot"
            />

            <Input
              label="Individual Lunch Rate"
              placeholder="120"
              iconLeft={IndianRupee}
              error="Price must be greater than zero"
            />
          </CardContent>
        </Card>
      </section>

      {/* 6. Table Component */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-charcoal">6. Data Table Structure</h2>
          <p className="text-sm text-muted-text">Responsive tables with clean borders and hover effects</p>
        </div>

        <Table>
          <TableHead>
            <TableRow hover={false}>
              <TableHeader>Customer</TableHeader>
              <TableHeader>Meal Type</TableHeader>
              <TableHeader>Unit Price</TableHeader>
              <TableHeader>Date (IST)</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="right">Action</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-charcoal">Ramesh Sharma</TableCell>
              <TableCell>Lunch (Standard)</TableCell>
              <TableCell className="font-mono">{formatINR(120)}</TableCell>
              <TableCell>{formatDateIST(new Date(), 'display')}</TableCell>
              <TableCell><Badge variant="success" dot={true}>Dispatched</Badge></TableCell>
              <TableCell align="right">
                <Button variant="ghost" size="sm">View</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-charcoal">Pooja Verma</TableCell>
              <TableCell>Dinner (Special)</TableCell>
              <TableCell className="font-mono">{formatINR(140)}</TableCell>
              <TableCell>{formatDateIST(new Date(), 'display')}</TableCell>
              <TableCell><Badge variant="pending" dot={true}>Pending</Badge></TableCell>
              <TableCell align="right">
                <Button variant="primary" size="sm">Dispatch</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* 7. Modal & Empty State */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-charcoal">7. Modal & Empty States</h2>
          <p className="text-sm text-muted-text">High-clarity modals for dispatch confirmation and clean empty states</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Modal Demo</CardTitle>
              <CardDescription>Click below to test backdrop blur, keyboard ESC, and focus</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Open Dispatch Confirmation Modal
              </Button>
            </CardContent>
          </Card>

          <EmptyState
            icon={Clock}
            title="No Pending Dispatches"
            description="All lunch tiffins for today have been successfully marked as dispatched."
            actionLabel="View Historical Ledger"
            onAction={() => alert('Empty state action triggered')}
          />
        </div>
      </section>

      {/* Test Modal Component */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Meal Dispatch"
        description="Verify delivery details before marking this tiffin as dispatched."
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              iconLeft={CheckCircle2}
              onClick={() => {
                alert('Tiffin marked as dispatched! Ledger updated.');
                setModalOpen(false);
              }}
            >
              Confirm Dispatch
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-surface-subtle rounded-card border border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-text">Customer:</span>
              <span className="font-semibold text-charcoal">Ramesh Sharma</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-text">Meal Type:</span>
              <span className="font-semibold text-charcoal">Lunch (Standard Dabba)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-text">Date & Time:</span>
              <span className="font-semibold text-charcoal">{formatDateIST(new Date(), 'full')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-text">Rate to Bill:</span>
              <span className="font-bold text-forest font-mono">{formatINR(120)}</span>
            </div>
          </div>
          <p className="text-xs text-muted-text">
            Once confirmed, this delivery is officially committed to the monthly bill ledger.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default DesignSystemPreview;
