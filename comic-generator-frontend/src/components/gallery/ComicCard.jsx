import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Trash2 } from 'lucide-react';
import { formatRelativeTime } from '../../utils/helpers';
import Button from '../shared/Button';

export default function ComicCard({ comic, onDelete }) {
    const navigate = useNavigate();

    return (
        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 flex flex-col h-full">
            {/* Cover Image */}
            <div
                className="relative aspect-video bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/comic/${comic.id}`)}
            >
                {comic.cover_image ? (
                    <img
                        src={comic.cover_image}
                        alt={comic.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-300">
                        <BookOpen className="w-12 h-12" />
                    </div>
                )}

                {/* Style Badge */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded capitalize">
                    {comic.style || 'Comic'}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3
                    className="font-heading text-xl text-gray-900 mb-2 line-clamp-1 cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => navigate(`/comic/${comic.id}`)}
                >
                    {comic.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{comic.page_count || comic.pages?.length || 0} pages</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatRelativeTime(comic.created_at)}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-gray-50 transition-opacity">
                    <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(`/comic/${comic.id}`)}
                    >
                        View
                    </Button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(comic);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Comic"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
