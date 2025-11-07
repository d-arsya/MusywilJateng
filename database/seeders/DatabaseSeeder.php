<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (Storage::disk('public')->exists('avatars')) {
            Storage::disk('public')->deleteDirectory('avatars');
            Storage::disk('public')->makeDirectory('avatars');
        }
        $this->call([
            OfficeSeeder::class,
            EmploymentSeeder::class,
            BuildingSeeder::class,
            RoomSeeder::class,
            UserSeeder::class,
            MeetingSeeder::class,
            AttendanceSeeder::class
        ]);
    }
}
