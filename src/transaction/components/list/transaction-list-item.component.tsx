import type { FC } from 'react';
import { Transaction } from '@/transaction/transaction.types';
import { Price } from '@/components/price';

type TransactionListItemProps = Pick<Transaction, 'amount' | 'title' | 'category'>;

const TransactionListItem: FC<TransactionListItemProps> = ({ amount, category, title }) => (
  <div className={'flex justify-between gap-1'}>
    <div className={'flex flex-col gap-1'}>
      <span className={'font-medium'}>{title}</span>
      <span className={'text-secondary'}>{category}</span>
    </div>
    <Price className={'font-medium'} amount={amount} />
  </div>
);

export { TransactionListItem };
