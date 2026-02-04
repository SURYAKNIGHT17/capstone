import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const comicAPI = {
    // Generate new comic
    generateComic: (data) => api.post('/generate', data),

    // Get generation status
    getStatus: (comicId) => api.get(`/status/${comicId}`),

    // Get comic by ID
    getComic: (comicId) => api.get(`/comic/${comicId}`),

    // Get all comics
    getComics: (params) => api.get('/comics', { params }),

    // Delete comic
    deleteComic: (comicId) => api.delete(`/comic/${comicId}`),

    // Cancel generation
    cancelGeneration: (comicId) => api.post(`/cancel/${comicId}`),
};

export default api;
