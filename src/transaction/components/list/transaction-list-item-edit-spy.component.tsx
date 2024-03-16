'use client';

import type { FC, MouseEventHandler, PropsWithChildren } from 'react';
import type { Transaction } from '@/transaction/transaction.types';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { useCallback } from 'react';
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
  const router = useRouter();
  const openEditor = useTransactionEditorStore((state) => state.openEditor);

  const openTransactionToEdit = useCallback(
    () => openEditor(transaction),
    [openEditor, transaction],
  );

  const copyTransaction: MouseEventHandler = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        await transactionSave(TransactionDtoFactory.copy(transaction));

        router.refresh();
      } catch (e) {
        console.error(e);
      }
    },
    [router, transaction],
  );

  const deleteTransaction: MouseEventHandler = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        await transactionDelete({ uuid: transaction.uuid });

        router.refresh();
      } catch (e) {
        console.error(e);
      }
    },
    [router, transaction],
  );

  return (
    <SwipeX
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
