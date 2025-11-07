import AuthLayout from '@/layouts/auth';
import { Award, CalendarDays, MapPin, User } from 'lucide-react';

const userProfile = {
    photo: '/assets/img/Kotak.jpg', // ganti dengan foto user
    name: 'Ahmad Fauzi',
    phone: '081234567890',
    utusan: 'DPD Surakarta',
    jabatan: 'Anggota',
    arrival: '2025-11-11',
    departure: '2025-11-14',
    peciSize: 'M',
};

export default function ProfilePage() {
    return (
        <AuthLayout>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
                    {/* Foto Profil */}
                    <div className="mt-6 flex justify-center">
                        <img
                            src={userProfile.photo}
                            alt={userProfile.name}
                            className="h-32 w-32 rounded-full border-2 border-emerald-500 object-cover"
                        />
                    </div>

                    {/* Informasi */}
                    <div className="space-y-4 p-6">
                        <h2 className="text-center text-2xl font-semibold text-gray-800">{userProfile.name}</h2>

                        {/* Nomor HP */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-5 w-5 text-emerald-500" />
                            <span>{userProfile.phone}</span>
                        </div>

                        {/* Utusan */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-5 w-5 text-emerald-500" />
                            <span>{userProfile.utusan}</span>
                        </div>

                        {/* Jabatan */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <Award className="h-5 w-5 text-emerald-500" />
                            <span>{userProfile.jabatan}</span>
                        </div>

                        {/* Kedatangan & Kepulangan */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <CalendarDays className="h-5 w-5 text-emerald-500" />
                            <span>
                                {userProfile.arrival} - {userProfile.departure}
                            </span>
                        </div>

                        {/* Ukuran Peci */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-5 w-5 text-emerald-500" />
                            <span>Ukuran Peci: {userProfile.peciSize}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
