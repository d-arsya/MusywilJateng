import AdminLayout from '@/layouts/admin';
import { router, useForm } from '@inertiajs/react';
import { ArrowLeft, Briefcase, UserPlus, Users, UserX } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useState } from 'react';

const AdminMeetingAssign = ({ meeting, offices, employments, allUsers }) => {
    // Filter states for available users
    const [filterOffice, setFilterOffice] = useState(null);
    const [filterEmployment, setFilterEmployment] = useState(null);
    const [searchAvailable, setSearchAvailable] = useState('');

    // Search for assigned users
    const [searchAssigned, setSearchAssigned] = useState('');

    // Selection states
    const [selectedAvailable, setSelectedAvailable] = useState([]);
    const [selectedAssigned, setSelectedAssigned] = useState([]);

    // Get assigned and available users
    const assignedUsers = allUsers.filter((u) => u.assigned);
    const availableUsers = allUsers.filter((u) => !u.assigned);

    const { put } = useForm(null);

    // Handlers
    const handleBack = () => {
        router.get('/admin/kegiatan');
    };

    const handleAssignSelected = () => {
        put('/admin/kegiatan/assign/' + meeting.code + '?users=' + selectedAvailable.join(','), {
            onError: (err) => console.log(err),
        });
    };

    const handleAssignAll = () => {
        const filtered = getFilteredAvailable();

        if (filtered.length === 0) return;

        confirmDialog({
            message: `Assign ${filtered.length} peserta sesuai filter ke kegiatan ini?`,
            header: 'Konfirmasi Assign',
            icon: 'pi pi-check-circle',
            acceptLabel: 'Assign',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-success',
            accept: () => {
                const userIds = filtered.map((u) => u.id);
                put('/admin/kegiatan/assign/' + meeting.code + '?users=' + userIds.join(','), {
                    onError: (err) => console.log(err),
                });
            },
        });
    };

    const handleUnassignSelected = () => {
        if (selectedAssigned.length === 0) return;
        const userIds = selectedAssigned.map((u) => u.id);
        put('/admin/kegiatan/unassign/' + meeting.code + '?users=' + userIds.join(','), {
            onError: (err) => console.log(err),
        });
        // // Check if any selected user has attended
        // const usersToUnassign = allUsers.filter((u) => selectedAssigned.includes(u.id));
        // const hasAttended = usersToUnassign.some((u) => u.attended);

        // if (hasAttended) {
        //     alert('Tidak bisa unassign peserta yang sudah check-in!');
        //     return;
        // }

        // confirmDialog({
        //     message: `Unassign ${usersToUnassign.length} peserta dari kegiatan ini?`,
        //     header: 'Konfirmasi Unassign',
        //     icon: 'pi pi-exclamation-triangle',
        //     acceptLabel: 'Unassign',
        //     rejectLabel: 'Batal',
        //     acceptClassName: 'p-button-danger',
        //     accept: () => {
        //         const updatedUsers = allUsers.map((u) => (selectedAssigned.includes(u.id) ? { ...u, assigned: false } : u));
        //         setAllUsers(updatedUsers);
        //         setSelectedAssigned([]);
        //         alert(`Berhasil unassign ${usersToUnassign.length} peserta`);
        //     },
        // });
    };

    // Filtering
    const getFilteredAvailable = () => {
        return availableUsers.filter((u) => {
            const matchSearch = u.name.toLowerCase().includes(searchAvailable.toLowerCase()) || u.phone.includes(searchAvailable);

            const matchOffice = !filterOffice || u.office.id === filterOffice.id;
            const matchEmployment = !filterEmployment || u.employment.id === filterEmployment.id;

            return matchSearch && matchOffice && matchEmployment;
        });
    };

    const getFilteredAssigned = () => {
        return (
            assignedUsers.filter((u) => u.name.toLowerCase().includes(searchAssigned.toLowerCase()) || u.phone.includes(searchAssigned)) ||
            u.office.name.toLowerCase().includes(searchAssigned.toLowerCase()) ||
            u.office.type.toLowerCase().includes(searchAssigned.toLowerCase())
        );
    };

    const filteredAvailable = getFilteredAvailable();
    const filteredAssigned = getFilteredAssigned();

    // Templates
    const userNameTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-3">
                <Avatar
                    image={user.avatar || undefined}
                    label={!user.avatar ? user.name.charAt(0) : undefined}
                    size="normal"
                    shape="circle"
                    className="bg-emerald-600 text-white"
                />
                <div>
                    <div className="font-semibold text-gray-800">{rowData.name}</div>
                    <div className="text-sm text-gray-600">{rowData.phone}</div>
                </div>
            </div>
        );
    };

    const officeTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-gray-500" />
                <span className="text-sm">{rowData.office.name}</span>
            </div>
        );
    };

    const employmentTemplate = (rowData) => {
        const colors = {
            Pembina: 'info',
            Pengurus: 'success',
            Pengawas: 'warning',
            Anggota: 'secondary',
        };
        return <Tag value={rowData.employment.name} severity={colors[rowData.employment.name] || 'secondary'} />;
    };

    const statusTemplate = (rowData) => {
        if (rowData.attended) {
            return <Tag value="Hadir" severity="success" icon="pi pi-check" />;
        }
        return <Tag value="Belum" severity="secondary" />;
    };

    // Options
    const officeOptions = offices.map((o) => ({ label: o.type + ' ' + o.name, value: o }));
    const employmentOptions = employments.map((e) => ({ label: e.name, value: e }));

    return (
        <AdminLayout>
            <ConfirmDialog />

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
                    <span className="font-medium text-gray-800">Assign Peserta</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Assign Peserta</h1>
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
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Total Assigned</p>
                            <p className="text-3xl font-bold text-emerald-600">{assignedUsers.length}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <Users className="text-emerald-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Available</p>
                            <p className="text-3xl font-bold text-blue-600">{availableUsers.length}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <UserPlus className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Sudah Check-in</p>
                            <p className="text-3xl font-bold text-orange-600">{assignedUsers.filter((u) => u.attended).length}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                            <Users className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Split Screen */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* LEFT: Available Users */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 bg-blue-50 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                <UserPlus className="text-blue-600" size={20} />
                                Peserta Tersedia ({filteredAvailable.length})
                            </h2>
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 gap-3">
                            <InputText
                                placeholder="Cari nama atau telepon..."
                                value={searchAvailable}
                                onChange={(e) => setSearchAvailable(e.target.value)}
                                className="w-full"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <Dropdown
                                    value={filterOffice}
                                    options={officeOptions}
                                    onChange={(e) => setFilterOffice(e.value)}
                                    placeholder="Filter Utusan"
                                    className="w-full"
                                    showClear
                                />
                                <Dropdown
                                    value={filterEmployment}
                                    options={employmentOptions}
                                    onChange={(e) => setFilterEmployment(e.value)}
                                    placeholder="Filter Jabatan"
                                    className="w-full"
                                    showClear
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bulk Actions */}
                    {selectedAvailable.length > 0 && (
                        <div className="flex items-center justify-between bg-emerald-600 p-3 text-white">
                            <span className="font-semibold">{selectedAvailable.length} dipilih</span>
                            <Button
                                label="Assign Selected"
                                icon={<UserPlus size={14} />}
                                className="p-button-sm border-0 bg-white text-emerald-600"
                                onClick={handleAssignSelected}
                            />
                        </div>
                    )}

                    <div className="p-4">
                        <Button
                            label={`Assign Semua Sesuai Filter (${filteredAvailable.length})`}
                            icon={<UserPlus size={16} />}
                            className="p-button-success mb-3 w-full"
                            onClick={handleAssignAll}
                            disabled={filteredAvailable.length === 0}
                        />
                    </div>

                    <DataTable
                        value={filteredAvailable}
                        selection={filteredAvailable.filter((u) => selectedAvailable.includes(u.id))}
                        onSelectionChange={(e) => setSelectedAvailable(e.value.map((u) => u.id))}
                        dataKey="id"
                        emptyMessage="Tidak ada peserta tersedia"
                        scrollable
                        scrollHeight="500px"
                        className="text-sm"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                        <Column field="name" header="Nama" body={userNameTemplate} />
                        <Column field="office.name" header="Utusan" body={officeTemplate} />
                        <Column field="employment.name" header="Jabatan" body={employmentTemplate} />
                    </DataTable>
                </div>

                {/* RIGHT: Assigned Users */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 bg-emerald-50 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                <Users className="text-emerald-600" size={20} />
                                Peserta Assigned ({filteredAssigned.length})
                            </h2>
                        </div>

                        {/* Search */}
                        <InputText
                            placeholder="Cari nama, Utusan, atau telepon..."
                            value={searchAssigned}
                            onChange={(e) => setSearchAssigned(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Bulk Actions */}
                    {selectedAssigned.length > 0 && (
                        <div className="flex items-center justify-between bg-red-600 p-3 text-white">
                            <span className="font-semibold">{selectedAssigned.length} dipilih</span>
                            <Button
                                label="Unassign Selected"
                                icon={<UserX size={14} />}
                                className="p-button-sm border-0 bg-white text-red-600"
                                onClick={handleUnassignSelected}
                            />
                        </div>
                    )}

                    <DataTable
                        value={filteredAssigned}
                        selection={selectedAssigned}
                        onSelectionChange={(e) => setSelectedAssigned(e.value)}
                        dataKey="id"
                        scrollable
                        scrollHeight="500px"
                        virtualScrollerOptions={{ itemSize: 40 }} // tinggi tiap baris
                        lazy
                        className="text-sm"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                        <Column field="name" header="Nama" body={userNameTemplate} />
                        <Column field="office.name" header="Utusan" body={officeTemplate} />
                        <Column header="Status" body={statusTemplate} />
                    </DataTable>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminMeetingAssign;
