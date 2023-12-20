import type { FC } from 'react';
import classNames from 'classnames';

type TransactionListSkeletonProps = {
  className?: string;
};

const Item: FC = () => (
  <div className="flex flex-row justify-between gap-3">
    <div className={'pl-3 flex flex-col gap-2'}>
      <div className="bg-slate-700 rounded w-32 h-5"></div>

      <div className="bg-slate-700 rounded w-20 h-4"></div>
    </div>
    <div className="bg-slate-700 rounded w-20 h-5"></div>
  </div>
);

const TransactionListSkeleton: FC<TransactionListSkeletonProps> = ({ className }) => {
  const items = new Array(5).fill(<Item />);

  return (
    <div className={classNames(className, 'animate-pulse flex flex-col gap-7')}>
      <div className="flex flex-row items-center gap-3">
        <div className="bg-slate-700 h-5 w-3"></div>
        <div className="bg-slate-700 rounded w-20 h-5"></div>
      </div>

      {items}
    </div>
  );
};

export { TransactionListSkeleton };
