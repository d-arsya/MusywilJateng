import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

import { useState } from 'react';
export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const menuItems = [
        {
            text: 'Dashboard',
            link: '/admin/dashboard',
        },
        {
            text: 'Penginapan',
            link: '/admin/penginapan',
        },
        {
            text: 'Pembiayaan',
            link: '/admin/pembiayaan',
        },
        {
            text: 'Kegiatan',
            link: '/admin/kegiatan',
        },
        {
            text: 'Peserta',
            link: '/admin/peserta',
        },
        {
            text: 'Settings',
            link: '/admin/settings',
        },
    ];
    const value = {
        appendTo: 'self',
    };
    return (
        <PrimeReactProvider value={value}>
            <div className="flex min-h-screen bg-gray-100">
                {/* 🔹 Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-64 transform rounded-r-xl bg-emerald-700 text-white shadow-md transition-transform duration-300 md:static md:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between rounded-b-xl bg-white p-4 text-2xl font-bold shadow-2xl">
                        <span className="flex justify-center gap-4">
                            <img src="/assets/img/header-horizontal.png" className="w-full" alt="" />
                        </span>
                        <button onClick={() => setSidebarOpen(false)} className="rounded p-2 hover:bg-emerald-800 md:hidden">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-2 p-4">
                        {menuItems.map((e, i) => {
                            return (
                                <Link key={e.link} href={e.link} className="block rounded-md px-3 py-2 hover:bg-emerald-800">
                                    {e.text}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* 🔹 Overlay (untuk mobile) */}
                {sidebarOpen && (
                    <div className="bg-opacity-40 fixed inset-0 z-30 bg-emerald-700 opacity-80 md:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* 🔹 Main Content */}
                <div className="flex flex-1 flex-col">
                    {/* Topbar */}
                    <header className="flex items-center justify-between bg-white px-4 py-3 shadow md:hidden">
                        <button onClick={() => setSidebarOpen(true)} className="rounded p-2 hover:bg-gray-100">
                            <Menu size={22} />
                        </button>
                        <img src="/assets/img/header-horizontal.png" className="w-1/3" alt="" />
                        <div className="w-6" /> {/* spacer */}
                    </header>

                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </PrimeReactProvider>
    );
}
