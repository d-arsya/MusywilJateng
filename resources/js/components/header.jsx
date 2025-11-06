export function PublicHeader() {
    return (
        <header className="bg-emerald-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <a href="/" className="flex items-center space-x-3">
                        <div className="rounded-ful flex h-16 w-16 items-center justify-center">
                            <img src="/logo.png" alt="" />
                        </div>
                        <div>
                            <h1 className="text-md font-bold md:text-2xl">Musyawarah Wilayah VI Hidayatullah</h1>
                            <p className="text-sm text-emerald-200">DIY - Jateng Bagian Selatan</p>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
}

export function PublicFooter() {
    return (
        <footer className="bg-emerald-900 py-8 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <p className="mb-2 text-emerald-200">© 2025 Musyawarah Wilayah VI Hidayatullah</p>
                    <p className="text-sm text-emerald-300">Website Official Musyawarah Wilayah VI Hidayatullah DIY - Jateng Bagian Selatan</p>
                </div>
            </div>
        </footer>
    );
}
