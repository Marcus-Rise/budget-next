'use client';

import type { FC } from 'react';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { Button } from '@/components/button.component';
import { useCallback } from 'react';
import { TransactionDtoFactory } from '@/transaction/transaction-dto.factory';

type TransactionCreateButtonProps = {};

const TransactionCreateButton: FC<TransactionCreateButtonProps> = ({}) => {
  const transactionToEdit = useTransactionEditorStore((state) => state.transaction);
  const openEditor = useTransactionEditorStore((state) => state.openEditor);

  const createTransaction = useCallback(() => {
    openEditor(TransactionDtoFactory.empty());
  }, [openEditor]);

  if (!!transactionToEdit) {
    return null;
  }

  return (
    <Button rounded onClick={createTransaction}>
      +
    </Button>
  );
};

export { TransactionCreateButton };
