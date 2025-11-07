import AuthLayout from '@/layouts/auth';
import { Link } from '@inertiajs/react';
import { Calendar, CheckCircle2, HelpCircle, Home, Map, MapPin, XCircle } from 'lucide-react';
import QRCode from 'react-qr-code';

const menuItems = [
    {
        title: 'Jadwal',
        icon: <Calendar size={24} />,
        link: '/jadwal',
        description: 'Lihat acara',
    },
    {
        title: 'Kamar',
        icon: <Home size={24} />,
        link: '/penginapan',
        description: 'Info kamar',
    },
    {
        title: 'Lokasi',
        icon: <MapPin size={24} />,
        link: 'https://maps.app.goo.gl/Ep7jZZinzWccHden9',
        description: 'Lokasi',
    },
    {
        title: 'Denah',
        icon: <Map size={24} />,
        link: '/denah',
        description: 'Denah',
    },
    {
        title: 'Admin',
        icon: <HelpCircle size={24} />,
        link: '/admin',
        description: 'Help desk',
    },
];

export default function Dashboard() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Header Image tetap */}
                <div className="relative w-full max-w-xl">
                    {/* Background ID Card */}
                    <img src="/assets/img/card-horizontal.jpg" alt="Banner" className="w-full rounded-lg shadow-md" />

                    {/* Foto Profil */}
                    <div className="absolute bottom-6 left-6 rounded-sm bg-white p-1">
                        <QRCode
                            value={'KamaluddinArsyadFadllillah'} // dynamically generated from user.code
                            size={64} // roughly same as your h-16 w-16
                            className="h-16 w-16"
                        />
                    </div>
                    <img
                        src="/assets/img/Kotak.jpg"
                        alt="Foto Profil"
                        className="absolute right-12 bottom-10 h-20 w-20 rounded-full border-2 border-white object-cover shadow-lg"
                    />
                    <div className="absolute top-12 left-6 text-lg font-semibold text-white drop-shadow-lg">Ahmad Fauzi</div>
                </div>

                {/* Banner pembayaran kontribusi */}

                <div className="relative flex items-center justify-between overflow-hidden rounded-xl bg-emerald-400 p-4 shadow-md">
                    <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                        <span className="text-lg font-semibold text-white">Kontribusi Pembayaran</span>
                    </div>
                </div>

                <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-xl bg-red-400 p-4 shadow-md">
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
                <div className="grid grid-cols-3 gap-4 p-1">
                    {menuItems.map((item, index) => {
                        const isExternal = item.link.startsWith('http');

                        const LinkTag = isExternal ? 'a' : Link;

                        return (
                            <LinkTag
                                href={item.link}
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <div className="relative z-10 flex flex-col items-center justify-center">
                                    <div>
                                        <span className="text-3xl text-emerald-700">{item.icon}</span>
                                    </div>
                                    <span className="mb-1 text-center text-sm font-bold text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
                                        {item.title}
                                    </span>
                                </div>
                            </LinkTag>
                        );
                    })}
                </div>
            </div>
        </AuthLayout>
    );
}
