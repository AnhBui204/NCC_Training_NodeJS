import { Users } from '@/ui/user';
import { getUser } from '../api/user.api';
import Link from 'next/link';

export default async function Page() {
    const users = await getUser();
    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-4xl font-bold mb-8 text-center'>All Users</h1>
            <ul className='grid grid-cols-1 gap-6'>
                {users.map((user) => (
                    <Users key={user._id} user={user} />
                ))}
            </ul>
            <Link href="/">
                <button className='inline-block bg-blue-200 rounded-md p-2 text-gray-800 no-underline hover:text-white hover:bg-blue-600 transition-colors'>Go Back</button>
            </Link>
        </div>
    )
}