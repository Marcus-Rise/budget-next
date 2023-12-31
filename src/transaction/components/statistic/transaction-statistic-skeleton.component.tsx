import type { FC } from 'react';

type TransactionStatisticSkeletonProps = {};

const TransactionStatisticSkeleton: FC<TransactionStatisticSkeletonProps> = ({}) => {
  return (
    <div className="animate-pulse flex flex-row items-center gap-3">
      <div className="bg-skeleton h-5 w-3"></div>
      <div className="bg-skeleton rounded w-20 h-5"></div>
    </div>
  );
};

export { TransactionStatisticSkeleton };
