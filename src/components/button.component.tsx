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
      className={classNames(
        className,
        'text-white fill-white stroke-white hover:opacity-75 disabled:opacity-50',
        {
          'bg-primary': variant === 'primary',
          'bg-secondary': variant === 'secondary',
          'bg-danger': variant === 'danger',
          'rounded-md': !rounded,
          'py-2': !rounded,
          'p-3 rounded-full leading-4 flex justify-center content-center items-center justify-items-center':
            rounded,
        },
      )}
    >
      {children}
    </button>
  );
};

export { Button };
