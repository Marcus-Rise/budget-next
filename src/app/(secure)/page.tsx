import type { FC } from 'react';
import { Suspense } from 'react';
import { TransactionList } from '@/transaction/components/transaction-list.component';
import { TransactionEditor } from '@/transaction/components/transaction-editor.component';
import { TransactionCreateButton } from '@/transaction/components/transaction-create-button.component';
import { ReloadButton } from '@/app/(secure)/reload-button.component';

const Page: FC = () => (
  <div className={'flex flex-col gap-3'}>
    <TransactionEditor className={'px-3 py-2'} />
    <div
      className={
        'px-3 py-2 flex flex-row gap-3 items-center sticky top-[3.25rem] bg-background shadow'
      }
    >
      <h2 className={'basis-full text-xl font-medium'}>История</h2>
      <ReloadButton />
      <TransactionCreateButton className={'basis-1'} />
    </div>
    <Suspense fallback={'loading...'}>
      <TransactionList className={'px-3'} />
    </Suspense>
  </div>
);

export default Page;
