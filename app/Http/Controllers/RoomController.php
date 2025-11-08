<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function show(Room $room)
    {
        $room = Room::whereId($room->id)->with(['building', 'users', 'users.office', 'users.employment'])->first();
        // dd($room);
        return inertia('admin/detailKamar', compact('room'));
    }
}
