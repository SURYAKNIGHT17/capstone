import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({
    size = 'md',
    color = 'indigo',
    text,
    centered = true
}) {
    const sizes = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    const colors = {
        indigo: 'text-indigo-600',
        white: 'text-white',
        gray: 'text-gray-500',
    };

    return (
        <div className={clsx("flex flex-col items-center", centered && "justify-center w-full h-full py-12")}>
            <Loader2 className={clsx("animate-spin", sizes[size], colors[color])} />
            {text && (
                <p className="mt-3 text-gray-600 font-medium animate-pulse">{text}</p>
            )}
        </div>
    );
}
