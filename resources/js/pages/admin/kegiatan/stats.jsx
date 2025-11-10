import { router } from '@inertiajs/react';
import { Calendar, CheckCircle, Clock, FileText, MapPin, Users, XCircle } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Chart } from 'primereact/chart';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Timeline } from 'primereact/timeline';
import { useState } from 'react';

// Dummy Data
const dummyMeeting = {
    id: 2,
    title: 'Rapat Dewan Pengawas',
    date: '2025-11-21',
    time_start: '14:00',
    time_end: '16:00',
    location: 'Ruang Angsana',
    description: 'Rapat koordinasi dewan pengawas untuk membahas program kerja tahun 2025',
    status: 'ongoing',
};

const events = [
    { status: 'Ordered', date: '15/10/2020 10:30' },
    { status: 'Processing', date: '15/10/2020 14:00' },
    { status: 'Shipped', date: '15/10/2020 16:15' },
    { status: 'Delivered', date: '16/10/2020 10:00' },
];

const dummyAttendances = [
    {
        id: 1,
        user: {
            id: 1,
            name: 'Arsyad Muhammad',
            phone: '081234567801',
            code: 'ABC001',
            office: { name: 'DPW Jawa Tengah' },
            employment: { name: 'Pembina' },
        },
        attend: '2025-11-21T14:05:00',
    },
    {
        id: 2,
        user: {
            id: 2,
            name: 'Amhar Aziz',
            phone: '081234567802',
            code: 'ABC002',
            office: { name: 'DPD Semarang' },
            employment: { name: 'Pengurus' },
        },
        attend: null,
    },
    {
        id: 3,
        user: {
            id: 3,
            name: 'Aslam Hakim',
            phone: '081234567803',
            code: 'ABC003',
            office: { name: 'DPD Solo' },
            employment: { name: 'Pengurus' },
        },
        attend: '2025-11-21T14:12:00',
    },
    {
        id: 4,
        user: {
            id: 4,
            name: 'Ahmad Fauzi',
            phone: '081234567804',
            code: 'ABC004',
            office: { name: 'DPW Jawa Timur' },
            employment: { name: 'Anggota' },
        },
        attend: null,
    },
    {
        id: 5,
        user: {
            id: 5,
            name: 'Budi Santoso',
            phone: '081234567805',
            code: 'ABC005',
            office: { name: 'DMW Jakarta' },
            employment: { name: 'Anggota' },
        },
        attend: '2025-11-21T14:18:00',
    },
];

