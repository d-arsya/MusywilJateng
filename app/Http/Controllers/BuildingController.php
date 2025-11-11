<?php

namespace App\Http\Controllers;

use App\Models\Building;
use App\Models\User;
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
        $totalUnassigned = User::whereNull('room_id')->count();
        return inertia('admin/penginapan', compact('buildings', 'totalUnassigned'));
    }
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:20|min:3']);
        Building::create($request->all());
        return redirect()->route('admin.penginapan')
            ->with('success', 'Kegiatan berhasil ditambahkan!');
    }
    public function update(Request $request, Building $building)
    {
        $request->validate(['name' => 'required|string|max:20|min:3']);
        $building->update($request->all());
        return redirect()->route('admin.penginapan')
            ->with('success', 'Kegiatan berhasil diubah!');
    }
    public function destroy(Request $request, Building $building)
    {
        $rooms = $building->rooms->pluck('id');
        $users = User::whereIn('room_id', $rooms)->count();
        try {
            if ($users > 0) {
                throw 1;
            }
            $building->delete();
            return redirect()->route('admin.penginapan')
                ->with('success', 'Gedung berhasil dihapus!');
        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->route('admin.penginapan')
                ->with('error', 'Gedung gagal dihapus!');
        }
    }
    public function show(Building $building)
    {
        $rooms = $building->rooms;
        $rooms->each(function ($room) {
            $room->users_count = $room->users->count();
        });
        $unassignedUsers = User::with(['office', 'employment'])->whereNull('room_id')->get();
        return inertia('admin/detailGedung', compact('building', 'rooms', 'unassignedUsers'));
    }
}
