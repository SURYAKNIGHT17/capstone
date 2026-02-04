import { motion, AnimatePresence } from 'framer-motion';
import PanelGrid from './PanelGrid';

export default function PageDisplay({ page, onPanelClick }) {
    if (!page) return null;

    return (
        <div className="flex-1 overflow-hidden relative min-h-[500px] flex items-center justify-center py-6 bg-slate-100">
            <AnimatePresence mode="wait">
                <motion.div
                    key={page.page_number}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <PanelGrid panels={page.panels} onPanelClick={onPanelClick} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
