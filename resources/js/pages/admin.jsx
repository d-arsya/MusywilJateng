import AuthLayout from '@/layouts/auth';
import { Calendar, Camera, Coffee, MapPin, Phone, Truck, UserCheck, Users } from 'lucide-react';

const divisions = [
    {
        division: 'Registrasi',
        admin: 'Ahmad Fauzi',
        icon: <UserCheck size={32} />,
        phone: '+62 896-3605-5420',
        location: 'Gedung A - Lantai 1',
        team: 12,
        description: 'Pengelolaan pendaftaran peserta, verifikasi data, dan distribusi kartu peserta',
        color: 'emerald',
    },
    {
        division: 'Konsumsi',
        admin: 'Siti Aminah',
        icon: <Coffee size={32} />,
        phone: '+62 813-4567-8901',
        location: 'Gedung B - Dapur Utama',
        team: 25,
        description: 'Menyediakan makanan dan minuman untuk seluruh peserta dan panitia',
        color: 'amber',
    },
    {
        division: 'Acara',
        admin: 'Budi Santoso',
        icon: <Calendar size={32} />,
        phone: '+62 814-5678-9012',
        location: 'Sekretariat Panitia',
        team: 18,
        description: 'Koordinasi jadwal, susunan acara, dan kelancaran seluruh kegiatan',
        color: 'blue',
    },
    {
        division: 'Dokumentasi',
        admin: 'Rina Handayani',
        icon: <Camera size={32} />,
        phone: '+62 815-6789-0123',
        location: 'Studio Multimedia',
        team: 8,
        description: 'Dokumentasi foto dan video seluruh rangkaian acara Munas',
        color: 'purple',
    },
    {
        division: 'Transportasi',
        admin: 'Hadi Santoso',
        icon: <Truck size={32} />,
        phone: '+62 816-7890-1234',
        location: 'Area Parkir Utama',
        team: 15,
        description: 'Layanan antar-jemput peserta dan logistik acara',
        color: 'red',
    },
];

const colorVariants = {
    emerald: {
        bg: 'bg-emerald-50',
        icon: 'bg-emerald-100 text-emerald-600',
        badge: 'bg-emerald-500',
        border: 'border-emerald-200',
        hover: 'hover:border-emerald-300 hover:shadow-emerald-100',
    },
    amber: {
        bg: 'bg-amber-50',
        icon: 'bg-amber-100 text-amber-600',
        badge: 'bg-amber-500',
        border: 'border-amber-200',
        hover: 'hover:border-amber-300 hover:shadow-amber-100',
    },
    blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        badge: 'bg-blue-500',
        border: 'border-blue-200',
        hover: 'hover:border-blue-300 hover:shadow-blue-100',
    },
    purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100 text-purple-600',
        badge: 'bg-purple-500',
        border: 'border-purple-200',
        hover: 'hover:border-purple-300 hover:shadow-purple-100',
    },
    red: {
        bg: 'bg-red-50',
        icon: 'bg-red-100 text-red-600',
        badge: 'bg-red-500',
        border: 'border-red-200',
        hover: 'hover:border-red-300 hover:shadow-red-100',
    },
};

export default function DivisiPage() {
    return (
        <AuthLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-gray-800">Dapatkan Pelayanan</h2>
                    <p className="text-gray-600">Tim kami siap melayani dan memastikan kelancaran acara Musyawarah Wilayah Hidayatullah</p>
                </div>

                {/* Statistics Bar */}
                <div className="grid grid-cols-3 gap-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white shadow-lg">
                    <div className="text-center">
                        <div className="text-3xl font-bold">{divisions.length}</div>
                        <div className="text-sm text-emerald-100">Divisi Aktif</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold">{divisions.reduce((acc, div) => acc + div.team, 0)}</div>
                        <div className="text-sm text-emerald-100">Total Anggota</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold">24/7</div>
                        <div className="text-sm text-emerald-100">Siap Melayani</div>
                    </div>
                </div>

                {/* Division Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {divisions.map((item, index) => {
                        const colors = colorVariants[item.color];
                        return (
                            <a
                                href={`https://wa.me/${item.phone.replaceAll('-', '').replaceAll('+', '').replaceAll(' ', '')}`}
                                key={index}
                                className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 ${colors.border} ${colors.hover} bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl`}
                            >
                                {/* Header with Icon and Badge */}
                                <div className="mb-4 flex items-start justify-between">
                                    <div
                                        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colors.icon} shadow-md transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        {item.icon}
                                    </div>
                                    <div
                                        className={`flex items-center gap-2 rounded-full ${colors.badge} px-3 py-1 text-xs font-semibold text-white shadow-sm`}
                                    >
                                        <Users size={14} />
                                        {item.team} Tim
                                    </div>
                                </div>

                                {/* Division Name */}
                                <h3 className="mb-1 text-xl font-bold text-gray-800">{item.division}</h3>

                                {/* Description */}
                                <p className="mb-4 text-sm leading-relaxed text-gray-600">{item.description}</p>

                                {/* Admin Info */}
                                <div className={`mb-4 rounded-xl ${colors.bg} p-3`}>
                                    <div className="mb-1 text-xs font-medium text-gray-500">Penanggung Jawab</div>
                                    <div className="font-semibold text-gray-800">{item.admin}</div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-2 border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone size={16} className="text-gray-400" />
                                        <span>{item.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin size={16} className="text-gray-400" />
                                        <span>{item.location}</span>
                                    </div>
                                </div>

                                {/* Hover Effect Gradient */}
                                <div
                                    className={`absolute inset-x-0 bottom-0 h-1 ${colors.badge} scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100`}
                                ></div>
                            </a>
                        );
                    })}
                </div>

                {/* Help Section */}
                <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">Butuh Bantuan?</h3>
                    <p className="mb-4 text-sm text-gray-600">Hubungi divisi terkait atau kunjungi meja informasi untuk bantuan lebih lanjut</p>
                    <button className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700">
                        Kontak Sekretariat
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
}
