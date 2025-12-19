import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';

export default function DenahPage() {
    return (
        <AuthLayout>
            <div className="px-1 py-4">
                {/* <h1 className="my-3 text-lg font-extrabold">Denah Asrama Haji</h1>
                <img src="/assets/img/denah.jpg" alt="" /> */}
                <div className="rounded-md border-gray-200 bg-gray-50 bg-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <p className="text-sm text-gray-600">Belum ada denah yang tersedia</p>
                        </div>
                    </div>
                </div>
                <HelpSection />
            </div>
        </AuthLayout>
    );
}
