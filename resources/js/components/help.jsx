export default function HelpSection() {
    return (
        <div className="my-12 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Butuh Bantuan?</h3>
            <p className="mb-4 text-sm text-gray-600">Hubungi divisi terkait atau kunjungi meja informasi untuk bantuan lebih lanjut</p>
            <a
                href="https://wa.me/6281234895030"
                className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
            >
                Kontak Sekretariat
            </a>
        </div>
    );
}
