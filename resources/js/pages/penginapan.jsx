import HelpSection from '@/components/help';
import AutuhLayout from '@/layouts/auth';
import { Briefcase, Building2, DoorOpen, Info, Phone, Users } from 'lucide-react';
import { Avatar } from 'primereact/avatar';

// Dummy Data
// const myRoom = {
//     building: {
//         id: 1,
//         name: 'Gedung Aswad',
//     },
//     room: {
//         id: 1,
//         name: 'Kamar 1',
//     },
//     roommates: [
//         {
//             id: 1,
//             name: 'Ahmad Fauzi',
//             phone: '081234567890',
//             office: { name: 'DPD Surakarta' },
//             employment: { name: 'Pengurus' },
//             avatar: 'https://tse1.mm.bing.net/th/id/OIP.CSmwj3jUw-f3cZhOe0QW0AHaE9?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3',
//         },
//         {
//             id: 2,
//             name: 'Siti Aminah',
//             phone: '081234567891',
//             office: { name: 'DPW Jawa Tengah' },
//             employment: { name: 'Pembina' },
//             avatar: null,
//         },
//         {
//             id: 3,
//             name: 'Budi Santoso',
//             phone: '081234567892',
//             office: { name: 'Orpen Mushida' },
//             employment: { name: 'Anggota' },
//         },
//     ],
// };

const PenginapanPage = ({ myRoom }) => {
    const totalRoommates = myRoom.roommates.length;

    return (
        <AutuhLayout>
            {/* Header */}
            <div className="mb-6">
                <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-800">
                    <Building2 className="text-emerald-600" size={32} />
                    Informasi Penginapan
                </h1>
                <p className="text-gray-600">Detail kamar dan teman sekamar Anda selama Muswil</p>
            </div>

            {/* Main Card - Building & Room Info */}
            <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {/* Header Section with Gradient */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-emerald-100">Penempatan Kamar Anda</p>
                            <h2 className="text-2xl font-bold">{myRoom.building.name}</h2>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <Building2 size={32} />
                        </div>
                    </div>
                </div>

                {/* Room Info */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100">
                            <DoorOpen className="text-emerald-600" size={24} />
                        </div>
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Nomor Kamar</p>
                            <p className="text-2xl font-bold text-gray-800">{myRoom.room.name}</p>
                        </div>
                    </div>
                </div>

                {/* Capacity Info */}
                <div className="border-b border-gray-200 bg-blue-50 p-6">
                    <div className="flex items-center gap-3">
                        <Users className="text-blue-600" size={20} />
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">
                                Anda berbagi kamar dengan <strong>{totalRoommates} orang</strong> lainnya
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {myRoom.roommates.map((roommate, index) => (
                        <div
                            key={roommate.id}
                            className="flex items-start gap-4 border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4 transition-shadow hover:shadow-md"
                        >
                            {/* Avatar with Number Badge */}
                            <div className="relative">
                                <Avatar
                                    image={roommate.avatar || undefined}
                                    label={!roommate.avatar ? roommate.name.charAt(0) : undefined}
                                    size="xlarge"
                                    shape="circle"
                                    className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                                    style={{ width: '60px', height: '60px', fontSize: '24px' }}
                                />
                                <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-purple-600 text-xs font-bold text-white">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                                <h4 className="mb-2 text-lg font-bold text-gray-800">{roommate.name}</h4>

                                <div className="space-y-2">
                                    {/* Office */}
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={14} className="flex-shrink-0 text-gray-500" />
                                        <span className="text-sm text-gray-700">{roommate.office.name}</span>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="flex-shrink-0 text-gray-500" />
                                        <a href={`tel:${roommate.phone}`} className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                                            {roommate.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Location Info (Optional) */}
                <div className="bg-gray-50 p-6">
                    <div className="flex items-start gap-3">
                        <Info className="mt-0.5 text-gray-500" size={20} />
                        <div className="flex-1">
                            <p className="mb-1 text-sm font-medium text-gray-700">Informasi Penting</p>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Pastikan menjaga kebersihan kamar bersama</li>
                                <li>• Harap menghormati privasi teman sekamar</li>
                                <li>• Simpan barang berharga dengan aman</li>
                                <li>• Laporkan kerusakan fasilitas ke panitia</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <HelpSection />
        </AutuhLayout>
    );
};

export default PenginapanPage;
