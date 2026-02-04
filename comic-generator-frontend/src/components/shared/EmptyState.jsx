import { FileClock } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
    icon: Icon = FileClock,
    title,
    description,
    actionLabel,
    onAction
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-10 h-10 text-gray-400" />
            </div>

            <h3 className="text-xl font-heading text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-md mb-8">{description}</p>

            {actionLabel && onAction && (
                <Button onClick={onAction} variant="primary">
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
