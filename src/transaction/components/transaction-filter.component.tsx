import type { FC } from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
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

const TransactionFilter: FC<TransactionFilterProps> = ({ className, dateStart, dateEnd }) => {
  if (!dateStart || !dateEnd) {
    const today = new Date();

    const { start, end } = getMonthInterval(today);
    const searchParams = new URLSearchParams({
      dateStart: dateToSearchParam(start),
      dateEnd: dateToSearchParam(end),
    });

    redirect('/?' + searchParams);
  }

  const date = parse(dateStart, 'yyyy-MM-dd', new Date());
  const month = format(date, 'LLLL', {
    locale,
  });

  const previousMonthInterval = getMonthInterval(subMonths(date, 1));
  const nextMonthInterval = getMonthInterval(addMonths(date, 1));

  const previousMonthSearchParams = new URLSearchParams({
    dateStart: dateToSearchParam(previousMonthInterval.start),
    dateEnd: dateToSearchParam(previousMonthInterval.end),
  });
  const nextMonthIntervalSearchParams = new URLSearchParams({
    dateStart: dateToSearchParam(nextMonthInterval.start),
    dateEnd: dateToSearchParam(nextMonthInterval.end),
  });

  const iconSize = '2rem';

  return (
    <div className={classNames(className, 'flex gap-3 items-center')}>
      <Link href={'/?' + previousMonthSearchParams} prefetch={false}>
        <IconChevronLeft width={iconSize} height={iconSize} />
      </Link>
      <span className={'capitalize'}>{month}</span>
      <Link href={'/?' + nextMonthIntervalSearchParams} prefetch={false}>
        <IconChevronRight width={iconSize} height={iconSize} />
      </Link>
    </div>
  );
};

export { TransactionFilter };
