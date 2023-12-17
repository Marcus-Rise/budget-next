import { z } from 'zod';

const TransactionSaveDtoSchema = z.object({
  title: z.string().min(1, 'Введите название'),
  category: z.string().min(1, 'Введите категорию'),
  amount: z.number({
    errorMap: () => ({
      message: 'Введите сумму',
    }),
  }),
  date: z.date({
    errorMap: () => ({
      message: 'Введите дату',
    }),
  }),
  uuid: z.string().uuid('Неверный идентификатор').optional(),
});

type TransactionSaveDto = z.infer<typeof TransactionSaveDtoSchema>;

const TransactionRemoveDtoSchema = z.object({
  uuid: z.string().uuid('Неверный идентификатор'),
});

type TransactionRemoveDto = z.infer<typeof TransactionRemoveDtoSchema>;

export type { TransactionSaveDto, TransactionRemoveDto };
export { TransactionSaveDtoSchema, TransactionRemoveDtoSchema };
