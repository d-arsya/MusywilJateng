<?php

namespace App\Exports;

use App\Models\Attendance;
use App\Models\Meeting;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Events\AfterSheet;

class MeetingExport implements FromCollection, WithHeadings, WithMapping, WithEvents, ShouldAutoSize
{
    protected $meeting;

    public function __construct(Meeting $meeting)
    {
        $this->meeting = $meeting;
    }

    public function collection()
    {
        return Attendance::with(['user', 'user.office', 'user.employment'])
            ->where('meeting_id', $this->meeting->id)
            ->get();
    }

    public function map($attendance): array
    {
        return [
            $attendance->user->name,
            $attendance->user->office->type . " " . $attendance->user->office->name,
            $attendance->user->employment->name,
            $attendance->attend ?? 'Tidak Hadir',
        ];
    }

    public function headings(): array
    {
        return [
            'Nama',
            'Asal',
            'Jabatan',
            'Hadir'
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $sheet = $event->sheet;

                // =============================
                // 1. Insert Meeting Info above
                // =============================
                $sheet->insertNewRowBefore(1, 8);

                $sheet->setCellValue('A1', 'LAPORAN KEHADIRAN MEETING');
                $sheet->mergeCells('A1:D1');

                $sheet->setCellValue('A3', 'Nama Meeting');
                $sheet->setCellValue('B3', $this->meeting->name);

                $sheet->setCellValue('A4', 'Ruangan');
                $sheet->setCellValue('B4', $this->meeting->room);

                $sheet->setCellValue('A5', 'Tanggal');
                $sheet->setCellValue('B5', $this->meeting->date);

                $sheet->setCellValue('A6', 'Mulai');
                $sheet->setCellValue('B6', $this->meeting->start_time);

                $sheet->setCellValue('A7', 'Selesai');
                $sheet->setCellValue('B7', $this->meeting->end_time);

                $sheet->setCellValue('A8', 'Deskripsi');
                $sheet->setCellValue('B8', $this->meeting->description);

                // =================================================
                // 2. Style Title
                // =================================================
                $sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 16,
                    ],
                    'alignment' => [
                        'horizontal' => 'center',
                    ]
                ]);

                // =================================================
                // 3. Bold for meeting labels
                // =================================================
                $sheet->getStyle('A3:A8')->applyFromArray([
                    'font' => ['bold' => true]
                ]);

                // =================================================
                // 4. Style untuk heading tabel peserta
                // =================================================
                $sheet->getStyle('A9:D9')->applyFromArray([
                    'font' => ['bold' => true],
                    'alignment' => ['horizontal' => 'center'],
                ]);

                // =================================================
                // 5. Border untuk seluruh tabel peserta
                // =================================================
                $highestRow = $sheet->getHighestRow(); // baris terakhir
                $sheet->getStyle('A9:D' . $highestRow)->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                        ]
                    ]
                ]);
            }
        ];
    }
}
