import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

const schedule = [
    {
        date: 'Senin, 11 November 2025',
        activities: [
            {
                name: 'Registrasi Peserta',
                description: 'Registrasi peserta dan pembagian kartu tanda hadir.',
                location: 'Aula Utama',
                time: '08:00 - 09:00',
            },
            {
                name: 'Pembukaan & Sambutan',
                description: 'Sambutan oleh panitia dan pembukaan acara resmi.',
                location: 'Aula Utama',
                time: '09:00 - 10:30',
            },
            {
                name: 'Workshop: Team Building',
                description: 'Sesi workshop untuk membangun kerja sama tim.',
                location: 'Ruang Workshop 1',
                time: '10:30 - 12:00',
            },
        ],
    },
    {
        date: 'Selasa, 12 November 2025',
        activities: [
            {
                name: 'Senam Pagi & Ice Breaking',
                description: 'Senam pagi bersama dan permainan ice breaking.',
                location: 'Lapangan',
                time: '08:00 - 09:30',
            },
            {
                name: 'Sesi Materi: Kepemimpinan',
                description: 'Materi tentang kepemimpinan untuk peserta.',
                location: 'Aula Utama',
                time: '09:30 - 11:00',
            },
        ],
    },
];

export default function JadwalPage() {
    return (
        <AuthLayout>
            <div className="space-y-6 p-4">
                <h1 className="text-2xl font-semibold text-gray-800">Jadwal Harian</h1>

                {schedule.map((dayItem, dayIndex) => (
                    <div key={dayIndex} className="space-y-4">
                        {/* Hari */}
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-emerald-600" />
                            <span className="text-lg font-semibold text-gray-800">{dayItem.date}</span>
                        </div>

                        {/* Kegiatan */}
                        <div className="space-y-3">
                            {dayItem.activities.map((activity, idx) => (
                                <div key={idx} className="rounded-xl border border-gray-200 p-4 shadow-sm transition hover:shadow-md">
                                    {/* Nama kegiatan */}
                                    <span className="text-lg font-semibold text-gray-800">{activity.name}</span>

                                    {/* Deskripsi */}
                                    <p className="mt-1 text-sm text-gray-600">{activity.description}</p>

                                    {/* Lokasi & Jam */}
                                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{activity.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{activity.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <HelpSection />
        </AuthLayout>
    );
}
