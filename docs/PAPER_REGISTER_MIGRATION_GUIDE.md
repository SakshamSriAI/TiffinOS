# TiffinOS – Paper Register Migration & Reconciliation Guide

> **A Practical, Step-by-Step Transition Guide for Family Tiffin Businesses**  
> Moving from physical notebooks, registers, and WhatsApp chats to digital peace of mind.

---

## 📖 Introduction

For years, family tiffin services have relied on paper registers: a red or blue ledger where daily ticks (✓) and crosses (✗) mark lunch and dinner deliveries. 

While familiar, paper registers introduce daily operational chaos:
1. **Missed Cancellations**: A customer calls at 9:00 AM while the kitchen is busy; someone forgets to mark the notebook, and a meal is wasted or disputed.
2. **Disputed Monthly Calculations**: At month-end, counting 60 tick marks per customer across 35 pages takes hours, and customers often argue over dates they claimed they were out of town.
3. **No Clear Financial Visibility**: You never truly know whether you made a profit until you count cash at month-end against vegetable and grocery receipts.

**TiffinOS was built specifically to solve these exact headaches without complicating your daily kitchen routine.**

---

## 🗓️ Phase 1: The 7-Day Dual-Running Period

Do **not** throw away your physical register on Day 1. Instead, follow a **7-day dual-running period**:
- **Days 1–7**: Continue marking your paper register as usual, while simultaneously logging dispatches on TiffinOS (takes less than 2 minutes per meal service).
- **Day 7 Evening**: Reconcile both. Compare the meal count on TiffinOS with the tick marks in your register.
- **Outcome**: Once you and your family see that TiffinOS perfectly matches the register with zero errors, you can safely retire the paper notebook.

---

## 📋 Phase 2: Pre-Migration Checklist

Before opening TiffinOS, gather the following details for your current customer base:

| Customer Detail | Why It's Needed | Example |
|---|---|---|
| **Full Name** | Identifies the customer on packing cards and bills | `Rajesh Agrawal` |
| **Phone Number** | Used for WhatsApp delivery alerts and payment links | `+91 98260 11422` |
| **Delivery Address** | Helps delivery boys find the right flat/office | `Flat 402, Shalimar Palms, Pipliyahana` |
| **Lunch Price** | Agreed per-meal rate for lunch | `₹120` |
| **Dinner Price** | Agreed per-meal rate for dinner | `₹130` |
| **Weekly Schedule** | Days of the week they receive lunch and dinner | Mon–Sat both, Sunday off |
| **Dietary Notes** | Special instructions for the cook | `Less oil, no onion on Tuesdays` |

---

## 🚀 Phase 3: Day 1 Initial Setup

### Step 1: Configure Business Identity
1. Go to **Settings** (`/settings`).
2. Enter your **Business Name** (e.g. *Shree Annapurna Tiffin Service*).
3. Enter your **UPI ID for Payments** (e.g. `yourname@okaxis`). This will be printed on all monthly customer invoices so customers can pay directly with PhonePe, Google Pay, or Paytm.
4. Set your default **Lunch Cutoff Time** (e.g. `11:00 AM`) and **Dinner Cutoff Time** (e.g. `06:30 PM`).
5. Click **Save All Settings**.

### Step 2: Add Your Customers
1. Go to **Customers** (`/customers`) and click **Add New Customer**.
2. Fill in the customer name, phone number, and delivery address.
3. Enter their individual lunch and dinner prices (different customers can have different prices; TiffinOS preserves each agreement).
4. Select their weekly schedule using the 7-day matrix:
   - Check **Lunch** for days they want lunch.
   - Check **Dinner** for days they want dinner.
   - Use the **Monday – Saturday (Both)** preset button for standard working professionals.
5. Add any dietary instructions for the kitchen.
6. Click **Save Customer**.

---

## 🍱 Phase 4: Daily Kitchen Routine (Under 2 Minutes)

TiffinOS is designed to be mobile-first so you can use it right in the kitchen on your phone or tablet:

### 🌞 Morning Routine (10:45 AM – 11:30 AM)
1. **Open the Dispatch Screen** (`/dispatch`).
2. Review the top KPI bar:
   - See total expected lunch boxes for today.
   - View dietary requirements (e.g. diabetic meals, no onion, less spice).
