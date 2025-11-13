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
    public function show(Building $building, string $room)
    {
        $room = Room::whereBuildingId($building->id)->whereName($room)->with(['building', 'users', 'users.office', 'users.employment'])->first();
        $unassignedUsers = User::with(['office', 'employment'])->whereNull('room_id')->get();
        $otherRooms = Room::with(['building'])->whereNot('id', $room->id)->get();
        return inertia('admin/detailKamar', compact('room', 'unassignedUsers', 'otherRooms'));
    }

    public function assign(Request $request)
    {
        $validated = $request->validate([
            'room' => 'nullable|integer|exists:rooms,id',
            'users' => 'required|array'
        ]);
        if ($validated['room']) {
            $userIds = collect($validated['users'])
                ->map(fn($u) => is_array($u) ? $u['id'] : $u)
                ->filter() // hapus null
                ->values()
                ->toArray();

            User::whereIn('id', $userIds)
                ->update(['room_id' => $validated['room']]);
        } else {
            User::whereIn('id', $validated['users'])
                ->update(['room_id' => null]);
        }


        return redirect()->back()
            ->with('success', 'Kamar berhasil diassign.');
    }
    public function unassignedUser(Request $request, string $code)
    {
        if ($code == 'bulk') {
            $users = explode(',', $request->query('code'));
            logs()->info($users);
            User::whereIn('code', $users)->update(['room_id' => null]);
        } else {
            User::whereCode($code)->update(['room_id' => null]);
        }
        return redirect()->back()
            ->with('success', 'Kamar berhasil diassign.');
    }


    public function update(Request $request, Building $building, Room $room)
    {
        $request->validate(['name' => 'required|string|max:60|min:3']);
        $room->update($request->all());
        return redirect()->route('admin.gedung', $building->name)
            ->with('success', 'Kamar berhasil diubah!');
    }
    public function store(Request $request, Building $building)
    {
        $request->validate(['name' => 'required|string|max:60|min:3']);
        $building->rooms()->create($request->all());
        return redirect()->route('admin.gedung', $building->name)
            ->with('success', 'Kamar berhasil ditambahkan!');
    }
    public function destroy(Request $request, Building $building, Room $room)
    {
        try {
            $room->delete();
            return redirect()->route('admin.gedung', $building->name)
                ->with('success', 'Kamar berhasil dihapus!');
        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->route('admin.gedung', $building->name)
                ->with('error', 'Kamar gagal dihapus!');
        }
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
