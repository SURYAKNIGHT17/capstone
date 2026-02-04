import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, PlusCircle, LayoutGrid, Menu, X, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import Button from './Button';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { label: 'Home', path: '/', icon: null },
        { label: 'Create', path: '/create', icon: PlusCircle },
        { label: 'Gallery', path: '/gallery', icon: LayoutGrid },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white transfrom group-hover:rotate-12 transition-transform shadow-md">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="font-heading text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
                            Kapow! AI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "flex items-center gap-1.5 text-sm font-semibold transition-colors",
                                    isActive(item.path)
                                        ? "text-indigo-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md"
                                )}
                            >
                                {item.icon && <item.icon className="w-4 h-4" />}
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={clsx(
                                    "block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2",
                                    isActive(item.path)
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                {item.icon && <item.icon className="w-5 h-5" />}
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
