import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, Circle, XCircle } from 'lucide-react';
import Button from '../shared/Button';
import { formatTimeRemaining } from '../../utils/helpers';

export default function GenerationProgress({ status, onCancel }) {
    // Mock estimation logic - in real app, backend might provide this
    const estimatedTotalTime = 200; // seconds
    const timeLeft = Math.max(0, estimatedTotalTime - (status?.progress || 0) * 2);

    const steps = [
        { id: 1, label: 'Researching topic', icon: '🧠' },
        { id: 2, label: 'Structuring educational plot', icon: '✍️' },
        { id: 3, label: 'Drawing study materials', icon: '🎨' },
    ];

    // Determine current step index based on status text or progress
    let currentStepIndex = 0;
    if (status?.progress > 30) currentStepIndex = 1;
    if (status?.progress > 90) currentStepIndex = 2;

    // Or usage status message to map strictly if available
    // For now, simple progress mapping

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl mx-auto border border-gray-100 p-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                    Creating Your Comic... 🎨
                </h2>
                <p className="text-gray-500">
                    Estimated time remaining: <span className="font-mono font-medium text-indigo-600">{formatTimeRemaining(timeLeft)}</span>
                </p>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-8">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${status?.progress || 0}%` }}
                    transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
                    {Math.round(status?.progress || 0)}%
                </div>
            </div>

            {/* Steps List */}
            <div className="space-y-4 mb-8">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isPending = index > currentStepIndex;

                    return (
                        <div
                            key={step.id}
                            className={`flex items-center p-3 rounded-lg border transition-all ${isCurrent ? 'bg-indigo-50 border-indigo-200' : 'border-transparent'
                                }`}
                        >
                            <div className="mr-4">
                                {isCompleted ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                                ) : (
                                    <Circle className="w-6 h-6 text-gray-300" />
                                )}
                            </div>

                            <div className="flex-1">
                                <p className={`font-medium ${isPending ? 'text-gray-400' : 'text-gray-900'}`}>
                                    {step.label} {step.icon}
                                </p>
                                {isCurrent && status?.message && (
                                    <p className="text-sm text-indigo-600 mt-1">{status.message}...</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <Button
                    variant="danger"
                    variantType="outline" // Assuming button supports this or just className override
                    className="bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    onClick={onCancel}
                    icon={XCircle}
                >
                    Cancel Generation
                </Button>
            </div>
        </div>
    );
}
