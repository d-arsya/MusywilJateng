import AuthLayout from '@/layouts/auth';
import { Link } from '@inertiajs/react';
import { Calendar, CheckCircle2, FileText, Home, Images, Map, MapPin, Phone, XCircle } from 'lucide-react';
import QRCode from 'react-qr-code';

const menuItems = [
    {
        title: 'Jadwal',
        icon: <Calendar size={24} />,
        link: '/jadwal',
    },
    {
        title: 'Kamar',
        icon: <Home size={24} />,
        link: '/penginapan',
    },
    {
        title: 'Lokasi',
        icon: <MapPin size={24} />,
        link: 'https://maps.app.goo.gl/Ep7jZZinzWccHden9',
    },
    {
        title: 'Denah',
        icon: <Map size={24} />,
        link: '/denah',
    },
    {
        title: 'Materi',
        icon: <FileText size={24} />,
        link: '/materi',
    },
    {
        title: 'Galeri',
        icon: <Images size={24} />,
        link: 'https://drive.google.com',
    },
    {
        title: 'Admin',
        icon: <Phone size={24} />,
        link: 'https://wa.me/6289636055420',
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
                    <div className="text-md absolute top-12 left-6 font-medium text-white drop-shadow-lg">
                        Kamaluddin Arsyad Fadllillah
                        <p className="text-xs font-thin">DPD Surakarta</p>
                    </div>
                </div>

                {/* Banner pembayaran kontribusi */}

                <div className="relative flex flex-col overflow-hidden rounded-xl bg-emerald-400 p-4 shadow-md">
                    <div className="flex space-x-2">
                        <CheckCircle2 className="h-6 w-6 text-white" />
                        <span className="text-lg font-semibold text-white">Kontribusi Pembayaran</span>
                    </div>
                    <span className="text-xs text-white">Terimakasih pembayaran kontribusi sudah diterima</span>
                </div>

                <div className="relative flex flex-col overflow-hidden rounded-xl bg-red-400 p-4 shadow-md">
                    <div className="flex space-x-2">
                        <XCircle className="h-6 w-6 text-white" />
                        <span className="text-lg font-semibold text-white">Kontribusi Pembayaran</span>
                    </div>
                    <span className="my-1 text-xs text-white">Silahkan unggah bukti pembayaran kontribusi</span>

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
