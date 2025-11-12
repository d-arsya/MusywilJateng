import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';
import { MapPin } from 'lucide-react';

export default function DenahPage() {
    return (
        <AuthLayout>
            {/* <img src="/assets/img/denah.jpg" alt="" /> */}
            <div className="rounded-md border-gray-200 bg-gray-50 bg-gray-100 p-4">
                <div className="flex items-center gap-3">
                    <MapPin size={20} />
                    <div className="flex-1">
                        <p className="text-sm text-gray-600">Denah sedang kami siapkan</p>
                    </div>
                </div>
            </div>
            <HelpSection />
        </AuthLayout>
    );
}
