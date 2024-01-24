import type { FC } from 'react';
import { Suspense } from 'react';
import { TransactionList, TransactionListSkeleton } from '@/transaction/components/list';
import { TransactionEditor } from '@/transaction/components/transaction-editor.component';
import { TransactionCreateButton } from '@/transaction/components/transaction-create-button.component';
import { ReloadButton } from '@/app/(secure)/reload-button.component';
import { TransactionFilter } from '@/transaction/components/transaction-filter.component';
import { redirect } from 'next/navigation';
import {
  TransactionStatistic,
  TransactionStatisticSkeleton,
} from '@/transaction/components/statistic';
import { IconPlus } from '@/assets';
import { Price } from '@/components/price';

const Page: FC<{
  searchParams: Record<string, string | string[] | undefined>;
}> = ({ searchParams }) => {
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
      <TransactionEditor className={'px-3 py-2 container mx-auto'} />
      <div className={'sticky top-[3.25rem] bg-background shadow'}>
        <div className={'px-3 py-2 container mx-auto flex flex-row justify-between gap-3'}>
          <TransactionFilter dateStart={dateStart} dateEnd={dateEnd} />
          <div className={'flex flex-row gap-3 items-center'}>
            <ReloadButton />
            <TransactionCreateButton rounded>
              <IconPlus />
            </TransactionCreateButton>
          </div>
        </div>
      </div>
      <div className={'px-3 container mx-auto flex flex-col gap-3'}>
        <Suspense fallback={<TransactionStatisticSkeleton />}>
          <TransactionStatistic
            title={({ remainAmount }) => (
              <h2 className={'inline text-xl font-medium'}>
                За период: <Price className={'font-medium'} amount={remainAmount} />
              </h2>
            )}
            dateStart={dateStart}
            dateEnd={dateEnd}
          />
        </Suspense>
        <h2 className={'text-xl font-medium'}>История</h2>
        <Suspense fallback={<TransactionListSkeleton />}>
          <TransactionList dateStart={dateStart} dateEnd={dateEnd}>
            <div className={'h-[calc(50dvh)] w-full flex flex-col items-center justify-center'}>
              <TransactionCreateButton>Добавить первую запись</TransactionCreateButton>
            </div>
          </TransactionList>
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
