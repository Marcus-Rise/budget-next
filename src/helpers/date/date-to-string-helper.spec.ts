import { dateToStringHelper } from './date-to-string.helper';

describe('dateToStringHelper', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => {
      return Date.UTC(2022, 3, 12);
    });
  });

  it('should return str for today', () => {
    expect(dateToStringHelper(new Date(2022, 3, 12))).toEqual('Сегодня');
  });

  it('should return str for yesterday', () => {
    expect(dateToStringHelper(new Date(2022, 3, 11))).toEqual('Вчера');
  });

  it('should return str for past days', () => {
    expect(dateToStringHelper(new Date(2022, 3, 10))).toEqual('10 апреля');
  });
});
