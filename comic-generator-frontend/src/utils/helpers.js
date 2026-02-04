// Format date to relative time
export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
};

// Format time remaining
export const formatTimeRemaining = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Truncate text
export const truncate = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

// Get panel layout based on count
export const getPanelLayout = (panelCount) => {
    switch (panelCount) {
        case 4: return { cols: 2, rows: 2 };
        case 6: return { cols: 2, rows: 3 };
        case 5: return { cols: 2, rows: 3, asymmetric: true };
        default: return { cols: 2, rows: 3 };
    }
};
