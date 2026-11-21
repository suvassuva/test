import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "goldOutline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-champagne/40 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider";

    const sizeStyles = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base tracking-widest",
    };

    const variantStyles = {
      primary: "gold-gradient-btn text-maroon-darkest font-semibold shadow-gold-glow",
      secondary:
        "bg-maroon-deep/80 hover:bg-maroon-velvet text-gold-champagne border border-gold-metallic/40 hover:border-gold-champagne shadow-lg",
      goldOutline:
        "border border-gold-metallic/50 text-gold-champagne hover:bg-gold-metallic/10 hover:border-gold-champagne",
      ghost:
        "text-luxury-muted hover:text-gold-champagne hover:bg-white/5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : icon ? (
          <span className="mr-2">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

