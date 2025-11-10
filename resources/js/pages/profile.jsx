import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';
import { Award, CalendarDays, MapPin, User } from 'lucide-react';
import { Avatar } from 'primereact/avatar';

export default function ProfilePage({ auth }) {
    const user = auth.user;
    return (
        <AuthLayout>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl">
                    {/* Foto Profil */}
                    <div className="mt-6 flex justify-center">
                        <Avatar
                            image={user.avatar || undefined}
                            label={!user.avatar ? user.name.charAt(0) : undefined}
                            size="xlarge"
                            shape="circle"
                            className="h-32 w-32 rounded-full border-2 border-emerald-500 bg-emerald-800 object-cover"
                            style={{ width: '60px', height: '60px', fontSize: '24px' }}
                        />
                    </div>

                    {/* Informasi */}
                    <div className="space-y-4 p-6">
                        <h2 className="text-center text-2xl font-semibold text-gray-800">{user.name}</h2>

                        {/* Nomor HP */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-5 w-5 text-emerald-500" />
                            <span>{user.phone}</span>
                        </div>

                        {/* Utusan */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-5 w-5 text-emerald-500" />
                            <span>
                                {user.office.type} {user.office.name}
                            </span>
                        </div>

                        {/* Jabatan */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <Award className="h-5 w-5 text-emerald-500" />
                            <span>{user.employment.name}</span>
                        </div>

                        {/* Kedatangan & Kepulangan */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <CalendarDays className="h-5 w-5 text-emerald-500" />
                            <span>
                                {user.arrive} - {user.depart}
                            </span>
                        </div>

                        {/* Ukuran Peci */}
                        <div className="flex items-center gap-2 text-gray-600">
                            <User className="h-5 w-5 text-emerald-500" />
                            <span>Ukuran Peci: {user.capsize}</span>
                        </div>
                    </div>
                </div>
            </div>
            <HelpSection />
        </AuthLayout>
    );
}
