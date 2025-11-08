import { useToast } from '@/context/toast';
import AdminLayout from '@/layouts/admin';
import { useForm } from '@inertiajs/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function AdminDashboardPage({ meetings }) {
    const { showToast } = useToast();
    const { data, setData, post, reset } = useForm({
        name: '',
        room: '',
        date: '',
        description: '',
        start_time: '',
        end_time: '',
        all: true,
    });
    function submitMeeting(e) {
        e.preventDefault();
        post('/admin/kegiatan', {
            onSuccess: () => {
                reset();
                showToast('success', 'Berhasil!', 'Berhasil menambahkan jadwal');
            },
            onError: () => {
                reset();
                showToast('error', 'Gagal!', 'Gagal menambahkan jadwal');
            },
        });
    }
    return (
        <AdminLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="col-span-1">
                    <form onSubmit={submitMeeting} className="space-y-4 rounded-xl bg-white p-4 shadow-md">
                        <h2 className="mb-2 text-xl font-semibold text-gray-800">Menambahkan Jadwal</h2>

                        {/* Judul Kegiatan */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Judul Kegiatan</label>
                            <input
                                value={data.name}
                                type="text"
                                name="name"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan judul kegiatan"
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Tanggal */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Tanggal</label>
                            <input
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                type="date"
                                name="date"
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Tempat */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Tempat</label>
                            <input
                                value={data.room}
                                onChange={(e) => setData('room', e.target.value)}
                                type="text"
                                name="room"
                                placeholder="Masukkan tempat kegiatan"
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            />
                        </div>

                        {/* Jam */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Jam</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="time"
                                    value={data.start_time}
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    name="start_time"
                                    className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                                <span className="text-gray-500">-</span>
                                <input
                                    value={data.end_time}
                                    onChange={(e) => setData('end_time', e.target.value)}
                                    name="end_time"
                                    type="time"
                                    className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">Deskripsi atau instruksi tambahan</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                name="description"
                                rows={3}
                                placeholder="Tuliskan keterangan tambahan..."
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            ></textarea>
                        </div>

                        {/* Sebagian Peserta */}
                        <div className="flex items-center gap-2">
                            <input
                                id="all"
                                type="checkbox"
                                name="all"
                                onChange={(e) => {
                                    setData('all', e.target.checked);
                                }}
                                checked={data.all}
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <label htmlFor="all" className="text-sm text-gray-700">
                                Semua peserta
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button type="submit" className="w-full rounded-lg bg-emerald-600 py-2 text-white transition hover:bg-emerald-700">
                                Simpan Jadwal
                            </button>
                        </div>
                    </form>
                </div>
                <div className="md:col-span-3">
                    <DataTable dataKey="id" value={meetings} showGridlines stripedRows>
                        <Column header="Kegiatan" field="name" />
                        <Column header="Tanggal" field="tanggal_indo" />
                        <Column headerClassName="hidden md:table-cell" bodyClassName="hidden md:table-cell" header="Waktu" field="time" />
                    </DataTable>
                </div>
            </div>
        </AdminLayout>
    );
}
