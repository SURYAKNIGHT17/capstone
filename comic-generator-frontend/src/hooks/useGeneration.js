import { useState, useEffect } from 'react';
import { comicAPI } from '../services/api';

export const useGeneration = (comicId) => {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!comicId) return;

        // Initial check
        const checkStatus = async () => {
            try {
                const data = await comicAPI.getStatus(comicId);
                setStatus(data);
                return data;
            } catch (err) {
                setError(err);
                return null;
            }
        };

        checkStatus();

        const pollStatus = setInterval(async () => {
            try {
                const data = await comicAPI.getStatus(comicId);
                setStatus(data);

                if (data.status === 'completed' || data.status === 'failed') {
                    clearInterval(pollStatus);
                }
            } catch (err) {
                setError(err);
                clearInterval(pollStatus);
            }
        }, 2000);

        return () => clearInterval(pollStatus);
    }, [comicId]);

    return { status, error };
};
