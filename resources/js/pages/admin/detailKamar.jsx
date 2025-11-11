import AdminLayout from '@/layouts/admin';
import { router, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRightLeft, Briefcase, Edit2, Phone, Trash2, UserPlus, Users, UserX } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useState } from 'react';

const DetailKamar = ({ room, unassignedUsers, otherRooms }) => {
    const users = room.users;

    const [showEditRoomDialog, setShowEditRoomDialog] = useState(false);
    const [showAddUserDialog, setShowAddUserDialog] = useState(false);
    const [showMoveDialog, setShowMoveDialog] = useState(false);
    const [roomName, setRoomName] = useState(room.name);
    const { delete: destroy } = useForm(null);
    const [selectedUsersForBulk, setSelectedUsersForBulk] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [targetRoom, setTargetRoom] = useState(null);

    const { data: newData, setData: setNewData, put: putNewData } = useForm({ users: [], room: room.id });

    // Handlers - Room Edit
    const handleEditRoom = () => {
        setRoomName(room.name);
        setShowEditRoomDialog(true);
    };

    const handleSaveRoom = () => {
        setRoom({ ...room, name: roomName });
        setShowEditRoomDialog(false);
    };

    const handleDeleteRoom = () => {
        if (users.length > 0) return;

        confirmDialog({
            message: `Apakah Anda yakin ingin menghapus ${room.name}?`,
            header: 'Konfirmasi Hapus',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Hapus',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-danger',
            accept: () => {
                destroy('/admin/penginapan/gedung/' + room.building.name + '/kamar/' + room.id, {
                    onError: (errs) => {
                        console.log('Validation Errors:', errs); // ✅ logs server-side validation errors
                    },
                    onSuccess: () => console.log('SUCCESS'),
                });
            },
        });
    };

    // Handlers - Add Users
    const handleOpenAddUser = () => {
        setNewData('users', []);
        setShowAddUserDialog(true);
    };

    const handleAddUsers = () => {
        putNewData('/admin/penginapan/assign', {
            onSuccess: () => setShowAddUserDialog(false),
            onError: () => setShowAddUserDialog(false),
        });
    };

    // Handlers - Move User
    const handleOpenMove = (user) => {
        setCurrentUser(user);
        setTargetRoom(null);
        setShowMoveDialog(true);
    };

    const handleMoveUser = () => {
        setNewData('room', targetRoom.id);
        putNewData('/admin/penginapan/assign', {
            onSuccess: () => setShowMoveDialog(false),
            onError: (err) => console.log(err),
        });
    };

    // Handlers - Remove User
    const handleRemoveUser = (user) => {
        confirmDialog({
            message: `Keluarkan ${user.name} dari ${room.name}?`,
            header: 'Konfirmasi Keluarkan',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Keluarkan',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-danger',
            accept: () => {
                setSelectedUsersForBulk([]);
                putNewData('/admin/penginapan/unassigned/' + user.code, {
                    onSuccess: () => {
                        setShowAddUserDialog(false);
                    },
                    onError: (err) => {
                        setShowAddUserDialog(false);
                    },
                });
            },
        });
    };

    // Handlers - Bulk Operations
    const handleBulkMove = () => {
        if (selectedUsersForBulk.length === 0) return;

        setCurrentUser(null);
        setTargetRoom(null);
        setShowMoveDialog(true);
    };

    const handleBulkRemove = () => {
        if (selectedUsersForBulk.length === 0) return;

        confirmDialog({
            message: `Keluarkan ${selectedUsersForBulk.length} peserta dari ${room.name}?`,
            header: 'Konfirmasi Keluarkan',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Keluarkan',
            rejectLabel: 'Batal',
            acceptClassName: 'p-button-danger',
            accept: () => {
                let data = selectedUsersForBulk.map((u) => u.code);
                putNewData('/admin/penginapan/unassigned/bulk?code=' + data.join(','), {
                    onSuccess: () => setShowAddUserDialog(false),
                    onError: (err) => {
                        console.log(err);
                    },
                });
            },
        });
    };

    const handleMoveBulk = () => {
        if (!targetRoom || newData.length === 0) return;
        console.log(newData);
        putNewData('/admin/penginapan/assign', {
            onSuccess: () => setShowMoveDialog(false),
            onError: (err) => console.log(err),
        });
    };

    const handleBack = () => {
        router.get('/admin/penginapan/gedung/' + room.building.name);
    };

    // Templates
    const userNameTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-3">
                <Avatar label={rowData.name.charAt(0)} size="large" shape="circle" className="bg-emerald-600 text-white" />
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
                <span className="text-sm">
                    {rowData.office.type} {rowData.office.name}
                </span>
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
            <div className="flex gap-2">
                {/* <Button
                    icon={<ArrowRightLeft size={16} />}
                    className="p-button-rounded p-button-text p-button-info p-button-sm"
                    onClick={() => handleOpenMove(rowData)}
                    tooltip="Pindah Kamar"
                /> */}
                <Button
                    icon={<UserX size={16} />}
                    className="p-button-rounded p-button-text p-button-danger"
                    onClick={() => handleRemoveUser(rowData)}
                    tooltip="Keluarkan"
                />
            </div>
        );
    };

    // Sorted users
    const sortedUsers = [...users].sort((a, b) => {
        const nameCompare = a.name.localeCompare(b.name);
        if (nameCompare !== 0) return nameCompare;
        return a.office.name.localeCompare(b.office.name);
    });

    // Room options for move
    const roomOptions = otherRooms.map((r) => ({
        label: `${r.building.name} - ${r.name}`,
        value: r,
    }));

    return (
        <AdminLayout>
            <ConfirmDialog />

            {/* Breadcrumb */}
            <div className="mb-6">
                <button onClick={handleBack} className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Kembali ke {room.building.name}</span>
                </button>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>Dashboard</span>
                    <span>›</span>
                    <span>{room.building.name}</span>
                    <span>›</span>
                    <span className="font-medium text-gray-800">{room.name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {room.building.name} - {room.name}
                    </h1>
                    <div className="flex gap-2">
                        <Button icon={<Edit2 size={16} />} label="Edit" className="p-button-outlined p-button-sm" onClick={handleEditRoom} />
                        <Button
                            icon={<Trash2 size={16} />}
                            label="Hapus"
                            className="p-button-outlined p-button-danger p-button-sm"
                            onClick={handleDeleteRoom}
                            disabled={users.length > 0}
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-1">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">Jumlah Penghuni</p>
                            <p className="text-3xl font-bold text-emerald-600">{users.length} Orang</p>
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
                    <Button label="Tambah Peserta ke Kamar" icon={<UserPlus size={16} />} className="p-button-success" onClick={handleOpenAddUser} />
                    {selectedUsersForBulk.length > 0 && (
                        <>
                            <Button
                                label={`Pindahkan ${newData.users.length} Peserta`}
                                icon={<ArrowRightLeft size={16} />}
                                className="p-button-info"
                                onClick={handleBulkMove}
                            />
                            <Button
                                label={`Keluarkan ${newData.users.length} Peserta`}
                                icon={<UserX size={16} />}
                                className="p-button-danger"
                                onClick={handleBulkRemove}
                            />
                        </>
                    )}
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-4">
                    <h2 className="text-xl font-semibold text-gray-800">Daftar Penghuni</h2>
                </div>

                <DataTable
                    value={sortedUsers}
                    selection={selectedUsersForBulk}
                    onSelectionChange={(e) => {
                        const selected = e.value;
                        const userIds = selected.map((w) => w.id);
                        setSelectedUsersForBulk(selected);
                        setNewData('users', userIds);
                    }}
                    dataKey="id"
                    emptyMessage="Kamar ini masih kosong. Tambahkan peserta!"
                    className="text-sm"
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                    <Column field="name" header="Nama Peserta" body={userNameTemplate} />
                    <Column field="office.name" header="Utusan" body={officeTemplate} />
                    <Column field="employment.name" header="Jabatan" body={employmentTemplate} style={{ width: '150px' }} />
                    <Column header="Aksi" body={actionTemplate} style={{ width: '120px' }} />
                </DataTable>
            </div>

            {/* Dialog Edit Room */}
            <Dialog
                header="Edit Nama Kamar"
                visible={showEditRoomDialog}
                style={{ width: '450px' }}
                onHide={() => setShowEditRoomDialog(false)}
                footer={
                    <div>
                        <Button label="Batal" className="p-button-text" onClick={() => setShowEditRoomDialog(false)} />
                        <Button label="Simpan" className="p-button-success" onClick={handleSaveRoom} disabled={!roomName.trim()} />
                    </div>
                }
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nama Kamar <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="Contoh: Kamar 1"
                            className="w-full"
                            autoFocus
                        />
                    </div>
                </div>
            </Dialog>

            {/* Dialog Add Users */}
            <Dialog
                header={`Tambah Peserta ke ${room.name}`}
                visible={showAddUserDialog}
                style={{ width: '600px', maxHeight: '80vh' }}
                onHide={() => setShowAddUserDialog(false)}
                footer={
                    <div>
                        <Button label="Batal" className="p-button-text" onClick={() => setShowAddUserDialog(false)} />
                        <Button
                            label={`Tambahkan ${newData.users.length} Peserta`}
                            className="p-button-success"
                            onClick={handleAddUsers}
                            disabled={newData.users.length === 0}
                        />
                    </div>
                }
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                        <p className="text-sm text-blue-800">
                            <strong>{users.length} orang</strong> sudah berada di kamar ini
                        </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200">
                        {unassignedUsers.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Tidak ada peserta yang belum terplotting</div>
                        ) : (
                            unassignedUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={`flex cursor-pointer items-center gap-3 border-b border-gray-100 p-3 hover:bg-gray-50 ${
                                        newData.users.includes(user.id) ? 'bg-emerald-50' : ''
                                    }`}
                                    onClick={() => {
                                        setNewData('room', room.id);
                                        if (newData.users.includes(user.id)) {
                                            setNewData(
                                                'users',
                                                newData.users.filter((id) => id !== user.id),
                                            );
                                        } else {
                                            setNewData('users', [...newData.users, user.id]);
                                        }
                                    }}
                                >
                                    <input type="checkbox" checked={newData.users.includes(user.id)} onChange={() => {}} className="h-4 w-4" />
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
                </div>
            </Dialog>

            {/* Dialog Move User(s) */}
            <Dialog
                header={currentUser ? `Pindahkan ${currentUser.name}` : `Pindahkan ${newData.users.length} Peserta`}
                visible={showMoveDialog}
                style={{ width: '500px' }}
                onHide={() => setShowMoveDialog(false)}
                footer={
                    <div>
                        <Button label="Batal" className="p-button-text" onClick={() => setShowMoveDialog(false)} />
                        <Button
                            label="Pindahkan"
                            className="p-button-info"
                            onClick={currentUser ? handleMoveUser : handleMoveBulk}
                            disabled={!newData.room}
                        />
                    </div>
                }
            >
                <div className="flex flex-col gap-4 pt-4">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <p className="text-sm text-gray-700">
                            <strong>Dari:</strong> {room.building.name} - {room.name}
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Pindah ke Kamar <span className="text-red-500">*</span>
                        </label>
                        <Dropdown
                            value={targetRoom}
                            options={roomOptions}
                            onChange={(e) => {
                                setNewData('users', selectedUsersForBulk);
                                setNewData('room', e.value.id);
                                setTargetRoom(e.value);
                            }}
                            placeholder="Pilih kamar tujuan"
                            className="w-full"
                            filter
                        />
                    </div>

                    {targetRoom && (
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                            <p className="text-sm text-blue-800">
                                Kamar tujuan dipilih:{' '}
                                <strong>
                                    {targetRoom.building.name} - {targetRoom.name}
                                </strong>
                            </p>
                        </div>
                    )}
                </div>
            </Dialog>
        </AdminLayout>
    );
};

export default DetailKamar;
