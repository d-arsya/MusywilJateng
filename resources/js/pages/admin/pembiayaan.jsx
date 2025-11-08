import { useToast } from '@/context/toast';
import AdminLayout from '@/layouts/admin';
import { Link, router } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage({ payments }) {
    const [selectedPayments, setSelectedPayments] = useState(null);
    const { showToast } = useToast();
    useEffect(() => {
        const verifiedRows = payments.filter((p) => p.paid);
        setSelectedPayments(verifiedRows);
    }, [payments]);
    const RELOAD_DELAY_MS = 1800;
    // Safely retrieve the CSRF token once

    const sendApiAction = async (paymentId, action, name) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
        const endpoint = `/pembayaran/${action}/${paymentId}`;
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json', // Since we're not sending FormData
                },
            });
            let textsa = action == 'check' ? 'mengonfirmasi' : 'membatalkan';
            if (!res.ok) {
                showToast('error', 'Gagal!', 'Gagal ' + textsa + ' pembayaran ' + name);
                return false;
            }
            showToast(action == 'check' ? 'success' : 'warn', 'Berhasil!', 'Berhasil ' + textsa + ' pembayaran ' + name);
            return true;
        } catch (error) {
            showToast('error', 'Gagal!', 'Gagal ' + textsa + ' pembayaran ' + name);
            return false;
        } finally {
            setTimeout(() => {
                router.reload({
                    only: ['payments'],
                    preserveScroll: true,
                });
                console.log(`[Inertia] Triggering partial reload after ${RELOAD_DELAY_MS}ms delay.`);
            }, RELOAD_DELAY_MS);
        }
    };
    const pembayaranColumn = (rowData) => {
        const { paid, verified, invoice } = rowData;

        if (paid) {
            return (
                <div className="flex w-full justify-between text-xs md:text-sm">
                    <span className="font-medium text-green-600">Sudah</span>
                    {invoice ? (
                        <Link href={invoice} target="_blank" className="rounded-md bg-emerald-500 px-2 py-1 text-white hover:bg-emerald-600">
                            Bukti
                        </Link>
                    ) : (
                        <h1 className="rounded-md bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">Cash</h1>
                    )}
                </div>
            );
        } else if (invoice) {
            return (
                <div className="flex w-full justify-between text-xs md:text-sm">
                    <span className="font-medium text-yellow-600">Menunggu</span>
                    <a target="_blank" href={invoice} className="rounded-md bg-emerald-500 px-2 py-1 text-white hover:bg-emerald-600">
                        Bukti
                    </a>
                </div>
            );
        } else {
            return <span className="font-medium text-red-600">Belum</span>;
        }
    };
    return (
        <AdminLayout>
            <div>
                <DataTable
                    value={payments}
                    selection={selectedPayments}
                    onSelectionChange={(e) => setSelectedPayments(e.value)}
                    onRowSelect={(e) => sendApiAction(e.data.code, 'check', e.data.name)}
                    onRowUnselect={(e) => sendApiAction(e.data.code, 'uncheck', e.data.name)}
                    dataKey="id"
                >
                    {/* Checkbox column di kiri */}
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>

                    <Column sortable field="name" header="Name" />
                    <Column
                        headerClassName="hidden md:table-cell"
                        bodyClassName="hidden md:table-cell"
                        sortable
                        sortField="office.name"
                        header="Asal"
                        style={{ minWidth: '150px' }}
                        body={(rowData) => `${rowData.office.type} ${rowData.office.name}`}
                    />
                    <Column sortable sortField="paid" header="Pembayaran" body={pembayaranColumn} />
                    <Column
                        headerClassName="hidden md:table-cell"
                        bodyClassName="hidden md:table-cell"
                        field="employment.name"
                        header="Posisi"
                        style={{ minWidth: '100px' }}
                    />
                </DataTable>
            </div>
        </AdminLayout>
    );
}
