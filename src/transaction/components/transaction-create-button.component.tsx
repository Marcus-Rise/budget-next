'use client';

import type { FC } from 'react';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { Button } from '@/components/button.component';
import { useCallback } from 'react';
import { TransactionDtoFactory } from '@/transaction/transaction-dto.factory';
import { IconPlus } from '@/assets';

type TransactionCreateButtonProps = { className?: string };

const TransactionCreateButton: FC<TransactionCreateButtonProps> = ({ className }) => {
  const transactionToEdit = useTransactionEditorStore((state) => state.transaction);
  const openEditor = useTransactionEditorStore((state) => state.openEditor);

  const createTransaction = useCallback(() => {
    openEditor(TransactionDtoFactory.empty());
  }, [openEditor]);

  return (
    <Button
      disabled={!!transactionToEdit}
      className={className}
      rounded
      onClick={createTransaction}
    >
      <IconPlus />
    </Button>
  );
};

export { TransactionCreateButton };
