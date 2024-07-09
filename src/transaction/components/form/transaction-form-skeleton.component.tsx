import type { FC } from 'react';
import { clsx } from 'clsx';

const InputSkeleton: FC<{ className?: string }> = ({ className }) => (
  <div className={clsx(className, 'flex flex-col gap-1')}>
    <div className="bg-skeleton rounded w-16 h-5"></div>
    <div className="bg-skeleton rounded h-10"></div>
  </div>
);

const ButtonSkeleton: FC<{ className?: string }> = ({ className }) => (
  <div className={clsx(className, 'bg-skeleton rounded h-10')} />
);

const ButtonRoundedSkeleton: FC<{ className?: string }> = ({ className }) => (
  <div className={clsx(className, 'bg-skeleton rounded-full h-10 w-10')} />
);

type TransactionFormSkeletonProps = {};

const TransactionFormSkeleton: FC<TransactionFormSkeletonProps> = ({}) => (
  <div className="w-full animate-pulse flex flex-col items-center gap-3">
    <InputSkeleton className={'w-full'} />
    <InputSkeleton className={'w-full'} />
    <div className={'w-full flex flex-row gap-3 items-end justify-between'}>
      <InputSkeleton className={'w-full basis-full'} />
      <div className={'flex flex-row gap-3 items-center justify-end'}>
        <ButtonRoundedSkeleton />
        <ButtonRoundedSkeleton />
      </div>
    </div>
    <InputSkeleton className={'w-full'} />
    <ButtonSkeleton className={'w-full'} />
    <div className={'w-full flex justify-between gap-3'}>
      <ButtonSkeleton className={'w-full'} />
      <ButtonSkeleton className={'w-full'} />
    </div>
  </div>
);

export { TransactionFormSkeleton };
