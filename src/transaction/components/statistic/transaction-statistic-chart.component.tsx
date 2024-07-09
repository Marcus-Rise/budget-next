import type { FC } from 'react';
import { clsx } from 'clsx';
import { Price } from '@/components/price';

type Value = number;
type TransactionStatisticChartProps = {
  className?: string;
  map: Map<string, Value>;
  total: Value;
};

const TransactionStatisticChart: FC<TransactionStatisticChartProps> = ({
  className,
  map,
  total,
}) => {
  const items = Array.from(map.entries())
    .sort(([, a], [, b]) => {
      return a - b;
    })
    .map(([label, value]) => {
      const percent = parseInt(`${(value / total) * 100}`);

      return (
        <div
          key={label}
          className={
            'w-full flex flex-row gap-1 items-center content-center justify-between rounded-md outline-2 hover:outline'
          }
        >
          <span className={'capitalize px-2 py-1'}>
            {label}: <Price amount={value} />
          </span>
          <span
            className={clsx('bg-secondary inline-block min-w-fit max-w-full px-2 py-1')}
            style={{
              width: `${percent}%`,
            }}
          >
            {percent} %
          </span>
        </div>
      );
    });

  return <div className={clsx(className, 'flex flex-col gap-3')}>{items}</div>;
};

export { TransactionStatisticChart };
