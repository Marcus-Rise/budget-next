'use client';

import type { FC } from 'react';
import { useCallback, useTransition } from 'react';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { TransactionForm } from '@/transaction/components/transaction-form.component';
import { transactionDelete, transactionSave } from '@/transaction/transaction.actions';
import { useRouter } from 'next/navigation';
import { TransactionSaveDto } from '@/transaction/transaction.dto';
import classNames from 'classnames';

type TransactionEditorProps = { className?: string };

const TransactionEditor: FC<TransactionEditorProps> = ({ className }) => {
  const router = useRouter();
  const transactionToEdit = useTransactionEditorStore((state) => state.transaction);
  const closeEditor = useTransactionEditorStore((state) => state.closeEditor);
  const [isPending, startTransition] = useTransition();

  const saveTransaction = useCallback(
    (dto: TransactionSaveDto) => {
      startTransition(async () => {
        try {
          await transactionSave({ ...dto, uuid: transactionToEdit?.uuid });
          closeEditor();
          router.refresh();
        } catch (e) {
          console.error(e);
        }
      });
    },
    [closeEditor, router, transactionToEdit?.uuid],
  );

  const deleteTransaction = useCallback(() => {
    startTransition(async () => {
      try {
        await transactionDelete({ uuid: transactionToEdit?.uuid! });
        closeEditor();
        router.refresh();
      } catch (e) {
        console.error(e);
      }
    });
  }, [closeEditor, router, transactionToEdit?.uuid]);

  if (!transactionToEdit) {
    return null;
  }

  return (
    <div className={classNames(className, 'flex flex-col gap-1')}>
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
