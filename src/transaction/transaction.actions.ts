'use server';

import { TransactionFormDto, TransactionFormDtoSchema } from '@/transaction/transaction.dto';
import { Transaction } from '@/transaction/transaction.types';

const transactionSave = async (dto: TransactionFormDto) => {
  const validatedFields = TransactionFormDtoSchema.safeParse(dto);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
  };
};

const transactionDelete = async (uuid: Transaction['uuid']) => {
  return {
    success: true,
  };
};

export { transactionSave, transactionDelete };
