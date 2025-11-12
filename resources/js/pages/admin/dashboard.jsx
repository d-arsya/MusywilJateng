import AdminLayout from '@/layouts/admin';
import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Building2,
    Calendar,
    CalendarCheck,
    CheckCircle,
    Clock,
    CreditCard,
    DollarSign,
    Home,
    PieChart,
    TrendingUp,
    UserCheck,
    Users,
} from 'lucide-react';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';

export default function AdminDashboardPage({ mockTodayMeetings, mockOfficeDistribution, mockEmploymentDistribution, mockStats }) {
    // Chart data
    const officeChartData = {
        labels: Object.keys(mockOfficeDistribution),
        datasets: [
            {
                data: Object.values(mockOfficeDistribution),
                backgroundColor: [
                    '#3B82F6', // Blue
                    '#10B981', // Green
                    '#F59E0B', // Amber
                    '#8B5CF6', // Purple
                    '#EF4444', // Red
                ],
            },
        ],
    };

    const employmentChartData = {
        labels: Object.keys(mockEmploymentDistribution),
        datasets: [
            {
                data: Object.values(mockEmploymentDistribution),
                backgroundColor: [
                    '#8B5CF6', // Purple
                    '#3B82F6', // Blue
                    '#F59E0B', // Amber
                    '#6B7280', // Gray
                ],
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                },
            },
        },
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
                        <p className="mt-1 text-gray-600">Muswil VI Hidayatullah 2025</p>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-sm text-gray-500">Hari ini</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {/* Total Peserta */}
                    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <Users className="h-6 w-6" />
                            </div>
                            <TrendingUp className="h-5 w-5 opacity-70" />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm opacity-90">Total Peserta</p>
                            <p className="text-4xl font-bold">{mockStats.totalUsers}</p>
                        </div>
                    </div>

                    {/* Verified Payment */}
                    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <DollarSign className="h-5 w-5 opacity-70" />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm opacity-90">Terverifikasi</p>
                            <p className="text-4xl font-bold">{mockStats.verifiedPayment}</p>
                            <p className="mt-1 text-xs opacity-75">
                                {((mockStats.verifiedPayment / mockStats.totalUsers) * 100).toFixed(1)}% dari total
                            </p>
                        </div>
                    </div>

                    {/* Pending Payment */}
                    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <Clock className="h-6 w-6" />
                            </div>
                            <CreditCard className="h-5 w-5 opacity-70" />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm opacity-90">Menunggu Verifikasi</p>
                            <p className="text-4xl font-bold">{mockStats.pendingPayment}</p>
                            <p className="mt-1 text-xs opacity-75">Perlu ditindaklanjuti</p>
                        </div>
                    </div>

                    {/* Today Meetings */}
                    <div className="group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <CalendarCheck className="h-5 w-5 opacity-70" />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm opacity-90">Kegiatan Hari Ini</p>
                            <p className="text-4xl font-bold">{mockStats.todayMeetings}</p>
                            <p className="mt-1 text-xs opacity-75">dari {mockStats.totalMeetings} total</p>
                        </div>
                    </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-xl border-2 border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Gedung</p>
                                <p className="text-2xl font-bold text-gray-800">{mockStats.totalBuildings}</p>
                            </div>
                            <Building2 className="h-10 w-10 text-gray-300" />
                        </div>
                    </div>

                    <div className="rounded-xl border-2 border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Kamar Terisi</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {mockStats.assignedRooms}/{mockStats.totalRooms}
                                </p>
                            </div>
                            <Home className="h-10 w-10 text-gray-300" />
                        </div>
                    </div>

                    <div className="rounded-xl border-2 border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Kehadiran Hari Ini</p>
                                <p className="text-2xl font-bold text-gray-800">{mockStats.todayAttendance}</p>
                            </div>
                            <UserCheck className="h-10 w-10 text-gray-300" />
                        </div>
                    </div>

                    <div className="rounded-xl border-2 border-gray-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Rata-rata Kehadiran</p>
                                <p className="text-2xl font-bold text-gray-800">{mockStats.averageAttendance}%</p>
                            </div>
                            <BarChart3 className="h-10 w-10 text-gray-300" />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Quick Access Menu */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-bold text-gray-800">Akses Cepat</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="/admin/peserta"
                                className="group flex flex-col items-center justify-center rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-blue-300 hover:bg-blue-50"
                            >
                                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition-transform group-hover:scale-110">
                                    <Users className="h-8 w-8 text-blue-600" />
                                </div>
                                <span className="text-center font-semibold text-gray-700 group-hover:text-blue-600">Manajemen Peserta</span>
                                <span className="mt-1 text-xs text-gray-500">{mockStats.totalUsers} peserta</span>
                            </Link>

                            <Link
                                href="/admin/pembiayaan"
                                className="group flex flex-col items-center justify-center rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-emerald-300 hover:bg-emerald-50"
                            >
                                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 transition-transform group-hover:scale-110">
                                    <CreditCard className="h-8 w-8 text-emerald-600" />
                                </div>
                                <span className="text-center font-semibold text-gray-700 group-hover:text-emerald-600">Verifikasi Pembayaran</span>
                                <span className="mt-1 text-xs text-gray-500">{mockStats.pendingPayment} pending</span>
                            </Link>

                            <Link
                                href="/admin/penginapan"
                                className="group flex flex-col items-center justify-center rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-purple-300 hover:bg-purple-50"
                            >
                                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 transition-transform group-hover:scale-110">
                                    <Home className="h-8 w-8 text-purple-600" />
                                </div>
                                <span className="text-center font-semibold text-gray-700 group-hover:text-purple-600">Manajemen Kamar</span>
                                <span className="mt-1 text-xs text-gray-500">{mockStats.assignedRooms} terisi</span>
                            </Link>

                            <Link
                                href="/admin/kegiatan"
                                className="group flex flex-col items-center justify-center rounded-xl border-2 border-gray-100 p-6 transition-all hover:border-amber-300 hover:bg-amber-50"
                            >
                                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 transition-transform group-hover:scale-110">
                                    <Calendar className="h-8 w-8 text-amber-600" />
                                </div>
                                <span className="text-center font-semibold text-gray-700 group-hover:text-amber-600">Jadwal Kegiatan</span>
                                <span className="mt-1 text-xs text-gray-500">{mockStats.todayMeetings} hari ini</span>
                            </Link>
                        </div>
                    </div>

                    {/* Today's Meetings */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Jadwal Hari Ini</h2>
                            <Link href="/admin/meetings">
                                <Button label="Lihat Semua" icon={<ArrowRight className="ml-2 h-4 w-4" />} text size="small" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {mockTodayMeetings.map((meeting) => (
                                <div
                                    key={meeting.id}
                                    className="group cursor-pointer rounded-xl border-2 border-gray-100 p-4 transition-all hover:border-emerald-300 hover:bg-emerald-50"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className="font-semibold text-gray-800">{meeting.name}</span>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    <span>
                                                        {meeting.start_time} - {meeting.end_time}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4" />
                                                    <span>{meeting.room}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Kehadiran</p>
                                            <p className="text-2xl font-bold text-emerald-600">{meeting.total_attended}</p>
                                            <p className="text-xs text-gray-500">dari {meeting.total_participants}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Office Distribution */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                            <PieChart className="mr-2 h-5 w-5 text-blue-600" />
                            Distribusi Utusan
                        </h2>
                        <Chart type="pie" data={officeChartData} options={chartOptions} />
                        <div className="mt-4 grid grid-cols-3 gap-1 md:grid-cols-5">
                            {Object.entries(mockOfficeDistribution).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <p className="text-xs text-gray-500">{key}</p>
                                    <p className="font-bold text-gray-800">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Employment Distribution */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <h2 className="mb-4 flex items-center text-xl font-bold text-gray-800">
                            <BarChart3 className="mr-2 h-5 w-5 text-purple-600" />
                            Distribusi Jabatan
                        </h2>
                        <Chart type="doughnut" data={employmentChartData} options={chartOptions} />
                        <div className="mt-4 grid grid-cols-4 gap-2">
                            {Object.entries(mockEmploymentDistribution).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <p className="text-xs text-gray-500">{key}</p>
                                    <p className="font-bold text-gray-800">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
