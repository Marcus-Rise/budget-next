'use client';

import type { FC, MouseEventHandler, PropsWithChildren } from 'react';
import type { Transaction } from '@/transaction/transaction.types';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { useCallback, useRef } from 'react';
import { SwipeX } from '@/components/swipe-x';
import { transactionDelete, transactionSave } from '@/transaction/transaction.actions';
import { TransactionDtoFactory } from '@/transaction/transaction-dto.factory';
import { useRouter } from 'next/navigation';

type TransactionListItemEditSpyProps = PropsWithChildren<
  Pick<Transaction, 'title' | 'amount' | 'date' | 'category' | 'uuid'>
>;

const TransactionListItemEditSpy: FC<TransactionListItemEditSpyProps> = ({
  children,
  ...transaction
}) => {
  const listItemElement = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const openEditor = useTransactionEditorStore((state) => state.openEditor);

  const scrollListItemElementToLeft = useCallback(() => {
    listItemElement.current?.scrollTo({
      left: -1000,
      behavior: 'smooth',
    });
  }, []);

  const openTransactionToEdit = useCallback(
    () => openEditor(transaction),
    [openEditor, transaction],
  );

  const copyTransaction: MouseEventHandler = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        await transactionSave(TransactionDtoFactory.copy(transaction));

        scrollListItemElementToLeft();

        router.refresh();
      } catch (e) {
        console.error(e);
      }
    },
    [router, scrollListItemElementToLeft, transaction],
  );

  const deleteTransaction: MouseEventHandler = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        await transactionDelete({ uuid: transaction.uuid });

        scrollListItemElementToLeft();

        router.refresh();
      } catch (e) {
        console.error(e);
      }
    },
    [router, scrollListItemElementToLeft, transaction.uuid],
  );

  return (
    <SwipeX
      ref={listItemElement}
      className={'gap-2'}
      onClick={openTransactionToEdit}
      right={
        <div className={'flex h-full'}>
          <button className={'bg-primary border-none p-2'} onClick={copyTransaction}>
            Скопировать
          </button>
          <button className={'bg-danger border-none p-2'} onClick={deleteTransaction}>
            Удалить
          </button>
        </div>
      }
    >
      {children}
    </SwipeX>
  );
};

export { TransactionListItemEditSpy };
