'use client';

import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> & {
  hint?: string;
  error?: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, name, id = name, ...props }, ref) => {
    const noValue = props.value === undefined || props.value === '';

    return (
      <div className={'flex flex-col gap-1'}>
        {!!label && !noValue && (
          <label className={'px-3 text-sm text-secondary'} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          {...props}
          placeholder={noValue ? label : undefined}
          className={
            'py-2 px-3 outline-2 rounded-md bg-transparent hover:outline hover:outline-secondary focus:outline focus:outline-primary'
          }
          ref={ref}
          id={id}
          name={name}
        />
        {!!(error || hint) && (
          <small
            className={classNames('px-3', {
              'text-danger': !!error,
            })}
          >
            {error || hint}
          </small>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
