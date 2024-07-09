import type { FC } from 'react';
import { TransactionStatisticSkeleton } from '@/transaction/components/statistic';
import { TransactionListSkeleton } from '@/transaction/components/list';
import { clsx } from 'clsx';

const ButtonRoundedSkeleton: FC<{ className?: string }> = ({ className }) => (
  <div className={clsx(className, 'bg-skeleton rounded-full h-10 w-10')} />
);

const TransactionFilterSkeleton: FC = () => (
  <div className="animate-pulse flex flex-row items-center gap-3">
    <div className="bg-skeleton h-12 w-10"></div>
    <div className="bg-skeleton rounded w-36 h-12"></div>
  </div>
);

type LoadingProps = {};

const Loading: FC<LoadingProps> = ({}) => (
  <div className={'flex flex-col gap-3'}>
    <div className={'sticky top-[3.25rem] bg-background shadow'}>
      <div className={'px-3 py-2 container mx-auto flex flex-row justify-between gap-3'}>
        <TransactionFilterSkeleton />
        <div className={'flex flex-row gap-3 items-center'}>
          <ButtonRoundedSkeleton />
          <ButtonRoundedSkeleton />
        </div>
      </div>
    </div>
    <div className={'px-3 container mx-auto flex flex-col gap-3'}>
      <TransactionStatisticSkeleton />
      <div className="animate-pulse">
        <div className="bg-skeleton rounded w-20 h-7"></div>
      </div>
      <TransactionListSkeleton />
    </div>
  </div>
);

export default Loading;
