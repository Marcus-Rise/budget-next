'use client';

import type { FC } from 'react';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { format } from 'date-fns/format';
import { Input } from '@/components/input.component';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TransactionSaveDto } from '@/transaction/transaction.dto';
import { TransactionSaveDtoSchema } from '@/transaction/transaction.dto';
import { Button } from '@/components/button';
import { IconMinus, IconPlus } from '@/assets';
import { clsx } from 'clsx';

type TransactionFormDto = Omit<TransactionSaveDto, 'uuid'>;

type TransactionFormProps = Partial<TransactionFormDto> & {
  onSubmit: SubmitHandler<TransactionFormDto>;
  isPending?: boolean;
  onCancel: () => void;
  onDelete: () => void;
  deletable?: boolean;
  className?: string;
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
  className,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<TransactionFormDto>({
    resolver: zodResolver(TransactionSaveDtoSchema),
    defaultValues: {
      amount: amount ?? ('' as unknown as typeof NaN),
      category: category ?? '',
      date: date ?? new Date(),
      title: title ?? '',
    },
  });

  const amountCurrentValue = useWatch({ control, name: 'amount' });

  const toggleAmountSign = () => {
    setValue('amount', amountCurrentValue * -1);
  };

  useEffect(() => {
    reset({ amount, category, date, title });
  }, [amount, category, date, reset, title]);

  return (
    <form className={clsx(className, 'flex flex-col gap-3')} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name={'title'}
        disabled={isPending}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type="text"
            label={'Название'}
            error={fieldState.error?.message}
            autoFocus={!title}
          />
        )}
      />
      <Controller
        control={control}
        name={'category'}
        disabled={isPending}
        render={({ field, fieldState }) => (
          <Input {...field} type="text" label={'Категория'} error={fieldState.error?.message} />
        )}
      />
      <div className={'flex flex-row gap-3 items-end justify-between'}>
        <Controller
          control={control}
          name={'amount'}
          disabled={isPending}
          render={({ field: { onChange, ...field }, fieldState }) => (
            <Input
              {...field}
              type="number"
              label={'Сумма'}
              className={'basis-full'}
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
        <div className={' flex flex-row gap-3 items-center justify-end'}>
          <Button
            type={'button'}
            variant={'secondary'}
            disabled={isPending || amountCurrentValue > 0}
            onClick={toggleAmountSign}
            rounded
          >
            <IconPlus />
          </Button>
          <Button
            type={'button'}
            variant={'secondary'}
            rounded
            disabled={isPending || amountCurrentValue < 0}
            onClick={toggleAmountSign}
          >
            <IconMinus />
          </Button>
        </div>
      </div>

      <Controller
        control={control}
        name={'date'}
        disabled={isPending}
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
