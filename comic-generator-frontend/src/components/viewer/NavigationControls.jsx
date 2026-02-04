import Button from '../shared/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NavigationControls({
    currentPage,
    totalPages,
    onPrev,
    onNext
}) {
    return (
        <div className="flex items-center justify-between w-full max-w-xl mx-auto py-6 px-4">
            <Button
                variant="secondary"
                onClick={onPrev}
                disabled={currentPage <= 1}
                className="flex items-center"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Previous
            </Button>

            <span className="text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="primary"
                onClick={onNext}
                disabled={currentPage >= totalPages}
                className="flex items-center"
            >
                Next <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
        </div>
    );
}
