import type { FC } from 'react';
import { Suspense } from 'react';
import { TransactionList } from '@/transaction/components/transaction-list.component';
import { TransactionEditor } from '@/transaction/transaction-editor.component';

const Page: FC = () => (
  <div className={'p-3 flex flex-col gap-3'}>
    <TransactionEditor />
    <h2 className={'text-xl font-medium'}>История</h2>
    <Suspense fallback={'loading...'}>
      <TransactionList />
    </Suspense>
  </div>
);

export default Page;
