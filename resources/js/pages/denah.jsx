import HelpSection from '@/components/help';
import AuthLayout from '@/layouts/auth';

export default function DenahPage() {
    return (
        <AuthLayout>
            <div className="px-1 py-4">
                <h1 className="my-3 text-lg font-extrabold">Denah Asrama Haji</h1>
                <img src="/assets/img/denah.jpg" alt="" />
                <HelpSection />
            </div>
        </AuthLayout>
    );
}
