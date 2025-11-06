import { Menu, X } from 'lucide-react'; // ikon dari lucide-react
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* 🔹 Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 text-white transition-transform duration-300 md:static md:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between border-b border-gray-700 p-4 text-2xl font-bold">
                    <span>
                        <img src="/logo.png" className="inline w-12" alt="" /> Admin
                    </span>
                    <button onClick={() => setSidebarOpen(false)} className="rounded p-2 hover:bg-gray-800 md:hidden">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2 p-4">
                    <a href="/admin/dashboard" className="block rounded-md px-3 py-2 hover:bg-gray-800">
                        📊 Dashboard
                    </a>
                    <a href="/admin/users" className="block rounded-md px-3 py-2 hover:bg-gray-800">
                        👥 Users
                    </a>
                    <a href="/admin/settings" className="block rounded-md px-3 py-2 hover:bg-gray-800">
                        ⚙️ Settings
                    </a>
                </nav>

                <div className="border-t border-gray-700 p-4 text-sm text-gray-400">© 2025 Admin</div>
            </aside>

            {/* 🔹 Overlay (untuk mobile) */}
            {sidebarOpen && <div className="bg-opacity-40 fixed inset-0 z-30 bg-black md:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* 🔹 Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Topbar */}
                <header className="flex items-center justify-between bg-white px-4 py-3 shadow md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="rounded p-2 hover:bg-gray-100">
                        <Menu size={22} />
                    </button>
                    <h1 className="text-lg font-semibold">Admin Panel</h1>
                    <div className="w-6" /> {/* spacer */}
                </header>

                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
