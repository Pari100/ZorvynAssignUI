# 💰 Finance Dashboard UI

A modern, interactive financial dashboard built with **React**, **TypeScript**, and **Tailwind CSS**. This project demonstrates frontend development skills through clean UI, state management, and responsive user experience.

**Submission For:** Zorvyn Assignment Portal | **Candidate:** Parichay Sahani | **Status:** ✅ Complete

---

## ✨ Key Features

### 📊 Dashboard Overview
- **Summary Cards** - Display total balance, income, and expenses with trend indicators
- **Balance Trend Chart** - Interactive area chart showing balance over time
- **Category Breakdown** - Pie/bar chart visualization of spending by category
- **Financial Insights** - Highest spending category, monthly comparison, average transactions

### 💳 Transaction Management
- **Transaction List** - View all transactions with date, amount, category, type
- **Add/Edit/Delete** - Full CRUD operations (Admin role only)
- **Smart Filtering** - Filter by category and transaction type
- **Dynamic Sorting** - Sort by date, amount, or category
- **Real-time Search** - Instantly search through transactions

### 👥 Role-Based Access Control
- **Viewer Role** - Read-only access to dashboard and transactions
- **Admin Role** - Full CRUD operations on transactions
- **Role Switcher** - Toggle between roles in the header
- **Dynamic UI** - Interface updates based on selected role

### 🎨 User Experience Features
- ✅ Dark/Light mode toggle with persistence
- ✅ Data persistence (localStorage)
- ✅ Smooth animations (Framer Motion)
- ✅ Export to CSV/JSON
- ✅ Toast notifications
- ✅ Form validation with error messages
- ✅ Empty state messaging

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Pari100/ZorvynAssignUI.git

