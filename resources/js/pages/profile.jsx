import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';
import { Award, Briefcase, Building2, Calendar, CalendarDays, CheckCircle, Clock, Hash, Home, Phone, QrCode, User } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import QRCode from 'react-qr-code';

export default function ProfilePage({ auth }) {
    const user = auth.user;

    // Format tanggal
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Hitung durasi menginap
    const calculateDuration = () => {
        const arrive = new Date(user.arrive);
        const depart = new Date(user.depart);
        const diffTime = Math.abs(depart - arrive);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Color mapping untuk employment
    const employmentColors = {
        Pembina: 'bg-purple-100 text-purple-700 border-purple-200',
        Pengurus: 'bg-blue-100 text-blue-700 border-blue-200',
        Pengawas: 'bg-amber-100 text-amber-700 border-amber-200',
        Anggota: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    // Severity untuk office type
    const officeTypeSeverity = {
        DPW: 'info',
        DPD: 'success',
        DMW: 'warning',
        Kampus: 'help',
        Orpen: 'danger',
    };

    return (
        <AuthLayout>
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Header Card dengan Background Gradient */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-8 shadow-xl">
                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>

                        <div className="relative z-10 flex flex-col items-center">
                            {/* Avatar dengan Border Elegant */}
                            <div className="relative mb-4">
                                <div className="absolute inset-0 animate-pulse rounded-full bg-white/20 blur-xl"></div>
                                <Avatar
                                    image={user.avatar || undefined}
                                    label={!user.avatar ? user.name.charAt(0) : undefined}
                                    size="xlarge"
                                    shape="circle"
                                    className="relative h-32 w-32 border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                                    style={{ width: '80px', height: '80px', fontSize: '32px' }}
                                />
                            </div>

                            {/* Nama */}
                            <h1 className="mb-2 text-center text-3xl font-bold text-white">{user.name}</h1>

                            {/* Kode Akses */}
                            <div className="mb-4 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <Hash className="h-4 w-4 text-white" />
                                    <span className="font-mono text-lg font-bold text-white">{user.code}</span>
                                </div>
                            </div>

                            {/* Status Pembayaran */}
                            <Tag
                                value={user.payment_verified ? 'Terverifikasi' : 'Menunggu Verifikasi'}
                                severity={user.payment_verified ? 'success' : 'warning'}
                                icon={user.payment_verified ? <CheckCircle className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                                className="rounded-md bg-white/20 p-2 font-semibold backdrop-blur-sm"
                            />
                        </div>
                    </div>

                    {/* Main Info Card */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                        {/* Section Header */}
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4">
                            <h2 className="flex items-center text-lg font-bold text-gray-800">
                                <User className="mr-2 h-5 w-5 text-emerald-600" />
                                Informasi Peserta
                            </h2>
                        </div>

                        <div className="p-6">
                            <div className="grid gap-6">
                                {/* Kontak */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">Nomor Telepon</label>
                                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                            <Phone className="h-5 w-5 text-emerald-600" />
                                        </div>
                                        <span className="font-semibold text-gray-800">{user.phone}</span>
                                    </div>
                                </div>

                                {/* Ukuran Peci */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">Ukuran Peci</label>
                                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                            <Award className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <span className="text-2xl font-bold text-gray-800">{user.capsize}</span>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            {/* Organisasi */}
                            <div className="mb-6">
                                <h3 className="mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase">
                                    <Building2 className="mr-2 h-4 w-4" />
                                    Informasi Organisasi
                                </h3>

                                <div className="grid gap-6">
                                    {/* Utusan */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">Utusan</label>
                                        <div className="rounded-xl border-2 border-gray-100 p-4">
                                            <Tag
                                                value={user.office.type}
                                                severity={officeTypeSeverity[user.office.type] || 'info'}
                                                className="mb-2 font-semibold"
                                            />
                                            <p className="font-semibold text-gray-800">{user.office.name}</p>
                                        </div>
                                    </div>

                                    {/* Jabatan */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">Jabatan</label>
                                        <div className="rounded-xl border-2 border-gray-100 p-4">
                                            <span
                                                className={`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-bold ${employmentColors[user.employment.name] || employmentColors.Anggota}`}
                                            >
                                                <Briefcase className="mr-2 h-4 w-4" />
                                                {user.employment.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            {/* Jadwal */}
                            <div>
                                <h3 className="mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase">
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    Jadwal Kehadiran
                                </h3>

                                <div className="grid gap-6">
                                    {/* Kedatangan */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">Tanggal Kedatangan</label>
                                        <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                                <Calendar className="h-5 w-5 text-emerald-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{formatDate(user.arrive)}</p>
                                                <p className="text-xs text-gray-500">Check-in</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kepulangan */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium tracking-wide text-gray-500 uppercase">Tanggal Kepulangan</label>
                                        <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                                <Calendar className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{formatDate(user.depart)}</p>
                                                <p className="text-xs text-gray-500">Check-out</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Durasi Menginap */}
                                <div className="mt-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-purple-600" />
                                            <span className="font-medium text-gray-700">Durasi Menginap</span>
                                        </div>
                                        <span className="text-2xl font-bold text-purple-600">{calculateDuration()} Hari</span>
                                    </div>
                                </div>
                            </div>

                            {/* Kamar Info (if assigned) */}
                            {user.room && (
                                <>
                                    <Divider />
                                    <div>
                                        <h3 className="mb-4 flex items-center text-sm font-bold tracking-wide text-gray-500 uppercase">
                                            <Home className="mr-2 h-4 w-4" />
                                            Informasi Penginapan
                                        </h3>
                                        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-600">Gedung & Kamar</p>
                                                    <p className="text-xl font-bold text-gray-800">
                                                        {user.room.building.name} - {user.room.name}
                                                    </p>
                                                </div>
                                                <Home className="h-12 w-12 text-blue-300" />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4">
                            <h2 className="flex items-center text-lg font-bold text-gray-800">
                                <QrCode className="mr-2 h-5 w-5 text-emerald-600" />
                                QR Code Presensi
                            </h2>
                        </div>
                        <div className="p-6 text-center">
                            <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100">
                                {/* Placeholder for QR Code */}
                                <QRCode
                                    value={app.url + '/s/' + user.code} // dynamically from user.code
                                    size={128}
                                    className="h-32 w-32 bg-none text-emerald-600"
                                    bgColor="none"
                                />
                            </div>
                            <p className="text-sm text-gray-600">Tunjukkan QR code ini untuk presensi kegiatan</p>
                            <p className="mt-1 font-mono text-xs text-gray-400">{user.code}</p>
                        </div>
                    </div>
                </div>
            </div>
            <HelpSection />
        </AuthLayout>
    );
}
