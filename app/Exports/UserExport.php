<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class UserExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return User::with(['office', 'employment', 'room'])->get();
    }

    public function map($user): array
    {
        return [
            $user->id,
            $user->employment->name,
            $user->office->name,
            $user->room?->name,
            $user->code,
            $user->name,
            $user->phone,
            $user->paid ? 'Sudah Bayar' : 'Belum Bayar',
            $user->capsize
        ];
    }
    public function headings(): array
    {
        return [
            'No',
            'Jabatan',
            'Utusan',
            'Kamar',
            'Kode Akses',
            'Nama',
            'Telepon',
            'Pembayaran',
            'Ukuran Peci',
        ];
    }
}
