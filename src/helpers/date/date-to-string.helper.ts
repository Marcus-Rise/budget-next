import { format } from 'date-fns/format';
import { subDays } from 'date-fns/subDays';
import { ru } from 'date-fns/locale';

const DATE_COMPARE_FORMAT = 'yyyy-MM-dd';

const dateToStringHelper = (date: Date): string => {
  const key = format(date, DATE_COMPARE_FORMAT);
  const today = new Date(Date.now());
  const todayKey = format(today, DATE_COMPARE_FORMAT);
  const yesterdayKey = format(subDays(today, 1), DATE_COMPARE_FORMAT);

  switch (key) {
    case todayKey: {
      return 'Сегодня';
    }
    case yesterdayKey: {
      return 'Вчера';
    }
    default: {
      return format(date, 'dd MMMM', { locale: ru });
    }
  }
};

export { dateToStringHelper };
