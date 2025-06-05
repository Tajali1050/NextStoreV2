import { Button } from "@heroui/react";
import clsx from "clsx";
import React from "react";

export interface MovingBorderButtonProps
  extends React.ComponentProps<typeof Button> {}

export function MovingBorderButton({
  className,
  children,
  ...props
}: MovingBorderButtonProps) {
  return (
    <div className="relative inline-block overflow-hidden rounded-full p-px">
      <div className="absolute inset-0 animate-border rounded-full bg-gradient-to-r from-success via-pink-500 to-yellow-500" />
      <Button
        {...props}
        className={clsx("relative z-10 rounded-full", className)}
      >
        {children}
      </Button>
    </div>
  );
}
