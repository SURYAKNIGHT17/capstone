import { useNavigate } from 'react-router-dom';
import { ArrowRight, GalleryVerticalEnd } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../shared/Button';

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            {/* Top Section with Gradient and Title */}
            <section className="relative pt-20 pb-48 lg:pb-64 flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
                {/* Background Particles/Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium tracking-wide">
                            ✨ Make Learning Fun & Memorable
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading mb-6 leading-tight tracking-wide drop-shadow-lg">
                            Master Any Subject with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                                Visual Stories
                            </span>
                        </h1>
                    </motion.div>
                </div>

                {/* Wave Separator */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-white fill-current">
                        <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* Bottom Section with Description and Buttons (White Background) */}
            <section className="bg-white pb-20 relative z-10 -mt-10 md:-mt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl mx-auto"
                    >
                        <p className="text-lg md:text-xl text-black mb-10 leading-relaxed font-medium">
                            Turn complex topics into engaging comic books.
                            Whether it's history, science, or literature, learn faster and retain more with emotion-driven AI storytelling.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-200"
                                onClick={() => navigate('/create')}
                            >
                                Start Creating <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto text-black border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 font-bold"
                                onClick={() => navigate('/gallery')}
                            >
                                View Gallery <GalleryVerticalEnd className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
