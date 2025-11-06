import AuthLayout from '@/layouts/auth';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    {
        title: 'Jadwal',
        icon: '📅',
        link: '/jadwal',
        gradient: 'from-purple-500 to-pink-500',
        description: 'Lihat acara',
    },
    {
        title: 'Kamar',
        icon: '🏠',
        link: '/penginapan',
        gradient: 'from-orange-500 to-red-500',
        description: 'Info kamar',
    },
    {
        title: 'Lokasi',
        icon: '📍',
        link: 'https://maps.app.goo.gl/Ep7jZZinzWccHden9',
        gradient: 'from-indigo-500 to-blue-500',
        description: 'Lokasi',
    },
    {
        title: 'Denah',
        icon: '📍',
        link: '/denah',
        gradient: 'from-indigo-500 to-blue-500',
        description: 'Denah',
    },
    {
        title: 'Admin',
        icon: '❓',
        link: '/admin',
        gradient: 'from-pink-500 to-rose-500',
        description: 'Help desk',
    },
];

export default function Dashboard() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Header Image tetap */}
                <div className="relative w-full max-w-xl">
                    {/* Background ID Card */}
                    <img src="/assets/img/card-horizontal.jpg" alt="Banner" className="w-full rounded-lg shadow-md" />

                    {/* Foto Profil */}
                    <img src="/assets/img/qr.jpg" alt="QR Code" className="absolute bottom-6 left-6 h-16 w-16 object-contain" />
                    <img
                        src="/assets/img/Kotak.jpg"
                        alt="Foto Profil"
                        className="absolute right-12 bottom-10 h-20 w-20 rounded-full border-2 border-white object-cover shadow-lg"
                    />
                    <div className="absolute top-12 left-6 text-lg font-semibold text-white drop-shadow-lg">Ahmad Fauzi</div>

                    {/* QR Code */}

                    {/* Nama peserta (opsional overlay text) */}
                </div>

                {/* Banner pembayaran kontribusi */}

                <div className="relative flex items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 p-4 shadow-md">
                    <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                        <span className="text-lg font-semibold text-white">Kontribusi Pembayaran</span>
                    </div>
                </div>

                <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-red-400 p-4 shadow-md">
                    <div className="flex items-center space-x-2">
                        <XCircle className="h-6 w-6 text-white" />
                        <span className="text-lg font-semibold text-white">Kontribusi Pembayaran</span>
                    </div>

                    <button
                        type="button"
                        className="rounded-full bg-white/30 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/50"
                    >
                        Unggah Bukti
                    </button>
                </div>

                {/* Menu 5 item */}
                <div className="grid grid-cols-3 gap-4 p-1">
                    {menuItems.map((item, index) => (
                        <a
                            href={item.link}
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            {/* Gradient Background on Hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                            ></div>

                            {/* Animated Border */}
                            <div
                                className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                style={{
                                    padding: '2px',
                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                    WebkitMaskComposite: 'xor',
                                    maskComposite: 'exclude',
                                }}
                            ></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center">
                                {/* Icon Container with Gradient */}
                                <div
                                    className={`mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                                >
                                    <span className="text-3xl">{item.icon}</span>
                                </div>

                                {/* Title */}
                                <span className="mb-1 text-center text-sm font-bold text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
                                    {item.title}
                                </span>

                                {/* Description - Appears on Hover */}
                                <span
                                    className={`text-center text-xs text-gray-500 transition-all duration-300 ${
                                        hoveredIndex === index ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    {item.description}
                                </span>
                            </div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]"></div>

                            {/* Corner Accent */}
                            <div
                                className={`absolute -top-8 -right-8 h-16 w-16 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
                            ></div>
                        </a>
                    ))}
                </div>
            </div>
        </AuthLayout>
    );
}
