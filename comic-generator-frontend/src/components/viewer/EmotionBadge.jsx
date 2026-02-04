import { clsx } from 'clsx';
import { EMOTION_COLORS, EMOTION_ICONS } from '../../utils/constants';

export default function EmotionBadge({ emotion }) {
    if (!emotion) return null;

    const emotionLower = emotion.toLowerCase();
    const colorClass = EMOTION_COLORS[emotionLower] || 'bg-gray-500';
    const icon = EMOTION_ICONS[emotionLower] || '😐';

    return (
        <div className={clsx(
            "absolute top-2 right-2 z-10",
            "flex items-center gap-1.5 px-2.5 py-1",
            "rounded-full text-xs font-bold text-white shadow-sm",
            "backdrop-blur-sm bg-opacity-90",
            colorClass
        )}>
            <span className="text-sm">{icon}</span>
            <span className="capitalize">{emotion}</span>
        </div>
    );
}
