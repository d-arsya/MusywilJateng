import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, FileText, MapPin, Save } from 'lucide-react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { useEffect, useState } from 'react';

// Dummy existing meeting for edit mode
const dummyMeeting = {
    id: 2,
    title: 'Rapat Dewan Pengawas',
    date: '2025-11-21',
    time_start: '14:00',
    time_end: '16:00',
    location: 'Ruang Angsana',
    description: 'Rapat koordinasi dewan pengawas',
    status: 'ongoing',
};

const AdminMeetingForm = ({ isEdit = false, meetingId = 2 }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time_start: '',
        time_end: '',
        location: '',
        description: '',
        status: 'upcoming',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Load data if edit mode
    useEffect(() => {
        if (isEdit && meetingId) {
            // Simulate loading from API
            setFormData(dummyMeeting);
        }
    }, [isEdit, meetingId]);

    // Handlers
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Judul kegiatan wajib diisi';
        }

        if (!formData.date) {
            newErrors.date = 'Tanggal wajib diisi';
        }

        if (!formData.time_start) {
            newErrors.time_start = 'Jam mulai wajib diisi';
        }

        if (!formData.time_end) {
            newErrors.time_end = 'Jam selesai wajib diisi';
        }

        if (formData.time_start && formData.time_end) {
            if (formData.time_start >= formData.time_end) {
                newErrors.time_end = 'Jam selesai harus lebih besar dari jam mulai';
            }
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Lokasi wajib diisi';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Submit data:', formData);
            alert(isEdit ? 'Kegiatan berhasil diupdate!' : 'Kegiatan berhasil dibuat!');
            setLoading(false);
            handleBack();
        }, 1000);
    };

    const handleBack = () => {
        router.get('/admin/kegiatan');
    };

    const handleSaveAndAssign = () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Submit data:', formData);
            console.log('Navigate to assign participants page');
            setLoading(false);
            // Router navigation to assign page
            router.get('/admin/kegiatan/assign');
        }, 1000);
    };

    // Status options
    const statusOptions = [
        { label: 'Belum Dimulai', value: 'upcoming' },
        { label: 'Sedang Berlangsung', value: 'ongoing' },
        { label: 'Selesai', value: 'completed' },
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
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Contoh: Pembukaan Munas VI"
                                className={`w-full ${errors.title ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.title && <small className="mt-1 block text-red-500">{errors.title}</small>}
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
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
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
                            value={formData.status}
                            options={statusOptions}
                            onChange={(e) => handleChange('status', e.value)}
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
                                value={formData.time_start}
                                onChange={(e) => handleChange('time_start', e.target.value)}
                                className={`w-full ${errors.time_start ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.time_start && <small className="mt-1 block text-red-500">{errors.time_start}</small>}
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
                                value={formData.time_end}
                                onChange={(e) => handleChange('time_end', e.target.value)}
                                className={`w-full ${errors.time_end ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.time_end && <small className="mt-1 block text-red-500">{errors.time_end}</small>}
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
                                value={formData.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                placeholder="Contoh: Aula Utama"
                                className={`w-full ${errors.location ? 'p-invalid' : ''}`}
                            />
                        </div>
                        {errors.location && <small className="mt-1 block text-red-500">{errors.location}</small>}
                    </div>

                    {/* Deskripsi */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
                        <InputTextarea
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Tambahkan deskripsi atau catatan tambahan..."
                            rows={4}
                            className="w-full"
                        />
                    </div>
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
                        {!isEdit && (
                            <Button
                                label="Simpan & Lanjut Plot Peserta"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                className="p-button-success"
                                onClick={handleSaveAndAssign}
                                loading={loading}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Card */}
            {formData.title && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-800">Preview Kegiatan</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <FileText className="mt-1 text-gray-500" size={18} />
                            <div>
                                <p className="text-sm text-gray-600">Judul</p>
                                <p className="font-semibold text-gray-800">{formData.title || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Calendar className="mt-1 text-gray-500" size={18} />
                            <div>
                                <p className="text-sm text-gray-600">Tanggal & Waktu</p>
                                <p className="font-semibold text-gray-800">
                                    {formData.date
                                        ? new Date(formData.date).toLocaleDateString('id-ID', {
                                              weekday: 'long',
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : '-'}
                                    {formData.time_start && formData.time_end && (
                                        <span className="ml-2">
                                            ({formData.time_start} - {formData.time_end})
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-1 text-gray-500" size={18} />
                            <div>
                                <p className="text-sm text-gray-600">Lokasi</p>
                                <p className="font-semibold text-gray-800">{formData.location || '-'}</p>
                            </div>
                        </div>
                        {formData.description && (
                            <div className="flex items-start gap-3">
                                <FileText className="mt-1 text-gray-500" size={18} />
                                <div>
                                    <p className="text-sm text-gray-600">Deskripsi</p>
                                    <p className="text-gray-800">{formData.description}</p>
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
