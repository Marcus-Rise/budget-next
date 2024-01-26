'use server';

import type { TransactionRemoveDto, TransactionSaveDto } from '@/transaction/transaction.dto';
import {
  TransactionRemoveDtoSchema,
  TransactionSaveDtoSchema,
} from '@/transaction/transaction.dto';
import { transactionService } from '@/transaction/service';

const transactionSave = async (dto: TransactionSaveDto) => {
  const validatedFields = TransactionSaveDtoSchema.safeParse(dto);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await transactionService.save(dto);
};

const transactionDelete = async (dto: TransactionRemoveDto) => {
  const validatedFields = TransactionRemoveDtoSchema.safeParse(dto);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await transactionService.remove(dto);
};

export { transactionSave, transactionDelete };
