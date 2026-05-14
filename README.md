# 🖥️ Expense Manager — Frontend

A modern, responsive **Angular 20** single-page application for the Enterprise Expense & Budget Management System. Built with Bootstrap 5 and Chart.js, it delivers a clean dashboard UI with authentication, expense management, pagination, and search — all wired to the [Spring Boot backend API](https://github.com/rajendra504/expense-manager-backend).

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 |
| Language | TypeScript 5.8 |
| Styling | SCSS + Bootstrap 5.3 |
| Icons | Bootstrap Icons 1.13 |
| UI Components | ng-bootstrap 19 |
| Charts | Chart.js 4.5 |
| Reactive Programming | RxJS 7.8 |
| Testing | Karma + Jasmine |
| Build Tool | Angular CLI 20 |

---

## ✨ Features

- **JWT Authentication** — Login, registration, and secure token storage with route guards
- **Dashboard** — Visual overview of expenses with Chart.js charts and summary cards
- **Expense Management** — Full CRUD interface for creating, viewing, editing, and deleting expenses
- **Search & Filter** — Real-time search and filter functionality across expense records
- **Pagination** — Efficient page-based navigation through large expense lists
- **Responsive UI** — Mobile-friendly layout built with Bootstrap 5 grid and components
- **ng-bootstrap Components** — Modals, date pickers, and tooltips via Angular-native Bootstrap
- **Lazy Loading** — Angular Router with feature module lazy loading for performance
- **HTTP Interceptors** — Automatic JWT attachment on outgoing API requests

---

## 📋 Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (bundled with Node.js)
- **Angular CLI** 20

Install Angular CLI globally if not already installed:

```bash
npm install -g @angular/cli@20
```

---

## ⚙️ Configuration

The API base URL is configured in the environment files:

**`src/environments/environment.ts`** (development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

**`src/environments/environment.prod.ts`** (production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api'
};
```

> Make sure the backend is running at the configured `apiUrl` before starting the frontend.

---

## 🏃 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/rajendra504/expense-manager-frontend.git
cd expense-manager-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
# or
ng serve
```

The app will be available at **http://localhost:4200/**

The development server supports **hot module replacement** — the browser auto-reloads on any file change.

---

## 🏗️ Build for Production

```bash
npm run build
# or
ng build
```

Build artifacts are output to the `dist/expense-manager-frontend/` directory. The production build is fully optimized (tree-shaking, minification, and ahead-of-time compilation).

To build in watch mode during development:

```bash
npm run watch
```

---

## 🧪 Running Tests

### Unit Tests (Karma + Jasmine)

```bash
npm test
# or
ng test
```

Tests run in a Chrome browser via Karma with live reload.

### End-to-End Tests

```bash
ng e2e
```

> Angular CLI does not include an e2e framework by default. Add Cypress or Playwright as needed.

---

## 🔐 Authentication Flow

1. **Login** — User submits credentials to `POST /api/auth/login`
2. **Token Storage** — JWT is stored in `localStorage`
3. **Route Guard** — `AuthGuard` protects all authenticated routes; unauthenticated users are redirected to `/login`
4. **HTTP Interceptor** — Automatically attaches `Authorization: Bearer <token>` to every outgoing API request
5. **Logout** — Clears the token and redirects to the login page

---

## 📁 Project Structure

```
expense-manager-frontend/
├── public/                    # Static assets (favicon, images)
├── src/
│   ├── app/
│   │   ├── auth/              # Login, register components & guards
│   │   ├── dashboard/         # Dashboard with charts and summaries
│   │   ├── expenses/          # Expense list, create, edit, detail views
│   │   ├── shared/            # Shared components, pipes, directives
│   │   ├── core/              # HTTP interceptors, auth service, models
│   │   ├── app.routes.ts      # Application routing
│   │   └── app.component.ts   # Root component
│   ├── environments/          # Environment-specific config
│   └── styles.scss            # Global SCSS styles
├── .vscode/                   # VS Code workspace settings
├── angular.json               # Angular CLI workspace config
├── package.json               # npm dependencies and scripts
├── tsconfig.json              # TypeScript base config
├── tsconfig.app.json          # App-specific TypeScript config
└── tsconfig.spec.json         # Test-specific TypeScript config
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start dev server at localhost:4200 |
| `npm run build` | Production build to `dist/` |
| `npm run watch` | Dev build with watch mode |
| `npm test` | Run unit tests with Karma |
| `ng generate component <name>` | Scaffold a new component |
| `ng generate service <name>` | Scaffold a new service |

---

## 🔗 Backend Integration

This frontend is designed to work with the **Expense Manager Backend**:

> 🔗 [expense-manager-backend](https://github.com/rajendra504/expense-manager-backend) — Spring Boot 3 REST API with JWT auth, MySQL, and Flyway migrations.

Make sure the backend is running and accessible at the URL configured in your environment file before launching the frontend.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👤 Author

**Rajendra** — [@rajendra504](https://github.com/rajendra504)

---

## 📄 License

This project is open source. See the repository for license details.
