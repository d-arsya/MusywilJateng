import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

export default function JadwalPage({ schedule }) {
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
