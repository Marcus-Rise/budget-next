import { JSX, Suspense } from 'react';
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
      <TransactionEditor className={'px-3 py-2 container mx-auto'} />
      <div className={'sticky top-[3.25rem] bg-background shadow'}>
        <div className={'px-3 py-2 container mx-auto flex flex-col gap-3'}>
          <div className={'flex flex-row gap-3 items-center'}>
            <h2 className={'basis-full text-xl font-medium'}>История</h2>
            <ReloadButton />
            <TransactionCreateButton className={'basis-1'} rounded>
              <IconPlus />
            </TransactionCreateButton>
          </div>
          <div className={'flex flex-col flex-wrap justify-between gap-3'}>
            <TransactionFilter dateStart={dateStart} dateEnd={dateEnd} />

            <Suspense fallback={<TransactionStatisticSkeleton />}>
              <TransactionStatistic dateStart={dateStart} dateEnd={dateEnd} />
            </Suspense>
          </div>
        </div>
      </div>
      <Suspense fallback={<TransactionListSkeleton className={'container mx-auto px-3'} />}>
        <TransactionList
          dateStart={dateStart}
          dateEnd={dateEnd}
          className={'container mx-auto px-3'}
        >
          <div className={'h-[calc(50dvh)] w-full flex flex-col items-center justify-center'}>
            <TransactionCreateButton>Добавить первую запись</TransactionCreateButton>
          </div>
        </TransactionList>
      </Suspense>
    </div>
  );
};

export default Page;
