import { useToast } from '@/context/toast';
import FullLayout from '@/layouts/full';
import { router, useForm } from '@inertiajs/react';
import { Html5Qrcode } from 'html5-qrcode';
import { ArrowLeft, CheckCircle, Clock, QrCode, Users, XCircle } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useEffect, useRef, useState } from 'react';

const AdminMeetingScanner = ({ meeting, attendances }) => {
    const [scannerActive, setScannerActive] = useState(false);
    const [manualCode, setManualCode] = useState('');
    const [recentScans, setRecentScans] = useState([]);
    const [scanResult, setScanResult] = useState(null);
    const { showToast } = useToast();

    const { post } = useForm(null);

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

    useEffect(() => {
        setRecentScans(attendances.filter((e) => e.attend));
    }, [attendances]);

    const startScanner = async () => {
        try {
            html5QrCodeRef.current = new Html5Qrcode('qr-reader');

            await html5QrCodeRef.current.start(
                { facingMode: 'environment' },
                {
                    fps: 1,
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
        const code = decodedText.split('/').reverse()[0];
        if (scanResult === code) return;
        setScanResult(code);
        post(`/admin/kegiatan/scan/${meeting.code}/${code}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                showToast('success', 'Berhasil!', `Berhasil presensi`);
            },
        });
    };

    const onScanError = (error) => {
        // Silent error - scanning continuously
    };

    const processAttendance = (code) => {
        post(`/admin/kegiatan/scan/${meeting.code}/${code}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                // optional: show success feedback
                setScanResult(null);
                console.log('Attendance recorded ✅');
                startScanner();
            },
            onError: () => {
                // handle fail — also restart scanner
                console.error('Failed to record attendance ❌');
                startScanner();
            },
            onFinish: () => {
                // fallback to ensure scanner always restarts
                startScanner();
            },
        });
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
                    <span>{meeting.name}</span>
                    <span>›</span>
                    <span className="font-medium text-gray-800">Scanner Presensi</span>
                </div>
                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-800">
                    <QrCode size={32} className="text-emerald-600" />
                    Scanner Presensi
                </h1>
                <p className="mt-2 text-gray-600">
                    {meeting.name} •{' '}
                    {new Date(meeting.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}{' '}
                    • {meeting.start_time.slice(0, 5)} - {meeting.end_time.slice(0, 5)}
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
                        <button className="cursor-pointer rounded-md bg-emerald-700 p-2 text-white" onClick={startScanner}>
                            Buka Scanner
                        </button>
                    ) : (
                        <button className="cursor-pointer rounded-md bg-red-700 p-2 text-white" onClick={stopScanner}>
                            Tutup Scanner
                        </button>
                    )}
                    <button className="cursor-pointer rounded-md bg-amber-700 p-2 text-white" onClick={refreshData}>
                        Refresh Data
                    </button>
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
                                        <Avatar label={scan.user.name.charAt(0)} size="normal" shape="circle" className="bg-emerald-600 text-white" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{scan.user.name}</p>
                                            <p className="text-sm text-gray-600">{scan.user.office.name}</p>
                                            <p className="text-sm font-medium text-emerald-600">{scan.attend.slice(0, 5)}</p>
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
                                                <p className="text-xs text-gray-600">{attendance.attend.slice(0, 5)}</p>
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
