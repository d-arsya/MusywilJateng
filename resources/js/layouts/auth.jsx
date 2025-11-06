import { Home, User } from 'lucide-react';

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Main content */}
            <main className="mx-auto w-full max-w-xs flex-1 pt-6 pb-16">{children}</main>

            {/* Footer Menu */}
            <footer className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white shadow-sm">
                <div className="relative flex h-16 items-center justify-around">
                    {/* Home */}
                    <a href="/dashboard" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
                        <Home size={22} />
                        <span className="mt-1 text-xs">Home</span>
                    </a>

                    {/* Center Logo */}
                    <a
                        href="/card"
                        className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md"
                    >
                        <img
                            src="/logo.png" // ganti dengan path logo kamu
                            alt="App Logo"
                            width={28}
                            height={28}
                            className="rounded-full"
                        />
                    </a>

                    {/* Profile */}
                    <a href="/profile" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
                        <User size={22} />
                        <span className="mt-1 text-xs">Profile</span>
                    </a>
                </div>
            </footer>
        </div>
    );
}
