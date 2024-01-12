import { create } from 'zustand';
import type { Transaction } from '@/transaction/transaction.types';

type State = {
  transaction: Partial<Transaction> | null;
};

type Action = {
  openEditor: (transaction?: Partial<Transaction>) => void;
  closeEditor: () => void;
};

const useTransactionEditorStore = create<State & Action>((set) => ({
  transaction: null,
  openEditor: (transaction) => {
    set((state) => {
      return { ...state, transaction };
    });
  },
  closeEditor: () => {
    set((state) => {
      return { ...state, transaction: null };
    });
  },
}));

export { useTransactionEditorStore };
