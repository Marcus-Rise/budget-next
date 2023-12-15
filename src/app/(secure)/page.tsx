import type { FC } from 'react';
import { TransactionService } from '@/transaction/transaction.service';
import { TransactionList } from '@/transaction/components/transaction-list.component';
import { TransactionEditor } from '@/transaction/transaction-editor.component';

const Page: FC = async () => {
  const transactions = await new TransactionService().getAll();

  return (
    <div className={'p-3 flex flex-col gap-3'}>
      <TransactionEditor />
      <h2 className={'text-xl font-medium'}>История</h2>
      <TransactionList items={transactions} />
    </div>
  );
};

export default Page;
