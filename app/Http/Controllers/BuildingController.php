<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    public function index()
    {
        $buildings = Building::with(['rooms', 'rooms.users'])->get();
        $buildings->each(function ($building) {
            // total users in all rooms of this building
            $building->users_count = $building->rooms->sum(fn($room) => $room->users->count());

            // total rooms in this building
            $building->rooms_count = $building->rooms->count();
        });

        return inertia('admin/penginapan', compact('buildings'));
    }
    public function show(Building $building)
    {
        $rooms = $building->rooms;
        $rooms->each(function ($room) {
            $room->users_count = $room->users->count();
        });
        return inertia('admin/detailGedung', compact('building', 'rooms'));
    }
}
