import { useState } from 'react';
import { clsx } from 'clsx';
import EmotionBadge from './EmotionBadge';
import SpeechBubble from './SpeechBubble';

export default function Panel({ panel, onClick }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            className="relative w-full h-full comic-panel cursor-zoom-in overflow-hidden bg-gray-100 group"
            onClick={() => onClick(panel)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image */}
            <img
                src={panel.image_url}
                alt={`Panel ${panel.panel_number}`}
                className={clsx(
                    "w-full h-full object-cover transition-transform duration-700",
                    !imageLoaded && "opacity-0",
                    imageLoaded && "opacity-100",
                    isHovered && "scale-105"
                )}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
            />

            {/* Loading State */}
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
                </div>
            )}

            {/* Overlays */}
            <EmotionBadge emotion={panel.emotion} />
            <SpeechBubble text={panel.dialogue} />

            {/* Camera Angle Label (Subtle) */}
            {panel.camera_angle && (
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/50 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {panel.camera_angle}
                </div>
            )}
        </div>
    );
}
