import { Transaction } from '@/transaction/transaction.types';
import { create } from 'zustand';

type State = {
  transaction: Transaction | null;
};

type Action = {
  openEditor: (transaction: Transaction) => void;
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
