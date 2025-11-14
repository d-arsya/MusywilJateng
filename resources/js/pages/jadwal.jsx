import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

export default function JadwalPage({ schedule }) {
    return (
        <AuthLayout>
            <div className="space-y-6 p-4">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-gray-800">Jadwal Kegiatan</h2>
                    <p className="text-gray-600">
                        Lihat jadwal lengkap kegiatan Musywarah Wilayah VI Hidayatullah yang Anda ikuti. Pastikan hadir tepat waktu untuk setiap sesi.
                    </p>
                </div>
                {schedule.length < 1 && (
                    <div className="rounded-md border-gray-200 bg-gray-50 bg-gray-100 p-4">
                        <div className="flex items-center gap-3">
                            <CalendarDays size={20} />
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">Jadwal sedang kami siapkan</p>
                            </div>
                        </div>
                    </div>
                )}
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
                                    <p className="mt-1 text-sm whitespace-pre-line text-gray-600">{activity.description}</p>

                                    {/* Lokasi & Jam */}
                                    <div className="mt-2 flex flex-col gap-4 text-sm text-gray-500">
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
