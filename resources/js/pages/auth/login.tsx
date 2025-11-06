import PublicLayout from '@/layouts/public';

export default function UnauthenticatedPage() {
    return (
        <PublicLayout>
            <form className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow-md">
                <h1 className="text-center text-2xl font-semibold">Masuk</h1>
                <input
                    type="text"
                    placeholder="Kode Akses"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button type="submit" className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600">
                    Masuk
                </button>
            </form>
        </PublicLayout>
    );
}
