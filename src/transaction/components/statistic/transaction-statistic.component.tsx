import type { FC } from 'react';
import { Collapse } from '@/components/collapse.component';
import { Price } from '@/components/price';
import { TransactionStatisticChart } from '@/transaction/components/statistic/transaction-statistic-chart.component';
import type { Transaction } from '@/transaction/transaction.types';

type TransactionStatisticProps = {
  className?: string;
  title: FC<{ remainAmount: number }>;
  transactions: Array<Transaction>;
};

const TransactionStatistic: FC<TransactionStatisticProps> = async ({
  className,
  transactions,
  title: Title,
}) => {
  const creditCategories = new Map<string, number>();
  const debitCategories = new Map<string, number>();

  const { sumCredit, sumDebit } = transactions.reduce(
    ({ sumDebit, sumCredit }, item) => {
      const categoryKey = item.category.toLowerCase().trim();

      if (item.amount < 0) {
        if (!creditCategories.has(categoryKey)) {
          creditCategories.set(categoryKey, item.amount);
        } else {
          creditCategories.set(categoryKey, creditCategories.get(categoryKey)! + item.amount);
        }
      } else {
        if (!debitCategories.has(categoryKey)) {
          debitCategories.set(categoryKey, item.amount);
        } else {
          debitCategories.set(categoryKey, debitCategories.get(categoryKey)! + item.amount);
        }
      }

      return {
        sumDebit: item.amount > 0 ? sumDebit + item.amount : sumDebit,
        sumCredit: item.amount < 0 ? sumCredit + item.amount : sumCredit,
      };
    },
    {
      sumDebit: 0,
      sumCredit: 0,
    },
  );

  const remain = sumDebit + sumCredit;

  return (
    <Collapse className={className} title={<Title remainAmount={remain} />}>
      <div className={'py-3 flex flex-col gap-1'}>
        <p>
          <span className={'font-medium'}>Доход:</span> <Price amount={sumDebit} />
        </p>
        <TransactionStatisticChart map={debitCategories} total={sumDebit} />
        <p>
          <span className={'font-medium'}>Расход:</span> <Price amount={sumCredit} />
        </p>
        <TransactionStatisticChart map={creditCategories} total={sumCredit} />
      </div>
    </Collapse>
  );
};

export { TransactionStatistic };