# Navigate to project
cd finance_Dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173/
```

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── common/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   └── EmptyState.tsx
│   ├── dashboard/              # Dashboard feature components
│   │   ├── SummaryCard.tsx
│   │   ├── BalanceTrendChart.tsx
│   │   ├── CategoryChart.tsx
│   │   └── InsightsPanel.tsx
│   ├── layout/                 # Layout & navigation components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── transactions/           # Transaction feature components
│   │   ├── TransactionList.tsx
│   │   ├── TransactionItem.tsx
│   │   ├── TransactionForm.tsx
│   │   └── TransactionFilters.tsx
│   └── RoleSwitcher.tsx        # Role toggle + theme switcher
├── store/
│   └── useStore.ts             # Zustand state management
├── hooks/
│   └── index.ts                # Custom React hooks
├── utils/
│   ├── calculations.ts         # Financial calculation utilities
│   ├── formatters.ts           # Data formatting utilities
│   ├── validators.ts           # Form validation utilities
│   └── exporters.ts            # CSV/JSON export utilities
├── types/
│   └── index.ts                # TypeScript type definitions
├── constants/
│   └── index.ts                # Application constants and mock data
├── App.tsx                     # Main app component
└── main.tsx                    # Application entry point
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling & Responsive Design |
| **Zustand** | State Management |
| **Recharts** | Data Visualization |
| **Framer Motion** | Animations & Transitions |
| **Lucide React** | Icon Library |
| **Date-fns** | Date Formatting & Manipulation |
| **React Hot Toast** | Toast Notifications |
| **Vite** | Build Tool & Dev Server |

---

## 🎨 Design Features

- ✅ **Modern UI** - Clean, intuitive design with gradient effects
- ✅ **Dark Mode** - Full dark mode support with automatic persistence
- ✅ **Responsive Design** - Perfectly responsive from 320px to 2560px
- ✅ **Smooth Animations** - Framer Motion for engaging transitions
- ✅ **Interactive Charts** - Hover effects and interactive elements
- ✅ **Empty States** - Helpful messaging when no data available
- ✅ **Form Validation** - Real-time validation with error messages
- ✅ **Accessibility** - Semantic HTML and ARIA labels

---

## 📖 Usage Guide

### Adding Transactions (Admin Role)
1. Switch to **Admin** role using the role switcher in header
2. Click **"Add Transaction"** button
3. Fill in transaction details:
   - Date (YYYY-MM-DD format)
   - Amount (positive number)
   - Category (dropdown selection)
   - Type (Income or Expense)
4. Submit - Dashboard and charts update automatically

### Filtering & Searching Transactions
1. Select a category from the category filter dropdown
2. Choose transaction type (All/Income/Expense)
3. Use search bar for real-time search across transactions
4. Click "Reset Filters" to clear all active filters
5. Results update instantly as you filter

### Viewing Analytics
- **Summary Cards** - Quick overview of total balance, income, and expenses
- **Balance Trend Chart** - Visual representation of financial journey over time
- **Category Chart** - Breakdown of spending by category
- **Insights Panel** - Key metrics including highest expense category and averages

### Switching Roles
1. Click the role toggle in the header (Viewer/Admin)
2. Admin-only buttons appear/disappear as needed
3. All data and state persists when switching
4. Switch back anytime

### Dark Mode
1. Click the moon/sun icon in the header
2. Entire app switches to dark/light theme
3. Setting persists across browser sessions

### Exporting Data
- Use export button to save transactions as CSV or JSON file
- Perfect for data backup and external analysis

---

## 💾 Data Management

### Data Persistence
- All transactions stored in browser **localStorage**
- Data automatically persists across browser sessions
- Settings (dark mode, role selection) also persist
- Automatic synchronization on every data change

### Sample Data
- Application comes with 10 sample transactions
- Demonstrates various transaction types and categories
- Clear data anytime by clearing browser localStorage

---

## 🔒 Role-Based Access Control

### Viewer Role (Read-Only)
- ✅ View all dashboard analytics
- ✅ View all transactions
- ✅ Apply filters and search
- ✅ Sort transactions
- ❌ Cannot add, edit, or delete transactions

### Admin Role (Full Control)
- ✅ All Viewer permissions plus:
- ✅ Add new transactions
- ✅ Edit existing transactions
- ✅ Delete transactions
- ✅ Full data management

---

## 📋 Sample Workflows

### Adding a Transaction
```
1. Click "Add Transaction" button
2. Enter Date, Amount, Category, Type
3. Click "Add Transaction" to submit
4. Dashboard updates automatically
5. Data saved to browser storage
6. Toast notification confirms success
```

### Filtering Transactions
```
1. Select category filter dropdown
2. Select transaction type filter
3. Enter search query in search box
4. Results update in real-time
5. Click "Reset Filters" to clear all
6. List returns to show all transactions
```

### Exporting Data
```
1. Click export button
2. Choose format (CSV or JSON)
3. File automatically downloads
4. Open in spreadsheet or text editor
5. Use for backup or external analysis
```

---

## 🧪 Testing Checklist

- ✅ Add/edit/delete transactions in Admin mode
- ✅ Verify Viewer mode hides admin buttons
- ✅ Test all filter combinations
- ✅ Sort by date, amount, category
- ✅ Search for existing and non-existent transactions
- ✅ Test responsiveness on mobile, tablet, desktop
- ✅ Toggle dark/light mode
- ✅ Export data as CSV/JSON
- ✅ Refresh page - verify data persists
- ✅ Clear cache - verify app resets properly
- ✅ Switch between roles - verify state consistency

---

## 🏗 Technical Architecture

### Component Design
- **Presentational Components** - Reusable UI display components (Button, Card, Input)
- **Container Components** - Business logic & state management (Dashboard, TransactionList)
- **Layout Components** - Page structure & navigation (Header, Sidebar, Layout)
- **Feature Components** - Feature-specific components (TransactionForm, CategoryChart)

### State Management with Zustand
- **Transaction Slice** - All CRUD operations and transaction data
- **UI Slice** - Dark mode, role selection, modal visibility
- **Filter Slice** - Search query, sorting, category filters
- **localStorage Middleware** - Automatic persistence of all state

### Performance Optimizations
- Memoized calculations with `useMemo`
- Optimized re-renders with selective subscriptions
- Efficient chart rendering with Recharts
- Lazy loading and responsive image handling

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Flexible grid layouts that adapt to viewport
- Touch-friendly interfaces on mobile devices
- Tested across 320px - 2560px viewport widths

---

## 📈 Technical Highlights

✅ **Full TypeScript** with strict mode for type safety  
✅ **React 19** with modern hooks and patterns  
✅ **Centralized State** with Zustand + localStorage sync  
✅ **Component Modularity** with clear separation of concerns  
✅ **Responsive Design** using Tailwind CSS utilities  
✅ **Type Safety** with comprehensive type definitions  
✅ **Accessibility** with semantic HTML and ARIA labels  
✅ **Error Handling** with form validation and graceful degradation  
✅ **Performance** optimized with memoization  
✅ **Data Visualization** with interactive Recharts

---

## 🎯 Evaluation Highlights

| Aspect | Implementation |
|--------|-----------------|
| **Design & UI** | Modern interface with thoughtful user interactions |
| **Responsiveness** | Perfectly responsive from 320px to 2560px |
| **Functionality** | All core + optional requirements implemented |
| **User Experience** | Intuitive navigation with smooth transitions |
| **Code Quality** | Clean, modular, fully type-safe TypeScript |
| **State Management** | Well-organized Zustand store with localStorage |
| **Documentation** | Comprehensive README with clear examples |
| **Attention to Detail** | Edge cases handled, validation, empty states |

---

## 🚀 Future Enhancements

- [ ] Backend API integration with REST/GraphQL
- [ ] Real user authentication (OAuth, JWT)
- [ ] Advanced reporting and analytics
- [ ] Budget planning and forecasting tools
- [ ] Bill reminders and notifications
- [ ] Multi-currency support
- [ ] Mobile app version (React Native)
- [ ] Cloud synchronization across devices
- [ ] Recurring transactions automation
- [ ] Investment portfolio tracking

---

## 📞 Contact Information

**Candidate:** Parichay Sahani  
**Email:** parichayprajapati0029@gmail.com  
**GitHub:** [github.com/Pari100](https://github.com/Pari100)  
**Submission Date:** April 6, 2026  

**Note:** This is an original submission showcasing my approach to modern frontend development through a complete, fully functional financial dashboard application built with React and TypeScript.

---

**Made with ❤️ for Zorvyn FinTech | © 2026 All Rights Reserved**
