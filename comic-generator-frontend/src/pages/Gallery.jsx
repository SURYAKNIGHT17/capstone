import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { comicAPI } from '../services/api';
import toast from 'react-hot-toast';

import SearchBar from '../components/gallery/SearchBar';
import SortControls from '../components/gallery/SortControls';
import ComicsGrid from '../components/gallery/ComicsGrid';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';

export default function Gallery() {
    const navigate = useNavigate();
    const [comics, setComics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const [deleteId, setDeleteId] = useState(null);

    // Fetch comics
    useEffect(() => {
        const fetchComics = async () => {
            setIsLoading(true);
            try {
                // In a real app we'd pass query params
                const response = await comicAPI.getComics({ search, sort });
                setComics(response.comics || []);
            } catch (err) {
                console.error(err);
                // Fallback or empty if API fails
                setComics([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComics();
    }, [search, sort]);

    // Handle Delete
    const handleDeleteConfirm = async () => {
        if (!deleteId) return;

        try {
            await comicAPI.deleteComic(deleteId);
            setComics(prev => prev.filter(c => c.id !== deleteId));
            toast.success("Comic deleted successfully");
        } catch (err) {
            toast.error("Failed to delete comic");
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Gallery Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-heading text-gray-900">Your Collection</h1>
                        <p className="text-gray-500">Manage and browse your generated comics</p>
                    </div>
                    <Button
                        onClick={() => navigate('/create')}
                        icon={PlusCircle}
                        className="shrink-0"
                    >
                        Create New
                    </Button>
                </div>

                {/* Controls */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <SearchBar value={search} onChange={setSearch} />
                    <SortControls value={sort} onChange={setSort} />
                </div>

                {/* Grid */}
                <ComicsGrid
                    comics={comics}
                    isLoading={isLoading}
                    onDelete={(comic) => setDeleteId(comic.id)}
                />
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                title="Delete Comic?"
                maxWidth="max-w-md"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                    </>
                }
            >
                <p className="text-gray-600">
                    Are you sure you want to delete this comic? This action cannot be undone.
                </p>
            </Modal>
        </div>
    );
}
