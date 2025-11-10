<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\Employment;
use App\Models\Office;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function show(Room $room)
    {
        $room = Room::whereId($room->id)->with(['building', 'users', 'users.office', 'users.employment'])->first();
        $unassignedUsers = User::with(['office', 'employment'])->whereNull('room_id')->get();
        // dd($room);
        return inertia('admin/detailKamar', compact('room', 'unassignedUsers'));
    }
    public function unassigned()
    {
        // $room = Room::whereId($room->id)->with(['building', 'users', 'users.office', 'users.employment'])->first();
        // dd($room);
        $users = User::with(['office', 'employment'])->whereNull('room_id')->get();
        $employments = Employment::all();
        $buildings = Building::with(['rooms.users'])->get();

        $buildings->each(function ($building) {
            $building->rooms->each(function ($room) {
                $room->users_count = $room->users->count();
            });
        });
        $offices = Office::all();
        return inertia('admin/penginapan/unassigned', compact('users', 'employments', 'buildings', 'offices'));
    }

    public function user()
    {
        $user = Auth::user();
        $room = $user->room ?? null;
        $building = $room->building ?? null;
        $myRoom = [
            "building" => $building,
            "room" => $room,
            "roommates" => $room ? User::with(['office', 'employment'])->whereRoomId($room->id)->get() : null
        ];
        return inertia('penginapan', compact('myRoom'));
    }
}
