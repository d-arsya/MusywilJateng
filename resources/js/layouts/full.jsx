import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function FullLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* 🔹 Header */}
            <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <a href="/" className="text-xl font-bold text-gray-800">
                        <img src="/logo.png" className="inline w-16" alt="" /> Musyawarah Wilayah
                    </a>

                    {/* Desktop Menu */}
                    <nav className="hidden items-center space-x-6 md:flex">
                        <a href="/dashboard" className="text-gray-600 hover:text-blue-600">
                            Dashboard
                        </a>
                        <a href="/projects" className="text-gray-600 hover:text-blue-600">
                            Projects
                        </a>
                        <a href="/settings" className="text-gray-600 hover:text-blue-600">
                            Settings
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="rounded p-2 hover:bg-gray-100 md:hidden">
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {menuOpen && (
                    <nav className="border-t bg-white shadow-sm md:hidden">
                        <div className="flex flex-col space-y-2 px-4 py-2">
                            <a href="/dashboard" className="block py-1 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                Dashboard
                            </a>
                            <a href="/projects" className="block py-1 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                Projects
                            </a>
                            <a href="/settings" className="block py-1 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                Settings
                            </a>
                        </div>
                    </nav>
                )}
            </header>

            {/* 🔹 Main Content */}
            <main className="mx-auto w-full max-w-7xl flex-1 p-6">{children}</main>
        </div>
    );
}
