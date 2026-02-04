import { useEffect } from 'react';

export const useKeyboardNav = (handlers) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (handlers[e.key]) {
                // Only prevent default if it's not an input field or textarea
                if (
                    document.activeElement.tagName !== 'INPUT' &&
                    document.activeElement.tagName !== 'TEXTAREA'
                ) {
                    e.preventDefault();
                    handlers[e.key]();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handlers]);
};
