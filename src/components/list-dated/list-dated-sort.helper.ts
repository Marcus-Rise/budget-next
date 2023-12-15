import format from 'date-fns/format';
import { compareDesc } from 'date-fns';
import parse from 'date-fns/parse';

const LIST_DATED_SORT_KEY = 'yyyy-MM-dd';

const listDatedSortHelper = <Object extends { date: Date }>(
  list: Array<Object>,
): Map<string, Object[]> => {
  const map = new Map<string, Object[]>();

  const dates = list.map((i) => i.date);
  dates.sort(compareDesc);

  dates.forEach((date) => {
    const key = format(date, LIST_DATED_SORT_KEY);
    const items = list.filter((item) => format(item.date, LIST_DATED_SORT_KEY) === key);
    items.sort((a, b) => compareDesc(a.date, b.date));

    map.set(key, items);
  });

  return map;
};

const listDatedSortKeyToDateHelper = (key: string): Date =>
  parse(key, LIST_DATED_SORT_KEY, new Date());

export { listDatedSortHelper, LIST_DATED_SORT_KEY, listDatedSortKeyToDateHelper };
