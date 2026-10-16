# Butterfly — Commerce Backend

A Node.js/Prisma backend for a commerce platform, providing the data layer
for orders, customers, messaging, and payments.

## Domain model

- **Products** — catalog entries with categories and images
- **Orders** — created from the customer-facing apps, with payment methods
- **Customers & messaging** — contact details and customer conversations
- **Voice calls** — recordings linked to customer calls
- **Social posts** — published content per customer account

## API

REST routes are grouped by resource under `src/routes/`, for example:

- `/orders`, `/customers`, `/products`, `/payments`
- `/messaging`, `/social`, `/voice-calls`

## Running

```bash
npm install
npm run dev
```

Database migrations are applied automatically on startup.
