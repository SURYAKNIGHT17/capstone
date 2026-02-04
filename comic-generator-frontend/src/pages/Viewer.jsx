import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, Download, ArrowLeft } from 'lucide-react';
import { useComic } from '../hooks/useComic';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { comicAPI } from '../services/api';
import toast from 'react-hot-toast';

import Button from '../components/shared/Button';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import PageDisplay from '../components/viewer/PageDisplay';
import NavigationControls from '../components/viewer/NavigationControls';
import PageThumbnails from '../components/viewer/PageThumbnails';
import ZoomModal from '../components/viewer/ZoomModal';

export default function Viewer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentComic, setCurrentComic } = useComic();

    const [loading, setLoading] = useState(true);
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const [zoomedPanel, setZoomedPanel] = useState(null);

    // Fetch comic data
    useEffect(() => {
        const fetchComic = async () => {
            setLoading(true);
            try {
                // Only fetch if not already loaded or different ID
                if (!currentComic || currentComic.id !== id) {
                    const data = await comicAPI.getComic(id);
                    setCurrentComic(data);
                }
            } catch (err) {
                toast.error("Failed to load comic");
                navigate('/404'); // Or handle gracefully
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchComic();
    }, [id, currentComic, setCurrentComic, navigate]);

    // Keyboard navigation
    useKeyboardNav({
        'ArrowLeft': () => handlePrevPage(),
        'ArrowRight': () => handleNextPage(),
        'Escape': () => setZoomedPanel(null),
    });

    const handlePrevPage = () => {
        if (currentPageNum > 1) setCurrentPageNum(p => p - 1);
    };

    const handleNextPage = () => {
        if (currentComic && currentPageNum < currentComic.num_pages) {
            setCurrentPageNum(p => p + 1);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    if (loading) {
        return <LoadingSpinner text="Loading comic..." />;
    }

    if (!currentComic) return null;

    const currentPageData = currentComic.pages?.find(p => p.page_number === currentPageNum) ||
        // Fallback if structure is different
        currentComic.pages?.[currentPageNum - 1];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-[64px] z-30 shadow-sm px-4 py-3 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => navigate('/gallery')}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Gallery
                </Button>

                <h1 className="font-heading text-xl text-gray-900 truncate max-w-md">
                    {currentComic.title}
                </h1>

                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">Share</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">PDF</span>
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <PageDisplay
                page={currentPageData}
                onPanelClick={setZoomedPanel}
            />

            {/* Bottom Controls */}
            <div className="bg-white border-t border-gray-200">
                <NavigationControls
                    currentPage={currentPageNum}
                    totalPages={currentComic.num_pages}
                    onPrev={handlePrevPage}
                    onNext={handleNextPage}
                />

                <PageThumbnails
                    currentPage={currentPageNum}
                    totalPages={currentComic.num_pages}
                    onPageSelect={setCurrentPageNum}
                />
            </div>

            {/* Modals */}
            <ZoomModal
                panel={zoomedPanel}
                onClose={() => setZoomedPanel(null)}
            />
        </div>
    );
}
