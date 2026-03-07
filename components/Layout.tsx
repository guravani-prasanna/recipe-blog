import { ReactNode } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
            <header className="bg-white shadow-sm print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            RecipeBlog
                        </Link>
                        <nav className="hidden md:flex space-x-4">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
                            <Link href="/recipes" className="text-gray-600 hover:text-gray-900 font-medium">Recipes</Link>
                        </nav>
                    </div>
                    <LanguageSwitcher />
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>

            <footer className="bg-gray-800 text-white py-8 print:hidden mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} RecipeBlog. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
