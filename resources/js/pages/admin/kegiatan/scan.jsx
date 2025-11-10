import FullLayout from '@/layouts/full';
import { router } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';
import { ArrowLeft, CheckCircle, Clock, QrCode, Scan, Users, XCircle } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useEffect, useRef, useState } from 'react';

// Dummy Data
const dummyMeeting = {
    id: 2,
    title: 'Rapat Dewan Pengawas',
    date: '2025-11-21',
    time_start: '14:00',
    time_end: '16:00',
    location: 'Ruang Angsana',
};

const dummyAttendances = [
    {
        id: 1,
        user: {
            id: 1,
            name: 'Arsyad Muhammad',
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
            code: 'ABC005',
            office: { name: 'DMW Jakarta' },
            employment: { name: 'Anggota' },
        },
        attend: null,
    },
];

const AdminMeetingScanner = ({ meetingId = 2 }) => {
    const [meeting, setMeeting] = useState(dummyMeeting);
    const [attendances, setAttendances] = useState(dummyAttendances);
    const [scannerActive, setScannerActive] = useState(false);
    const [manualCode, setManualCode] = useState('');
    const [recentScans, setRecentScans] = useState([]);
    const [scanResult, setScanResult] = useState(null);

    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    // Stats
    const totalParticipants = attendances.length;
    const totalAttended = attendances.filter((a) => a.attend !== null).length;
    const totalNotAttended = totalParticipants - totalAttended;
    const attendanceRate = totalParticipants > 0 ? Math.round((totalAttended / totalParticipants) * 100) : 0;

    // Initialize scanner
    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, []);

    const startScanner = async () => {
        try {
            html5QrCodeRef.current = new Html5Qrcode('qr-reader');

            await html5QrCodeRef.current.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                onScanSuccess,
                onScanError,
            );

            setScannerActive(true);
        } catch (err) {
            console.error('Error starting scanner:', err);
            alert('Gagal membuka kamera. Pastikan kamera tersedia dan izin sudah diberikan.');
        }
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current && scannerActive) {
            try {
                await html5QrCodeRef.current.stop();
                html5QrCodeRef.current.clear();
                setScannerActive(false);
            } catch (err) {
                console.error('Error stopping scanner:', err);
            }
        }
    };

    const onScanSuccess = (decodedText) => {
        // Process scanned code
        processAttendance(decodedText);
    };

    const onScanError = (error) => {
        // Silent error - scanning continuously
    };

    const processAttendance = (code) => {
        // Find user by code
        const attendance = attendances.find((a) => a.user.code === code);

        if (!attendance) {
            setScanResult({
                success: false,
                message: 'Peserta tidak terdaftar dalam kegiatan ini',
                timestamp: new Date(),
            });
            return;
        }

        if (attendance.attend !== null) {
            setScanResult({
                success: false,
                message: `${attendance.user.name} sudah check-in sebelumnya pada ${new Date(attendance.attend).toLocaleTimeString('id-ID')}`,
                timestamp: new Date(),
                user: attendance.user,
            });
            return;
        }

        // Simulate API call to check-in
        const now = new Date().toISOString();
        const updatedAttendances = attendances.map((a) => (a.user.code === code ? { ...a, attend: now } : a));

        setAttendances(updatedAttendances);

        const scanData = {
            success: true,
            attendance: { ...attendance, attend: now },
            timestamp: new Date(),
        };

        setScanResult(scanData);
        setRecentScans((prev) => [scanData, ...prev].slice(0, 10)); // Keep last 10

        // Clear result after 3 seconds
        setTimeout(() => {
            setScanResult(null);
        }, 3000);
    };

    const handleManualScan = () => {
        if (!manualCode.trim()) return;

        processAttendance(manualCode.trim());
        setManualCode('');
    };

    const handleBack = () => {
        router.get('/admin/kegiatan');
    };

    const refreshData = () => {
        console.log('Refresh attendance data from API');
        // API call
    };

    // Format time
    const formatTime = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <FullLayout>
            {/* Breadcrumb */}
            <div className="mb-6">
                <button onClick={handleBack} className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Kembali ke Detail Kegiatan</span>
                </button>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>Dashboard</span>
                    <span>›</span>
                    <span>{meeting.title}</span>
                    <span>›</span>
                    <span className="font-medium text-gray-800">Scanner Presensi</span>
                </div>
                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
                    <QrCode size={32} className="text-emerald-600" />
                    Scanner Presensi
                </h1>
                <p className="mt-2 text-gray-600">
                    {meeting.title} • {new Date(meeting.date).toLocaleDateString('id-ID')} • {meeting.time_start} - {meeting.time_end}
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
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
                    <div className="flex items-center justify-between">
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
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Belum Hadir</p>
                            <p className="text-3xl font-bold text-orange-600">{totalNotAttended}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                            <XCircle className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Persentase</p>
                            <p className="text-3xl font-bold text-purple-600">{attendanceRate}%</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <Clock className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    {!scannerActive ? (
                        <Button label="Aktifkan Scanner" icon={<Scan size={16} />} className="p-button-success" onClick={startScanner} />
                    ) : (
                        <Button label="Hentikan Scanner" icon="pi pi-stop" className="p-button-danger" onClick={stopScanner} />
                    )}
                    <Button label="Refresh Data" icon="pi pi-refresh" className="p-button-outlined" onClick={refreshData} />
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* LEFT: Scanner */}
                <div className="space-y-6">
                    {/* QR Scanner */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                            <QrCode className="text-emerald-600" size={20} />
                            QR Code Scanner
                        </h2>

                        <div className="mb-4 overflow-hidden rounded-lg bg-gray-900" style={{ minHeight: '300px' }}>
                            <div id="qr-reader" className="w-full"></div>
                            {!scannerActive && (
                                <div className="flex h-64 items-center justify-center bg-gray-800">
                                    <div className="text-center text-gray-400">
                                        <QrCode size={48} className="mx-auto mb-3" />
                                        <p>Scanner tidak aktif</p>
                                        <p className="text-sm">Klik tombol "Aktifkan Scanner" untuk memulai</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Scan Result */}
                        {scanResult && (
                            <div
                                className={`rounded-lg p-4 ${
                                    scanResult.success ? 'border border-emerald-200 bg-emerald-50' : 'border border-red-200 bg-red-50'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                                            scanResult.success ? 'bg-emerald-100' : 'bg-red-100'
                                        }`}
                                    >
                                        {scanResult.success ? (
                                            <CheckCircle className="text-emerald-600" size={20} />
                                        ) : (
                                            <XCircle className="text-red-600" size={20} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`mb-1 font-semibold ${scanResult.success ? 'text-emerald-800' : 'text-red-800'}`}>
                                            {scanResult.success ? 'Check-in Berhasil!' : 'Check-in Gagal'}
                                        </p>
                                        {scanResult.success && scanResult.attendance && (
                                            <div className="text-sm text-emerald-700">
                                                <p className="font-semibold">{scanResult.attendance.user.name}</p>
                                                <p>{scanResult.attendance.user.office.name}</p>
                                                <p>Check-in: {formatTime(scanResult.attendance.attend)}</p>
                                            </div>
                                        )}
                                        {!scanResult.success && <p className="text-sm text-red-700">{scanResult.message}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Manual Input */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">Input Manual (Optional)</h2>
                        <div className="flex gap-2">
                            <InputText
                                value={manualCode}
                                onChange={(e) => setManualCode(e.target.value)}
                                placeholder="Masukkan kode peserta (ex: ABC001)"
                                className="flex-1"
                                onKeyPress={(e) => e.key === 'Enter' && handleManualScan()}
                            />
                            <Button label="Check-in" icon={<CheckCircle size={16} />} onClick={handleManualScan} disabled={!manualCode.trim()} />
                        </div>
                        <p className="mt-2 text-sm text-gray-600">Ketik kode peserta dan tekan Enter atau klik tombol Check-in</p>
                    </div>
                </div>

                {/* RIGHT: Recent Scans & All Attendances */}
                <div className="space-y-6">
                    {/* Recent Scans */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                            <Clock className="text-purple-600" size={20} />
                            Presensi Terbaru
                        </h2>

                        {recentScans.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                <Clock size={32} className="mx-auto mb-2 opacity-50" />
                                <p>Belum ada scan hari ini</p>
                            </div>
                        ) : (
                            <div className="max-h-96 space-y-3 overflow-y-auto">
                                {recentScans.map((scan, index) => (
                                    <div key={index} className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                                        <Avatar
                                            label={scan.attendance.user.name.charAt(0)}
                                            size="normal"
                                            shape="circle"
                                            className="bg-emerald-600 text-white"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{scan.attendance.user.name}</p>
                                            <p className="text-sm text-gray-600">{scan.attendance.user.office.name}</p>
                                            <p className="text-sm font-medium text-emerald-600">{formatTime(scan.attendance.attend)}</p>
                                        </div>
                                        <CheckCircle className="text-emerald-600" size={20} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* All Attendances */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                            <Users className="text-blue-600" size={20} />
                            Daftar Semua Peserta
                        </h2>

                        <div className="max-h-96 space-y-2 overflow-y-auto">
                            {attendances
                                .sort((a, b) => {
                                    // Attended first, then by name
                                    if (a.attend && !b.attend) return -1;
                                    if (!a.attend && b.attend) return 1;
                                    return a.user.name.localeCompare(b.user.name);
                                })
                                .map((attendance) => (
                                    <div
                                        key={attendance.id}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                    >
                                        <Avatar
                                            label={attendance.user.name.charAt(0)}
                                            size="normal"
                                            shape="circle"
                                            className={attendance.attend ? 'bg-emerald-600 text-white' : 'bg-gray-400 text-white'}
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{attendance.user.name}</p>
                                            <p className="text-sm text-gray-600">{attendance.user.office.name}</p>
                                        </div>
                                        {attendance.attend ? (
                                            <div className="text-right">
                                                <Tag value="Hadir" severity="success" className="mb-1" />
                                                <p className="text-xs text-gray-600">{formatTime(attendance.attend)}</p>
                                            </div>
                                        ) : (
                                            <Tag value="Belum" severity="secondary" />
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </FullLayout>
    );
};

export default AdminMeetingScanner;
