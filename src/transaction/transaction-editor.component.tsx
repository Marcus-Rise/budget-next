'use client';

import type { FC } from 'react';
import { useCallback, useTransition } from 'react';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import {
  TransactionForm,
  TransactionFormDto,
} from '@/transaction/components/transaction-form.component';
import { transactionDelete, transactionSave } from '@/transaction/transaction.actions';
import { useRouter } from 'next/navigation';

type TransactionEditorProps = {};

const TransactionEditor: FC<TransactionEditorProps> = ({}) => {
  const router = useRouter();
  const transactionToEdit = useTransactionEditorStore((state) => state.transaction);
  const closeEditor = useTransactionEditorStore((state) => state.closeEditor);
  const [isPending, startTransition] = useTransition();

  const saveTransaction = useCallback(
    (dto: TransactionFormDto) => {
      startTransition(async () => {
        await transactionSave(dto);
        closeEditor();
        router.refresh();
      });
    },
    [closeEditor, router],
  );

  const deleteTransaction = useCallback(() => {
    startTransition(async () => {
      await transactionDelete(transactionToEdit?.uuid!);
      closeEditor();
      router.refresh();
    });
  }, [closeEditor, router, transactionToEdit?.uuid]);

  if (!transactionToEdit) {
    return null;
  }

  return (
    <div className={'flex flex-col gap-1'}>
      <h3 className={'text-lg text-center font-medium'}>Редактор транзакции</h3>
      <TransactionForm
        date={transactionToEdit.date}
        title={transactionToEdit.title}
        category={transactionToEdit.category}
        amount={transactionToEdit.amount}
        isPending={isPending}
        onSubmit={saveTransaction}
        onCancel={closeEditor}
        onDelete={deleteTransaction}
        deletable={!!transactionToEdit.uuid}
      />
    </div>
  );
};

export { TransactionEditor };
