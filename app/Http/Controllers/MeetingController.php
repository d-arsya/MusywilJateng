<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Carbon\Carbon;

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
}
