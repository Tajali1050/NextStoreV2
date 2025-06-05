'use client';

import clsx from 'clsx';
import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface MovingBorderButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MovingBorderButton = forwardRef<
  HTMLButtonElement,
  MovingBorderButtonProps
>(function MovingBorderButton({ className, children, ...props }, ref) {
  return (
    <button
      ref={ref}
      {...props}
      className={clsx('relative overflow-hidden rounded-full p-px', className)}
    >
      <span className='absolute inset-0 -z-10 animate-spin-slow rounded-full bg-gradient-to-r from-pink-500 via-yellow-500 to-pink-500' />
      <span className='relative block rounded-full bg-black px-4 py-1 text-white'>
        {children}
      </span>
    </button>
  );
});

export { MovingBorderButton };
