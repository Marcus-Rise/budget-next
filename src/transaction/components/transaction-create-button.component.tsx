'use client';

import type { FC, PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { Button } from '@/components/button';
import { TransactionDtoFactory } from '@/transaction/transaction-dto.factory';

type TransactionCreateButtonProps = PropsWithChildren<{ className?: string; rounded?: boolean }>;

const TransactionCreateButton: FC<TransactionCreateButtonProps> = ({
  children,
  className,
  rounded,
}) => {
  const transactionToEdit = useTransactionEditorStore((state) => state.transaction);
  const openEditor = useTransactionEditorStore((state) => state.openEditor);

  const createTransaction = useCallback(() => {
    openEditor(TransactionDtoFactory.empty());
  }, [openEditor]);

  return (
    <Button
      disabled={!!transactionToEdit}
      className={className}
      rounded={rounded}
      onClick={createTransaction}
    >
      {children}
    </Button>
  );
};

export { TransactionCreateButton };
