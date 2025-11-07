'use client';

import AuthLayout from '@/layouts/auth';
import { toPng } from 'html-to-image';
import { useRef } from 'react';
import QRCode from 'react-qr-code';

export default function CardPage() {
    const cardRef = useRef(null);
    const qrRef = useRef(null);
    const user = { name: 'Kamaluddin Arsyad Fadllillah' };
    const handleDownload = async () => {
        if (!cardRef.current) return;

        try {
            const dataUrl = await toPng(cardRef.current, { cacheBust: true });
            const link = document.createElement('a');
            link.download = user.name + '-id-card.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image:', err);
        }
    };
    const handleDownloadQR = async () => {
        if (!qrRef.current) return;

        try {
            const dataUrl = await toPng(qrRef.current, { cacheBust: true });
            const link = document.createElement('a');
            link.download = user.name + '-qr-code.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to download image:', err);
        }
    };

    return (
        <AuthLayout>
            <div className="flex flex-col items-center space-y-4">
                {/* Card container */}
                <div ref={cardRef} className="relative w-full max-w-xl">
                    {/* Background ID Card */}
                    <img src="/assets/img/card-vertical.png" alt="Banner" className="w-full rounded-lg shadow-md" />

                    {/* Overlay content */}
                    <div className="absolute top-1/5 left-1/2 flex -translate-x-1/2 transform flex-col items-center space-y-4">
                        <div className="text-center text-lg font-semibold text-white drop-shadow-lg">{user.name}</div>

                        <img
                            src="/assets/img/Kotak.jpg"
                            alt="Foto Profil"
                            className="h-24 w-24 rounded-full border-2 border-white object-cover shadow-lg"
                        />

                        <div ref={qrRef} className="rounded-sm bg-white p-1">
                            <QRCode
                                value={user.name} // dynamically from user.code
                                size={128}
                                className="h-32 w-32"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between gap-6">
                    <button onClick={handleDownload} className="rounded-lg bg-emerald-400 px-4 py-2 text-white shadow hover:bg-emerald-700">
                        Unduh
                    </button>
                    <button onClick={handleDownloadQR} className="rounded-lg bg-emerald-400 px-4 py-2 text-white shadow hover:bg-emerald-700">
                        Unduh QR
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
}
