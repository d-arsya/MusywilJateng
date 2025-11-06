import { PublicFooter, PublicHeader } from '@/components/header';

export default function PublicLayout({ children }) {
    return (
        <>
            <PublicHeader />
            <div className="flex min-h-screen flex-col items-center bg-gray-50">
                {/* Main Content */}
                <main className="flex w-full flex-1 flex-col items-center justify-center p-6">{children}</main>
            </div>
            <PublicFooter />
        </>
    );
}
