import type { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  rounded?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  rounded,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(className, 'text-white py-2 hover:opacity-75 disabled:opacity-50', {
        'bg-primary': variant === 'primary',
        'bg-secondary': variant === 'secondary',
        'bg-danger': variant === 'danger',
        'rounded-md': !rounded,
        'p-3 rounded-full flex justify-center content-center leading-4': rounded,
      })}
    >
      {children}
    </button>
  );
};

export { Button };
