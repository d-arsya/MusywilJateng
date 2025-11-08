import AdminLayout from '@/layouts/admin';
import { Link } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function AdminDashboardPage({ users }) {
    return (
        <AdminLayout>
            <div>
                <DataTable dataKey="id" value={users} showGridlines stripedRows>
                    <Column sortable field="name" header="Name" style={{ minWidth: '100px' }}></Column>
                    <Column
                        sortable
                        sortField="office.name"
                        header="Asal"
                        style={{ minWidth: '150px' }}
                        body={(rowData) => `${rowData.office.type} ${rowData.office.name}`}
                    />
                    <Column
                        header="Pembayaran"
                        style={{ minWidth: '150px' }}
                        body={(rowData) => {
                            const { paid, verified, invoice } = rowData;

                            if (verified && paid) {
                                return (
                                    <div className="flex w-full justify-between">
                                        <span className="font-medium text-green-600">Sudah</span>
                                        {invoice && (
                                            <Link
                                                href={invoice}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-md bg-emerald-500 px-2 py-1 text-sm text-white hover:bg-emerald-600"
                                            >
                                                Download
                                            </Link>
                                        )}
                                    </div>
                                );
                            } else if (paid && !verified) {
                                return (
                                    <div className="flex w-full justify-between">
                                        <span className="font-medium text-yellow-600">Menunggu</span>
                                        {invoice && (
                                            <Link
                                                href={invoice}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-md bg-emerald-500 px-2 py-1 text-sm text-white hover:bg-emerald-600"
                                            >
                                                Download
                                            </Link>
                                        )}
                                    </div>
                                );
                            } else {
                                return <span className="font-medium text-red-600">Belum</span>;
                            }
                        }}
                    />

                    <Column field="employment.name" header="Posisi" style={{ minWidth: '100px' }}></Column>
                </DataTable>
            </div>
        </AdminLayout>
    );
}
