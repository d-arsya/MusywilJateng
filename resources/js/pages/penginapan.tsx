import AuthLayout from '@/layouts/auth';

const myRoom = {
    building: 'Asrama A',
    roomNumber: '101',
    photo: '/assets/img/gedung-a.png',
    roommates: [
        { name: 'Ahmad Fauzi', origin: 'DPD Surakarta' },
        { name: 'Siti Aminah', origin: 'DPW' },
        { name: 'Budi Santoso', origin: 'Orpen Mushida' },
    ],
};

export default function PenginapanPage() {
    return (
        <AuthLayout>
            <div className="flex justify-center p-4">
                <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md">
                    {/* Foto Gedung */}
                    <img src={myRoom.photo} alt={myRoom.building} className="h-64 w-full object-cover" />

                    {/* Info Gedung & Kamar */}
                    <div className="flex flex-col space-y-3 p-6">
                        <span className="text-2xl font-semibold text-gray-800">{myRoom.building}</span>
                        <span className="text-gray-600">Kamar: {myRoom.roomNumber}</span>

                        {/* Daftar Teman Sekamar */}
                        <div>
                            <span className="font-medium text-gray-700">Teman Sekamar:</span>
                            <ul className="mt-2 space-y-1">
                                {myRoom.roommates.map((roommate, index) => (
                                    <li key={index} className="text-gray-600">
                                        <span className="font-semibold">{roommate.name}</span> –{' '}
                                        <span className="text-sm text-gray-500">{roommate.origin}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
