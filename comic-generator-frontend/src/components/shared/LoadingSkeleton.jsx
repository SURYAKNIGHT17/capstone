import { clsx } from 'clsx';

export default function LoadingSkeleton({
    variant = 'text',
    width,
    height,
    className,
    count = 1
}) {
    const baseStyles = "bg-gray-200 animate-pulse rounded";

    const renderSkeleton = (index) => {
        let styles = "";

        switch (variant) {
            case 'text':
                styles = "h-4 w-full mb-2";
                break;
            case 'rect':
                styles = "h-32 w-full";
                break;
            case 'circle':
                styles = "h-12 w-12 rounded-full";
                break;
            case 'card':
                return (
                    <div key={index} className={clsx("bg-white rounded-lg shadow-md overflow-hidden", className)}>
                        <div className="h-48 bg-gray-200 animate-pulse" />
                        <div className="p-4 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                        </div>
                    </div>
                );
            default:
                styles = "h-4 w-full";
        }

        return (
            <div
                key={index}
                className={clsx(baseStyles, styles, className)}
                style={{ width, height }}
            />
        );
    };

    return (
        <>
            {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
        </>
    );
}
