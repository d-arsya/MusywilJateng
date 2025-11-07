import AuthLayout from '@/layouts/auth';
import QRCode from 'react-qr-code';

export default function CardPage() {
    return (
        <AuthLayout>
            <div className="relative w-full max-w-xl">
                {/* Background ID Card */}
                <img src="/assets/img/card-vertical.png" alt="Banner" className="w-full rounded-lg shadow-md" />

                {/* Overlay container vertical */}
                <div className="absolute top-1/5 left-1/2 flex -translate-x-1/2 transform flex-col items-center space-y-4">
                    {/* Nama peserta */}
                    <div className="text-center text-lg font-semibold text-white drop-shadow-lg">Ahmad Fauzi</div>

                    {/* Foto Profil */}
                    <img
                        src="/assets/img/Kotak.jpg"
                        alt="Foto Profil"
                        className="h-32 w-32 rounded-full border-2 border-white object-cover shadow-lg"
                    />

                    {/* QR Code */}
                    <div className="rounded-sm bg-white p-1">
                        <QRCode
                            value={'KamaluddinArsyadFadllillah'} // dynamically generated from user.code
                            size={64} // roughly same as your h-16 w-16
                            className="h-36 w-36"
                        />
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
