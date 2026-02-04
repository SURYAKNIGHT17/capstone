export const validateTopic = (topic) => {
    if (!topic || topic.trim().length === 0) {
        return 'Topic is required';
    }
    if (topic.trim().length < 10) {
        return 'Topic must be at least 10 characters';
    }
    return null;
};

export const validatePageCount = (count) => {
    if (count < 10 || count > 14) {
        return 'Page count must be between 10 and 14';
    }
    return null;
};
