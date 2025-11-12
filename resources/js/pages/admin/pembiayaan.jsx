import { useToast } from '@/context/toast';
import AdminLayout from '@/layouts/admin';
import { router, useForm } from '@inertiajs/react';
import { AlertCircle, Banknote, CheckCircle2, Clock, CreditCard, Eye, FileText, Users, XCircle } from 'lucide-react';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Column } from 'primereact/column';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage({ payments }) {
    const [selectedPayments, setSelectedPayments] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState(null);
    const { showToast } = useToast();
    const { data, post } = useForm(null);

    useEffect(() => {
        const verifiedRows = payments.filter((p) => p.paid);
        setSelectedPayments(verifiedRows);
    }, [payments]);

    // Calculate statistics
    const stats = {
        verified: payments.filter((p) => p.paid).length,
        pending: payments.filter((p) => p.invoice && !p.paid).length,
        unpaid: payments.filter((p) => !p.invoice && !p.paid).length,
        totalAmount: payments.filter((p) => p.paid).length * 500000, // Assuming 500k per person
    };

    const RELOAD_DELAY_MS = 1800;

    const sendApiAction = async (paymentId, action, name) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        const endpoint = `/pembayaran/${action}/${paymentId}`;

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                },
            });

            const actionText = action === 'check' ? 'mengonfirmasi' : 'membatalkan';

            if (!res.ok) {
                showToast('error', 'Gagal!', `Gagal ${actionText} pembayaran ${name}`);
                return false;
            }

            showToast(action === 'check' ? 'success' : 'warn', 'Berhasil!', `Berhasil ${actionText} pembayaran ${name}`);
            return true;
        } catch (error) {
            const actionText = action === 'check' ? 'mengonfirmasi' : 'membatalkan';
            showToast('error', 'Gagal!', `Gagal ${actionText} pembayaran ${name}`);
            return false;
        } finally {
            setTimeout(() => {
                router.reload({
                    only: ['payments'],
                    preserveScroll: true,
                });
            }, RELOAD_DELAY_MS);
        }
    };
    const handleRowSelect = (e) => {
        post(`/pembayaran/check/${e.data.code}`, {
            onSuccess: () => showToast('success', 'Berhasil!', `Berhasil mengonfirmasi pembayaran ${e.data.name}`),
            onError: () => showToast('warn', 'Gagal!', `Gagal mengonfirmasi pembayaran ${e.data.name}`),
        });
    };

    const handleRowUnselect = (e) => {
        post(`/pembayaran/uncheck/${e.data.code}`, {
            preserveState: true,
            onSuccess: () => showToast('success', 'Berhasil!', `Berhasil mengonfirmasi pembayaran ${e.data.name}`),
            onError: () => showToast('warn', 'Gagal!', `Gagal mengonfirmasi pembayaran ${e.data.name}`),
        });
    };

    // Status filter options
    const statusOptions = [
        { label: 'Semua Status', value: null },
        { label: 'Terverifikasi', value: 'verified' },
        { label: 'Menunggu', value: 'pending' },
        { label: 'Belum Bayar', value: 'unpaid' },
    ];

    // Filter data based on status
    const getFilteredPayments = () => {
        if (!statusFilter) return payments;

        switch (statusFilter) {
            case 'verified':
                return payments.filter((p) => p.paid);
            case 'pending':
                return payments.filter((p) => p.invoice && !p.paid);
            case 'unpaid':
                return payments.filter((p) => !p.invoice && !p.paid);
            default:
                return payments;
        }
    };

    // Header template
    const header = (
        <div className="space-y-4">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                        <Users className="h-8 w-8 opacity-80" />
                        <Badge value={stats.total} className="bg-white/20" />
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

                <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-600 p-4 text-white shadow-lg">
                    <div className="mb-2 flex items-center justify-between">
                        <XCircle className="h-8 w-8 opacity-80" />
                        <Badge value={stats.unpaid} severity="danger" className="bg-white/20" />
                    </div>
                    <p className="text-sm opacity-90">Belum Bayar</p>
                    <p className="text-2xl font-bold">{stats.unpaid}</p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-md lg:flex-row">
                <div className="relative flex-1">
                    <InputText
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Cari nama atau kode peserta..."
                        className="w-full pl-10"
                    />
                </div>

                <Dropdown
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.value)}
                    options={statusOptions}
                    placeholder="Filter Status"
                    className="w-full lg:w-48"
                />
            </div>

            {/* Info Banner */}
            <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
                <div className="flex items-start">
                    <AlertCircle className="mt-0.5 mr-3 h-5 w-5 text-blue-600" />
                    <div className="text-sm text-blue-800">
                        <p className="mb-1 font-semibold">Panduan Verifikasi Pembayaran</p>
                        <p>
                            • Centang checkbox untuk <strong>memverifikasi</strong> pembayaran yang sudah valid
                        </p>
                        <p>
                            • Uncheck untuk <strong>membatalkan</strong> verifikasi yang salah
                        </p>
                        <p>• Klik "Bukti" untuk melihat bukti transfer peserta</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // Column Templates
    const nameTemplate = (rowData) => {
        return (
            <div className="flex items-center space-x-3">
                <Avatar
                    image={rowData.avatar || `https://ui-avatars.com/api/?name=${rowData.name}&background=10b981&color=fff`}
                    shape="circle"
                    size="large"
                    className="border-2 border-emerald-100"
                />
                <div>
                    <p className="font-semibold text-gray-800">{rowData.name}</p>
                    <p className="font-mono text-xs text-gray-500">{rowData.code}</p>
                </div>
            </div>
        );
    };

    const officeTemplate = (rowData) => {
        const typeColors = {
            DPW: 'info',
            DPD: 'success',
            DMW: 'warning',
            Kampus: 'help',
            Orpen: 'danger',
        };

        return (
            <div className="space-y-1">
                <Tag value={rowData.office.type} severity={typeColors[rowData.office.type] || 'info'} className="text-xs font-semibold" />
                <p className="text-sm text-gray-700">{rowData.office.name}</p>
            </div>
        );
    };

    const employmentTemplate = (rowData) => {
        const colors = {
            Pembina: 'bg-purple-100 text-purple-700',
            Pengurus: 'bg-blue-100 text-blue-700',
            Pengawas: 'bg-amber-100 text-amber-700',
            Anggota: 'bg-gray-100 text-gray-700',
        };

        return (
            <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colors[rowData.employment.name] || colors.Anggota}`}
            >
                {rowData.employment.name}
            </span>
        );
    };

    const paymentTemplate = (rowData) => {
        const { paid, invoice } = rowData;

        if (paid) {
            return (
                <div className="flex items-center justify-between gap-3">
                    <Tag value="Terverifikasi" severity="success" icon={<CheckCircle2 className="mr-1 h-3 w-3" />} className="font-semibold" />
                    {invoice ? (
                        <a
                            href={invoice}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-emerald-600"
                        >
                            <Eye className="h-3 w-3" />
                            Bukti
                        </a>
                    ) : (
                        <Tag value="Cash" icon={<Banknote className="mr-1 h-3 w-3" />} className="bg-blue-500 font-semibold text-white" />
                    )}
                </div>
            );
        } else if (invoice) {
            return (
                <div className="flex items-center justify-between gap-3">
                    <Tag value="Menunggu" severity="warning" icon={<Clock className="mr-1 h-3 w-3" />} className="font-semibold" />
                    <a
                        href={invoice}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-amber-600"
                    >
                        <Eye className="h-3 w-3" />
                        Cek
                    </a>
                </div>
            );
        } else {
            return <Tag value="Belum Bayar" severity="danger" icon={<XCircle className="mr-1 h-3 w-3" />} className="font-semibold" />;
        }
    };

    const filteredPayments = getFilteredPayments();

    return (
        <AdminLayout>
            <ConfirmDialog />
            <div className="space-y-6 p-2 md:p-4">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="flex items-center text-3xl font-bold text-gray-800">
                            <CreditCard className="mr-3 h-8 w-8 text-emerald-600" />
                            Verifikasi Pembayaran
                        </h1>
                        <p className="mt-1 text-gray-600">Kelola dan verifikasi kontribusi peserta</p>
                    </div>
                </div>

                {/* DataTable */}
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <DataTable
                        value={filteredPayments}
                        selection={selectedPayments}
                        onSelectionChange={(e) => setSelectedPayments(e.value)}
                        onRowSelect={handleRowSelect}
                        onRowUnselect={handleRowUnselect}
                        dataKey="id"
                        paginator
                        rows={15}
                        rowsPerPageOptions={[15, 25, 50, 100]}
                        globalFilter={globalFilter}
                        header={header}
                        emptyMessage={
                            <div className="py-12 text-center">
                                <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                                <p className="text-lg font-medium text-gray-500">Tidak ada data pembayaran</p>
                            </div>
                        }
                        stripedRows
                        showGridlines
                        responsiveLayout="scroll"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Menampilkan {first} - {last} dari {totalRecords} peserta"
                    >
                        <Column selectionMode="multiple" frozen />

                        <Column body={nameTemplate} header="Peserta" sortable field="name" />

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
                            field="employment.name"
                            headerClassName="hidden md:table-cell"
                            bodyClassName="hidden md:table-cell"
                        />

                        <Column body={paymentTemplate} header="Status" sortable sortField="paid" />
                    </DataTable>
                </div>
            </div>
        </AdminLayout>
    );
}
