<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
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
