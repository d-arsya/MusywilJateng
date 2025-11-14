<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Employment;
use App\Models\Meeting;
use App\Models\Office;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class MeetingController extends Controller
{
    public function index()
    {

        $meetings = Meeting::with(['attendances'])->get()->map(function ($meeting) {
            $meeting->total_participants = $meeting->attendances->count();
            $meeting->total_attended = $meeting->attendances->whereNotNull('attend')->count();
            $meeting->tanggal_indo = Carbon::parse($meeting->date)->translatedFormat('l, j F');
            $meeting->attendance_rate = $meeting->total_participants > 0
                ? round(($meeting->total_attended / $meeting->total_participants) * 100, 1)
                : 0;

            return $meeting;
        });
        // attendance_rate: 80,

        return inertia('admin/kegiatan', compact('meetings'));
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'room' => 'required|string|max:255',
            'date' => 'required|date|after_or_equal:today',
            'description' => 'nullable|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'all' => 'boolean',
        ]);
        Meeting::create($validated);
        return redirect()->route('admin.kegiatan')
            ->with('success', 'Kegiatan berhasil ditambahkan!');
    }
    public function update(Request $request, Meeting $meeting)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'room' => 'required|string|max:255',
            'date' => 'required|date|after_or_equal:today',
            'description' => 'nullable|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'all' => 'boolean',
        ]);
        $meeting->update($validated);
        return redirect()->route('admin.kegiatan')
            ->with('success', 'Kegiatan berhasil diubah!');
    }
    public function destroy(Meeting $meeting)
    {
        $attendance = $meeting->attendances->whereNotNull('attend')->count();
        if ($attendance == 0) {
            $meeting->delete();
        }
        return redirect()->route('admin.kegiatan')
            ->with('success', 'Kegiatan berhasil ditambahkan!');
    }
    public function edit(Meeting $meeting)
    {
        return inertia('admin/kegiatan/create', ['meeting' => $meeting, 'isEdit' => true]);
    }
    public function stats(Meeting $meeting)
    {
        $meetings = Meeting::with(['attendances' => function ($q) {
            $q->where('user_id', Auth::id());
        }])
            ->orderBy('date')
            ->get();
        $schedule = $meetings->groupBy(function ($meeting) {
            return Carbon::parse($meeting->date)
                ->locale('id')
                ->translatedFormat('l, d F Y');
        })->map(function ($items, $date) {
            return [
                'date' => $date,
                'activities' => $items->map(function ($meeting) {
                    $attendance = $meeting->attendances->first(); // may be null

                    return [
                        'name' => $meeting->name,
                        'description' => $meeting->description,
                        'location' => $meeting->room,
                        'time' => substr($meeting->start_time, 0, 5) . ' - ' . substr($meeting->end_time, 0, 5),
                        'attended' => $attendance?->attend ?? null, // optional: include user's attendance
                    ];
                })->sortBy('time')->values(),
            ];
        })->values();

        $users = User::with(['employment', 'office', 'attendances'])->get();
        $attendances = $users->map(function ($user) use ($meeting) {
            // cari attendance untuk meeting tertentu
            $attendance = $user->attendances->firstWhere('meeting_id', $meeting->id);

            return [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $user->phone,
                'office' => $user->office,
                'employment' => $user->employment,
                'assigned' => !is_null($attendance),                // ada attendance untuk meeting ini
                'attend' => $attendance?->attend,       // attendance-nya sudah terisi jam attend
            ];
        })->sortByDesc('attend')->values();
        return inertia('admin/kegiatan/stats', compact('meeting', 'attendances', 'schedule'));
    }
    public function scan(Meeting $meeting)
    {
        $attendances = Attendance::with(['user', 'user.office', 'user.employment'])->where('meeting_id', $meeting->id)->get();
        return inertia('admin/kegiatan/scan', compact('meeting', 'attendances'));
    }

    public function attend($meeting_code, $user_code)
    {
        $meeting = Meeting::where('code', $meeting_code)->firstOrFail();
        $user = User::where('code', $user_code)->firstOrFail();

        $att = Attendance::where('user_id', $user->id)->where('meeting_id', $meeting->id)->whereNull('attend')->first();
        if ($att) {
            $att->update(['attend' => now()]);
            dispatch(function () {
                $this->firebase();
            });
            return back(303)->with('success', 'Peserta berhasil presensi.');
        }
    }
    public function firebase()
    {
        $url = "https://musywil-hidayatullah-6-default-rtdb.firebaseio.com/jateng.json";
        $response = Http::get($url);
        if (!$response->successful()) {
            return response()->json(['error' => 'Failed to read data'], 500);
        }
        $data = $response->json();
        $state = isset($data['state']) ? $data['state'] : 0;
        $state++;
        $updateResponse = Http::put($url, ['state' => $state]);

        if ($updateResponse->successful()) {
            return true;
        }

        return false;;
    }

    public function assignUsers(Request $request, Meeting $meeting)
    {
        $userIds = explode(',', $request->query('users'));

        // Pastikan tidak ada data kosong
        $userIds = array_filter($userIds);

        // Hindari duplikasi attendance
        $existing = Attendance::where('meeting_id', $meeting->id)
            ->pluck('user_id')
            ->toArray();

        $newAttendances = collect($userIds)
            ->reject(fn($id) => in_array($id, $existing))
            ->map(fn($id) => [
                'user_id' => $id,
                'meeting_id' => $meeting->id,
                'created_at' => now(),
                'updated_at' => now(),
            ])
            ->values()
            ->all();

        if (!empty($newAttendances)) {
            Attendance::insert($newAttendances);
        }

        return back(303)->with('success', 'Peserta berhasil di-assign.');
    }
    public function unassignUsers(Request $request, Meeting $meeting)
    {
        $userIds = explode(',', $request->query('users'));
        $userIds = array_filter($userIds);
        Attendance::where('meeting_id', $meeting->id)->whereIn('user_id', $userIds)->whereNull('attend')->delete();

        return back(303)->with('success', 'Peserta berhasil di-assign.');
    }
    public function assign(Meeting $meeting)
    {
        $employments = Employment::all();
        $offices = Office::all();
        $users = User::with(['employment', 'office', 'attendances'])->wherePaid(true)->get();
        $allUsers = $users->map(function ($user) use ($meeting) {
            // cari attendance untuk meeting tertentu
            $attendance = $user->attendances->firstWhere('meeting_id', $meeting->id);

            return [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $user->phone,
                'office' => $user->office,
                'employment' => $user->employment,
                'assigned' => !is_null($attendance),                // ada attendance untuk meeting ini
                'attended' => !is_null($attendance?->attend),       // attendance-nya sudah terisi jam attend
            ];
        });
        return inertia('admin/kegiatan/assign', compact('meeting', 'employments', 'offices', 'allUsers'));
    }

    public function userView()
    {
        $attendances = Attendance::where('user_id', Auth::id())->with(['meeting'])->get();
        $sorted = $attendances->sortBy(function ($item) {
            return $item->meeting->date;
        });

        // Group meetings by formatted date
        $grouped = $sorted->groupBy(function ($item) {
            return Carbon::parse($item->meeting->date)
                ->locale('id')
                ->translatedFormat('l, d F Y');
        });

        // Transform into your desired structure
        $schedule = $grouped->map(function ($items, $date) {
            return [
                'date' => $date,
                'activities' => $items->map(function ($attendance) {
                    $meeting = $attendance->meeting;

                    return [
                        'name' => $meeting->name,
                        'description' => $meeting->description,
                        'location' => $meeting->room,
                        'time' => substr($meeting->start_time, 0, 5) . ' - ' . substr($meeting->end_time, 0, 5),
                    ];
                })->sortBy('time')->values(), // optional: sort by start time
            ];
        })->values();
        return inertia('jadwal', compact('schedule'));
    }
}