const AdminMeetingDetail = ({ meetingId = 2 }) => {
    const [meeting, setMeeting] = useState(dummyMeeting);
    const [attendances, setAttendances] = useState(dummyAttendances);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState(null);

    // Stats
    const totalParticipants = attendances.length;
    const totalAttended = attendances.filter((a) => a.attend !== null).length;
    const totalNotAttended = totalParticipants - totalAttended;
    const attendanceRate = totalParticipants > 0 ? Math.round((totalAttended / totalParticipants) * 100) : 0;

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

    // Handlers
    const handleBack = () => {
        router.get('/admin/kegiatan');
    };

    const handleEdit = () => {
        router.get('/admin/kegiatan/create');
    };

    const handleDelete = () => {
        const hasAttendance = totalAttended > 0;

        if (hasAttendance) {
            alert('Tidak bisa menghapus kegiatan yang sudah ada peserta hadir!');
            return;
        }

        confirmDialog({
            message: `Apakah Anda yakin ingin menghapus "${meeting.title}"?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Hapus',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-danger',
            accept: () => {
                console.log('Delete meeting and navigate to dashboard');
                alert('Kegiatan berhasil dihapus');
                handleBack();
            },
        });
    };

    const handleOpenScanner = () => {
        router.get('/admin/kegiatan/scan');
    };

    const handleAssignParticipants = () => {
        router.get('/admin/kegiatan/assign');
    };

    const handleExport = () => {
        console.log('Export attendance data');
        alert('Fitur export akan segera tersedia');
    };

    const refreshData = () => {
        console.log('Refresh data from API');
    };

    // Templates
    const userNameTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-3">
                <Avatar
                    label={rowData.user.name.charAt(0)}
                    size="large"
                    shape="circle"
                    className={rowData.attend ? 'bg-emerald-600 text-white' : 'bg-gray-400 text-white'}
                />
                <div>
                    <div className="font-semibold text-gray-800">{rowData.user.name}</div>
                    <div className="text-sm text-gray-600">{rowData.user.office.name}</div>
                </div>
            </div>
        );
    };

    const officeTemplate = (rowData) => {
        return (
            <div>
                <div className="text-sm font-medium text-gray-800">{rowData.user.office.name}</div>
                <div className="text-xs text-gray-600">{rowData.user.employment.name}</div>
            </div>
        );
    };

    const statusTemplate = (rowData) => {
        if (rowData.attend) {
            return (
                <div>
                    <Tag value="Hadir" severity="success" icon="pi pi-check" className="mb-1" />
                    <div className="mt-1 text-xs text-gray-600">
                        {new Date(rowData.attend).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                </div>
            );
        }
        return <Tag value="Belum Hadir" severity="secondary" />;
    };

    // Filtered data
    const filteredAttendances = attendances
        .filter((a) => {
            const matchSearch =
                a.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.user.phone.includes(searchQuery) ||
                a.user.office.name.toLowerCase().includes(searchQuery.toLowerCase());

            let matchStatus = true;
            if (filterStatus) {
                if (filterStatus.value === 'attended') {
                    matchStatus = a.attend !== null;
                } else if (filterStatus.value === 'not_attended') {
                    matchStatus = a.attend === null;
                }
            }

            return matchSearch && matchStatus;
        })
        .sort((a, b) => {
            // Attended first, then by time
            if (a.attend && !b.attend) return -1;
            if (!a.attend && b.attend) return 1;
            if (a.attend && b.attend) {
                return new Date(a.attend) - new Date(b.attend);
            }
            return a.user.name.localeCompare(b.user.name);
        });

    // Status filter options
    const statusOptions = [
        { label: 'Semua', value: null },
        { label: 'Sudah Hadir', value: 'attended' },
        { label: 'Belum Hadir', value: 'not_attended' },
    ];

    // Timeline data
    const attendanceTimeline = attendances
        .filter((a) => a.attend !== null)
        .sort((a, b) => new Date(a.attend) - new Date(b.attend))
        .slice(0, 5); // Last 5

    return (
        <div className="p-6">
            <ConfirmDialog />
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1 flex flex-col gap-y-6">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">Visualisasi Kehadiran</h3>
                        <Chart type="doughnut" data={chartData} options={chartOptions} />
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:col-span-3">
                        <p className="mb-3 text-sm text-gray-600">Persentase Kehadiran</p>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <ProgressBar
                                    value={attendanceRate}
                                    showValue={false}
                                    style={{ height: '24px' }}
                                    color={attendanceRate >= 80 ? '#10b981' : attendanceRate >= 50 ? '#f97316' : '#ef4444'}
                                />
                            </div>
                            <p className="text-3xl font-bold text-purple-600">{attendanceRate}%</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-2">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Total Peserta</p>
                                    <p className="text-3xl font-bold text-gray-800">{totalParticipants}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                    <Users className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Sudah Hadir</p>
                                    <p className="text-3xl font-bold text-emerald-600">{totalAttended}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                                    <CheckCircle className="text-emerald-600" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Belum Hadir</p>
                                    <p className="text-3xl font-bold text-orange-600">{totalNotAttended}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                                    <XCircle className="text-orange-600" size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div
                        onClick={() => router.get('/admin/kegiatan/assign')}
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
                                        {meeting.time_start} - {meeting.time_end}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 text-emerald-600" size={20} />
                                <div>
                                    <p className="mb-1 text-sm text-gray-600">Lokasi</p>
                                    <p className="font-semibold text-gray-800">{meeting.location}</p>
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
                    {attendanceTimeline.length > 0 && (
                        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                                <Clock className="text-purple-600" size={20} />
                                Timeline Presensi Terakhir
                            </h3>
                            <div className="space-y-3">
                                {attendanceTimeline.map((attendance) => (
                                    <div
                                        key={attendance.id}
                                        className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3"
                                    >
                                        <Avatar
                                            label={attendance.user.name.charAt(0)}
                                            size="normal"
                                            shape="circle"
                                            className="bg-emerald-600 text-white"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{attendance.user.name}</p>
                                            <p className="text-sm text-gray-600">{attendance.user.office.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-emerald-600">
                                                {new Date(attendance.attend).toLocaleTimeString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-1">
                    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                        <Timeline
                            value={events}
                            separarator={(item) => <h1>{item.status}</h1>}
                            content={(item) => item.status}
                            // opposite={(item) => item.status}
                            // content={(item) => <small className="text-color-secondary">{item.date}</small>}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMeetingDetail;
