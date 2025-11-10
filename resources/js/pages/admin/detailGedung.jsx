import AdminLayout from '@/layouts/admin';
import { router, useForm } from '@inertiajs/react';
import { ArrowLeft, DoorOpen, Edit2, Plus, Search, Trash2, UserPlus, Users } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useState } from 'react';

const DetailGedung = ({ building, rooms, unassignedUsers }) => {
    const [showRoomDialog, setShowRoomDialog] = useState(false);
    const [showAssignDialog, setShowAssignDialog] = useState(false);
    const [editRoomMode, setEditRoomMode] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomName, setRoomName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Assignment state
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userSearchQuery, setUserSearchQuery] = useState('');

    const { data, setData, post, put, delete: destroy } = useForm({ name: '' });

    // Handlers - Room CRUD
    const handleAddRoom = () => {
        setEditRoomMode(false);
        setCurrentRoom(null);
        setRoomName('');
        setShowRoomDialog(true);
    };

    const handleEditRoom = (room) => {
        setEditRoomMode(true);
        setCurrentRoom(room);
        setData('name', room.name);
        setShowRoomDialog(true);
    };

    const handleSaveRoom = () => {
        if (editRoomMode) {
            put('/admin/penginapan/gedung/' + building.name + '/kamar/' + currentRoom.id, {
                onError: (errs) => {
                    console.log('Validation Errors:', errs); // ✅ logs server-side validation errors
                },
                onSuccess: () => console.log('SUCCESS'),
            });
        } else {
            post('/admin/penginapan/gedung/' + building.name + '/kamar', {
                onError: (errs) => {
                    console.log('Validation Errors:', errs); // ✅ logs server-side validation errors
                },
                onSuccess: () => console.log('SUCCESS'),
            });
        }
        setShowRoomDialog(false);
    };

    const handleDeleteRoom = (room) => {
        if (room.users_count > 0) {
            alert('Tidak bisa menghapus kamar yang masih berpenghuni!');
            return;
        }

        confirmDialog({
            message: `Apakah Anda yakin ingin menghapus ${room.name}?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Hapus',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-danger',
            accept: () => {
                destroy('/admin/penginapan/gedung/' + building.name + '/kamar/' + room.id, {
                    onError: (errs) => {
                        console.log('Validation Errors:', errs); // ✅ logs server-side validation errors
                    },
                    onSuccess: () => console.log('SUCCESS'),
                });
            },
        });
    };

    const handleViewRoomDetail = (room) => {
        router.get('/admin/penginapan/gedung/' + building.name + '/kamar/' + room.name);
    };

    // Handlers - Assignment
    const handleOpenAssign = (room) => {
        setCurrentRoom(room);
        setSelectedRoom(room);
        setSelectedUsers([]);
        setUserSearchQuery('');
        setShowAssignDialog(true);
    };

    const handleAssignUsers = () => {
        if (selectedUsers.length === 0) return;

        // Simulate assignment
        const updatedRoom = rooms.find((r) => r.id === selectedRoom.id);
        updatedRoom.users_count += selectedUsers.length;

        setRooms([...rooms]);
        setUnassignedUsers(unassignedUsers.filter((u) => !selectedUsers.includes(u.id)));
        setShowAssignDialog(false);

        alert(`Berhasil assign ${selectedUsers.length} peserta ke ${selectedRoom.name}`);
    };

    const handleBackToDashboard = () => {
        router.get('/admin/penginapan');
    };

    // Templates
    const roomNameTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <DoorOpen className="text-purple-600" size={20} />
                </div>
                <div>
                    <div className="font-semibold text-gray-800">{rowData.name}</div>
                </div>
            </div>
        );
    };

    const usersCountTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-500" />
                <span className="font-medium">{rowData.users_count} Orang</span>
            </div>
        );
    };

    const statusTemplate = (rowData) => {
        if (rowData.users_count === 0) {
            return <Tag value="Kosong" severity="secondary" />;
        } else if (rowData.users_count < 5) {
            return <Tag value="Tersedia" severity="success" />;
        } else if (rowData.users_count < 8) {
            return <Tag value="Sedang" severity="warning" />;
        } else {
            return <Tag value="Ramai" severity="info" />;
        }
    };

    const actionTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon={<UserPlus size={16} />}
                    className="p-button-rounded p-button-text p-button-success p-button-sm"
                    onClick={() => handleOpenAssign(rowData)}
                    tooltip="Tambah Peserta"
                />
                <Button
                    icon={<Edit2 size={16} />}
                    className="p-button-rounded p-button-text p-button-sm"
                    onClick={() => handleEditRoom(rowData)}
                    tooltip="Edit"
                />
                <Button
                    icon={<Trash2 size={16} />}
                    className="p-button-rounded p-button-text p-button-danger p-button-sm"
                    onClick={() => handleDeleteRoom(rowData)}
                    tooltip="Hapus"
                    disabled={rowData.users_count > 0}
                />
            </div>
        );
    };

    const viewButtonTemplate = (rowData) => {
        return <Button label="Lihat Detail" className="p-button-sm p-button-outlined" onClick={() => handleViewRoomDetail(rowData)} />;
    };

    // Filtered data
    const filteredRooms = rooms
        .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name);
            if (nameCompare !== 0) return nameCompare;
            return b.users_count - a.users_count;
        });

    const filteredUsers = unassignedUsers.filter(
        (u) => u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || u.office.name.toLowerCase().includes(userSearchQuery.toLowerCase()),
    );

    return (
        <AdminLayout>
            <ConfirmDialog />

            {/* Breadcrumb */}
            <div className="mb-6">
                <button onClick={handleBackToDashboard} className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Kembali ke Dashboard</span>
                </button>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>Dashboard</span>
                    <span>›</span>
                    <span className="font-medium text-gray-800">{building.name}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{building.name}</h1>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Total Kamar</p>
                            <p className="text-3xl font-bold text-gray-800">{rooms.length}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                            <DoorOpen className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Total Penghuni</p>
                            <p className="text-3xl font-bold text-emerald-600">{rooms.reduce((sum, r) => sum + r.users_count, 0)}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <Users className="text-emerald-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap gap-3">
                    <Button label="Tambah Kamar Baru" icon={<Plus size={16} />} className="p-button-success" onClick={handleAddRoom} />
                </div>
            </div>

            {/* Rooms Table */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-800">Daftar Kamar</h2>
                        <div className="flex items-center gap-2">
                            <span className="p-input-icon-left">
                                <Search size={16} className="text-gray-400" />
                                <InputText
                                    placeholder="Cari kamar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="p-inputtext-sm"
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <DataTable value={filteredRooms} emptyMessage="Belum ada kamar. Tambahkan kamar pertama!" className="text-sm">
                    <Column field="name" header="Nama Kamar" body={roomNameTemplate} />
                    <Column field="users_count" header="Jumlah Penghuni" body={usersCountTemplate} />
                    <Column header="Status" body={statusTemplate} style={{ width: '120px' }} />
                    <Column header="Detail" body={viewButtonTemplate} style={{ width: '150px' }} />
                    <Column header="Aksi" body={actionTemplate} style={{ width: '150px' }} />
                </DataTable>
            </div>

            {/* Dialog Create/Edit Room */}
            <Dialog
                header={editRoomMode ? 'Edit Kamar' : 'Tambah Kamar Baru'}
                visible={showRoomDialog}
                style={{ width: '450px' }}
                onHide={() => setShowRoomDialog(false)}
                footer={
                    <div>
                        <Button label="Batal" className="p-button-text" onClick={() => setShowRoomDialog(false)} />
                        <Button
                            label={editRoomMode ? 'Simpan' : 'Tambah'}
                            className="p-button-success"
                            onClick={handleSaveRoom}
                            disabled={!data.name.trim()}
                        />
                    </div>
                }
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nama Kamar <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Contoh: Kamar 1"
                            className="w-full"
                            autoFocus
                        />
                    </div>
                </div>
            </Dialog>

            {/* Dialog Assign Users */}
            <Dialog
                header={`Tambah Peserta ke ${selectedRoom?.name}`}
                visible={showAssignDialog}
                style={{ width: '600px', maxHeight: '80vh' }}
                onHide={() => setShowAssignDialog(false)}
                footer={
                    <div>
                        <Button label="Batal" className="p-button-text" onClick={() => setShowAssignDialog(false)} />
                        <Button
                            label={`Assign ${selectedUsers.length} Peserta`}
                            className="p-button-success"
                            onClick={handleAssignUsers}
                            disabled={selectedUsers.length === 0}
                        />
                    </div>
                }
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                        <p className="text-sm text-blue-800">
                            <strong>{selectedRoom?.users_count || 0} orang</strong> sudah berada di kamar ini
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">Pilih Peserta Belum Terplotting</label>
                        <span className="p-input-icon-left w-full">
                            <Search size={16} className="text-gray-400" />
                            <InputText
                                placeholder="Cari nama atau utusan..."
                                value={userSearchQuery}
                                onChange={(e) => setUserSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </span>
                    </div>

                    <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200">
                        {filteredUsers.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Tidak ada peserta yang belum terplotting</div>
                        ) : (
                            filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={`flex cursor-pointer items-center gap-3 border-b border-gray-100 p-3 hover:bg-gray-50 ${
                                        selectedUsers.includes(user.id) ? 'bg-emerald-50' : ''
                                    }`}
                                    onClick={() => {
                                        if (selectedUsers.includes(user.id)) {
                                            setSelectedUsers(selectedUsers.filter((id) => id !== user.id));
                                        } else {
                                            setSelectedUsers([...selectedUsers, user.id]);
                                        }
                                    }}
                                >
                                    <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => {}} className="h-4 w-4" />
                                    <Avatar label={user.name.charAt(0)} size="normal" shape="circle" className="bg-emerald-600 text-white" />
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800">{user.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {user.office.name} • {user.employment.name}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {selectedUsers.length > 0 && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                            <p className="text-sm text-emerald-800">
                                <strong>{selectedUsers.length} peserta</strong> dipilih untuk di-assign
                            </p>
                        </div>
                    )}
                </div>
            </Dialog>
        </AdminLayout>
    );
};

export default DetailGedung;
