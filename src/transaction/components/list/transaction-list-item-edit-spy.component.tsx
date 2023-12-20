'use client';

import type { FC, PropsWithChildren } from 'react';
import { Transaction } from '@/transaction/transaction.types';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { useCallback } from 'react';

type TransactionListItemEditSpyProps = PropsWithChildren<
  Pick<Transaction, 'title' | 'amount' | 'date' | 'category' | 'uuid'>
>;

const TransactionListItemEditSpy: FC<TransactionListItemEditSpyProps> = ({
  children,
  ...transaction
}) => {
  const openEditor = useTransactionEditorStore((state) => state.openEditor);

  const openTransactionToEdit = useCallback(
    () => openEditor(transaction),
    [openEditor, transaction],
  );

  return (
    <div className={'hover:cursor-pointer'} onClick={openTransactionToEdit}>
      {children}
    </div>
  );
};

export { TransactionListItemEditSpy };
