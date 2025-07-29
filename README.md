# 🛒 Kaya - Circular E-commerce Platform

🔗 **Test it live:** [kayaoficial.vercel.app](https://kayaoficial.vercel.app)

**Kaya** is a modern e-commerce platform focused on the **circular economy**, enabling users to donate or sell secondhand products through a clean and accessible interface.

Built with **Next.js App Router**, **PostgreSQL**, and **Google OAuth**, Kaya simplifies login while fostering sustainability and conscious consumption.

---

## 🚀 Features

- 🔐 Authentication via **Google OAuth** (NextAuth.js)
- 🛍️ Product listing and detail view
- 🔍 Search bar with dynamic filtering
- 👤 User dashboard with personal listings
- ⚙️ Semantic HTML and accessible design
- ⚡ Responsive UI built with Tailwind CSS

---

## 🧪 Tests

Kaya includes multiple layers of automated testing to ensure code quality and reliability:

### ✅ Unit Tests

- Test isolated logic such as components and utility functions.
- Written with **Vitest + React Testing Library**.

### 🔄 Integration Tests

- Validate interactions between components (e.g., forms and their submission logic).
- Built with **Vitest + React Testing Library**.

### 🧭 End-to-End (E2E) Tests

- Simulate real user behavior in the browser.
- Implemented using **Cypress** to test public routes, protected routes, view products flow...

---

## 🧰 Tech Stack

### Frontend

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/)

### Validation

- [Zod](https://zod.dev/)

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/luisantoniofilho/kaya.git
cd kaya
```

### 2. Install dependencies

npm install

### 3. Configure environment variables

Create a .env.local file in the root directory and add:

# NEXTAUTH

NEXTAUTH_URL=
AUTH_SECRET=

# GOOGLE

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# NEON DB

NEONDB_URL=

# VERCEL BLOB

BLOB_READ_WRITE_TOKEN=

### 4. Run the development server

npm run dev
