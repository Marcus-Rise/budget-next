import {
  LIST_DATED_SORT_KEY,
  listDatedSortHelper,
  listDatedSortKeyToDateHelper,
} from './list-dated-sort.helper';
import format from 'date-fns/format';

describe('listDatedSortHelper', () => {
  it('should return grouped object', () => {
    const list = [
      {
        title: 'Item3',
        date: new Date(2022, 1, 11, 22, 22),
      },
      {
        title: 'Item2',
        date: new Date(2022, 1, 12, 21, 22),
      },
      {
        title: 'Item',
        date: new Date(2022, 1, 12, 22, 22),
      },
      {
        title: 'Item4',
        date: new Date(2022, 1, 12, 19, 22),
      },
      {
        title: 'Item5',
        date: new Date(2022, 1, 11, 19, 22),
      },
    ];

    const dateGroups = listDatedSortHelper(list);

    expect(Array.from(dateGroups.keys())).toMatchObject(['2022-02-12', '2022-02-11']);

    const [item3, item2, item, item4, item5] = list;

    expect(dateGroups.get('2022-02-12')).toMatchObject([item, item2, item4]);
    expect(dateGroups.get('2022-02-11')).toMatchObject([item3, item5]);
  });
});

describe('listDatedSortKeyToDateHelper', () => {
  it('should restore date', () => {
    const key = format(new Date(2022, 1, 12), LIST_DATED_SORT_KEY);

    expect(format(listDatedSortKeyToDateHelper(key), LIST_DATED_SORT_KEY)).toEqual('2022-02-12');
  });
});
