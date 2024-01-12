'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useTransactionEditorStore } from '@/transaction/transaction-editor.store';
import { transactionDelete, transactionSave } from '@/transaction/transaction.actions';
import { useRouter } from 'next/navigation';
import type { TransactionSaveDto } from '@/transaction/transaction.dto';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { TransactionFormSkeleton } from '@/transaction/components/form/transaction-form-skeleton.component';

const TransactionForm = dynamic(() => import('@/transaction/components/form'), {
  loading: () => <TransactionFormSkeleton />,
});

type TransactionEditorProps = { className?: string };

const TransactionEditor: FC<TransactionEditorProps> = ({ className }) => {
  const router = useRouter();
  const transactionToEdit = useTransactionEditorStore((state) => state.transaction);
  const closeEditor = useTransactionEditorStore((state) => state.closeEditor);
  const [isPending, startTransition] = useTransition();
  const [isSending, setIsSending] = useState(false);

  const saveTransaction = useCallback(
    async (dto: TransactionSaveDto) => {
      setIsSending(true);

      try {
        await transactionSave({ ...dto, uuid: transactionToEdit?.uuid });
        closeEditor();

        startTransition(() => router.refresh());
      } catch (e) {
        console.error(e);
      }

      setIsSending(false);
    },
    [closeEditor, router, transactionToEdit?.uuid],
  );

  const deleteTransaction = useCallback(async () => {
    setIsSending(true);

    try {
      await transactionDelete({ uuid: transactionToEdit?.uuid! });
      closeEditor();

      startTransition(() => router.refresh());
    } catch (e) {
      console.error(e);
    }

    setIsSending(false);
  }, [closeEditor, router, transactionToEdit?.uuid]);

  useEffect(() => {
    if (transactionToEdit) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [transactionToEdit]);

  useEffect(() => {
    if (transactionToEdit) {
      const event = 'keydown';
      const keyDownHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();

          // 👇️ your logic here
          closeEditor();
        }
      };

      document.addEventListener(event, keyDownHandler);

      // 👇️ clean up event listener
      return () => {
        document.removeEventListener(event, keyDownHandler);
      };
    }
  }, [closeEditor, transactionToEdit]);

  if (!transactionToEdit) {
    return null;
  }

  return (
    <div
      className={
        'w-screen h-screen flex flex-col items-center justify-center fixed top-0 left-0 z-[100] md:z-[300] '
      }
    >
      <div
        className={'bg-black opacity-50 w-full h-full absolute top-0 lef-0 z-[1]'}
        onClick={closeEditor}
      />
      <div
        className={classNames(
          className,
          'h-full md:h-fit md:rounded-md md:p-10 bg-background flex flex-col items-center justify-center gap-7 z-[2] relative',
        )}
      >
        <h2 className={'text-xl text-center font-medium'}>Редактор транзакции</h2>
        <TransactionForm
          className={'w-full'}
          date={transactionToEdit.date}
          title={transactionToEdit.title}
          category={transactionToEdit.category}
          amount={transactionToEdit.amount}
          isPending={isSending || isPending}
          onSubmit={saveTransaction}
          onCancel={closeEditor}
          onDelete={deleteTransaction}
          deletable={!!transactionToEdit.uuid}
        />
      </div>
    </div>
  );
};

export { TransactionEditor };
