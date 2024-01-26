import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { lastDayOfMonth } from 'date-fns/lastDayOfMonth';
import { isValid } from 'date-fns/isValid';

const searchParamDateFormat = 'yyyy-MM-dd';
const dateToSearchParam = (date: Date): string => format(date, searchParamDateFormat);
const searchParamToDate = (date: string): Date => parse(date, searchParamDateFormat, new Date());

const getDateMonthInterval = (date: Date): { start: Date; end: Date } => {
  const firstDateFormat = 'yyyy-MM-01';
  const firstDateOfMonth = parse(format(date, firstDateFormat), firstDateFormat, new Date());
  const lastDateOfMonth = lastDayOfMonth(date);

  return {
    start: firstDateOfMonth,
    end: lastDateOfMonth,
  };
};

const getDatePeriod = (dateStart: unknown, dateEnd: unknown): [start: Date, end: Date] => {
  const today = new Date();
  const todayMonthInterval = getDateMonthInterval(today);

  try {
    if (typeof dateStart !== 'string' || typeof dateEnd !== 'string') {
      return [todayMonthInterval.start, todayMonthInterval.end];
    }

    const start = searchParamToDate(dateStart);
    const end = searchParamToDate(dateEnd);

    if (!isValid(start) || !isValid(end)) {
      return [todayMonthInterval.start, todayMonthInterval.end];
    }

    return [start, end];
  } catch {
    return [todayMonthInterval.start, todayMonthInterval.end];
  }
};

export { dateToSearchParam, searchParamToDate, getDateMonthInterval, getDatePeriod };
