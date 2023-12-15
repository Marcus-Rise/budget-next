import type { FC } from 'react';
import classNames from 'classnames';

type PriceProps = {
  className?: string;
  amount: number;
};
const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  signDisplay: 'always',
});

const Price: FC<PriceProps> = ({ amount, className }) => {
  const priceAsString = formatter.format(amount).replace('+', '+\u00A0').replace('-', '-\u00A0');

  return (
    <span className={classNames({ 'text-success': amount > 0 }, className)}>{priceAsString}</span>
  );
};

export { Price };
