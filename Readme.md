# Sellpad

A modern digital storefront platform, built with **Next.js**, **TypeScript**, **ExpressJS**, **Prisma**, and **PostgreSQL**.

## 🚧 Project Status

This project is currently under active development.

Core functionality is working, but several features are still being built and refined. The current version should be considered a work in progress (WIP).

### Currently Available

* User authentication
* Multi-tenant shops
* Product management
* Product listings
* Basic dashboard

### In Progress

* Shopping cart
* Checkout flow
* Stripe payments
* Crypto payments
* Order management
* Analytics

### Planned

* Digital product delivery
* Discount codes
* Affiliate system
* Email notifications

Feature availability may change as development continues.

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* TanStack Query

### Backend

* ExpressJS
* Prisma ORM
* PostgreSQL

### Payments

* Stripe
* Crypto: Bitcoin, Litecoin and Ethereum

## 🚀 Getting Started

### Clone the repository

```bash
https://github.com/catresearcher/Sellpad.git
cd Sellpad
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

Frontend
```env
NEXT_PUBLIC_BACKEND_URL=
```
Backend
```env
DATABASE_URL=

FRONTEND_URL=

LTC_MEMPOOL =
BTC_MEMPOOL = 
ETH_RPC=
ETHERSCAN_API_KEY=

MERCHANT_WALLET_MNEMONIC=
CUSTOMER_WALLET_MNEMONIC=

BTC_TREASURY_ADDRESS=
LTC_TREASURY_ADDRESS=
ETH_TREASURY_ADDRESS=

```

### Run database migrations

```bash
npx prisma migrate dev
```

### Start development server

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

## 📁 Project Structure

```text
src/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

## Screenshots

Add screenshots of:

* Dashboard
<img width="1909" height="944" alt="image" src="https://github.com/user-attachments/assets/a7431496-6cef-45f4-a8bc-661d12e63215" />
* Product catalog
<img width="1911" height="945" alt="image" src="https://github.com/user-attachments/assets/1b35c9ff-e4f4-4adf-83af-99ef7bac0b53" />
* Product creation
<img width="1906" height="943" alt="image" src="https://github.com/user-attachments/assets/54ed837a-a352-4183-956f-26ae9ff3c436" />
<img width="1911" height="943" alt="image" src="https://github.com/user-attachments/assets/1a724a82-57bb-401b-96e6-0eb466c765a3" />
* Customers
<img width="1910" height="942" alt="image" src="https://github.com/user-attachments/assets/c0d46f25-cbee-4191-9d37-c7dc935f1f64" />
* Crypto wallets
<img width="1915" height="949" alt="image" src="https://github.com/user-attachments/assets/54665011-90c9-4e26-982c-613330c967ea" />
<img width="1913" height="942" alt="image" src="https://github.com/user-attachments/assets/6f86ab0e-c6ee-4f26-b66b-008de59f6fbe" />

---
