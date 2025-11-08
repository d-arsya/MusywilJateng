import { show } from '@/actions/App/Http/Controllers/UserController';
import AdminLayout from '@/layouts/admin';
import { Link } from '@inertiajs/react';
import { Calendar, CheckCircle2, Clock, Eye, Phone, Search, UserCheck, Users } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useState } from 'react';

export default function AdminDashboardPage({ users }) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [selectedEmployment, setSelectedEmployment] = useState(null);

    // Statistics calculation
    const stats = {
        total: users.length,
        verified: users.filter((u) => u.paid).length,
        pending: users.filter((u) => !u.paid).length,
        arriving: users.filter((u) => new Date(u.arrive) <= new Date()).length,
    };

    // Employment filter options
    const employmentOptions = [
        { label: 'Semua Jabatan', value: null },
        { label: 'Pembina', value: 'Pembina' },
        { label: 'Pengurus', value: 'Pengurus' },
        { label: 'Pengawas', value: 'Pengawas' },
        { label: 'Anggota', value: 'Anggota' },
    ];

    // Custom header template
    const header = (
        <div className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                        <Users className="h-8 w-8 opacity-80" />
                        <Badge value={stats.total} severity="info" className="bg-white/20" />
                    </div>
                    <p className="text-sm opacity-90">Total Peserta</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 text-white shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                        <CheckCircle2 className="h-8 w-8 opacity-80" />
                        <Badge value={stats.verified} severity="success" className="bg-white/20" />
                    </div>
                    <p className="text-sm opacity-90">Terverifikasi</p>
                    <p className="text-2xl font-bold">{stats.verified}</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 text-white shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                        <Clock className="h-8 w-8 opacity-80" />
                        <Badge value={stats.pending} severity="warning" className="bg-white/20" />
                    </div>
                    <p className="text-sm opacity-90">Menunggu</p>
                    <p className="text-2xl font-bold">{stats.pending}</p>
                </div>

                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 text-white shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                        <Calendar className="h-8 w-8 opacity-80" />
                        <Badge value={stats.arriving} className="bg-white/20" />
                    </div>
                    <p className="text-sm opacity-90">Sudah Tiba</p>
                    <p className="text-2xl font-bold">{stats.arriving}</p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-md lg:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Cari nama, kode, atau nomor telepon..."
                        className="w-full pl-10"
                    />
                </div>

                <Dropdown
                    value={selectedEmployment}
                    onChange={(e) => setSelectedEmployment(e.value)}
                    options={employmentOptions}
                    placeholder="Filter Jabatan"
                    className="w-full lg:w-48"
                />
            </div>
        </div>
    );

    // Custom body templates
    const userNameTemplate = (user) => {
        return (
            <Link href={show(user.code)} className="-m-2 flex items-center space-x-3 rounded-lg p-2 transition hover:bg-gray-50">
                <Avatar
                    image={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff`}
                    shape="circle"
                    size="large"
                    className="border-2 border-emerald-100"
                />
                <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="mt-1 flex items-center text-xs text-gray-500">
                        <Phone className="mr-1 h-3 w-3" />
                        {user.phone}
                    </p>
                </div>
            </Link>
        );
    };

    const officeTemplate = (user) => {
        const typeColors = {
            DPW: 'info',
            DPD: 'success',
            DMW: 'warning',
            Kampus: 'help',
            Orpen: 'danger',
        };

        return (
            <div className="space-y-1">
                <Tag value={user.office.type} severity={typeColors[user.office.type] || 'info'} className="text-xs font-semibold" />
                <p className="text-sm font-medium text-gray-700">{user.office.name}</p>
            </div>
        );
    };

    const employmentTemplate = (user) => {
        const colors = {
            Pembina: 'bg-purple-100 text-purple-700 border-purple-200',
            Pengurus: 'bg-blue-100 text-blue-700 border-blue-200',
            Pengawas: 'bg-amber-100 text-amber-700 border-amber-200',
            Anggota: 'bg-gray-100 text-gray-700 border-gray-200',
        };

        return (
            <span
                className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-sm font-semibold ${colors[user.employment.name] || colors.Anggota}`}
            >
                <UserCheck className="mr-1 h-3 w-3" />
                {user.employment.name}
            </span>
        );
    };

    const codeTemplate = (user) => {
        return (
            <div className="md:text-md rounded-lg border border-emerald-200 bg-emerald-50 p-1 text-center font-mono text-xs font-bold text-emerald-600 md:px-3 md:py-2">
                {user.code}
            </div>
        );
    };

    const scheduleTemplate = (user) => {
        const arriveDate = new Date(user.arrive).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        const departDate = new Date(user.depart).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

        return (
            <div className="text-sm">
                <div className="mb-1 flex items-center text-gray-600">
                    <Calendar className="mr-1 h-3 w-3 text-emerald-500" />
                    <span className="font-medium">Tiba:</span>
                    <span className="ml-1">{arriveDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Calendar className="mr-1 h-3 w-3 text-red-500" />
                    <span className="font-medium">Pulang:</span>
                    <span className="ml-1">{departDate}</span>
                </div>
            </div>
        );
    };

    const paymentTemplate = (user) => {
        if (user.paid) {
            return <Tag value="Terverifikasi" severity="success" icon={<CheckCircle2 className="mr-1 h-3 w-3" />} className="font-semibold" />;
        }
        if (user.invoice) {
            return <Tag value="Menunggu" severity="warning" icon={<Clock className="mr-1 h-3 w-3" />} className="font-semibold" />;
        }
        return <Tag value="Belum" severity="danger" icon={<Clock className="mr-1 h-3 w-3" />} className="font-semibold" />;
    };

    const actionsTemplate = (user) => {
        return (
            <div className="flex gap-2">
                <Button
                    icon={<Eye className="h-4 w-4" />}
                    rounded
                    outlined
                    severity="info"
                    tooltip="Lihat Detail"
                    tooltipOptions={{ position: 'top' }}
                    onClick={() => show(user.code)}
                />
                {/* <Button icon={<Edit className="h-4 w-4" />} rounded outlined severity="warning" tooltip="Edit" tooltipOptions={{ position: 'top' }} />
                <Button
                    icon={<Trash2 className="h-4 w-4" />}
                    rounded
                    outlined
                    severity="danger"
                    tooltip="Hapus"
                    tooltipOptions={{ position: 'top' }}
                /> */}
            </div>
        );
    };

    // Filter data based on employment selection
    const filteredUsers = selectedEmployment ? users.filter((u) => u.employment.name === selectedEmployment) : users;

    return (
        <AdminLayout>
            <div className="space-y-6 p-2 md:p-4">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="flex items-center text-3xl font-bold text-gray-800">
                            <Users className="mr-3 h-8 w-8 text-emerald-600" />
                            Manajemen Peserta
                        </h1>
                        <p className="mt-1 text-gray-600">Muswil VI Hidayatullah 2025</p>
                    </div>
                </div>

                {/* DataTable */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <DataTable
                        value={filteredUsers}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        globalFilter={globalFilter}
                        header={header}
                        emptyMessage={
                            <div className="py-12 text-center">
                                <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                <p className="text-lg font-medium text-gray-500">Tidak ada data peserta</p>
                                <p className="mt-2 text-sm text-gray-400">Silakan tambah peserta baru</p>
                            </div>
                        }
                        className="text-sm"
                        stripedRows
                        showGridlines
                        responsiveLayout="scroll"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Menampilkan {first} - {last} dari {totalRecords} peserta"
                    >
                        <Column body={userNameTemplate} header="Peserta" sortable sortField="name" />

                        <Column
                            body={officeTemplate}
                            header="Utusan"
                            sortable
                            sortField="office.name"
                            headerClassName="hidden lg:table-cell"
                            bodyClassName="hidden lg:table-cell"
                        />

                        <Column
                            body={employmentTemplate}
                            header="Jabatan"
                            filter
                            filterField="employment.name"
                            sortable
                            sortField="employment.name"
                            headerClassName="hidden md:table-cell"
                            bodyClassName="hidden md:table-cell"
                        />

                        <Column body={codeTemplate} header="Kode Akses" sortable field="code" />

                        <Column body={scheduleTemplate} header="Jadwal" headerClassName="hidden xl:table-cell" bodyClassName="hidden xl:table-cell" />

                        <Column
                            body={paymentTemplate}
                            header="Pembayaran"
                            filter
                            filterField="paid"
                            headerClassName="hidden lg:table-cell"
                            bodyClassName="hidden lg:table-cell"
                        />
                    </DataTable>
                </div>
            </div>
        </AdminLayout>
    );
}
