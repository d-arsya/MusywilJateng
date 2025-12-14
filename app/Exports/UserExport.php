<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Border;

class UserExport implements FromCollection, WithHeadings, WithMapping, WithEvents, ShouldAutoSize
{
    public function collection()
    {
        return User::with(['office', 'employment', 'room'])->get();
    }

    public function map($user): array
    {
        return [
            $user->employment->name,
            $user->office->name,
            $user->room?->name,
            $user->code,
            $user->name,
            $user->phone,
            $user->paid ? 'Sudah Bayar' : 'Belum Bayar',
            $user->clothsize
        ];
    }

    public function headings(): array
    {
        return [
            'Jabatan',
            'Utusan',
            'Kamar',
            'Kode Akses',
            'Nama',
            'Telepon',
            'Pembayaran',
            'Ukuran Baju',
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet;

                $sheet->getStyle('A1:H1')->applyFromArray([
                    'font' => ['bold' => true],
                    'alignment' => ['horizontal' => 'center'],
                ]);

                $highestRow = $sheet->getHighestRow();

                $sheet->getStyle("A1:H{$highestRow}")->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                        ]
                    ]
                ]);

                for ($row = 2; $row <= $highestRow; $row++) {
                    $value = $sheet->getCell("H{$row}")->getValue();
                    if ($value === 'Belum Bayar') {
                        $sheet->getStyle("H{$row}")->applyFromArray([
                            'font' => ['color' => ['rgb' => 'FF0000']],
                        ]);
                    }
                }
            }
        ];
    }
}
