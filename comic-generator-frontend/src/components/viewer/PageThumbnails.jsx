import { useRef, useEffect } from 'react';

export default function PageThumbnails({ currentPage, totalPages, onPageSelect }) {
    const scrollRef = useRef(null);

    // Auto-scroll to active thumbnail
    useEffect(() => {
        if (scrollRef.current) {
            // Logic would be to calculate offset and scroll
            // Simple implementation:
            const el = scrollRef.current;
            const activeEl = el.children[currentPage - 1];
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }
    }, [currentPage]);

    return (
        <div className="w-full bg-gray-900 py-4 overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
            <div
                ref={scrollRef}
                className="flex justify-center gap-3 px-4 min-w-max mx-auto"
            >
                {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === currentPage;

                    return (
                        <button
                            key={pageNum}
                            onClick={() => onPageSelect(pageNum)}
                            className={`relative w-16 h-24 flex-shrink-0 bg-white rounded border-2 transition-all overflow-hidden ${isActive
                                    ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2 ring-offset-gray-900 scale-105 z-10'
                                    : 'border-gray-700 opacity-60 hover:opacity-100'
                                }`}
                        >
                            {/* Thumbnail placeholder - in real app would be mini image */}
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-400">
                                Page {pageNum}
                            </div>

                            {isActive && (
                                <div className="absolute inset-0 border-2 border-indigo-500 rounded-sm" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
