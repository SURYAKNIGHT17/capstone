import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    icon: Icon,
    className,
    type = 'button',
    fullWidth = false,
}) {
    const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg focus:ring-indigo-500',
        secondary: 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 shadow-sm focus:ring-indigo-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md focus:ring-red-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-indigo-600',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const styles = twMerge(
        clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
        )
    );

    return (
        <button
            type={type}
            className={styles}
            onClick={onClick}
            disabled={disabled}
        >
            {disabled && variant === 'primary' ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : Icon ? (
                <Icon className={clsx("w-5 h-5", children && "mr-2")} />
            ) : null}
            {children}
        </button>
    );
}
