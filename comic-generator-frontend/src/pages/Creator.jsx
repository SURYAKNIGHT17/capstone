import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGeneration } from '../hooks/useGeneration';
import { useComic } from '../context/ComicContext';
import { comicAPI } from '../services/api';
import toast from 'react-hot-toast';

import InputForm from '../components/creator/InputForm';
import GenerationProgress from '../components/creator/GenerationProgress';
import Button from '../components/shared/Button';

export default function Creator() {
    const navigate = useNavigate();
    const { currentComic, setCurrentComic, isGenerating, setIsGenerating } = useComic();
    const [generationId, setGenerationId] = useState(null);

    // Use the hook to poll status if we have an ID
    const { status, error } = useGeneration(generationId);

    // Handle status updates
    useEffect(() => {
        if (status) {
            if (status.status === 'completed') {
                setIsGenerating(false);
                setGenerationId(null);
                toast.success("Your comic is ready! 🎉");
                navigate(`/comic/${status.comic_id}`);
            } else if (status.status === 'failed') {
                setIsGenerating(false);
                setGenerationId(null);
                toast.error(`Generation failed: ${status.error || 'Unknown error'}`);
            }
        }

        if (error) {
            // Don't stop immediately on one polling error, but maybe warn
            console.error("Polling error", error);
        }
    }, [status, error, navigate, setIsGenerating, setGenerationId]);

    const handleCreate = async (formData) => {
        try {
            setIsGenerating(true);
            const response = await comicAPI.generateComic(formData);
            setGenerationId(response.comic_id); // Assuming API returns { comic_id, status }
            toast.success("Started generating your comic!");
        } catch (err) {
            setIsGenerating(false);
            toast.error(err.response?.data?.detail || "Failed to start generation");
            console.error(err);
        }
    };

    const handleCancel = async () => {
        if (!generationId) return;

        if (window.confirm("Are you sure you want to cancel? Progress will be lost.")) {
            try {
                await comicAPI.cancelGeneration(generationId);
                setIsGenerating(false);
                setGenerationId(null);
                toast('Generation cancelled', { icon: '🛑' });
            } catch (err) {
                toast.error("Failed to cancel");
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-1" /> Back to Home
                    </Button>
                </div>

                {/* Content */}
                {isGenerating ? (
                    <GenerationProgress status={status} onCancel={handleCancel} />
                ) : (
                    <InputForm onSubmit={handleCreate} isGenerating={isGenerating} />
                )}
            </div>
        </div>
    );
}
