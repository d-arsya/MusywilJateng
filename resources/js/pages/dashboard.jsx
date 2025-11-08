import AuthLayout from '@/layouts/auth';
import { Link, useForm } from '@inertiajs/react';
import { Calendar, CheckCircle2, FileText, Home, Images, Map, MapPin, Phone, XCircle } from 'lucide-react';
import { useRef } from 'react';
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
        link: 'https://wa.me/6281234895030',
    },
];

export default function Dashboard({ auth, app }) {
    const fileInputRef = useRef(null);
    const user = auth.user;
    const { data, setData, post } = useForm({
        invoice: null,
    });
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        handleUpload(file);
    };
    const handleUpload = async (file) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        const formData = new FormData();
        formData.append('invoice', file);

        try {
            const res = await fetch('/pembayaran', {
                method: 'POST',
                body: formData,
                // 🔥 2. Include the CSRF token in the headers
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    // Note: Do NOT set 'Content-Type' for FormData
                },
            });
            if (res.ok) {
                window.location.reload();
            } else {
                console.error('Upload failed:', res.status, errorData);
            }
        } catch (error) {
            console.log(res);
            console.log(error);
        }
    };
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
                            value={app.url + '/s/' + user.code} // dynamically generated from user.code
                            size={64} // roughly same as your h-16 w-16
                            className="h-16 w-16"
                        />
                    </div>
                    <img
                        src={user.avatar}
                        alt="Foto Profil"
                        className="absolute right-12 bottom-10 h-20 w-20 rounded-full border-2 border-white bg-emerald-800 object-cover shadow-lg"
                    />
                    <div className="text-md absolute top-12 left-6 font-medium text-white drop-shadow-lg">
                        {user.name}
                        <p className="text-xs font-thin">
                            {user.office.type} {user.office.name}
                        </p>
                    </div>
                </div>
                {user.invoice ? (
                    <div
                        className={`relative flex flex-col overflow-hidden ${user.paid ? 'bg-emerald-400' : 'bg-amber-300'} rounded-xl p-3 shadow-md`}
                    >
                        <div className="flex space-x-2">
                            <CheckCircle2 className="h-6 w-6 text-white" />
                            <span className="text-lg font-semibold text-white">Kontribusi Pembayaran</span>
                        </div>
                        <span className="text-xs text-white">
                            Terimakasih pembayaran kontribusi sudah diterima {user.paid ? '' : 'dan menunggu konfirmasi'}
                        </span>
                    </div>
                ) : (
                    <div className="relative flex flex-col overflow-hidden rounded-xl bg-red-400 p-3 shadow-md">
                        <div className="flex space-x-2">
                            <XCircle className="h-6 w-6 text-white" />
                            <span className="text-lg font-semibold text-white">Kontribusi Pembayaran</span>
                        </div>
                        <span className="my-1 text-xs text-white">Silahkan unggah bukti pembayaran kontribusi</span>

                        <div>
                            {/* tombol */}
                            <button
                                type="button"
                                className="rounded-full bg-white/30 px-3 py-1 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/50"
                                onClick={handleClick}
                            >
                                Unggah Bukti
                            </button>
                            <form action="">
                                <input ref={fileInputRef} type="file" onChange={handleChange} className="hidden" />
                            </form>
                        </div>
                    </div>
                )}

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
