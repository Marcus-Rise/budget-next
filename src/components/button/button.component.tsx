import type { ButtonHTMLAttributes, FC } from 'react';
import { clsx } from 'clsx';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  rounded?: boolean;
  flat?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  rounded,
  className,
  flat,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'text-white fill-white stroke-white hover:opacity-90 active:opacity-75 disabled:opacity-50',
        {
          'bg-primary': variant === 'primary',
          'bg-secondary': variant === 'secondary',
          'bg-danger': variant === 'danger',
          'bg-success': variant === 'success',
          'rounded-md': !rounded && !flat,
          'py-2': !rounded,
          'px-2': !rounded,
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