3. **Handle Cancellations Early**:
   - If a customer messaged saying they won't need lunch today, tap **Cancel** on their card.
   - Select reason (e.g., *Customer out of town*).
   - **TiffinOS Rule**: Cancelled meals are strictly excluded from billing.
4. **Pack and Dispatch**:
   - As each tiffin box is handed to the delivery person, tap **Mark Dispatched**.
   - The card turns green, stamping the exact dispatch time (e.g., `11:45 AM`).

### 🌙 Evening Routine (06:30 PM – 07:30 PM)
1. Switch to the **Dinner** tab on the Dispatch screen.
2. Repeat the simple process: check packing count, cancel any notified skips, and tap **Mark Dispatched** when the delivery leaves.

### ⚡ Handling Ad-Hoc / One-Time Requests
If a customer calls asking for an extra tiffin for a visiting guest:
1. Tap **Ad-Hoc Order** in the dispatch toolbar.
2. Select the customer or enter a guest name.
3. Select slot (Lunch or Dinner) and price.
4. Click **Create Order**. It immediately appears on today's packing list and will be billed accurately on their monthly invoice.

---

## 🧾 Phase 5: Month-End Billing & Payments

At the end of the month, you no longer need to spend 4 hours counting tick marks:

### Step 1: Generate Monthly Invoices
1. Go to **Billing & Invoices** (`/billing`).
2. Click **Bulk Generate** or **Create Invoice** for an individual customer.
3. TiffinOS automatically counts **only** meals stamped as `dispatched` for that customer during the billing period.
4. **Historical Price Integrity**: If you increased a customer's rate from ₹110 to ₹120 mid-month, TiffinOS creates two separate, transparent line items (e.g., *14 meals @ ₹110 = ₹1,540* and *10 meals @ ₹120 = ₹1,200*). No messy averaging!

### Step 2: Share and Collect
1. Click **View / Print** on any invoice.
2. You can:
   - Click **Print Statement** for a clean, printed paper receipt.
   - Tap **Share via WhatsApp** to send a breakdown directly to the customer's phone with your UPI ID.

### Step 3: Record Customer Payments
1. When a customer sends a UPI screenshot or hands you cash:
2. Click **Record Payment** next to their invoice.
3. Enter the amount paid (supports full payment or partial payment, e.g. ₹2,000 paid towards a ₹3,500 bill).
4. Select payment mode (UPI, Cash, Bank Transfer).
5. TiffinOS immediately updates the remaining **Balance Due** and shifts the status badge to `Partially Paid` or `Paid`.

---

## 💰 Phase 6: Recording Daily Kitchen Expenses

To know your real operating profit, log daily kitchen purchases on the go:
1. Go to **Expenses** (`/expenses`).
2. Tap **Add Expense**.
3. Enter:
   - **Title**: `Fresh Mandi Vegetables`
   - **Amount**: `₹2,450`
   - **Category**: `Vegetables & Dairy`
   - **Vendor**: `Choithram Mandi`
   - **Payment Mode**: `UPI`
4. Tap **Save Expense**.
5. Your **Reports Dashboard** (`/reports`) automatically updates your net operating margin and profit.

---

## 🛡️ Edge Cases & FAQs

### Q: A customer is going out of town for 10 days. What should I do?
**A:** Go to **Customers** (`/customers`), click on their name, and click **Pause Customer**. Their subscription is temporarily paused. TiffinOS will not generate daily orders for them, and zero meals will be billed. When they return, simply tap **Reactivate Customer**.

### Q: A customer claimed they didn't receive a meal on Nov 3rd. How do I verify?
**A:** Go to **Customers**, click the customer's profile, and view their **Chronological Meal Audit History**. It lists every date, meal type, exact dispatch timestamp, and whether it was dispatched or cancelled. There is zero ambiguity.

### Q: Does TiffinOS need an active internet connection at all times?
**A:** No. TiffinOS runs locally in your browser. All daily state is preserved in your device. If you connect Supabase later, it automatically syncs with your cloud database.

---

## 🏁 Summary

By following this simple routine:
- **Morning (2 mins)**: Check packing count, tap dispatch.
- **Evening (2 mins)**: Check packing count, tap dispatch.
- **Month-end (1 min)**: 1-click invoice generation with zero disputes.

Your family tiffin business will save **15+ hours per month**, eliminate billing arguments, and operate with the professionalism of a modern food company.
