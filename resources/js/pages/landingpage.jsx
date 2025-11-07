import { PublicFooter, PublicHeader } from '@/components/header';
import { Link } from '@inertiajs/react';
import { Calendar, CheckCircle, Home, MapPin, QrCode, Users } from 'lucide-react';
import { useState } from 'react';

export default function MunasHidayatullahLanding() {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
            {/* Header */}
            <PublicHeader />

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="flex w-full justify-center">
                        <img className="w-64" src="/assets/img/jumbotron.png" alt="" />
                    </div>
                    {/* <h2 className="text-4xl font-bold text-emerald-900 md:text-5xl">
                        Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan
                    </h2>
                    <p className="mb-8 text-xl text-gray-700">22 - 23 November 2025</p> */}
                    <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/register"
                            className="transform rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-emerald-700"
                        >
                            Daftar Sekarang
                        </Link>
                        <Link
                            href="/login"
                            className="transform rounded-lg border-2 border-emerald-600 bg-white px-8 py-3 font-semibold text-emerald-600 shadow-lg transition hover:scale-105 hover:bg-gray-50"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <h3 className="mb-12 text-center text-3xl font-bold text-emerald-900">Fitur Unggulan</h3>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <Users className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-gray-800">Pendaftaran Peserta</h4>
                        <p className="text-gray-600">
                            Pendaftaran mudah dengan data lengkap: nama, telepon, foto, utusan, jabatan, ukuran peci, dan jadwal kedatangan
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <CheckCircle className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-gray-800">Kontribusi Peserta</h4>
                        <p className="text-gray-600">Upload bukti transfer dan verifikasi kontribusi dengan sistem tracking yang terintegrasi</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <Home className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-gray-800">Penginapan</h4>
                        <p className="text-gray-600">Manajemen gedung dan kamar dengan plotting otomatis peserta ke penginapan yang tersedia</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <Calendar className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-gray-800">Jadwal Kegiatan</h4>
                        <p className="text-gray-600">Timeline lengkap kegiatan dengan detail tempat, waktu, dan deskripsi untuk setiap acara</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <QrCode className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-gray-800">Presensi Digital</h4>
                        <p className="text-gray-600">Scan QR code untuk presensi dengan live monitoring dan statistik kehadiran real-time</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                            <MapPin className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-gray-800">Denah Lokasi</h4>
                        <p className="text-gray-600">Akses mudah ke denah gedung, lokasi kamar, dan informasi lokasi kegiatan</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-emerald-800 py-16 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 text-center md:grid-cols-4">
                        <div>
                            <div className="mb-2 text-4xl font-bold">500+</div>
                            <div className="text-emerald-200">Peserta Terdaftar</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold">38</div>
                            <div className="text-emerald-200">DPW Se-Indonesia</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold">50+</div>
                            <div className="text-emerald-200">Kegiatan</div>
                        </div>
                        <div>
                            <div className="mb-2 text-4xl font-bold">100%</div>
                            <div className="text-emerald-200">Digital System</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Organization */}
            <section className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-4xl">
                    <h3 className="mb-8 text-center text-3xl font-bold text-emerald-900">Tentang Hidayatullah</h3>
                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <p className="mb-4 text-gray-700">
                            <strong>Hidayatullah</strong> adalah organisasi massa Islam yang terbentuk di Kalimantan Timur pada 5 Februari 1973.
                            Organisasi ini telah berkembang menjadi salah satu jaringan dakwah dan pendidikan Islam terbesar di Indonesia.
                        </p>
                        <p className="mb-4 text-gray-700">
                            Dengan <strong>lebih dari 600 pesantren</strong> yang tersebar di seluruh Indonesia, Hidayatullah menjadi salah satu
                            jaringan pesantren terbesar di negara ini, menggabungkan pendidikan modern dengan nilai-nilai keagamaan.
                        </p>
                        <p className="text-gray-700">
                            Hidayatullah juga aktif dalam berbagai lembaga sosial seperti <strong>Baitul Maal Hidayatullah (BMH)</strong>, SAR
                            Hidayatullah, Islamic Medical Service (IMS), dan berbagai program dakwah serta pemberdayaan masyarakat.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-12 text-center text-white shadow-2xl">
                    <h3 className="mb-4 text-3xl font-bold">Siap Bergabung?</h3>
                    <p className="mb-8 text-xl text-emerald-100">
                        Daftarkan diri Anda sekarang dan jadilah bagian dari Musyawarah Wilayah VI Hidayatullah
                    </p>
                    <Link
                        href="/register"
                        className="transform rounded-lg bg-white px-8 py-3 font-semibold text-emerald-600 shadow-lg transition hover:scale-105 hover:bg-gray-100"
                    >
                        Mulai Pendaftaran
                    </Link>
                </div>
            </section>
            <PublicFooter />
        </div>
    );
}
