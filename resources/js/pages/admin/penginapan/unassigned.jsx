import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import { ArrowLeft, Briefcase, DoorOpen, Phone, UserPlus, Users } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useState } from 'react';

const PesertaUnassigned = ({ users, employments, buildings, offices }) => {
    const [showAssignDialog, setShowAssignDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOffice, setFilterOffice] = useState(null);
    const [filterEmployment, setFilterEmployment] = useState(null);

    // Assignment state
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [availableRooms, setAvailableRooms] = useState([]);

    // Handlers
    const handleBack = () => {
        router.get('/admin/penginapan');
    };

    const handleAssignIndividual = (user) => {
        setSelectedUsers([user.id]);
        setSelectedBuilding(null);
        setSelectedRoom(null);
        setAvailableRooms([]);
        // setShowAssignDialog(true);
    };

    const handleAssignBulk = () => {
        if (selectedUsers.length === 0) return;

        setSelectedBuilding(null);
        setSelectedRoom(null);
        setAvailableRooms([]);
        // setShowAssignDialog(true);
    };

    const handleBuildingChange = (building) => {
        setSelectedBuilding(building);
        setAvailableRooms(building ? building.rooms : []);
        setSelectedRoom(null);
    };

    const handleAssignToRoom = () => {
        if (!selectedRoom) return;

        // Update room count
        const building = buildings.find((b) => b.id === selectedBuilding.id);
        const room = building.rooms.find((r) => r.id === selectedRoom.id);
        room.users_count += selectedUsers.length;

        // Remove assigned users
        setUsers(users.filter((u) => !selectedUsers.includes(u.id)));
        setSelectedUsers([]);
        setShowAssignDialog(false);

        alert(`Berhasil assign ${selectedUsers.length} peserta ke ${selectedBuilding.name} - ${selectedRoom.name}`);
    };

    const handleClearSelection = () => {
        setSelectedUsers([]);
    };

    // Templates
    const userNameTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-3">
                <Avatar label={rowData.name.charAt(0)} size="large" shape="circle" className="bg-orange-600 text-white" />
                <div>
                    <div className="font-semibold text-gray-800">{rowData.name}</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone size={12} />
                        {rowData.phone}
                    </div>
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

    const actionTemplate = (rowData) => {
        return (
            <Button
                label="Assign"
                icon={<UserPlus size={14} />}
                className="p-button-sm p-button-success"
                onClick={() => handleAssignIndividual(rowData)}
            />
        );
    };

    // Filtered data
    const filteredUsers = users
        .filter((u) => {
            const matchSearch =
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.phone.includes(searchQuery) ||
                u.office.name.toLowerCase().includes(searchQuery.toLowerCase());

            const matchOffice = !filterOffice || u.office.id === filterOffice.id;
            const matchEmployment = !filterEmployment || u.employment.id === filterEmployment.id;

            return matchSearch && matchOffice && matchEmployment;
        })
        .sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            if (nameCompare !== 0) return nameCompare;
            return a.office.name.localeCompare(b.office.name);
        });

    // Options for dropdowns
    const buildingOptions = buildings.map((b) => ({
        label: `${b.name} (${b.rooms.length} kamar)`,
        value: b,
    }));

    const roomOptions = availableRooms.map((r) => ({
        label: `${r.name} (${r.users_count} orang)`,
        value: r,
    }));

    const officeOptions = offices.map((o) => ({
        label: o.name,
        value: o,
    }));

    const employmentOptions = employments.map((e) => ({
        label: e.name,
        value: e,
    }));

    return (
        <AdminLayout>
            {/* Breadcrumb */}
            <div className="mb-6">
                <button onClick={handleBack} className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Kembali ke Dashboard</span>
                </button>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>Dashboard</span>
                    <span>›</span>
                    <span className="font-medium text-gray-800">Peserta Belum Terplotting</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Peserta Belum Terplotting</h1>
                <p className="mt-2 text-gray-600">Daftar peserta yang belum mendapatkan kamar penginapan</p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-1">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Total Belum Terplotting</p>
                            <p className="text-3xl font-bold text-orange-600">{users.length} Peserta</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                            <Users className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {/* {selectedUsers.length > 0 && (
                <div className="mb-6 rounded-lg bg-emerald-600 p-4 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users size={20} />
                            <span className="font-semibold">{selectedUsers.length} peserta dipilih</span>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                label="Assign Semua ke Kamar yang Sama"
                                icon={<UserPlus size={16} />}
                                className="p-button-sm border-0 bg-white text-emerald-600"
                                onClick={handleAssignBulk}
                            />
                            <Button
                                label="Batal Pilihan"
                                className="p-button-sm p-button-outlined border-white text-white hover:bg-white/10"
                                onClick={handleClearSelection}
                            />
                        </div>
                    </div>
                </div>
            )} */}

            {/* Filters & Search */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Cari Peserta</label>
                        <span className="p-input-icon-left w-full">
                            <InputText
                                placeholder="Nama, telepon, atau utusan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Filter Utusan</label>
                        <Dropdown
                            value={filterOffice}
                            options={officeOptions}
                            onChange={(e) => setFilterOffice(e.value)}
                            placeholder="Semua Utusan"
                            className="w-full"
                            showClear
                            filter
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Filter Jabatan</label>
                        <Dropdown
                            value={filterEmployment}
                            options={employmentOptions}
                            onChange={(e) => setFilterEmployment(e.value)}
                            placeholder="Semua Jabatan"
                            className="w-full"
                            showClear
                        />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-4">
                    <h2 className="text-xl font-semibold text-gray-800">Daftar Peserta ({filteredUsers.length})</h2>
                </div>

                <DataTable
                    value={filteredUsers}
                    selection={filteredUsers.filter((u) => selectedUsers.includes(u.id))}
                    onSelectionChange={(e) => setSelectedUsers(e.value.map((u) => u.id))}
                    dataKey="id"
                    emptyMessage="Tidak ada peserta yang belum terplotting"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    className="text-sm"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                    <Column field="name" header="Nama Peserta" body={userNameTemplate} />
                    <Column field="office.name" header="Utusan" body={officeTemplate} />
                    <Column field="employment.name" header="Jabatan" body={employmentTemplate} style={{ width: '150px' }} />
                    {/* <Column header="Aksi" body={actionTemplate} style={{ width: '150px' }} /> */}
                </DataTable>
            </div>

            {/* Dialog Assign to Room */}
            <Dialog
                header={selectedUsers.length === 1 ? `Assign Peserta ke Kamar` : `Assign ${selectedUsers.length} Peserta ke Kamar`}
                visible={showAssignDialog}
                style={{ width: '550px' }}
                onHide={() => setShowAssignDialog(false)}
                footer={
                    <div>
                        <Button label="Batal" className="p-button-text" onClick={() => setShowAssignDialog(false)} />
                        <Button label="Assign ke Kamar" className="p-button-success" onClick={handleAssignToRoom} disabled={!selectedRoom} />
                    </div>
                }
            >
                <div className="flex flex-col gap-4 pt-4">
                    {selectedUsers.length > 1 && (
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                            <p className="text-sm text-blue-800">
                                <strong>{selectedUsers.length} peserta</strong> akan di-assign ke kamar yang sama
                            </p>
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            1. Pilih Gedung <span className="text-red-500">*</span>
                        </label>
                        <Dropdown
                            value={selectedBuilding}
                            options={buildingOptions}
                            onChange={(e) => handleBuildingChange(e.value)}
                            placeholder="Pilih gedung"
                            className="w-full"
                            filter
                        />
                    </div>

                    {selectedBuilding && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                2. Pilih Kamar <span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                value={selectedRoom}
                                options={roomOptions}
                                onChange={(e) => setSelectedRoom(e.value)}
                                placeholder="Pilih kamar"
                                className="w-full"
                                disabled={availableRooms.length === 0}
                                filter
                            />
                            {availableRooms.length === 0 && (
                                <p className="mt-2 text-sm text-red-600">Gedung ini belum memiliki kamar. Tambahkan kamar terlebih dahulu.</p>
                            )}
                        </div>
                    )}

                    {selectedRoom && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                                    <DoorOpen className="text-emerald-600" size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1 font-semibold text-emerald-800">
                                        {selectedBuilding.name} - {selectedRoom.name}
                                    </p>
                                    <p className="text-sm text-emerald-700">
                                        Saat ini: <strong>{selectedRoom.users_count} orang</strong>
                                    </p>
                                    <p className="text-sm text-emerald-700">
                                        Setelah assign: <strong>{selectedRoom.users_count + selectedUsers.length} orang</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Dialog>
        </AdminLayout>
    );
};

export default PesertaUnassigned;
