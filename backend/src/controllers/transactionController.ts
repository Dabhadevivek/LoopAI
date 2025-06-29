import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { AuthRequest } from '../middleware/auth';
import { Types } from 'mongoose';

export async function getTransactions(req: AuthRequest, res: Response) {
  try {
    const { page = 1, limit = 20, category, status, from, to, search, sort, order } = req.query;
    const query: any = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (from || to) {
      query.date = {};
      if (from) {
        const fromDate = new Date(from as string);
        fromDate.setHours(0, 0, 0, 0);
        query.date.$gte = fromDate;
      }
      if (to) {
        const toDate = new Date(to as string);
        toDate.setHours(23, 59, 59, 999);
        query.date.$lte = toDate;
      }
    }
    if (search) {
      query.$or = [
        { category: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } },
        { user_id: { $regex: search, $options: 'i' } }
      ];
    }
    console.log('Backend query:', JSON.stringify(query));
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Transaction.countDocuments(query);
    // Default sort by 'id' ascending if not specified
    let sortField = sort ? String(sort) : 'id';
    let sortOrder = order === 'desc' ? -1 : 1;
    const transactions = await Transaction.find(query)
      .sort({ [sortField]: sortOrder } as any)
      .skip(skip)
      .limit(Number(limit));
    res.json({ data: transactions, total });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ message: 'Failed to fetch transactions', error: errorMsg });
  }
}

export async function addTransaction(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.userId;
    const { date, amount, category, status } = req.body;
    const transaction = await Transaction.create({
      date,
      amount,
      category,
      status,
      userId,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add transaction' });
  }
}

export async function seedTransactions(req: AuthRequest, res: Response) {
  try {
    // Demo users
    const demoUsers = [
      {
        user_id: 'user_001',
        user_name: 'Matheus Ferrero',
        user_profile: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      {
        user_id: 'user_002',
        user_name: 'Floyd Miles',
        user_profile: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      {
        user_id: 'user_003',
        user_name: 'Jerome Bell',
        user_profile: 'https://randomuser.me/api/portraits/men/65.jpg',
      },
    ];
    const demoData = [
      {
        date: new Date('2024-01-15'),
        amount: 1200,
        category: 'Revenue',
        status: 'Completed',
        userId: req.user!.userId,
        ...demoUsers[0],
      },
      {
        date: new Date('2024-02-10'),
        amount: -300,
        category: 'Expense',
        status: 'Completed',
        userId: req.user!.userId,
        ...demoUsers[1],
      },
      {
        date: new Date('2024-03-05'),
        amount: -150,
        category: 'Expense',
        status: 'Pending',
        userId: req.user!.userId,
        ...demoUsers[2],
      },
      {
        date: new Date('2024-04-20'),
        amount: 800,
        category: 'Revenue',
        status: 'Completed',
        userId: req.user!.userId,
        ...demoUsers[0],
      },
      {
        date: new Date('2024-05-12'),
        amount: -200,
        category: 'Expense',
        status: 'Completed',
        userId: req.user!.userId,
        ...demoUsers[1],
      },
    ];
    await Transaction.insertMany(demoData);
    res.status(201).json({ message: 'Demo transactions seeded!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to seed transactions' });
  }
} 