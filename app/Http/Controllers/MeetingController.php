<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Meeting;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
            'all' => 'nullable|boolean',
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
            'all' => 'nullable|boolean',
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
