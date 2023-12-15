import type { FC } from 'react';
import { Transaction } from '@/transaction/transaction.types';
import { ListDated } from '@/components/list-dated';
import { dateToStringHelper } from '@/helpers/date';
import { TransactionListItem } from '@/transaction/components/transaction-list-item.component';
import { TransactionListItemEditSpy } from '@/transaction/components/transaction-list-item-edit-spy.component';

type TransactionListProps = {
  items: Array<Transaction>;
};

const TransactionList: FC<TransactionListProps> = ({ items }) => {
  return (
    <ListDated
      items={items}
      renderWrapper={({ children }) => <dl className={'flex flex-col gap-5'}>{children}</dl>}
    >
      {(date, items) => {
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

        return (
          <>
            <dt className={'text-secondary'}>{title}</dt>
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
