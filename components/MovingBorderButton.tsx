import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

export interface MovingBorderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  asChild?: boolean;
}

const MovingBorderButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MovingBorderButtonProps
>(function MovingBorderButton({ className, href, children, asChild, ...props }, ref) {
  const classes = clsx(
    'moving-border bg-black text-white rounded-full px-4 h-8 inline-flex items-center justify-center',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} ref={ref as any} {...(props as any)}>
        {children}
      </Link>
    );
  }

  const Comp: any = asChild ? React.Fragment : 'button';
  return (
    <Comp ref={ref as any} className={classes} {...props}>
      {children}
    </Comp>
  );
});

MovingBorderButton.displayName = 'MovingBorderButton';

export default MovingBorderButton;
