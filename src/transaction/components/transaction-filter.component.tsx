import type { FC } from 'react';
import { clsx } from 'clsx';
import { format } from 'date-fns/format';
import { isWithinInterval } from 'date-fns/isWithinInterval';
import { subMonths } from 'date-fns/subMonths';
import { addMonths } from 'date-fns/addMonths';
import { ru as locale } from 'date-fns/locale/ru';
import { IconChevronLeft, IconChevronRight } from '@/assets';
import Link from 'next/link';
import { dateToSearchParam, getDateMonthInterval } from '@/utils/date.helper';

type TransactionFilterProps = {
  className?: string;
  date: Date;
};

const getDateSearchParams = (date: Date): URLSearchParams => {
  const period = getDateMonthInterval(date);

  return new URLSearchParams({
    dateStart: dateToSearchParam(period.start),
    dateEnd: dateToSearchParam(period.end),
  });
};

const TransactionFilter: FC<TransactionFilterProps> = ({ className, date }) => {
  const today = new Date();
  const todayPeriod = getDateMonthInterval(today);
  const todaySearchParams = new URLSearchParams({
    dateStart: dateToSearchParam(todayPeriod.start),
    dateEnd: dateToSearchParam(todayPeriod.end),
  });

  const isInCurrentPeriod = isWithinInterval(date, todayPeriod);
  const dateMonth = format(date, 'LLLL', {
    locale,
  });
  const dateYear = format(date, 'yyyy');

  const previousMonthSearchParams = getDateSearchParams(subMonths(date, 1));
  const nextMonthIntervalSearchParams = getDateSearchParams(addMonths(date, 1));

  const iconSize = '2rem';

  return (
    <div className={clsx(className, 'flex flex-row gap-3 items-center')}>
      <Link
        href={isInCurrentPeriod ? '#' : `/?${todaySearchParams}`}
        className={clsx({
          'cursor-not-allowed': isInCurrentPeriod,
          'text-secondary': isInCurrentPeriod,
        })}
      >
        Сегодня
      </Link>
      <div className={'flex gap-3 items-center'}>
        <Link href={'/?' + previousMonthSearchParams}>
          <IconChevronLeft width={iconSize} height={iconSize} />
        </Link>
        <div className={'flex flex-col md:flex-row content-center gap-1'}>
          <span className={'capitalize text-center'}>{dateMonth}</span>
          <span className={'capitalize text-center'}>{dateYear}</span>
        </div>
        <Link href={'/?' + nextMonthIntervalSearchParams}>
          <IconChevronRight width={iconSize} height={iconSize} />
        </Link>
      </div>
    </div>
  );
};

export { TransactionFilter };
