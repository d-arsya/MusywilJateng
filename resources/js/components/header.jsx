import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
export function PublicHeader() {
    return (
        <header className="bg-gradient-to-r from-emerald-50 to-teal-100 text-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-center md:justify-between">
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="rounded-ful flex h-16 w-32 items-center justify-center">
                            <img src="/assets/img/header-horizontal.png" alt="" />
                        </div>
                        {/* <div>
                            <h1 className="text-md font-bold md:text-2xl">Musyawarah Wilayah VI Hidayatullah</h1>
                            <p className="text-sm text-emerald-200">DIY - Jateng Bagian Selatan</p>
                        </div> */}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export function PrivateHeader() {
    const [isOpen, setIsOpen] = useState(false);

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
        // {
        //     text: 'Settings',
        //     link: '/admin/setting',
        // },
    ];

    return (
        <header className="bg-gradient-to-r from-emerald-50 to-teal-100">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo dan Judul */}
                <Link href="/" className="flex items-center space-x-3">
                    <div className="flex w-32 items-center justify-center">
                        <img src="/assets/img/header-horizontal.png" alt="Logo" className="h-full w-full object-contain" />
                    </div>
                </Link>

                {/* Tombol Menu (Mobile) */}
                <button onClick={() => setIsOpen(!isOpen)} className="rounded-md p-2 transition hover:bg-emerald-700 md:hidden">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Menu Desktop */}
                <nav className="hidden space-x-6 text-sm font-medium md:flex">
                    {menuItems.map((e, i) => {
                        return (
                            <Link href={e.link} className="text-emerald-700 transition hover:text-emerald-200">
                                {e.text}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="border-t border-emerald-700 bg-emerald-900 md:hidden">
                    <nav className="flex flex-col space-y-2 px-6 py-3 text-sm font-medium">
                        {menuItems.map((e, i) => {
                            return (
                                <Link href={e.link} className="border-b border-emerald-700 py-2 hover:text-emerald-200">
                                    {e.text}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
}

export function PublicFooter() {
    return (
        <footer className="bg-emerald-900 py-4 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <p className="mb-2 text-emerald-200">© 2025 Musyawarah Wilayah VI Hidayatullah</p>
                    <p className="text-sm text-emerald-300">Website Official Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan</p>
                </div>
            </div>
        </footer>
    );
}
