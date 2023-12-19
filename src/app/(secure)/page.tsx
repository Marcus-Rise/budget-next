import { JSX, Suspense } from 'react';
import { TransactionList } from '@/transaction/components/transaction-list.component';
import { TransactionEditor } from '@/transaction/components/transaction-editor.component';
import { TransactionCreateButton } from '@/transaction/components/transaction-create-button.component';
import { ReloadButton } from '@/app/(secure)/reload-button.component';
import { TransactionFilter } from '@/transaction/components/transaction-filter.component';
import { redirect } from 'next/navigation';

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): JSX.Element => {
  const dateStart = searchParams.dateStart;
  const dateEnd = searchParams.dateEnd;

  if (
    (dateStart !== undefined && typeof dateStart !== 'string') ||
    (dateEnd !== undefined && typeof dateEnd !== 'string')
  ) {
    return redirect('/');
  }

  return (
    <div className={'flex flex-col gap-3'}>
      <TransactionEditor className={'px-3 py-2'} />
      <div className={'px-3 py-2 sticky top-[3.25rem] bg-background shadow flex flex-col gap-3'}>
        <div className={'flex flex-row gap-3 items-center'}>
          <h2 className={'basis-full text-xl font-medium'}>История</h2>
          <ReloadButton />
          <TransactionCreateButton className={'basis-1'} />
        </div>
        <TransactionFilter dateStart={dateStart} dateEnd={dateEnd} />
      </div>
      <Suspense fallback={'loading...'}>
        <TransactionList dateStart={dateStart} dateEnd={dateEnd} className={'px-3'} />
      </Suspense>
    </div>
  );
};

export default Page;
