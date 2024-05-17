import React from 'react';
import clsx from 'clsx';

export function Button(props: JSX.IntrinsicElements['button'] & {variant: 'primary' | 'outline' }) {

  const { children, variant, className } = props

  const baseClasses = 'px-4 py-2 rounded font-medium focus:outline-none';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  };

  return (
    <button className={clsx(baseClasses, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
