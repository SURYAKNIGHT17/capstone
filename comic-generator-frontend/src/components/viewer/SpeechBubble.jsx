import { clsx } from 'clsx';

export default function SpeechBubble({ text }) {
    if (!text) return null;

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[85%] z-20">
            <div className={clsx(
                "bg-white border-2 border-black rounded-[12px] px-4 py-3 shadow-sm",
                "text-center font-heading text-sm md:text-base leading-snug",
                "speech-bubble relative" // Relies on speech-bubble CSS class in index.css
            )}>
                {text}
            </div>
        </div>
    );
}
