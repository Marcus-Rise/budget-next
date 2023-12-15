import type { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

const Button: FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        className,
        'text-white py-2 rounded-md hover:opacity-75 disabled:opacity-50',
        {
          'bg-primary': variant === 'primary',
          'bg-secondary': variant === 'secondary',
          'bg-danger': variant === 'danger',
        },
      )}
    >
      {children}
    </button>
  );
};

export { Button };
