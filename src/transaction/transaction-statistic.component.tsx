import type { FC } from 'react';
import { Collapse } from '@/components/collapse.component';
import { TransactionService } from '@/transaction/transaction.service';
import { Price } from '@/components/price';

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

  const { sumCredit, sumDebit } = transactions.reduce(
    ({ sumDebit, sumCredit }, item) => {
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
      </div>
    </Collapse>
  );
};

export { TransactionStatistic };
