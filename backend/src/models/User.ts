import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  name: string;
  user_profile: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  user_profile: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema); 