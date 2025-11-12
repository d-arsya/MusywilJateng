import AdminLayout from '@/layouts/admin';
import { router, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, FileText, MapPin, Save } from 'lucide-react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectButton } from 'primereact/selectbutton';
import { useState } from 'react';

const AdminMeetingForm = ({ isEdit = false, meeting = null }) => {
    const { data, setData, post, put } = useForm({
        name: meeting?.name || '',
        date: meeting?.date || '',
        start_time: meeting?.start_time?.slice(0, 5) || '',
        end_time: meeting?.end_time?.slice(0, 5) || '',
        room: meeting?.room || '',
        description: meeting?.description || '',
        status: meeting?.status || 'Belum',
        all: meeting?.all || true,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!data.name.trim()) {
            newErrors.name = 'Judul kegiatan wajib diisi';
        }

        if (!data.date) {
            newErrors.date = 'Tanggal wajib diisi';
        }

        if (!data.start_time) {
            newErrors.start_time = 'Jam mulai wajib diisi';
        }

        if (!data.end_time) {
            newErrors.end_time = 'Jam selesai wajib diisi';
        }

        if (data.start_time && data.end_time) {
            if (data.start_time >= data.end_time) {
                newErrors.end_time = 'Jam selesai harus lebih besar dari jam mulai';
            }
        }

        if (!data.room.trim()) {
            newErrors.room = 'Lokasi wajib diisi';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }
        if (isEdit) {
            console.log(data);
            put('/admin/kegiatan/' + meeting.code, {
                onError: (errs) => {
                    console.log('Validation Errors:', errs); // ✅ logs server-side validation errors
                },
                onSuccess: () => console.log('SUCCESS'),
            });
        } else {
            post('/admin/kegiatan', {
                onError: (errs) => {
                    console.log('Validation Errors:', errs); // ✅ logs server-side validation errors
                },
                onSuccess: () => console.log('SUCCESS'),
            });
        }
    };

    const handleBack = () => {
        router.get('/admin/kegiatan');
    };

    const statusOptions = [
        { label: 'Belum Dimulai', value: 'Belum' },
        { label: 'Sedang Berlangsung', value: 'Sedang' },
        { label: 'Selesai', value: 'Telah' },
    ];

    return (
        <AdminLayout>
            {/* Breadcrumb */}
            <div className="mb-6">
                <button onClick={handleBack} className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
                    <ArrowLeft size={20} />
                    <span className="font-medium">Kembali ke Dashboard</span>
                </button>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>Dashboard</span>
                    <span>›</span>
                    <span className="font-medium text-gray-800">{isEdit ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{isEdit ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h1>
            </div>

            {/* Form */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Judul Kegiatan */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Judul Kegiatan <span className="text-red-500">*</span>
                        </label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <FileText size={16} />
                            </span>
                            <InputText
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Pembukaan Munas VI"
                                className={`w-full ${errors.name ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.name && <small className="mt-1 block text-red-500">{errors.name}</small>}
                    </div>

                    {/* Tanggal */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Tanggal <span className="text-red-500">*</span>
                        </label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Calendar size={16} />
                            </span>
                            <InputText
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className={`w-full ${errors.date ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.date && <small className="mt-1 block text-red-500">{errors.date}</small>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <Dropdown
                            value={data.status}
                            options={statusOptions}
                            onChange={(e) => setData('status', e.value)}
                            placeholder="Pilih status"
                            className="w-full"
                        />
                    </div>

                    {/* Jam Mulai */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Jam Mulai <span className="text-red-500">*</span>
                        </label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Clock size={16} />
                            </span>
                            <InputText
                                type="time"
                                value={data.start_time}
                                onChange={(e) => setData('start_time', e.target.value)}
                                className={`w-full ${errors.start_time ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.start_time && <small className="mt-1 block text-red-500">{errors.start_time}</small>}
                    </div>

                    {/* Jam Selesai */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Jam Selesai <span className="text-red-500">*</span>
                        </label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <Clock size={16} />
                            </span>
                            <InputText
                                type="time"
                                value={data.end_time}
                                onChange={(e) => setData('end_time', e.target.value)}
                                className={`w-full ${errors.end_time ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.end_time && <small className="mt-1 block text-red-500">{errors.end_time}</small>}
                    </div>

                    {/* Lokasi */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Lokasi <span className="text-red-500">*</span>
                        </label>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <MapPin size={16} />
                            </span>
                            <InputText
                                value={data.room}
                                onChange={(e) => setData('room', e.target.value)}
                                placeholder="Contoh: Aula Utama"
                                className={`w-full ${errors.room ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.room && <small className="mt-1 block text-red-500">{errors.room}</small>}
                    </div>

                    {/* Deskripsi */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
                        <InputTextarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Tambahkan deskripsi atau catatan tambahan..."
                            rows={4}
                            className="w-full"
                        />
                    </div>
                    <SelectButton
                        value={data.all ? 'Semua' : 'Sebagian'}
                        onChange={(e) => setData('all', e.value == 'Semua')}
                        options={['Semua', 'Sebagian']}
                    />
                </div>

                {/* Info Box */}
                <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                            <FileText className="text-blue-600" size={16} />
                        </div>
                        <div className="flex-1">
                            <p className="mb-1 text-sm font-medium text-blue-800">Informasi</p>
                            <ul className="space-y-1 text-sm text-blue-700">
                                <li>• Kegiatan dapat diedit kapan saja, bahkan setelah ada peserta yang assigned atau check-in</li>
                                <li>• Kegiatan hanya bisa dihapus jika belum ada peserta yang hadir (check-in)</li>
                                <li>• Status dapat diubah sesuai kondisi kegiatan: Belum Dimulai, Sedang Berlangsung, atau Selesai</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-between">
                    <Button label="Batal" className="p-button-text" onClick={handleBack} disabled={loading} />
                    <div className="flex gap-2">
                        <Button
                            label={isEdit ? 'Simpan Perubahan' : 'Simpan'}
                            icon={<Save size={16} />}
                            className="p-button-outlined"
                            onClick={handleSubmit}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            {/* Preview Card */}
            {data.name && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Preview Kegiatan</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <FileText className="mt-1 text-gray-500" size={18} />
                            <div>
                                <p className="text-sm text-gray-600">Judul</p>
                                <p className="font-semibold text-gray-800">{data.name || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="mt-1 text-gray-500" size={18} />
                            <div>
                                <p className="text-sm text-gray-600">Tanggal & Waktu</p>
                                <p className="font-semibold text-gray-800">
                                    {data.date
                                        ? new Date(data.date).toLocaleDateString('id-ID', {
                                              weekday: 'long',
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : '-'}
                                    {data.start_time && data.end_time && (
                                        <span className="ml-2">
                                            ({data.start_time} - {data.end_time})
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-1 text-gray-500" size={18} />
                            <div>
                                <p className="text-sm text-gray-600">Lokasi</p>
                                <p className="font-semibold text-gray-800">{data.room || '-'}</p>
                            </div>
                        </div>
                        {data.description && (
                            <div className="flex items-start gap-3">
                                <FileText className="mt-1 text-gray-500" size={18} />
                                <div>
                                    <p className="text-sm text-gray-600">Deskripsi</p>
                                    <p className="text-gray-800">{data.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminMeetingForm;
