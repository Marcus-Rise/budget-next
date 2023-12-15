import { z } from 'zod';

const TransactionFormDtoSchema = z.object({
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

type TransactionFormDto = z.infer<typeof TransactionFormDtoSchema>;

export type { TransactionFormDto };
export { TransactionFormDtoSchema };
