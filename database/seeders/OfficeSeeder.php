<?php

namespace Database\Seeders;

use App\Models\Office;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficeSeeder extends Seeder
{
    private $organizations = [
        'DPW' => [
            'DPW'
        ],
        'DMW' => [
            'DMW'
        ],
        'DPD' => [
            'Surakarta',
            'Sukoharjo',
            'Sragen',
            'Karanganyar',
            'Klaten',
            'Wonogiri',
            'Sleman',
            'Kota Yogyakarta',
            'Bantul',
            'Kulonprogo',
            'Gunungkidul',
            'Magelang',
            'Kota Magelang',
            'Temanggung',
            'Purworejo',
            'Kebumen',
            'Cilacap',
            'Banyumas',
        ],
        'Kampus Madya' => [
            'As Sakinah',
            'Al Kahfi',
        ],
        'Organisasi Pendukung' => [
            'Mushida',
            'Pemhida',
        ],
        'Amal Usaha' => [
            'BMH',
            'LBH',
            'BWH',
            'SAR',
        ],
    ];
    public function run(): void
    {
        $now = Carbon::now();
        $data = [];

        foreach ($this->organizations as $type => $names) {
            foreach ($names as $name) {
                $data[] = [
                    'type' => $type,
                    'name' => $name,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }
        Office::insert($data);
    }
}
