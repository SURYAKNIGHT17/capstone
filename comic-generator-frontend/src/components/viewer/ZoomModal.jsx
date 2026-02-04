import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function ZoomModal({ panel, onClose }) {
    // Lock body scroll
    useEffect(() => {
        if (panel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [panel]);

    // Handle ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!panel) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-black rounded-xl overflow-hidden shadow-2xl z-10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Side */}
                    <div className="flex-1 relative bg-gray-900 flex items-center justify-center overflow-hidden">
                        <img
                            src={panel.image_url}
                            alt="Zoomed Panel"
                            className="max-w-full max-h-[60vh] md:max-h-[90vh] object-contain"
                        />
                    </div>

                    {/* Details Side (visible on desktop or below on mobile if we wanted, but design says overlay dialogue) 
              Actually specs say "Dialogue shown larger and clearer".
              Let's put dialogue in a sidebar or bottom bar.
          */}
                    <div className="w-full md:w-80 bg-gray-900 border-l border-gray-800 p-6 flex flex-col justify-center text-white">
                        {/* Info */}
                        <div className="mb-6">
                            <span className="inline-block px-2 py-1 bg-indigo-600 rounded text-xs font-bold mb-2 uppercase tracking-wide">
                                Panel {panel.panel_number}
                            </span>
                            <div className="text-gray-400 text-sm italic">
                                {panel.emotion && <span className="mr-3 capitalize">Mood: {panel.emotion}</span>}
                                {panel.camera_angle && <span className="capitalize">Shot: {panel.camera_angle}</span>}
                            </div>
                        </div>

                        {/* Dialogue */}
                        <div className="bg-white text-black p-6 rounded-xl relative">
                            {/* Speech Bubble Tail approximation to look like comic script */}
                            <h4 className="text-gray-500 text-xs font-bold uppercase mb-2">Dialogue</h4>
                            <p className="font-heading text-lg md:text-xl leading-relaxed">
                                {panel.dialogue || <span className="text-gray-400 italic">(No dialogue)</span>}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
