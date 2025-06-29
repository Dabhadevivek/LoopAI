import { Response } from 'express';
import Transaction from '../models/Transaction';
import { AuthRequest } from '../middleware/auth';
import { Types } from 'mongoose';
import { Parser } from 'json2csv';

export async function exportCSV(req: AuthRequest, res: Response) {
  try {
    // const userId = req.user!.userId; // No longer filter by userId
    const { filters = {}, columns = [] } = req.body;
    // Remove userId, add user column from user_id
    const defaultColumns = ['date', 'amount', 'user', 'category', 'status'];
    let exportColumns = columns.length > 0 ? columns : defaultColumns;
    // Always select user_id from DB for the user column
    const dbSelectFields = exportColumns.map((col: string) => col === 'user' ? 'user_id' : col).join(' ');
    const query: any = {};
    if (filters.category) query.category = filters.category;
    if (filters.status) query.status = filters.status;
    if (filters.from || filters.to) query.date = {};
    if (filters.from) query.date.$gte = new Date(filters.from);
    if (filters.to) query.date.$lte = new Date(filters.to);
    const transactions = await Transaction.find(query).select(dbSelectFields);
    // Prepare data for CSV: rename user_id to user
    const csvData = transactions.map(t => {
      const obj = t.toObject();
      if ((obj as any).user_id !== undefined) {
        (obj as any).user = (obj as any).user_id;
        delete (obj as any).user_id;
      }
      return obj;
    });
    // Ensure exportColumns uses 'user' instead of 'user_id'
    exportColumns = exportColumns.map((col: string) => col === 'user_id' ? 'user' : col);
    const parser = new Parser({ fields: exportColumns });
    const csv = parser.parse(csvData);
    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Failed to export CSV' });
  }
} 