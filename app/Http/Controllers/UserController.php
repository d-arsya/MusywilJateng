<?php

namespace App\Http\Controllers;

use App\Models\Employment;
use App\Models\Office;
use App\Models\User;
use App\Traits\WhatsAppTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    use WhatsAppTrait;
    private function formatTanggalIndo($date)
    {
        $bulan = [
            1 => 'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ];

        $tanggal = date('d', strtotime($date));
        $bulanAngka = date('n', strtotime($date));
        $tahun = date('Y', strtotime($date));

        return $tanggal . ' ' . $bulan[$bulanAngka] . ' ' . $tahun;
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employment_id' => ['required', 'exists:employments,id'],
            'office_id' => ['required', 'exists:offices,id'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'capsize' => ['required', 'integer'],
            'arrive' => ['required', 'date'],
            'depart' => ['required', 'date', 'after_or_equal:arrive'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $link = Storage::url($path);
            $url = asset($link);
            $validated['avatar'] = $url;
        }
        $user = User::create($validated);
        $link = config('app.url');
        $employment = $user->employment;
        $office = $user->office;

        $arriveDate = $this->formatTanggalIndo($user->arrive);
        $departDate = $this->formatTanggalIndo($user->depart);
        $message = "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ\n\n"
            . "Assalamu'alaikum Warahmatullahi Wabarakatuh\n\n"
            . "*Marhaban Ya Akhi {$user->name}* 🤝\n\n"
            . "Alhamdulillah, pendaftaran Anda untuk *Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan* telah berhasil dicatat.\n\n"
            . "📋 *DETAIL REGISTRASI*\n"
            . "━━━━━━━━━━━━━━━\n"
            . "👤 Nama: {$user->name}\n"
            . "🏢 Utusan: {$office->type} - {$office->name}\n"
            . "📌 Jabatan: {$employment->name}\n"
            . "📱 Telepon: {$user->phone}\n"
            . "🧢 Ukuran Peci: {$user->capsize}\n"
            . "📅 Kedatangan: {$arriveDate}\n"
            . "📅 Kepulangan: {$departDate}\n"
            . "🔑 Kode Akses: *{$user->code}*\n\n"
            . "🌐 *AKSES APLIKASI*\n"
            . "━━━━━━━━━━━━━━━\n"
            . "Silakan akses sistem melalui link berikut:\n"
            . "🔗 {$link}/s/{$user->code}\n\n"
            . "Simpan kode akses Anda dengan baik. Kode ini diperlukan untuk:\n"
            . "✅ Login ke aplikasi\n"
            . "✅ Presensi kegiatan (QR Code)\n"
            . "✅ Akses informasi penginapan\n"
            . "✅ Jadwal dan denah lokasi\n\n"
            . "📝 *LANGKAH SELANJUTNYA*\n"
            . "━━━━━━━━━━━━━━━\n"
            . "1️⃣ Lengkapi kontribusi pembayaran\n"
            . "2️⃣ Upload bukti transfer di aplikasi\n"
            . "3️⃣ Tunggu verifikasi dari panitia\n"
            . "4️⃣ Cek informasi kamar penginapan\n\n"
            . "Jika ada pertanyaan, hubungi:\n"
            . "📱 Sekretariat: 0812xxxxxxxx\n\n"
            . "Barakallahu fiikum 🤲\n\n"
            . "Wassalamu'alaikum Warahmatullahi Wabarakatuh\n\n"
            . "---\n"
            . "🕌 *Panitia Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan*";
        dispatch(function () use ($user, $message) {
            $this->send($user->phone, $message);
        });
        return redirect()->route('user.dashboard')
            ->with('success', 'User berhasil ditambahkan!');
    }

    public function dashboard()
    {
        return inertia('dashboard');
    }
    public function profile()
    {
        return inertia('profile');
    }

    public function index()
    {
        $users = User::with(['employment', 'office'])->get();
        return inertia('admin/peserta', compact('users'));
    }
    public function show(User $user)
    {
        $offices = Office::all()->groupBy('type');
        $employments = Employment::all()->toArray();
        return inertia('admin/detailPeserta', compact('user', 'offices', 'employments'));
    }
}
