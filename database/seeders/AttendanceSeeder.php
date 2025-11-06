<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\Meeting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $meetings = Meeting::all();

        foreach ($meetings as $meeting) {
            $users->shuffle()->take(5)->each(function ($user) use ($meeting) {
                $attend = fake()->boolean(50);
                Attendance::firstOrCreate([
                    'user_id' => $user->id,
                    'meeting_id' => $meeting->id,
                ], [
                    'time'       => $attend ? fake()->time('H:i') : null,
                    'attend'     => $attend
                ]);
            });
        }
    }
}
