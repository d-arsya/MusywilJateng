import AdminLayout from '@/layouts/admin';
import { AlertCircle, Briefcase, Calendar, Phone, Save, Upload, User, X } from 'lucide-react';
import { useState } from 'react';

// const offices = [
//     { id: 1, name: 'DPW Jawa Tengah' },
//     { id: 2, name: 'DPD Surakarta' },
//     { id: 3, name: 'DMW Jawa Tengah' },
//     { id: 4, name: 'Kampus Madya Al Kahfi' },
//     { id: 5, name: 'Orpen BMH' },
//     { id: 6, name: 'Amal Usaha' },
// ];

// Mock user data
// const initialUser = {
//     id: 1,
//     name: 'Ahmad Fauzi',
//     phone: '081234567890',
//     employment_id: 2,
//     office_id: 2,
//     capsize: 56,
//     arrive: '2025-11-20',
//     depart: '2025-11-23',
//     avatar: '/assets/avatars/user1.jpg',
//     code: 'ABC123',
// };

export default function AdminEditUserPage({ employments, user, offices }) {
    const initialUser = user;
    const [formData, setFormData] = useState(initialUser);
    const [avatarPreview, setAvatarPreview] = useState(initialUser.avatar);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file
            if (file.size > 2048 * 1024) {
                setErrors((prev) => ({ ...prev, avatar: 'Ukuran file maksimal 2MB' }));
                return;
            }
            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                setErrors((prev) => ({ ...prev, avatar: 'Format file harus JPG, PNG, atau WebP' }));
                return;
            }

            // Preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setErrors((prev) => ({ ...prev, avatar: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
        if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
        if (!formData.employment_id) newErrors.employment_id = 'Jabatan wajib dipilih';
        if (!formData.office_id) newErrors.office_id = 'Utusan wajib dipilih';
        if (!formData.capsize || formData.capsize < 50 || formData.capsize > 70) {
            newErrors.capsize = 'Ukuran peci harus antara 50-70';
        }
        if (!formData.arrive) newErrors.arrive = 'Tanggal kedatangan wajib diisi';
        if (!formData.depart) newErrors.depart = 'Tanggal kepulangan wajib diisi';
        if (formData.depart < formData.arrive) {
            newErrors.depart = 'Tanggal kepulangan harus setelah kedatangan';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Data peserta berhasil diperbarui!');
            // window.location.href = '/admin/users';
        }, 1500);
    };

    const handleCancel = () => {
        if (confirm('Batalkan perubahan? Data yang belum disimpan akan hilang.')) {
            window.history.back();
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen p-4 md:p-8">
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Edit Data Peserta</h1>
                            <p className="mt-1 text-sm text-gray-600">Perbarui informasi peserta Muswil VI Hidayatullah</p>
                        </div>
                        <div className="rounded-lg bg-emerald-100 px-4 py-2">
                            <span className="text-sm font-semibold text-emerald-700">Kode: {formData.code}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Section */}
                        <div className="rounded-2xl bg-white p-6 shadow-lg">
                            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                <User className="mr-2 h-5 w-5 text-emerald-600" />
                                Foto Profil
                            </h2>

                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <div className="h-32 w-32 overflow-hidden rounded-2xl border-4 border-gray-100 shadow-md">
                                        <img
                                            src={avatarPreview || '/assets/img/placeholder.webp'}
                                            alt="Avatar"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <label
                                        htmlFor="avatar-upload"
                                        className="absolute -right-2 -bottom-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700"
                                    >
                                        <Upload className="h-5 w-5" />
                                    </label>
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="mb-1 font-medium text-gray-700">Upload foto peserta</p>
                                    <p className="text-sm text-gray-500">Format: JPG, PNG, WebP (Max 2MB)</p>
                                    {errors.avatar && (
                                        <p className="mt-2 flex items-center text-sm text-red-600">
                                            <AlertCircle className="mr-1 h-4 w-4" />
                                            {errors.avatar}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="rounded-2xl bg-white p-6 shadow-lg">
                            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                <User className="mr-2 h-5 w-5 text-emerald-600" />
                                Informasi Pribadi
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Name */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Nama Lengkap *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-2 ${errors.name ? 'border-red-300' : 'border-gray-200'} px-4 py-3 transition focus:border-emerald-500 focus:outline-none`}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                        <Phone className="mr-1 h-4 w-4" />
                                        Nomor Telepon *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} px-4 py-3 transition focus:border-emerald-500 focus:outline-none`}
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>

                                {/* Cap Size */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Ukuran Peci *</label>
                                    <input
                                        type="number"
                                        name="capsize"
                                        value={formData.capsize}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-2 ${errors.capsize ? 'border-red-300' : 'border-gray-200'} px-4 py-3 transition focus:border-emerald-500 focus:outline-none`}
                                    />
                                    {errors.capsize && <p className="mt-1 text-sm text-red-600">{errors.capsize}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Organization Information */}
                        <div className="rounded-2xl bg-white p-6 shadow-lg">
                            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                <Briefcase className="mr-2 h-5 w-5 text-emerald-600" />
                                Informasi Organisasi
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Office */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Utusan *</label>
                                    <select
                                        name="office_id"
                                        value={formData.office_id}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-2 ${errors.office_id ? 'border-red-300' : 'border-gray-200'} px-4 py-3 transition focus:border-emerald-500 focus:outline-none`}
                                    >
                                        <option value="">Pilih Utusan</option>
                                        {Object.entries(offices).map(([type, items]) => (
                                            <optgroup key={type} label={type}>
                                                {items.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.type} {item.name}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    {errors.office_id && <p className="mt-1 text-sm text-red-600">{errors.office_id}</p>}
                                </div>

                                {/* Employment */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Jabatan *</label>
                                    <select
                                        name="employment_id"
                                        value={formData.employment_id}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-2 ${errors.employment_id ? 'border-red-300' : 'border-gray-200'} px-4 py-3 transition focus:border-emerald-500 focus:outline-none`}
                                    >
                                        <option value="">Pilih Jabatan</option>
                                        {employments.map((employment) => (
                                            <option key={employment.id} value={employment.id}>
                                                {employment.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.employment_id && <p className="mt-1 text-sm text-red-600">{errors.employment_id}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Schedule Information */}
                        <div className="rounded-2xl bg-white p-6 shadow-lg">
                            <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                <Calendar className="mr-2 h-5 w-5 text-emerald-600" />
                                Jadwal Kehadiran
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Arrive Date */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Tanggal Kedatangan *</label>
                                    <input
                                        type="date"
                                        name="arrive"
                                        value={formData.arrive}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-2 ${errors.arrive ? 'border-red-300' : 'border-gray-200'} px-4 py-3 transition focus:border-emerald-500 focus:outline-none`}
                                    />
                                    {errors.arrive && <p className="mt-1 text-sm text-red-600">{errors.arrive}</p>}
                                </div>

                                {/* Depart Date */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Tanggal Kepulangan *</label>
                                    <input
                                        type="date"
                                        name="depart"
                                        value={formData.depart}
                                        onChange={handleChange}
                                        className={`w-full rounded-lg border-2 ${errors.depart ? 'border-red-300' : 'border-gray-200'} px-4 py-3 transition focus:border-emerald-500 focus:outline-none`}
                                    />
                                    {errors.depart && <p className="mt-1 text-sm text-red-600">{errors.depart}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        Simpan Perubahan
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                <X className="h-5 w-5" />
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
