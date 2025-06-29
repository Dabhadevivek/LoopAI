export interface User {
  email: string;
  _id: string;
}

export interface Transaction {
  _id: string;
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  userId: string;
  user_profile: string;
  user_name: string;
  user_id: string;
}

export interface AnalyticsSummary {
  revenue: number;
  expenses: number;
  savings: number;
  balance: number;
}

export interface Trends {
  income: { _id: { year: number; month: number }; total: number }[];
  expenses: { _id: { year: number; month: number }; total: number }[];
}

export interface TransactionTableQuery {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  from?: string;
  to?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
} 