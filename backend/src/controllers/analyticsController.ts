import { Response } from 'express';
import Transaction from '../models/Transaction';
import { AuthRequest } from '../middleware/auth';
import { Types } from 'mongoose';

export async function summary(req: AuthRequest, res: Response) {
  try {
    const [income, expenses] = await Promise.all([
      Transaction.aggregate([
        { $match: { category: 'Revenue' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Transaction.aggregate([
        { $match: { category: 'Expense' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);
    const revenue = income[0]?.total || 0;
    const expensesTotal = expenses[0]?.total || 0;
    const savings = revenue - expensesTotal;
    res.json({ revenue, expenses: expensesTotal, savings, balance: revenue });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
}

export async function trends(req: AuthRequest, res: Response) {
  try {
    const groupBy = req.query.groupBy === 'month' ? {
      year: { $year: '$date' },
      month: { $month: '$date' }
    } : null;
    const match = { date: { $type: 'date' } };
    const income = await Transaction.aggregate([
      { $match: { ...match, category: 'Revenue' } },
      { $group: { _id: groupBy, total: { $sum: '$amount' } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    const expenses = await Transaction.aggregate([
      { $match: { ...match, category: 'Expense' } },
      { $group: { _id: groupBy, total: { $sum: '$amount' } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    res.json({ income, expenses });
  } catch (err) {
    console.error('Trends aggregation error:', err);
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message: 'Failed to fetch trends', error: errorMsg });
  }
} 