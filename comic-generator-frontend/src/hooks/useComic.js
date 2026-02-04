import { useContext } from 'react';
import { ComicContext } from '../context/ComicContext';

export const useComic = () => {
    const context = useContext(ComicContext);
    if (!context) {
        throw new Error('useComic must be used within ComicProvider');
    }
    return context;
};
