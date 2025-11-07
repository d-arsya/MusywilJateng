import AdminLayout from '@/layouts/admin';
import { Link } from '@inertiajs/react';

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
    return (
        <AdminLayout>
            <h1 className="mb-8 text-3xl font-extrabold">Data Gedung</h1>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                {roomDatas.map((e, i) => {
                    return (
                        <Link
                            href={'/admin/kamar/' + e.name}
                            className="flex flex-col flex-wrap items-center justify-center rounded-md bg-gray-200 p-4 text-center hover:bg-emerald-200"
                        >
                            <span className="text-lg font-bold">{'Kamar ' + (i + 1)}</span>
                            <br />
                            Jumlah Penghuni : {e.people}
                        </Link>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
