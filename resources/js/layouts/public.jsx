export default function PublicLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50">
            {/* Header */}
            <header className="flex w-full justify-center border-b border-gray-200 bg-white py-6 shadow-sm">
                <img
                    src="/logo.png" // ganti dengan path logo kamu
                    alt="App Logo"
                    width={120}
                    height={40}
                    priority
                />
            </header>

            {/* Main Content */}
            <main className="flex w-full flex-1 flex-col items-center justify-center p-6">{children}</main>
        </div>
    );
}
