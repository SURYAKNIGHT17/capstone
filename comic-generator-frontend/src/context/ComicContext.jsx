import { createContext, useState, useContext } from 'react';

export const ComicContext = createContext();

export const useComic = () => {
    const context = useContext(ComicContext);
    if (!context) {
        throw new Error('useComic must be used within ComicProvider');
    }
    return context;
};

export const ComicProvider = ({ children }) => {
    const [currentComic, setCurrentComic] = useState(null);
    const [galleryComics, setGalleryComics] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStatus, setGenerationStatus] = useState({ progress: 0, step: '', message: '' });

    const value = {
        currentComic,
        setCurrentComic,
        galleryComics,
        setGalleryComics,
        isGenerating,
        setIsGenerating,
        generationStatus,
        setGenerationStatus,
    };

    return (
        <ComicContext.Provider value={value}>
            {children}
        </ComicContext.Provider>
    );
};
