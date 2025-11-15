<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Building;
use App\Models\Employment;
use App\Models\Meeting;
use App\Models\Office;
use App\Models\Room;
use App\Models\User;
use App\Traits\WhatsAppTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Pest\Mutate\Mutators\Logical\TrueToFalse;

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
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
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
            . "━━━━━━\n"
            . "👤 Nama: {$user->name}\n"
            . "🏢 Utusan: {$office->type} - {$office->name}\n"
            . "📌 Jabatan: {$employment->name}\n"
            . "📱 Telepon: {$user->phone}\n"
            . "🧢 Ukuran Peci: {$user->capsize}\n"
            . "📅 Kedatangan: {$arriveDate}\n"
            . "📅 Kepulangan: {$departDate}\n"
            . "🔑 Kode Akses: *{$user->code}*\n\n"
            . "🌐 *AKSES APLIKASI*\n"
            . "━━━━━━\n"
            . "Silakan akses sistem melalui link berikut:\n"
            . "🔗 {$link}/s/{$user->code}\n\n"
            . "Simpan kode akses Anda dengan baik. Kode ini diperlukan untuk:\n"
            . "✅ Login ke aplikasi\n"
            . "✅ Presensi kegiatan (QR Code)\n"
            . "✅ Akses informasi penginapan\n"
            . "✅ Jadwal dan denah lokasi\n\n"
            . "📝 *LANGKAH SELANJUTNYA*\n"
            . "━━━━━━\n"
            . "1️⃣ Lengkapi kontribusi pembayaran\n"
            . "2️⃣ Upload bukti transfer di aplikasi\n"
            . "3️⃣ Tunggu verifikasi dari panitia\n"
            . "4️⃣ Cek informasi kamar penginapan\n\n"
            . "Jika ada pertanyaan, hubungi:\n"
            . "📱 Sekretariat: 6281234895030\n\n"
            . "Barakallahu fiikum 🤲\n\n"
            . "Wassalamu'alaikum Warahmatullahi Wabarakatuh\n\n"
            . "---\n"
            . "🕌 *Panitia Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan*";
        // dispatch(function () use ($user, $message) {
        //     $this->send($user->phone, $message);
        // });
        return redirect()->route('auth.enter', ['code' => $user->code])
            ->with('success', 'User berhasil ditambahkan!');
    }

    public function editUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'employment_id' => ['required', 'exists:employments,id'],
            'office_id' => ['required', 'exists:offices,id'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'capsize' => ['required', 'integer'],
            'arrive' => ['required', 'date'],
            'depart' => ['required', 'date', 'after_or_equal:arrive'],
            'avatar' => ['nullable']
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = asset(Storage::url($path));
        }
        $user->update($validated);
        return redirect()->route('admin.peserta');
    }
    public function sendCode(string $code)
    {
        $user = User::with(['office', 'employment'])->whereCode($code)->first();
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
            . "━━━━━━\n"
            . "👤 Nama: {$user->name}\n"
            . "🏢 Utusan: {$office->type} - {$office->name}\n"
            . "📌 Jabatan: {$employment->name}\n"
            . "📱 Telepon: {$user->phone}\n"
            . "🧢 Ukuran Peci: {$user->capsize}\n"
            . "📅 Kedatangan: {$arriveDate}\n"
            . "📅 Kepulangan: {$departDate}\n"
            . "🔑 Kode Akses: *{$user->code}*\n\n"
            . "🌐 *AKSES APLIKASI*\n"
            . "━━━━━━\n"
            . "Silakan akses sistem melalui link berikut:\n"
            . "🔗 {$link}/s/{$user->code}\n\n"
            . "Simpan kode akses Anda dengan baik. Kode ini diperlukan untuk:\n"
            . "✅ Login ke aplikasi\n"
            . "✅ Presensi kegiatan (QR Code)\n"
            . "✅ Akses informasi penginapan\n"
            . "✅ Jadwal dan denah lokasi\n\n"
            . "📝 *LANGKAH SELANJUTNYA*\n"
            . "━━━━━━\n"
            . "1️⃣ Lengkapi kontribusi pembayaran\n"
            . "2️⃣ Upload bukti transfer di aplikasi\n"
            . "3️⃣ Tunggu verifikasi dari panitia\n"
            . "4️⃣ Cek informasi kamar penginapan\n\n"
            . "Jika ada pertanyaan, hubungi:\n"
            . "📱 Sekretariat: 6281234895030\n\n"
            . "Barakallahu fiikum 🤲\n\n"
            . "Wassalamu'alaikum Warahmatullahi Wabarakatuh\n\n"
            . "---\n"
            . "🕌 *Panitia Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan*";
        $user->update(['sended' => true]);
        $this->send($user->phone, $message);
        return redirect()->back();
    }
    public function editProfile(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            // 'employment_id' => ['required', 'exists:employments,id'],
            // 'office_id' => ['required', 'exists:offices,id'],
            // 'name' => ['required', 'string', 'max:255'],
            // 'phone' => ['required', 'string', 'max:20'],
            // 'capsize' => ['required', 'integer'],    
            // 'arrive' => ['required', 'date'],
            // 'depart' => ['required', 'date', 'after_or_equal:arrive'],
            'avatar' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $link = Storage::url($path);
            $url = asset($link);
            $validated['avatar'] = $url;
        } else {
            unset($validated['avatar']);
        }
        $user->update($validated);
        return redirect()->route('user.profile');
    }
    public function dashboard()
    {
        return inertia('dashboard');
    }
    public function materi()
    {
        $materials = [];
        return inertia('materi', compact('materials'));
    }
    public function profile()
    {
        $user = User::with(['office', 'employment', 'room.building'])->whereId(Auth::id())->first();
        return inertia('profile', compact('user'));
    }

    public function index()
    {
        $users = User::with(['employment', 'office', 'room', 'room.building'])->get();
        return inertia('admin/peserta', compact('users'));
    }
    public function adminDashboard()
    {
        // Ambil semua meeting hari ini + attendance-nya
        $meetings = Meeting::with('attendances')
            ->whereDate('date', now()->toDateString())
            ->orderBy('date')
            ->get();

        // Daftar meeting hari ini
        $mockTodayMeetings = $meetings->map(function ($meeting) {
            $totalParticipants = $meeting->attendances->count();
            $totalAttended = $meeting->attendances->where('attend', true)->count();

            return [
                'id' => $meeting->id,
                'code' => $meeting->code,
                'name' => $meeting->name,
                'start_time' => substr($meeting->start_time, 0, 5),
                'end_time' => substr($meeting->end_time, 0, 5),
                'room' => $meeting->room,
                'total_participants' => $totalParticipants,
                'total_attended' => $totalAttended,
                'status' => $meeting->status,
            ];
        })->values();

        // Distribusi pengguna
        $users = User::with(['office', 'employment'])->get();

        $mockOfficeDistribution = $users->groupBy(fn($u) => $u->office->name ?? 'Tidak Diketahui')
            ->map(fn($group) => $group->count());

        $mockEmploymentDistribution = $users->groupBy(fn($u) => $u->employment->name ?? 'Tidak Diketahui')
            ->map(fn($group) => $group->count());

        // Hitung kehadiran hari ini
        $todayMeetingIds = $meetings->pluck('id');

        $totalAttendances = Attendance::whereIn('meeting_id', $todayMeetingIds)->count();
        $attendedCount = Attendance::whereIn('meeting_id', $todayMeetingIds)
            ->whereNotNull('attend')
            ->count();

        // Hitung kamar yang terisi (user dengan room_id != null)
        $assignedRooms = User::whereNotNull('room_id')->distinct('room_id')->count();

        // Statistik umum dashboard
        $mockStats = [
            "totalUsers" => User::count(),
            "verifiedPayment" => User::where('paid', true)->count(),
            "pendingPayment" => User::where('paid', false)->count(),
            "totalMeetings" => Meeting::count(),
            "todayMeetings" => $meetings->count(),
            "totalRooms" => Room::count(),
            "totalBuildings" => Building::count(),
            "assignedRooms" => $assignedRooms,
            "todayAttendance" => $attendedCount,
            "averageAttendance" => $totalAttendances > 0
                ? round(($attendedCount / $totalAttendances) * 100, 2)
                : 0, // hasil persentase
        ];
        return inertia('admin/dashboard', compact(
            'mockStats',
            'mockTodayMeetings',
            'mockOfficeDistribution',
            'mockEmploymentDistribution'
        ));
    }

    public function show(User $user)
    {
        $offices = Office::all()->groupBy('type');
        $employments = Employment::all()->toArray();
        $room = Room::with('building')->whereId($user->room_id)->first();
        return inertia('admin/detailPeserta', compact('user', 'offices', 'employments', 'room'));
    }
}
