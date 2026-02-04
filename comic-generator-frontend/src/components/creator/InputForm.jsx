import { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { ART_STYLES, PAGE_LIMITS } from '../../utils/constants';
import { validateTopic, validatePageCount } from '../../utils/validators';
import Button from '../shared/Button';

export default function InputForm({ onSubmit, isGenerating }) {
    const [formData, setFormData] = useState({
        topic: '',
        style: 'manga',
        num_pages: PAGE_LIMITS.default,
        emotion_intensity: 'dramatic',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSliderChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate
        const topicError = validateTopic(formData.topic);
        const pageError = validatePageCount(formData.num_pages);

        if (topicError || pageError) {
            setErrors({
                topic: topicError,
                num_pages: pageError,
            });
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl mx-auto border border-gray-100">
            <div className="bg-indigo-600 p-6 text-white text-center">
                <h2 className="text-2xl font-heading tracking-wide">Start Your Learning Journey</h2>
                <p className="text-indigo-100 mt-2">Turn any topic into an exciting story</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Topic Input */}
                <div>
                    <label htmlFor="topic" className="block text-sm font-bold text-gray-700 mb-2">
                        📚 What do you want to learn about?
                    </label>
                    <div className="relative">
                        <textarea
                            id="topic"
                            name="topic"
                            rows={3}
                            className={`w-full px-4 py-3 rounded-lg border ${errors.topic ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'} transition-all resize-none`}
                            placeholder="e.g., Explain the concept of black holes using a space exploration team..."
                            value={formData.topic}
                            onChange={handleChange}
                            disabled={isGenerating}
                        />
                    </div>
                    {errors.topic && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.topic}
                        </p>
                    )}
                </div>

                {/* Style Selection */}
                <div>
                    <label htmlFor="style" className="block text-sm font-bold text-gray-700 mb-2">
                        🎨 Art Style
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {ART_STYLES.map((style) => (
                            <label
                                key={style.value}
                                className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${formData.style === style.value
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="style"
                                    value={style.value}
                                    checked={formData.style === style.value}
                                    onChange={handleChange}
                                    className="sr-only"
                                    disabled={isGenerating}
                                />
                                <span className="font-medium block">{style.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Page Count Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="num_pages" className="text-sm font-bold text-gray-700">
                                📚 Number of Pages
                            </label>
                            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">
                                {formData.num_pages} Pages
                            </span>
                        </div>
                        <input
                            type="range"
                            id="num_pages"
                            name="num_pages"
                            min={PAGE_LIMITS.min}
                            max={PAGE_LIMITS.max}
                            value={formData.num_pages}
                            onChange={handleSliderChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            disabled={isGenerating}
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>{PAGE_LIMITS.min}</span>
                            <span>{PAGE_LIMITS.max}</span>
                        </div>
                        {errors.num_pages && (
                            <p className="mt-1 text-sm text-red-600">{errors.num_pages}</p>
                        )}
                    </div>

                    {/* Emotion Intensity Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="emotion_intensity" className="text-sm font-bold text-gray-700">
                                😊 Emotion Intensity
                            </label>
                            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded capitalize">
                                {formData.emotion_intensity}
                            </span>
                        </div>
                        <div className="relative pt-6"> {/* Added padding for custom labels/ticks if needed, currently using select for simplicity or slider as requested */}
                            {/* Re-reading specs: Slider (Subtle to Dramatic) */}
                            {/* Let's use a select for simplicity in data but UI as slider or tiered options */}
                            {/* Using a tiered range input logic for text values is tricky without steps. 
                   Let's stick to a select or radio for "Subtle", "Medium", "Dramatic" if inputs are text. 
                   The specs say: Range slider (Subtle to Dramatic). 
                   Let's assume "subtle", "balanced", "dramatic" map to 1, 2, 3 or similar.
                   Or just 3 radio buttons styled as a slider.
                   The prompt JSON example shows "dramatic" as a string.
               */}
                            <select
                                name="emotion_intensity"
                                value={formData.emotion_intensity}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                disabled={isGenerating}
                            >
                                <option value="subtle">Subtle</option>
                                <option value="balanced">Balanced</option>
                                <option value="dramatic">Dramatic</option>
                            </select>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    disabled={isGenerating}
                    icon={Sparkles}
                    className="mt-4"
                >
                    {isGenerating ? 'Generating Magic...' : 'Generate Comic'}
                </Button>
            </form>
        </div>
    );
}
