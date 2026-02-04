import { Palette, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: Palette,
        title: 'AI-Powered Art',
        description: 'Generate unique, consistent characters and environments using advanced diffusion models tailored for comic art styles.',
        color: 'bg-indigo-100 text-indigo-600',
    },
    {
        icon: BookOpen,
        title: 'Complete Stories',
        description: 'Our LLM generates full 10-14 page narratives with engaging dialogue, plot twists, and meaningful character arcs.',
        color: 'bg-purple-100 text-purple-600',
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Go from a simple idea to a fully illustrated comic book in under 10 minutes. Download and share instantly.',
        color: 'bg-yellow-100 text-yellow-600',
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-heading text-gray-900 mb-4">
                        Why Learn with Comics?
                    </h2>
                    <p className="text-lg text-gray-600">
                        We combine state-of-the-art AI storytelling with educational principles to make learning effortless and fun.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
