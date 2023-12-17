'use server';

import {
  TransactionRemoveDto,
  TransactionRemoveDtoSchema,
  TransactionSaveDto,
  TransactionSaveDtoSchema,
} from '@/transaction/transaction.dto';
import { OauthService } from '@/oauth/oauth.service';
import { configFactory } from '@/config';
import { oauthConfigFactory } from '@/oauth/config';
import { TransactionService } from '@/transaction/transaction.service';

const transactionSave = async (dto: TransactionSaveDto) => {
  await new OauthService(configFactory(), oauthConfigFactory()).checkAuth();

  const validatedFields = TransactionSaveDtoSchema.safeParse(dto);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await new TransactionService().save(dto);

  return {
    success: true,
  };
};

const transactionDelete = async (dto: TransactionRemoveDto) => {
  await new OauthService(configFactory(), oauthConfigFactory()).checkAuth();

  const validatedFields = TransactionRemoveDtoSchema.safeParse(dto);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    throw {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await new TransactionService().remove(dto);

  return {
    success: true,
  };
};

export { transactionSave, transactionDelete };
