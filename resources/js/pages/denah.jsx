import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';

export default function DenahPage() {
    return (
        <AuthLayout>
            <div className="px-1 py-4">
                <h1 className="my-3 text-lg font-extrabold">Denah Lantai 3 Gedung Mekah</h1>
                <img src="/assets/img/denah-lantai-3.jpg" alt="" />
                <h1 className="my-3 text-lg font-extrabold">Denah Lantai 4 Gedung Mekah</h1>
                <img src="/assets/img/denah-lantai-4.jpg" alt="" />
                <HelpSection />
            </div>
        </AuthLayout>
    );
}
