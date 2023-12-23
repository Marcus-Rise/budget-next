'use server';

import {
  TransactionRemoveDto,
  TransactionRemoveDtoSchema,
  TransactionSaveDto,
  TransactionSaveDtoSchema,
} from '@/transaction/transaction.dto';
import { transactionService } from '@/transaction/transaction.service';

const transactionSave = async (dto: TransactionSaveDto) => {
  const validatedFields = TransactionSaveDtoSchema.safeParse(dto);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await transactionService.save(dto);

  return {
    success: true,
  };
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

  return {
    success: true,
  };
};

export { transactionSave, transactionDelete };
