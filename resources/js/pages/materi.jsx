import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';
import { FileText } from 'lucide-react';

const materials = [
    {
        title: 'Tata Tertib Musywil VI',
        description: 'Panduan lengkap tata tertib dan etika peserta selama mengikuti Musyawarah Wilayah VI Hidayatullah',
        file: '/assets/pdf/a.pdf',
    },
    {
        title: 'Jadwal Kegiatan',
        description: 'Rundown acara lengkap dari hari pertama hingga penutupan termasuk waktu dan lokasi setiap kegiatan',
        file: '/assets/pdf/a.pdf',
    },
    {
        title: 'Materi Pembukaan',
        description: 'Sambutan ketua umum dan visi misi Hidayatullah untuk periode mendatang beserta program kerja strategis',
        file: '/assets/pdf/a.pdf',
    },
    {
        title: 'Laporan Pertanggungjawaban',
        description: 'Laporan keuangan dan program kerja periode sebelumnya serta evaluasi pencapaian target organisasi',
        file: '/assets/pdf/a.pdf',
    },
    {
        title: 'Rancangan Anggaran',
        description: 'Proposal anggaran dasar dan anggaran rumah tangga untuk periode kepengurusan yang akan datang',
        file: '/assets/pdf/a.pdf',
    },
];

export default function MaterialPage() {
    return (
        <AuthLayout>
            <div className="space-y-8">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-gray-800">Materi Acara & Panduan Peserta</h2>
                    <p className="text-gray-600">Silakan unduh materi yang diperlukan untuk kelancaran Musyawarah Wilayah Hidayatullah.</p>
                </div>

                {/* Division Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {materials.map((item, index) => {
                        return (
                            <a
                                href={item.file}
                                download={item.title + '.pdf'}
                                key={index}
                                className="flex cursor-pointer items-center gap-x-4 rounded-2xl bg-white p-2 shadow-md"
                            >
                                <FileText size={64} />
                                <div>
                                    <h1 className="font-bold">{item.title}</h1>
                                    <h1 className="text-xs">{item.description}</h1>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Help Section */}
                <HelpSection />
            </div>
        </AuthLayout>
    );
}
