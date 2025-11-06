<?php

namespace Database\Seeders;

use App\Models\Employment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmploymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Employment::create(['name' => 'Pembina']);
        Employment::create(['name' => 'Pengawas']);
        Employment::create(['name' => 'Pengurus']);
        Employment::create(['name' => 'Anggota']);
    }
}
