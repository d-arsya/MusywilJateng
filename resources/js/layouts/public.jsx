import { PublicFooter, PublicHeader } from '@/components/header';

export default function PublicLayout({ children }) {
    return (
        <>
            <PublicHeader />
            <div className="flex flex-col items-center bg-gray-50 bg-gradient-to-br from-emerald-50 to-teal-100">
                <main className="flex w-full flex-1 flex-col items-center justify-center p-6">{children}</main>
            </div>
            <PublicFooter />
        </>
    );
}
