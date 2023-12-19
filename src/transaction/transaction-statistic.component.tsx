import type { FC } from 'react';
import { Collapse } from '@/components/collapse.component';
import { TransactionService } from '@/transaction/transaction.service';
import { Price } from '@/components/price';
import { TransactionStatisticChart } from '@/transaction/transaction-statistic-chart.component';

type TransactionStatisticProps = {
  dateStart?: string;
  dateEnd?: string;
  className?: string;
};

const TransactionStatistic: FC<TransactionStatisticProps> = async ({
  className,
  dateStart,
  dateEnd,
}) => {
  const transactions = await new TransactionService().getAll({
    dateStart: dateStart ? new Date(dateStart) : undefined,
    dateEnd: dateEnd ? new Date(dateEnd) : undefined,
  });

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

  return (
    <Collapse className={className} title={'Статистика'}>
      <div className={'py-3 flex flex-col gap-1'}>
        <p>
          Доход: <Price amount={sumDebit} />
        </p>
        <p>
          Расход: <Price amount={sumCredit} />
        </p>
        <p>
          Остаток: <Price amount={sumDebit + sumCredit} />
        </p>

        <TransactionStatisticChart map={creditCategories} total={sumCredit} />
      </div>
    </Collapse>
  );
};

export { TransactionStatistic };
