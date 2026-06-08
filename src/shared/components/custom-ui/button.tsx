import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "cursor-pointer rounded-full flex items-center justify-center hover:opacity-70 transition-all duration-300 ease-in-out",
          className,
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
