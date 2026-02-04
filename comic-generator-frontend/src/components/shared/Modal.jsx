import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    maxWidth = 'max-w-xl'
}) {
    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className={`relative w-full ${maxWidth} bg-white rounded-xl shadow-2xl overflow-hidden z-10`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h3 className="text-xl font-heading text-gray-900">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
