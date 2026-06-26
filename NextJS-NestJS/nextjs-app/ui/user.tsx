import Link from 'next/link';
import { User } from '@/app/api/user.api';

export function Users({ user }: { user: User }) {
    return (
        <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow post-item my-4">
            <Link href={`/users/${user.name}`} className='block'>
                <h3 className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors mb-2'>{user.name}</h3>
            </Link>
            <p className='text-gray-600 text-sm mb-3 line-clamp-2'>{user.email}</p>
            <div className="post-meta flex items-center gap-2 text-xs text-gray-500 mb-3">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1..." />
                </svg>
                <span>{user.age}</span>
            </div>
            {user.gender?.toLowerCase() === 'male' ? (
                <p className='text-blue-600 font-bold text-sm mb-3 line-clamp-2'>{user.gender}</p>
            ) : (
                <p className='text-pink-600 font-bold text-sm mb-3 line-clamp-2'>{user.gender}</p>
            )}

        </li>
    );
}
