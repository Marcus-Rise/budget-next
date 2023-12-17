import 'server-only';
import mongoose from 'mongoose';
import { configFactory } from '@/config';
import { Transaction } from '@/transaction/transaction.types';

const { mongoUrl } = configFactory();

mongoose.connect(mongoUrl);

const { Schema } = mongoose;

type TransactionEntityType = Transaction & { userId: string };

const TransactionSchema = new Schema<TransactionEntityType>({
  title: String,
  category: String,
  amount: Number,
  date: Date,
  uuid: String,
  userId: String,
});

const TransactionEntity =
  mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export { TransactionEntity };
export type { TransactionEntityType };
