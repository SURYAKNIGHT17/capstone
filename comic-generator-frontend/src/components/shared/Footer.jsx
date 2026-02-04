import { Github, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-heading text-white tracking-wide">Kapow! AI</h3>
                        <p className="text-sm text-gray-400 mt-1">
                            Made with <Heart className="w-3 h-3 inline text-red-500 mx-1" /> for University Capstone Project
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">About</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} Kapow! AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
