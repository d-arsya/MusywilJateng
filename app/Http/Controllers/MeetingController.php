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
}
