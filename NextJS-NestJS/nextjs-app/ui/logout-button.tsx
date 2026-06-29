'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/app/api/auth.api';

export function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();

        router.push('/auth/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
            Logout
        </button>
    );
}
