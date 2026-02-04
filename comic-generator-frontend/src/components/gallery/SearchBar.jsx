import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchBar({ value, onChange }) {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (internalValue !== value) {
                onChange(internalValue);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [internalValue, onChange, value]);

    return (
        <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white placeholder-gray-400"
                placeholder="Search by title..."
                value={internalValue}
                onChange={(e) => setInternalValue(e.target.value)}
            />
            {internalValue && (
                <button
                    onClick={() => setInternalValue('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
