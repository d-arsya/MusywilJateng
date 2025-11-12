import PublicLayout from '@/layouts/public';
import { router, useForm } from '@inertiajs/react';

export default function LoginPage() {
    const { data, setData } = useForm({
        code: '',
    });
    function submitLogin(e) {
        e.preventDefault();
        router.get('/s/' + data.code);
    }
    return (
        <PublicLayout>
            <div className="min-h-screen">
                <form onSubmit={submitLogin} className="w-full max-w-sm space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-xl">
                    <div className="mb-4 flex justify-center">
                        <img src="/logo.png" alt="Logo" className="h-16 w-16 animate-bounce" />
                    </div>
                    <h1 className="text-center text-2xl font-bold text-emerald-800">Masuk</h1>
                    <input
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        type="text"
                        placeholder="Kode Akses"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 transition duration-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white transition duration-200 hover:bg-emerald-600"
                    >
                        Masuk
                    </button>
                    <p className="text-center text-sm text-gray-500">
                        Belum punya kode?{' '}
                        <a href="https://wa.me/6281234895030" className="font-semibold text-emerald-700 hover:underline">
                            Hubungi Admin
                        </a>
                    </p>
                </form>
            </div>
        </PublicLayout>
    );
}
