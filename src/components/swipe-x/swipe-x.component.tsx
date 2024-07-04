import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from '@/components/swipe-x/swipe-x.module.scss';

type SwipeXProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{ left?: ReactNode; right?: ReactNode }>;

const SwipeX = forwardRef<HTMLDivElement, SwipeXProps>(
  ({ className, children, left, right, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, styles.item, 'flex snap-x overflow-x-auto cursor-grab')}
      >
        {!!left && <div className={'flex-[1_0_auto]'}>{left}</div>}
        <div className={'flex-[2_0_100%]'}>{children}</div>
        {!!right && <div className={'flex-[1_0_auto]'}>{right}</div>}
      </div>
    );
  },
);

SwipeX.displayName = 'SwipeX';

export { SwipeX };
