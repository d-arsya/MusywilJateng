import PublicLayout from '@/layouts/public';
import { useState } from 'react';

export default function RegisterPage() {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const handlePhotoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePhoto(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <PublicLayout>
            <form className="w-full max-w-2xl space-y-6 overflow-auto rounded-xl border border-gray-200 bg-white p-8 shadow-xl">
                <h1 className="text-center text-3xl font-bold text-emerald-800">Registrasi Peserta</h1>

                {/* Upload Foto Profil */}
                <div className="flex flex-col items-center">
                    <label className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-emerald-400">
                        {preview ? (
                            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-center text-sm text-emerald-400">Upload Foto</span>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                </div>

                {/* Nama Lengkap */}
                <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                {/* Nomor HP */}
                <input
                    type="tel"
                    placeholder="Nomor HP"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />

                {/* Utusan */}
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="">Pilih Utusan</option>
                    <optgroup label="DPW">
                        <option value="DPW">DPW</option>
                    </optgroup>
                    <optgroup label="DMW">
                        <option value="Surakarta">Surakarta</option>
                        <option value="Sukoharjo">Sukoharjo</option>
                        <option value="Sragen">Sragen</option>
                        <option value="Karanganyar">Karanganyar</option>
                        <option value="Klaten">Klaten</option>
                        <option value="Wonogiri">Wonogiri</option>
                        <option value="Sleman">Sleman</option>
                        <option value="Kota Yogyakarta">Kota Yogyakarta</option>
                        <option value="Bantul">Bantul</option>
                        <option value="Kulonprogo">Kulonprogo</option>
                        <option value="Gunungkidul">Gunungkidul</option>
                        <option value="Magelang">Magelang</option>
                        <option value="Kota Magelang">Kota Magelang</option>
                        <option value="Temanggung">Temanggung</option>
                        <option value="Purworejo">Purworejo</option>
                        <option value="Kebumen">Kebumen</option>
                        <option value="Cilacap">Cilacap</option>
                        <option value="Banyumas">Banyumas</option>
                    </optgroup>
                    <optgroup label="Kampus Madya">
                        <option value="As Sakinah">As Sakinah</option>
                        <option value="Al Kahfi">Al Kahfi</option>
                    </optgroup>
                    <optgroup label="Orpen">
                        <option value="Mushida">Mushida</option>
                        <option value="Pemhida">Pemhida</option>
                    </optgroup>
                    <optgroup label="Amal Usaha">
                        <option value="BMH">BMH</option>
                        <option value="LBH">LBH</option>
                        <option value="BWH">BWH</option>
                        <option value="SAR">SAR</option>
                    </optgroup>
                </select>

                {/* Jabatan */}
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="">Pilih Jabatan</option>
                    <option value="Pembina">Pembina</option>
                    <option value="Pengawas">Pengawas</option>
                    <option value="Pengurus">Pengurus</option>
                    <option value="Anggota">Anggota</option>
                </select>

                {/* Tanggal Kedatangan & Kepulangan */}
                <div className="flex gap-4">
                    <input
                        type="date"
                        placeholder="Tanggal Kedatangan"
                        className="w-1/2 rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <input
                        type="date"
                        placeholder="Tanggal Kepulangan"
                        className="w-1/2 rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                </div>

                {/* Ukuran Peci */}
                <select className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option value="">Pilih Ukuran Peci</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
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
