import { router } from '@inertiajs/react';
import { Calendar, CalendarDays, CheckCircle, Clock, FileText, MapPin, Users, XCircle } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Chart } from 'primereact/chart';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { SelectButton } from 'primereact/selectbutton';
import { useState } from 'react';

const AdminMeetingDetail = ({ meeting, attendances, schedule }) => {
    const totalParticipants = attendances.length;
    const totalAttended = attendances.filter((a) => a.attend !== null).length;
    const totalNotAttended = totalParticipants - totalAttended;
    const usersAttended = attendances.filter((a) => a.attend !== null);
    const [filterUser, setFilterUser] = useState('Hadir');

    // Chart Data
    const chartData = {
        labels: ['Hadir', 'Belum Hadir'],
        datasets: [
            {
                data: [totalAttended, totalNotAttended],
                backgroundColor: ['#10b981', '#f97316'],
                hoverBackgroundColor: ['#059669', '#ea580c'],
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };
    const handleUpdate = () => {
        router.reload({ attendances });
    };
    setInterval(handleUpdate, 15000);
    const filterOptions = [
        { label: 'Semua', value: 'Semua' },
        { label: 'Hadir', value: 'Hadir' },
        { label: 'Belum', value: 'Belum' },
    ];
    const getTitle = () => {
        switch (filterUser) {
            case 'Hadir':
                return 'Presensi Terakhir';
            case 'Belum':
                return 'Belum hadir';
            default:
                return 'Semua Peserta';
        }
    };

    return (
        <div className="p-6">
            <ConfirmDialog />
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1 flex flex-col gap-y-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">Visualisasi Kehadiran</h3>
                        <Chart type="doughnut" data={chartData} options={chartOptions} />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                    <Users className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Total Peserta</p>
                                    <p className="text-xl font-bold text-gray-800">{totalParticipants}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                    <CheckCircle className="text-emerald-600" size={24} />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Sudah Hadir</p>
                                    <p className="text-xl font-bold text-gray-800">{totalAttended}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
                                    <XCircle className="text-orange-600" size={24} />
                                </div>
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Belum Hadir</p>
                                    <p className="text-xl font-bold text-gray-800">{totalNotAttended}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div
                        onClick={() => router.get('/admin/kegiatan')}
                        className="mb-6 cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                    >
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-1 text-emerald-600" size={20} />
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Tanggal</p>
                                    <p className="font-semibold text-gray-800">
                                        {new Date(meeting.date).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="mt-1 text-emerald-600" size={20} />
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Waktu</p>
                                    <p className="font-semibold text-gray-800">
                                        {meeting.start_time.slice(0, 5)} - {meeting.end_time.slice(0, 5)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 text-emerald-600" size={20} />
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Lokasi</p>
                                    <p className="font-semibold text-gray-800">{meeting.room}</p>
                                </div>
                            </div>
                        </div>
                        {meeting.description && (
                            <div className="mt-4 border-t border-gray-200 pt-4">
                                <div className="flex items-start gap-3">
                                    <FileText className="mt-1 text-gray-500" size={20} />
                                    <div>
                                        <p className="mb-1 text-sm text-gray-600">Deskripsi</p>
                                        <p className="text-gray-800">{meeting.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {usersAttended.length > 0 && (
                        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex justify-between gap-2 text-lg font-semibold text-gray-800">
                                <h3 className="flex items-center gap-2">
                                    <Clock className="text-purple-600" size={20} />
                                    {getTitle()}
                                </h3>
                                <SelectButton
                                    value={filterUser}
                                    onChange={(e) => {
                                        console.log(e.value);
                                        setFilterUser(e.value);
                                    }}
                                    options={filterOptions}
                                />
                            </div>
                            <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
                                {usersAttended.map((attendance) => (
                                    <div key={attendance.id} className="flex items-center gap-3">
                                        <Avatar
                                            label={attendance.name.charAt(0)}
                                            size="normal"
                                            shape="circle"
                                            className="bg-emerald-600 text-white"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{attendance.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {attendance.office.type} {attendance.office.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-emerald-600">{attendance.attend.slice(0, 5)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-1">
                    <div className="max-h-screen overflow-y-scroll rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                        {schedule.map((dayItem, dayIndex) => (
                            <div key={dayIndex} className="space-y-3">
                                {/* Hari */}
                                <div className="flex items-center gap-2">
                                    <CalendarDays className="h-5 w-5 text-emerald-600" />
                                    <span className="text-lg font-semibold text-gray-800">{dayItem.date}</span>
                                </div>

                                {/* Kegiatan */}
                                <div className="mb-6 space-y-2">
                                    {dayItem.activities.map((activity, idx) => (
                                        <div key={idx} className="pl-8">
                                            {/* Nama kegiatan */}
                                            <span className="text-sm font-semibold text-gray-800">{activity.name}</span>

                                            {/* Lokasi & Jam */}
                                            <div className="mt-2 flex flex-col gap-4 text-xs text-gray-500">
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
                </div>
            </div>
        </div>
    );
};

export default AdminMeetingDetail;
