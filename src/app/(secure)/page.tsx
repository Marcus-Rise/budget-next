import type { FC } from 'react';
import { TransactionList } from '@/transaction/components/list';
import { TransactionEditor } from '@/transaction/components/transaction-editor.component';
import { TransactionCreateButton } from '@/transaction/components/transaction-create-button.component';
import { ReloadButton } from '@/components/reload-button.component';
import { TransactionFilter } from '@/transaction/components/transaction-filter.component';
import { TransactionStatistic } from '@/transaction/components/statistic';
import { IconPlus } from '@/assets';
import { Price } from '@/components/price';
import { transactionService } from '@/transaction/service';
import { getDatePeriod } from '@/utils/date.helper';

const Page: FC<{
  searchParams: Record<string, string | string[] | undefined>;
}> = async ({ searchParams }) => {
  const [dateStart, dateEnd] = getDatePeriod(searchParams.dateStart, searchParams.dateEnd);

  const transactions = await transactionService.getAll({
    dateStart,
    dateEnd,
  });

  return (
    <div className={'flex flex-col gap-3'}>
      <TransactionEditor className={'px-3 py-2 container mx-auto'} />
      <div className={'sticky top-[3.25rem] bg-background shadow'}>
        <div className={'px-3 py-2 container mx-auto flex flex-row justify-between gap-3'}>
          <TransactionFilter date={dateStart} />
          <div className={'flex flex-row gap-3 items-center'}>
            <ReloadButton />
            <TransactionCreateButton rounded>
              <IconPlus />
            </TransactionCreateButton>
          </div>
        </div>
      </div>
      <div className={'px-3 container mx-auto flex flex-col gap-3'}>
        <TransactionStatistic
          title={({ remainAmount }) => (
            <h2 className={'inline text-xl font-medium'}>
              За период: <Price className={'font-medium'} amount={remainAmount} />
            </h2>
          )}
          transactions={transactions}
        />
        <h2 className={'text-xl font-medium'}>История</h2>
        <TransactionList transactions={transactions}>
          <div className={'h-[calc(50dvh)] w-full flex flex-col items-center justify-center'}>
            <TransactionCreateButton>Добавить первую запись</TransactionCreateButton>
          </div>
        </TransactionList>
      </div>
    </div>
  );
};

export default Page;
