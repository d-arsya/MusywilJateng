import AdminLayout from '@/layouts/admin';
import { router, useForm } from '@inertiajs/react';
import { Calendar, CheckCircle, Clock, Edit2, Plus, QrCode, Trash2, UserPlus, Users } from 'lucide-react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useState } from 'react';

// Dummy Data
const AdminMeetingDashboard = ({ meetings }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterDate, setFilterDate] = useState('');
    const { delete: destroy } = useForm(null);

    // Stats
    const totalMeetings = meetings.length;
    const BelumMeetings = meetings.filter((m) => m.status === 'Belum').length;
    const SedangMeetings = meetings.filter((m) => m.status === 'Sedang').length;
    const TelahMeetings = meetings.filter((m) => m.status === 'Telah').length;

    // Handlers
    const handleCreate = () => {
        router.get('/admin/kegiatan/create');
    };

    const handleEdit = (meeting) => {
        router.get('/admin/kegiatan/' + meeting.code + '/edit');
    };

    const handleDelete = (meeting) => {
        const hasAttendance = meeting.total_attended > 0;

        if (hasAttendance) {
            alert('Tidak bisa menghapus kegiatan yang sudah ada peserta hadir!');
            return;
        }

        confirmDialog({
            message: `Apakah Anda yakin ingin menghapus "${meeting.name}"?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Hapus',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-danger',
            accept: () => {
                destroy('/admin/kegiatan/' + meeting.code, {
                    onError: (err) => console.log(err),
                });
            },
        });
    };

    const handleViewDetail = (meeting) => {
        router.get('/admin/kegiatan/stats/' + meeting.code);
    };

    const handleAssign = (meeting) => {
        router.get('/admin/kegiatan/assign/' + meeting.code);
    };

    const handleScanner = (meeting) => {
        router.get('/admin/kegiatan/scan/' + meeting.code);
    };

    // Templates
    const nameTemplate = (rowData) => {
        return (
            <div>
                <div className="mb-1 font-semibold text-gray-800">{rowData.name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={12} />
                    {new Date(rowData.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>
            </div>
        );
    };

    const timeTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm">{rowData.start_time.slice(0, 5)}</span>
            </div>
        );
    };

    const roomTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm">{rowData.room}</span>
            </div>
        );
    };

    const statusTemplate = (rowData) => {
        const statusConfig = {
            Belum: { label: 'Belum', severity: 'info' },
            Sedang: { label: 'Berlangsung', severity: 'warning' },
            Telah: { label: 'Selesai', severity: 'success' },
        };
        const config = statusConfig[rowData.status];
        return <Tag value={config.label} severity={config.severity} />;
    };

    const attendanceTemplate = (rowData) => {
        const percentage = rowData.attendance_rate;
        let color = 'text-gray-600';
        if (percentage >= 80) color = 'text-emerald-600';
        else if (percentage >= 50) color = 'text-orange-600';
        else if (percentage > 0) color = 'text-red-600';

        return (
            <div>
                <div className="mb-1 flex items-center gap-2">
                    <Users size={14} className="text-gray-500" />
                    <span className="text-sm font-medium">
                        {rowData.total_attended}/{rowData.total_participants}
                    </span>
                </div>
                <div className={`text-sm font-semibold ${color}`}>{percentage}%</div>
            </div>
        );
    };

    const actionTemplate = (rowData) => {
        return (
            <div className="flex gap-1">
                <Button
                    icon={<QrCode size={14} />}
                    className="p-button-rounded p-button-text p-button-success p-button-xxl"
                    onClick={() => handleScanner(rowData)}
                    tooltip="Buka Scanner"
                    disabled={rowData.status === 'Telah'}
                />
                <Button
                    icon={<UserPlus size={14} />}
                    className="p-button-rounded p-button-text p-button-info p-button-xxl"
                    onClick={() => handleAssign(rowData)}
                    tooltip="Assign Peserta"
                />
                <Button
                    icon={<Edit2 size={14} />}
                    className="p-button-rounded p-button-text p-button-xxl"
                    onClick={() => handleEdit(rowData)}
                    tooltip="Edit"
                />
                <Button
                    icon={<Trash2 size={14} />}
                    className="p-button-rounded p-button-text p-button-danger p-button-xxl"
                    onClick={() => handleDelete(rowData)}
                    tooltip="Hapus"
                    disabled={rowData.total_attended > 0}
                />
            </div>
        );
    };

    const detailButtonTemplate = (rowData) => {
        return <Button label="Detail" className="p-button-sm p-button-outlined" onClick={() => handleViewDetail(rowData)} />;
    };

    // Filtered data
    const filteredMeetings = meetings
        .filter((m) => {
            const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.room.toLowerCase().includes(searchQuery.toLowerCase());

            const matchStatus = !filterStatus || m.status === filterStatus.value;
            const matchDate = !filterDate || m.date === filterDate;

            return matchSearch && matchStatus && matchDate;
        })
        .sort((a, b) => {
            const dateCompare = new Date(a.date) - new Date(b.date);
            if (dateCompare !== 0) return dateCompare;
            return a.start_time.localeCompare(b.start_time);
        });

    // Status options
    const statusOptions = [
        { label: 'Belum Dimulai', value: 'Belum' },
        { label: 'Sedang Berlangsung', value: 'Sedang' },
        { label: 'Selesai', value: 'Telah' },
    ];

    return (
        <AdminLayout>
            <ConfirmDialog />

            {/* Header */}
            <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">Manajemen Kegiatan</h1>
                <p className="text-gray-600">Kelola jadwal kegiatan dan presensi peserta Munas</p>
            </div>

            {/* Stats Bar */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Total Kegiatan</p>
                            <p className="text-3xl font-bold text-gray-800">{totalMeetings}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <Calendar className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Belum Dimulai</p>
                            <p className="text-3xl font-bold text-blue-600">{BelumMeetings}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <Clock className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Berlangsung</p>
                            <p className="text-3xl font-bold text-orange-600">{SedangMeetings}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                            <Users className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Selesai</p>
                            <p className="text-3xl font-bold text-emerald-600">{TelahMeetings}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <CheckCircle className="text-emerald-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-8">
                    <div className="md:col-span-3">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Cari Kegiatan</label>
                        <span className="p-input-icon-left w-full">
                            <InputText
                                placeholder="Judul atau lokasi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Filter Status</label>
                        <Dropdown
                            value={filterStatus}
                            options={statusOptions}
                            onChange={(e) => setFilterStatus(e.value)}
                            placeholder="Semua Status"
                            className="w-full"
                            showClear
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Filter Tanggal</label>
                        <InputText type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="w-full" />
                    </div>
                    <Button label="Tambah" icon={<Plus size={16} />} className="p-button-success h-max" onClick={handleCreate} />
                </div>
            </div>

            {/* Meetings Table */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-4">
                    <h2 className="text-xl font-semibold text-gray-800">Daftar Kegiatan ({filteredMeetings.length})</h2>
                </div>

                <DataTable value={filteredMeetings} emptyMessage="Belum ada kegiatan. Tambahkan kegiatan pertama!" className="text-sm">
                    <Column field="name" header="Kegiatan" body={nameTemplate} style={{ minWidth: '250px' }} />
                    <Column field="start_time" header="Waktu" body={timeTemplate} style={{ width: '150px' }} />
                    <Column field="room" header="Lokasi" body={roomTemplate} style={{ width: '180px' }} />
                    <Column field="status" header="Status" body={statusTemplate} style={{ width: '180px' }} />
                    <Column header="Kehadiran" body={attendanceTemplate} style={{ width: '120px' }} />
                    <Column header="Detail" body={detailButtonTemplate} style={{ width: '140px' }} />
                    <Column header="Aksi" body={actionTemplate} style={{ width: '180px' }} />
                </DataTable>
            </div>
        </AdminLayout>
    );
};

export default AdminMeetingDashboard;
