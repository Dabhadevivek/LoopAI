import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITransaction extends Document {
  date: Date;
  amount: number;
  category: string;
  status: string;
  userId: Types.ObjectId;
  user_profile: string;
  user_name: string;
  user_id: string;
}

const TransactionSchema = new Schema<ITransaction>({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  user_profile: { type: String, required: true },
  user_name: { type: String },
  user_id: { type: String, required: true },
}, { collection: 'transactions2' });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema); 