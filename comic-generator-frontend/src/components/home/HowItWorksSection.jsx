import { PenTool, Bot, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    {
        id: 1,
        title: 'Choose Your Topic',
        description: 'Enter the subject you want to learn—e.g., "The French Revolution" or "Newton\'s Laws".',
        icon: PenTool,
    },
    {
        id: 2,
        title: 'AI Teaches You',
        description: 'Our AI breaks down the topic into an engaging story with characters and plot.',
        icon: Bot,
    },
    {
        id: 3,
        title: 'Learn & Retain',
        description: 'Read your custom educational comic. The combination of image and story boosts memory retention.',
        icon: Share2,
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-heading text-gray-900 mb-4"
                    >
                        Three Simple Steps
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        From imagination to reality in minutes
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-100 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.3 }}
                                className="flex flex-col items-center text-center group bg-white p-4 rounded-xl"
                            >
                                <div className="w-20 h-20 bg-white border-4 border-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-indigo-500 transition-colors duration-300 z-10">
                                    <step.icon className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4 z-10 border-4 border-white">
                                    {step.id}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-600 max-w-xs">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
