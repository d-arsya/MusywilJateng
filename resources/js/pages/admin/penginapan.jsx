import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import { Building2, DoorOpen, Edit2, Plus, Search, Trash2, Users } from 'lucide-react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

// Dummy Data
// const dummyBuildings = [
//     { id: 1, name: 'Gedung Aswad', rooms_count: 8, users_count: 45 },
//     { id: 2, name: 'Gedung Biru', rooms_count: 5, users_count: 32 },
//     { id: 3, name: 'Gedung Merah', rooms_count: 3, users_count: 18 },
// ];

const DashboardPenginapan = ({ buildings }) => {
    // const [buildings, setBuildings] = useState(dummyBuildings);
    const [showDialog, setShowDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentBuilding, setCurrentBuilding] = useState(null);
    const [buildingName, setBuildingName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Stats
    const totalBuildings = buildings.length;
    const totalRooms = buildings.reduce((sum, b) => sum + b.rooms_count, 0);
    const totalAssigned = buildings.reduce((sum, b) => sum + b.users_count, 0);
    const totalUnassigned = 23; // Dummy

    // Handlers
    const handleAddBuilding = () => {
        setEditMode(false);
        setCurrentBuilding(null);
        setBuildingName('');
        setShowDialog(true);
    };

    const handleEditBuilding = (building) => {
        setEditMode(true);
        setCurrentBuilding(building);
        setBuildingName(building.name);
        setShowDialog(true);
    };

    const handleSaveBuilding = () => {
        if (editMode) {
            // Update
            setBuildings(buildings.map((b) => (b.id === currentBuilding.id ? { ...b, name: buildingName } : b)));
        } else {
            // Create
            const newBuilding = {
                id: Math.max(...buildings.map((b) => b.id)) + 1,
                name: buildingName,
                rooms_count: 0,
                users_count: 0,
            };
            setBuildings([...buildings, newBuilding]);
        }
        setShowDialog(false);
    };

    const handleDeleteBuilding = (building) => {
        confirmDialog({
            message: `Apakah Anda yakin ingin menghapus ${building.name}?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Hapus',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-danger',
            accept: () => {
                setBuildings(buildings.filter((b) => b.id !== building.id));
            },
        });
    };

    const handleViewDetail = (building) => {
        // console.log('Navigate to detail gedung:', building.id);
        router.get('/admin/penginapan/gedung/' + building.name);
    };

    // Templates
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon={<Edit2 size={16} />}
                    className="p-button-rounded p-button-text p-button-sm"
                    onClick={() => handleEditBuilding(rowData)}
                    tooltip="Edit"
                />
                <Button
                    icon={<Trash2 size={16} />}
                    className="p-button-rounded p-button-text p-button-danger p-button-sm"
                    onClick={() => handleDeleteBuilding(rowData)}
                    tooltip="Hapus"
                />
            </div>
        );
    };

    const buildingNameTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <Building2 className="text-emerald-600" size={20} />
                </div>
                <div>
                    <div className="font-semibold text-gray-800">{rowData.name}</div>
                </div>
            </div>
        );
    };

    const roomsTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2">
                <DoorOpen size={16} className="text-gray-500" />
                <span className="font-medium">{rowData.rooms_count} Kamar</span>
            </div>
        );
    };

    const usersTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-500" />
                <span className="font-medium">{rowData.users_count} Orang</span>
            </div>
        );
    };

    const viewButtonTemplate = (rowData) => {
        return <Button label="Lihat Detail" className="p-button-sm p-button-outlined" onClick={() => handleViewDetail(rowData)} />;
    };

    return (
        <AdminLayout>
            <ConfirmDialog />

            {/* Header */}
            <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold text-gray-800">Manajemen Penginapan</h1>
                <p className="text-gray-600">Kelola gedung, kamar, dan penempatan peserta Munas</p>
            </div>

            {/* Stats Bar */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Total Gedung</p>
                            <p className="text-3xl font-bold text-gray-800">{totalBuildings}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <Building2 className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Total Kamar</p>
                            <p className="text-3xl font-bold text-gray-800">{totalRooms}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <DoorOpen className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Sudah Terplotting</p>
                            <p className="text-3xl font-bold text-emerald-600">{totalAssigned}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <Users className="text-emerald-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Belum Terplotting</p>
                            <p className="text-3xl font-bold text-orange-600">{totalUnassigned}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                            <Users className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap gap-3">
                    <Button label="Tambah Gedung Baru" icon={<Plus size={16} />} className="p-button-success" onClick={handleAddBuilding} />
                    <Button
                        label="Lihat Peserta Belum Terplotting"
                        icon={<Users size={16} />}
                        className="p-button-warning"
                        onClick={() => console.log('Navigate to unassigned')}
                    />
                </div>
            </div>

            {/* Buildings Table */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Daftar Gedung</h2>
                        <div className="flex items-center gap-2">
                            <span className="p-input-icon-left">
                                <Search size={16} className="text-gray-400" />
                                <InputText
                                    placeholder="Cari gedung..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="p-inputtext-sm"
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <DataTable
                    value={buildings.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                    sortField="name"
                    sortOrder={1}
                    emptyMessage="Belum ada gedung. Tambahkan gedung pertama!"
                    className="text-sm"
                >
                    <Column field="name" header="Nama Gedung" body={buildingNameTemplate} sortable />
                    <Column field="rooms_count" header="Jumlah Kamar" body={roomsTemplate} sortable />
                    <Column field="users_count" header="Jumlah Penghuni" body={usersTemplate} sortable />
                    <Column header="Detail" body={viewButtonTemplate} style={{ width: '150px' }} />
                    <Column header="Aksi" body={actionBodyTemplate} style={{ width: '120px' }} />
                </DataTable>
            </div>

            {/* Dialog Create/Edit Building */}
            <Dialog
                header={editMode ? 'Edit Gedung' : 'Tambah Gedung Baru'}
                visible={showDialog}
                style={{ width: '450px' }}
                onHide={() => setShowDialog(false)}
                footer={
                    <div>
                        <Button label="Batal" className="p-button-text" onClick={() => setShowDialog(false)} />
                        <Button
                            label={editMode ? 'Simpan' : 'Tambah'}
                            className="p-button-success"
                            onClick={handleSaveBuilding}
                            disabled={!buildingName.trim()}
                        />
                    </div>
                }
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nama Gedung <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            value={buildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                            placeholder="Contoh: Gedung Aswad"
                            className="w-full"
                            autoFocus
                        />
                    </div>
                </div>
            </Dialog>
        </AdminLayout>
    );
};

export default DashboardPenginapan;
