export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const ART_STYLES = [
    { value: 'charliebo', label: 'Charlie Bo' },
    { value: 'holliemengert', label: 'Hollie Mengert' },
    { value: 'marioalberti', label: 'Mario Alberti' },
    { value: 'pepelarraz', label: 'Pepe Larraz' },
    { value: 'andreasrocha', label: 'Andreas Rocha' },
    { value: 'jamesdaly', label: 'James Daly' },
];

export const EMOTION_COLORS = {
    happy: 'bg-green-500',
    sad: 'bg-blue-500',
    angry: 'bg-red-500',
    surprised: 'bg-yellow-500',
    neutral: 'bg-gray-500',
    scared: 'bg-purple-500',
};

export const EMOTION_ICONS = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
    neutral: '😐',
    scared: '😨',
};

export const PAGE_LIMITS = {
    min: 10,
    max: 14,
    default: 12,
};
