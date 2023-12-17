import type { FC } from 'react';
import { Suspense } from 'react';
import { TransactionList } from '@/transaction/components/transaction-list.component';
import { TransactionEditor } from '@/transaction/components/transaction-editor.component';
import { TransactionCreateButton } from '@/transaction/components/transaction-create-button.component';

const Page: FC = () => (
  <div className={'flex flex-col gap-3'}>
    <TransactionEditor className={'px-3 py-2'} />
    <div
      className={
        'px-3 py-2 flex justify-between items-center sticky top-[3.25rem] bg-background shadow'
      }
    >
      <h2 className={'text-xl font-medium'}>История</h2>
      <TransactionCreateButton />
    </div>
    <Suspense fallback={'loading...'}>
      <TransactionList className={'px-3'} />
    </Suspense>
  </div>
);

export default Page;
