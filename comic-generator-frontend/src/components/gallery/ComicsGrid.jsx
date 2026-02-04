import ComicCard from './ComicCard';
import LoadingSkeleton from '../shared/LoadingSkeleton';
import EmptyState from '../shared/EmptyState';
import { BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ComicsGrid({ comics, isLoading, onDelete }) {
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <LoadingSkeleton variant="card" count={8} />
            </div>
        );
    }

    if (!comics || comics.length === 0) {
        return (
            <EmptyState
                icon={BookOpen}
                title="No Comics Found"
                description="Try adjusting your search or create a new masterpiece."
                actionLabel="Create New Comic"
                onAction={() => navigate('/create')}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {comics.map((comic) => (
                <ComicCard
                    key={comic.id}
                    comic={comic}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}
