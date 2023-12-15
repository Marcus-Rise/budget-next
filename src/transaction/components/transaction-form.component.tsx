'use client';

import type { FC } from 'react';
import { Controller, FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import format from 'date-fns/format';
import { Input } from '@/components/input.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionFormDto, TransactionFormDtoSchema } from '@/transaction/transaction.dto';
import { useEffect } from 'react';
import { Button } from '@/components/button.component';

type TransactionFormProps = TransactionFormDto & {
  onSubmit: SubmitHandler<TransactionFormDto>;
  isPending?: boolean;
  errors?: FieldErrors<TransactionFormDto>;
  onCancel: () => void;
  onDelete: () => void;
  deletable?: boolean;
};

const TransactionForm: FC<TransactionFormProps> = ({
  amount,
  category,
  date,
  title,
  onSubmit,
  isPending,
  onCancel,
  onDelete,
  deletable,
}) => {
  const { control, handleSubmit, reset } = useForm<TransactionFormDto>({
    resolver: zodResolver(TransactionFormDtoSchema),
    defaultValues: {
      amount,
      category,
      date,
      title,
    },
  });

  useEffect(() => {
    reset({ amount, category, date, title });
  }, [amount, category, date, reset, title]);

  return (
    <form className={'flex flex-col gap-3'} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={'title'}
        render={({ field, fieldState }) => (
          <Input {...field} type="text" label={'Название'} error={fieldState.error?.message} />
        )}
      />
      <Controller
        control={control}
        name={'category'}
        render={({ field, fieldState }) => (
          <Input {...field} type="text" label={'Категория'} error={fieldState.error?.message} />
        )}
      />
      <Controller
        control={control}
        name={'amount'}
        render={({ field: { onChange, ...field }, fieldState }) => (
          <Input
            {...field}
            type="number"
            label={'Сумма'}
            onChange={(e) => {
              let number: number;

              if (e.target.value === '') {
                return onChange('');
              }

              try {
                number = parseInt(e.target.value);

                const naN = isNaN(number);

                if (naN || e.target.value !== String(e.target.valueAsNumber)) {
                  number = 0;
                }
              } catch {
                number = 0;
              }

              onChange(number);
            }}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={'date'}
        render={({ field: { value, onChange, ...field }, fieldState }) => (
          <Input
            {...field}
            type="date"
            label={'Дата'}
            value={format(value, 'yyyy-MM-dd')}
            onChange={(e) => onChange(e.target.valueAsDate)}
            error={fieldState.error?.message}
          />
        )}
      />
      <Button type={'submit'} disabled={isPending}>
        Сохранить
      </Button>

      <div className={'flex justify-between gap-3'}>
        {deletable && (
          <Button
            className={'w-full'}
            type={'button'}
            variant={'danger'}
            onClick={onDelete}
            disabled={isPending}
          >
            Удалить
          </Button>
        )}

        <Button
          className={'w-full'}
          type={'button'}
          variant={'secondary'}
          onClick={onCancel}
          disabled={isPending}
        >
          Отменить
        </Button>
      </div>
    </form>
  );
};

export { TransactionForm };
export type { TransactionFormDto };
