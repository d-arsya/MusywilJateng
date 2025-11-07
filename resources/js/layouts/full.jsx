import { PrivateHeader, PublicFooter } from '@/components/header';

export default function FullLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <PrivateHeader />
            <main className="mx-auto w-full max-w-7xl flex-1 p-6">{children}</main>
            <PublicFooter />
        </div>
    );
}
