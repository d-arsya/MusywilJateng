import AuthLayout from '@/layouts/auth';

export default function CardPage() {
    return (
        <AuthLayout>
            <div className="relative w-full max-w-xl">
                {/* Background ID Card */}
                <img src="/assets/img/card-vertical.png" alt="Banner" className="w-full rounded-lg shadow-md" />

                {/* Overlay container vertical */}
                <div className="absolute top-1/4 left-1/2 flex -translate-x-1/2 transform flex-col items-center space-y-4">
                    {/* Nama peserta */}
                    <div className="text-center text-lg font-semibold text-white drop-shadow-lg">Ahmad Fauzi</div>

                    {/* Foto Profil */}
                    <img
                        src="/assets/img/Kotak.jpg"
                        alt="Foto Profil"
                        className="h-32 w-32 rounded-full border-2 border-white object-cover shadow-lg"
                    />

                    {/* QR Code */}
                    <img src="/assets/img/qr.jpg" alt="QR Code" className="h-16 w-16 object-contain" />
                </div>
            </div>
        </AuthLayout>
    );
}
