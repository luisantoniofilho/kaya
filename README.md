# 🛒 Kaya - Plataforma de E-commerce Circular

🔗 **Teste ao vivo:** [kayaoficial.vercel.app](https://kayaoficial.vercel.app)

**Kaya** é uma plataforma de e-commerce moderna focada na **economia circular**, permitindo que usuários doem ou vendam produtos de segunda mão através de uma interface limpa e acessível.

Desenvolvido com **Next.js (App Router)**, **TypeScript**, **PostgreSQL**, **TailwindCSS** e **Google OAuth**, o Kaya simplifica o login enquanto promove a sustentabilidade e o consumo consciente.

---

## 🚀 Funcionalidades

- 🔐 Autenticação via **Google OAuth** (NextAuth.js)
- 🛍️ Listagem e visualização de detalhes de produtos
- 🔍 Barra de pesquisa com filtragem dinâmica
- 👤 Painel do usuário com seus próprios anúncios
- ⚙️ HTML semântico e design acessível
- ⚡ Interface de usuário responsiva construída com Tailwind CSS

---

## 🧪 Testes

O Kaya inclui múltiplas camadas de testes para garantir a qualidade e a confiabilidade do código:

### ✅ Testes Unitários

- Testam lógicas isoladas, como componentes e funções utilitárias.
- Escritos com **Vitest + React Testing Library**.

### 🔄 Testes de Integração

- Validam a interação entre componentes (ex: formulários e a lógica de envio).
- Desenvolvidos com **Vitest + React Testing Library**.

### 🧭 Testes End-to-End (E2E)

- Simulam o comportamento real do usuário no navegador.
- Implementados com **Cypress** para testar rotas públicas, rotas protegidas, o fluxo de visualização de produtos, etc.

---

## 🧰 Tecnologias Utilizadas

### Frontend

- [Next.js 15 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/)

### Validação

- [Zod](https://zod.dev/)

---

## ⚙️ Como Começar

### 1. Clone o repositório

git clone [https://github.com/luisantoniofilho/kaya.git](https://github.com/luisantoniofilho/kaya.git)
cd kaya

### 2. Instale as dependências

npm install

### 3. Configure as variáveis de ambiente

Crie um arquive .env.local no diretório raiz e adicione:

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

### 4. Rode o servidor de desenvolvimento

npm run dev
