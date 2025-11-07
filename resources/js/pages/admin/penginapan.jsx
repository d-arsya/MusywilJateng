import AdminLayout from '@/layouts/admin';
import { Link } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';

export default function AdminPenginapanPage() {
    const roomDatas = [
        {
            name: 'Gedung A',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung B',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung C',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung D',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung E',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung F',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung G',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung H',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung I',
            room: 10,
            people: 100,
        },
        {
            name: 'Gedung J',
            room: 10,
            people: 100,
        },
    ];

    const roomMates = [
        {
            name: 'Kamaluddin Arsyad Fadllillah',
            office: 'DPD Surakarta',
            employment: 'Pengurus',
            roomName: 'Ruang Mawar',
            buildingName: 'Gedung A',
        },
        {
            name: 'Ahmad Fauzi',
            office: 'DPD Jakarta',
            employment: 'Anggota',
            roomName: 'Ruang Melati',
            buildingName: 'Gedung B',
        },
        {
            name: 'Dewi Lestari',
            office: 'DPD Bandung',
            employment: 'Sekretaris',
            roomName: 'Ruang Anggrek',
            buildingName: 'Gedung A',
        },
        {
            name: 'Rizky Pratama',
            office: 'DPD Yogyakarta',
            employment: 'Bendahara',
            roomName: 'Ruang Kenanga',
            buildingName: 'Gedung C',
        },
        {
            name: 'Siti Nurhaliza',
            office: 'DPD Semarang',
            employment: 'Koordinator',
            roomName: 'Ruang Tulip',
            buildingName: 'Gedung B',
        },
        {
            name: 'Budi Santoso',
            office: 'DPD Malang',
            employment: 'Staf Operasional',
            roomName: 'Ruang Teratai',
            buildingName: 'Gedung C',
        },
        {
            name: 'Indah Puspita',
            office: 'DPD Makassar',
            employment: 'Wakil Ketua',
            roomName: 'Ruang Sakura',
            buildingName: 'Gedung A',
        },
        {
            name: 'Fajar Nugroho',
            office: 'DPD Medan',
            employment: 'Anggota',
            roomName: 'Ruang Dahlia',
            buildingName: 'Gedung B',
        },
        {
            name: 'Nadia Rahma',
            office: 'DPD Palembang',
            employment: 'Sekretaris',
            roomName: 'Ruang Cempaka',
            buildingName: 'Gedung C',
        },
        {
            name: 'Teguh Saputra',
            office: 'DPD Bali',
            employment: 'Pengurus',
            roomName: 'Ruang Flamboyan',
            buildingName: 'Gedung A',
        },
    ];

    const buildingDropdown = (row) => {
        return <Dropdown placeholder="Pilih Gedung" value={row.buildingName} optionValue="name" options={roomDatas} optionLabel="name" />;
    };
    const roomDropdown = (row) => {
        return <Dropdown placeholder="Pilih Kamar" value={row.roomName} optionValue="roomName" options={roomMates} optionLabel="roomName" />;
    };
    return (
        <AdminLayout>
            <h1 className="mb-8 text-3xl font-extrabold">Data Gedung</h1>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                {roomDatas.map((e, i) => {
                    return (
                        <Link
                            href={'/admin/gedung/' + e.name}
                            className="flex flex-col flex-wrap items-center justify-center rounded-md bg-gray-200 p-4 text-center hover:bg-emerald-200"
                        >
                            <span className="text-lg font-bold">{e.name}</span>
                            <br />
                            Jumlah Kamar : {e.room}
                            <br />
                            Jumlah Penghuni : {e.people}
                        </Link>
                    );
                })}
            </div>
            <div className="overflow-x-scroll">
                <DataTable value={roomMates} showGridlines stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column sortable field="name" header="Name" style={{ minWidth: '100px' }}></Column>
                    <Column sortable field="office" header="Asal" style={{ minWidth: '100px' }}></Column>
                    <Column field="employment" header="Posisi" style={{ minWidth: '100px' }}></Column>
                    <Column sortable sortField="buildingName" style={{ minWidth: '100px' }} body={buildingDropdown} header="Gedung" />
                    <Column sortable sortField="roomName" style={{ minWidth: '100px' }} body={roomDropdown} header="Kamar" />
                </DataTable>
            </div>
        </AdminLayout>
    );
}
