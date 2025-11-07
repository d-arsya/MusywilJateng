import AdminLayout from '@/layouts/admin';
import { Link } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
export default function AdminPenginapanPage() {
    const roomDatas = [
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
        {
            name: 'Kamar A',
            people: 100,
        },
    ];

    const roomMates = [
        {
            name: 'Kamaluddin Arsyad Fadllillah',
            office: 'DPD Surakarta',
            employment: 'Pengurus',
        },
        {
            name: 'Ahmad Fauzi',
            office: 'DPD Jakarta',
            employment: 'Anggota',
        },
        {
            name: 'Dewi Lestari',
            office: 'DPD Bandung',
            employment: 'Sekretaris',
        },
        {
            name: 'Rizky Pratama',
            office: 'DPD Yogyakarta',
            employment: 'Bendahara',
        },
        {
            name: 'Siti Nurhaliza',
            office: 'DPD Semarang',
            employment: 'Koordinator',
        },
        {
            name: 'Budi Santoso',
            office: 'DPD Malang',
            employment: 'Staf Operasional',
        },
        {
            name: 'Indah Puspita',
            office: 'DPD Makassar',
            employment: 'Wakil Ketua',
        },
        {
            name: 'Fajar Nugroho',
            office: 'DPD Medan',
            employment: 'Anggota',
        },
        {
            name: 'Nadia Rahma',
            office: 'DPD Palembang',
            employment: 'Sekretaris',
        },
        {
            name: 'Teguh Saputra',
            office: 'DPD Bali',
            employment: 'Pengurus',
        },
    ];

    const deleteBodyTemplate = (rowData) => {
        return <button onClick={() => alert(rowData)}>Keluarkan</button>;
    };
    return (
        <AdminLayout>
            <h1 className="mb-8 text-3xl font-extrabold">Data Gedung</h1>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                {roomDatas.map((e, i) => {
                    return (
                        <Link
                            href={'/admin/kamar/' + e.name}
                            className="flex w-max flex-col flex-wrap items-center justify-center rounded-md bg-gray-200 p-4 text-center hover:bg-emerald-200"
                        >
                            <span className="text-lg font-bold">{'Kamar ' + (i + 1)}</span>
                            <br />
                            Jumlah Penghuni : {e.people}
                        </Link>
                    );
                })}
            </div>
            <div className="mt-12">
                <DataTable value={roomMates} showGridlines stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column sortable field="name" header="Name"></Column>
                    <Column field="office" header="Asal"></Column>
                    <Column field="employment" header="Posisi"></Column>
                    <Column body={deleteBodyTemplate} header="Aksi" style={{ textAlign: 'center', width: '8rem' }} />
                </DataTable>
            </div>
        </AdminLayout>
    );
}
