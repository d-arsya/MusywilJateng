import PublicLayout from '@/layouts/public';
import getCroppedImg from '@/lib/crop'; // helper (lihat bawah)
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Cropper from 'react-easy-crop';

export default function RegisterPage({ offices, employments }) {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const { data, setData, post, errors, transform } = useForm({
        name: '',
        phone: '',
        office: '',
        employment: '',
        arrive: '',
        depart: '',
        capsize: '',
        avatar: null,
    });
    const [preview, setPreview] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    transform((data) => ({
        ...data,
        employment_id: data.employment,
        office_id: data.office,
        phone: data.phone.startsWith('0') ? '62' + data.phone.slice(1) : data.phone,
    }));
    function submitRegister(e) {
        e.preventDefault();

        post('/register', {
            onError: (errs) => {
                console.log(data);
                console.log('Validation Errors:', errs); // ✅ logs server-side validation errors
            },
            onSuccess: () => console.log('SUCCESS'),
        });
    }

    const onCropComplete = (_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleCropDone = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        setPreview(croppedImage);
        const res = await fetch(croppedImage);
        const blob = await res.blob();
        setData('avatar', blob);
        setShowCropper(false);
    };

    return (
        <PublicLayout>
            <form
                onSubmit={submitRegister}
                className="w-full max-w-2xl space-y-6 overflow-auto rounded-xl border border-gray-200 bg-white p-8 shadow-xl"
            >
                <h1 className="text-center text-3xl font-bold text-emerald-800">Registrasi Peserta</h1>

                {/* Upload Foto Profil */}
                <div className="flex flex-col items-center">
                    <label className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-emerald-400">
                        {preview ? (
                            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-center text-sm text-emerald-400">Upload Foto</span>
                        )}
                        <input required type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                    {showCropper && (
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60">
                            <div className="relative h-80 w-80 bg-black">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                            <div className="mt-4 flex gap-4">
                                <button onClick={() => setShowCropper(false)} className="rounded bg-gray-300 px-4 py-2">
                                    Batal
                                </button>
                                <button onClick={handleCropDone} className="rounded bg-emerald-500 px-4 py-2 text-white">
                                    Pilih
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Nama Lengkap */}
                <input
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                {/* Nomor HP */}
                <input
                    required
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    type="tel"
                    placeholder="Nomor HP"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                {/* Utusan */}
                <select
                    required
                    value={data.office}
                    onChange={(e) => setData('office', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                    <option value="">Pilih Utusan</option>
                    {Object.entries(offices).map(([type, items]) => (
                        <optgroup key={type} label={type}>
                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>

                {/* Jabatan */}
                <select
                    required
                    value={data.employment}
                    onChange={(e) => setData('employment', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                    <option value="">Pilih Jabatan</option>
                    {employments.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>

                {/* Tanggal Kedatangan & Kepulangan */}
                <div className="grid grid-cols-2 gap-x-3">
                    <div className="">
                        <h1 className="mb-2">Kedatangan</h1>
                        <input
                            required
                            value={data.arrive}
                            onChange={(e) => setData('arrive', e.target.value)}
                            type="date"
                            placeholder="Tanggal Kedatangan"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                    </div>
                    <div className="">
                        <h1 className="mb-2">Kepulangan</h1>
                        <input
                            required
                            value={data.depart}
                            onChange={(e) => setData('depart', e.target.value)}
                            type="date"
                            placeholder="Tanggal Kepulangan"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Ukuran Peci */}
                <select
                    required
                    value={data.capsize}
                    onChange={(e) => setData('capsize', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                    <option value="">Pilih Ukuran Peci</option>
                    {[...Array(8)].map((_, i) => {
                        const size = i + 5; // generates 5,6,7,...,12
                        return (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        );
                    })}
                </select>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white transition duration-200 hover:bg-emerald-600"
                >
                    Daftar
                </button>
            </form>
        </PublicLayout>
    );
}
