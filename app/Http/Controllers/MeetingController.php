<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MeetingController extends Controller
{
    public function index()
    {

        $meetings = Meeting::with(['attendances'])->get()->map(function ($item) {
            $item->tanggal_indo = Carbon::parse($item->date)->translatedFormat('l, j F');
            return $item;
        });

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
        $validated['time'] = $validated['start_time'] . ' - ' . $validated['end_time'];
        unset($validated['start_time']);
        unset($validated['end_time']);

        Meeting::create($validated);
        return redirect()->route('admin.kegiatan')
            ->with('success', 'Kegiatan berhasil ditambahkan!');
    }
}
