# 🛒 E-Commerce Platform

A modern e-commerce platform with dual authentication for consumers (CPF) and businesses (CNPJ), built with Next.js and MongoDB.

## TODO

Here are the next improvements planned for the application:

🔁 Sails and listings for each user
🔁 Authentication system for CNPJ users
🔁 Update a product
🔁 Delete a product

## Tech Stack

- **Frontend**:

  - Next.js 15 (App Router)
  - TypeScript
  - Tailwind CSS

- **Backend**:

  - MongoDB (with mongodb driver)
  - NextAuth.js (with MongoDB adapter)

- **Validation**:
  - Zod

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/luisantoniofilho/kaya.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env.local file with your environment variables (MongoDB connection string, NextAuth secrets, etc).

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.
