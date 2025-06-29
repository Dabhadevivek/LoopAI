# LoopAI Financial Dashboard API Documentation

## Authentication

### Register User
- **Method:** POST
- **URL:** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Description:** Register a new user.

### Login User
- **Method:** POST
- **URL:** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Description:** Login and receive a JWT token.

---

## Transactions

### Get All Transactions
- **Method:** GET
- **URL:** `/api/transactions`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Get all transactions for the authenticated user. Supports query parameters for filtering.

### Get Transactions with Filters
- **Method:** GET
- **URL:** `/api/transactions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&category=Revenue|Expense&sortBy=date&sortOrder=asc|desc`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Get filtered transactions by date, category, and sorting.

### Add Transaction
- **Method:** POST
- **URL:** `/api/transactions`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "date": "YYYY-MM-DDTHH:MM:SS.sssZ",
    "amount": number,
    "user": "string",
    "category": "Revenue|Expense",
    "status": "Paid|Pending"
  }
  ```
- **Description:** Add a new transaction.

---

## Analytics

### Get Analytics Summary
- **Method:** GET
- **URL:** `/api/analytics/summary`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Get total revenue, expenses, savings, and balance.

### Get Trends
- **Method:** GET
- **URL:** `/api/analytics/trends?groupBy=month`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Get income and expenses trends, optionally grouped by month.

---

## Export

### Export Transactions as CSV
- **Method:** POST
- **URL:** `/api/export`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  }
  ```
- **Description:** Export filtered transactions as a CSV file. 