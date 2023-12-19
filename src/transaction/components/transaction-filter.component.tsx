import type { FC } from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import isWithinInterval from 'date-fns/isWithinInterval';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';
import { redirect } from 'next/navigation';
import locale from 'date-fns/locale/ru';
import { IconChevronLeft, IconChevronRight } from '@/assets';
import Link from 'next/link';

type TransactionFilterProps = {
  className?: string;
  dateStart?: string;
  dateEnd?: string;
};

const getMonthInterval = (date: Date): { start: Date; end: Date } => {
  const firstDateOfMonth = parse(format(date, 'yyyy-MM-01'), 'yyyy-MM-01', new Date());
  const lastDateOfMonth = lastDayOfMonth(date);

  return {
    start: firstDateOfMonth,
    end: lastDateOfMonth,
  };
};

const dateToSearchParam = (date: Date): string => format(date, 'yyyy-MM-dd');

const getDateSearchParams = (date: Date): URLSearchParams => {
  const period = getMonthInterval(date);

  return new URLSearchParams({
    dateStart: dateToSearchParam(period.start),
    dateEnd: dateToSearchParam(period.end),
  });
};

const TransactionFilter: FC<TransactionFilterProps> = ({ className, dateStart, dateEnd }) => {
  const today = new Date();
  const todayPeriod = getMonthInterval(today);
  const todaySearchParams = new URLSearchParams({
    dateStart: dateToSearchParam(todayPeriod.start),
    dateEnd: dateToSearchParam(todayPeriod.end),
  });

  if (!dateStart || !dateEnd) {
    return redirect('/?' + todaySearchParams);
  }

  const date = parse(dateStart, 'yyyy-MM-dd', new Date());
  const isInCurrentPeriod = isWithinInterval(date, todayPeriod);
  const dateFilterLabel = format(date, 'LLLL yyyy', {
    locale,
  });

  const previousMonthSearchParams = getDateSearchParams(subMonths(date, 1));
  const nextMonthIntervalSearchParams = getDateSearchParams(addMonths(date, 1));

  const iconSize = '2rem';

  return (
    <div className={classNames(className, 'flex flex-row gap-3 items-center')}>
      <Link
        href={isInCurrentPeriod ? '#' : `/?${todaySearchParams}`}
        prefetch={false}
        className={classNames({
          'cursor-not-allowed': isInCurrentPeriod,
          'text-secondary': isInCurrentPeriod,
        })}
      >
        Сегодня
      </Link>
      <div className={'flex gap-3 items-center'}>
        <Link href={'/?' + previousMonthSearchParams} prefetch={false}>
          <IconChevronLeft width={iconSize} height={iconSize} />
        </Link>
        <span className={'capitalize'}>{dateFilterLabel}</span>
        <Link href={'/?' + nextMonthIntervalSearchParams} prefetch={false}>
          <IconChevronRight width={iconSize} height={iconSize} />
        </Link>
      </div>
    </div>
  );
};

export { TransactionFilter };
