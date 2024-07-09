import type { FC, PropsWithChildren } from 'react';
import { ListDated } from '@/components/list-dated';
import { dateToStringHelper } from '@/helpers/date';
import { TransactionListItem } from '@/transaction/components/list/transaction-list-item.component';
import { TransactionListItemEditSpy } from '@/transaction/components/list/transaction-list-item-edit-spy.component';
import { clsx } from 'clsx';
import { Price } from '@/components/price';
import { Collapse } from '@/components/collapse.component';
import type { Transaction } from '@/transaction/transaction.types';

type TransactionListProps = PropsWithChildren<{
  className?: string;
  transactions: Array<Transaction>;
}>;

const TransactionList: FC<TransactionListProps> = async ({ children, className, transactions }) => {
  if (!transactions.length) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ListDated
      items={transactions}
      renderWrapper={({ children }) => (
        <dl className={clsx(className, 'flex flex-col gap-5')}>{children}</dl>
      )}
    >
      {(date, items) => {
        const { sumCredit, sumDebit } = items.reduce(
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

        const title = dateToStringHelper(date);
        const renderItems = items.map((item) => (
          <li key={item.uuid}>
            <TransactionListItemEditSpy
              title={item.title}
              amount={item.amount}
              date={item.date}
              category={item.category}
              uuid={item.uuid}
            >
              <TransactionListItem
                amount={item.amount}
                title={item.title}
                category={item.category}
              />
            </TransactionListItemEditSpy>
          </li>
        ));

        const debitExists = sumDebit > 0;
        const creditExists = sumCredit < 0;

        return (
          <>
            <dt className={'text-secondary'}>
              <Collapse title={title}>
                {debitExists && (
                  <p>
                    Доход: <Price amount={sumDebit} />
                  </p>
                )}
                {creditExists && (
                  <p>
                    Расход: <Price amount={sumCredit} />
                  </p>
                )}
                {debitExists && creditExists && (
                  <p>
                    Остаток: <Price amount={sumDebit + sumCredit} />
                  </p>
                )}
              </Collapse>
            </dt>
            <dd>
              <ul className={'flex flex-col gap-5 pl-2'}>{renderItems}</ul>
            </dd>
          </>
        );
      }}
    </ListDated>
  );
};

export { TransactionList };
