# FinTrack — Finance Dashboard

A clean, interactive finance dashboard built with **React 18**, **Vite**, and **Recharts**. Designed to help users track and understand their financial activity through intuitive visualizations and data management.

---

## Live Features

### 1. Dashboard Overview
- **Summary Cards** — Total Balance, Income, Expenses, and Savings Rate with trend indicators.
- **Monthly Trend Chart** — Area chart showing income vs expenses over 6 months.
- **Spending Breakdown** — Donut chart visualizing expense distribution by category.
- **Income vs Expenses** — Grouped bar chart comparing monthly figures.

### 2. Transactions Management
- Full transaction table with **date, description, category, type, and amount**.
- **Search** by description or category name.
- **Filter** by transaction type (income/expense) and category.
- **Sortable columns** — click any header to toggle ascending/descending.
- **CSV Export** — download filtered transactions as a `.csv` file.
- **Add / Edit / Delete** transactions (admin role only).

### 3. Role-Based UI (Simulated)
Two roles switchable via the header dropdown:
- **Admin** — full CRUD access: can add, edit, and delete transactions.
- **Viewer** — read-only: action buttons are hidden, data is view-only.

No backend authentication required. Roles are managed entirely in frontend state.

### 4. Insights Section
Automatically computed from transaction data:
- **Top Spending Category** — highest expense category with total amount.
- **Monthly Expense Trend** — percentage change vs previous month.
- **Average Expense** — mean transaction amount across all expenses.
- **Savings Rate** — percentage of income retained.
- **Best Month** — month with highest net savings.
- **Lowest Spending** — least-spent category.
- **Category Breakdown** — detailed bars showing each category's share.

### 5. Additional Features
- **Dark / Light Mode** toggle with full theme support via CSS variables.
- **Responsive Design** — adapts to desktop, tablet, and mobile with collapsible sidebar.
- **Empty States** — graceful handling when no data matches filters.
- **Animations** — fade-in and scale-in transitions for page loads and modals.

---

## Tech Stack

| Layer            | Choice                              |
|------------------|-------------------------------------|
| Framework        | React 18                            |
| Build Tool       | Vite 5                              |
| Charts           | Recharts                            |
| Icons            | Lucide React                        |
| State Management | React Context API + useMemo hooks   |
| Styling          | CSS Variables + inline styles       |
| Language         | JavaScript (JSX)                    |

---

## Project Structure

```
src/
├── main.jsx                          # Entry point
├── App.jsx                           # Root component + routing
├── index.css                         # Global styles + CSS variables
│
├── constants/
│   └── index.js                      # Categories, colors, nav config
│
├── utils/
│   └── helpers.js                    # Formatting, CSV export, calculations
│
├── data/
│   └── mockData.js                   # Transaction data generator
│
├── context/
│   └── AppContext.jsx                # Global state: theme, role, filters, data
│
└── components/
    ├── Layout/
    │   ├── Header.jsx                # Top bar: brand, role switch, theme toggle
    │   ├── Sidebar.jsx               # Navigation sidebar (responsive)
    │   └── Layout.jsx                # Shell combining header + sidebar + content
    │
    ├── Dashboard/
    │   ├── DashboardPage.jsx         # Dashboard view compositor
    │   ├── SummaryCards.jsx          # Metric cards grid
    │   ├── BalanceTrendChart.jsx     # Area chart (time-based)
    │   ├── SpendingBreakdownChart.jsx # Donut chart (categorical)
    │   └── IncomeExpenseChart.jsx    # Bar chart comparison
    │
    ├── Transactions/
    │   ├── TransactionsPage.jsx      # Transaction view compositor
    │   ├── TransactionFilters.jsx    # Search + filter controls
    │   ├── TransactionTable.jsx      # Sortable data table
    │   └── TransactionModal.jsx      # Add/edit form dialog
    │
    ├── Insights/
    │   ├── InsightsPage.jsx          # Insights view compositor
    │   ├── InsightCard.jsx           # Individual insight metric
    │   └── CategoryBreakdown.jsx     # Progress bar breakdown
    │
    └── UI/
        ├── SummaryCard.jsx           # Reusable metric card
        ├── EmptyState.jsx            # No-data placeholder
        ├── RoleBadge.jsx             # Role indicator badge
        └── ChartTooltip.jsx          # Styled chart tooltip
```

---

## Setup & Run

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Start

```bash
# Clone or extract the project
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app opens at **http://localhost:3000**.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Design Decisions

1. **Context API over Redux** — The app state is simple enough that React Context + `useMemo` provides clean, efficient state management without external dependencies.

2. **CSS Variables for theming** — Enables instant dark/light mode switching with a single class toggle. All components reference variables instead of hardcoded colors.

3. **Component separation** — Each component has a single responsibility. Pages compose smaller components. UI primitives are reusable.

4. **Derived state via useMemo** — Totals, chart data, filtered lists, and insights are computed lazily and cached, avoiding redundant calculations on re-renders.

5. **Mock data with realistic variety** — The generator produces 6 months of varied transactions across 10 categories with realistic descriptions, making the dashboard feel populated and useful.

---

## Assumptions

- Currency is **Indian Rupees (₹)** — easily changeable in `utils/helpers.js`.
- Role switching is a UI-only demo — no auth tokens or API calls.
- Transactions are stored in React state — a production app would use a backend API.
- The 50-row table limit is a UX choice for performance; pagination could be added.



