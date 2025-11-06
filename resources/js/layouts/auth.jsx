import { Home, User } from 'lucide-react';

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            {/* Main content */}
            <main className="flex-1 pb-16">{children}</main>

            {/* Footer Menu */}
            <footer className="fixed bottom-0 left-0 w-full border-t border-gray-200 bg-white shadow-sm">
                <div className="flex h-16 items-center justify-around">
                    {/* Home */}
                    <a href="/auth/home" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
                        <Home size={22} />
                        <span className="mt-1 text-xs">Home</span>
                    </a>

                    {/* Center Logo */}
                    <div className="-mt-18 flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md">
                        <img
                            src="/logo.png" // ganti dengan path logo kamu
                            alt="App Logo"
                            width={28}
                            height={28}
                            className="rounded-full"
                        />
                    </div>

                    {/* Profile */}
                    <a href="/auth/profile" className="flex flex-col items-center text-gray-500 hover:text-blue-600">
                        <User size={22} />
                        <span className="mt-1 text-xs">Profile</span>
                    </a>
                </div>
            </footer>
        </div>
    );
}
