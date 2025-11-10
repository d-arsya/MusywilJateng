'use client';

import AuthLayout from '@/layouts/auth';
import { toPng } from 'html-to-image';
import { Avatar } from 'primereact/avatar';
import { useRef } from 'react';
import QRCode from 'react-qr-code';

export default function CardPage({ auth, app }) {
    const user = auth.user;
    const cardRef = useRef(null);
    const qrRef = useRef(null);
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
                    <div className="absolute top-1/4 left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center space-y-4">
                        <div className="text-center text-xl font-semibold text-white drop-shadow-lg">
                            {user.name}
                            <p className="mt-2 text-xs font-thin">
                                {user.office.type} {user.office.name}
                            </p>
                        </div>
                        <Avatar
                            image={user.avatar || undefined}
                            label={!user.avatar ? user.name.charAt(0) : undefined}
                            size="xlarge"
                            shape="circle"
                            className="h-32 w-32 rounded-full border-2 border-white bg-emerald-800 object-cover shadow-lg"
                            style={{ width: '80px', height: '80px', fontSize: '32px' }}
                        />
                        <div ref={qrRef} className="rounded-sm bg-white p-1">
                            <QRCode
                                value={app.url + '/s/' + user.code} // dynamically from user.code
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
