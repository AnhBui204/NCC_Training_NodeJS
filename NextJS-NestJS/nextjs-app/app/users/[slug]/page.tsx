import Link from 'next/link'
import { getUserByName } from '@/app/api/user.api'

export default async function UsersPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const user = await getUserByName(slug)
    if (!user) {
        return <div>User Not Found</div>
    }
    const isMale = user.gender?.toLowerCase() === 'male';
    const isFemale = user.gender?.toLowerCase() === 'female';
    const isAdmin = user.role === 'ADMIN'

    const avatarBg = isMale ? 'bg-blue-50' : isFemale ? 'bg-pink-50' : 'bg-gray-50';
    const textTheme = isMale ? 'text-blue-500' : isFemale ? 'text-pink-500' : 'text-gray-500';
    const borderTopTheme = isMale ? 'border-t-blue-500' : isFemale ? 'border-t-pink-500' : 'border-t-gray-500';
    const avatarBorder = isMale ? 'border-blue-100' : isFemale ? 'border-pink-100' : 'border-gray-100';
    const badgeTheme = isMale ? 'bg-blue-100 text-blue-800' : isFemale ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-800';
    const roleTheme = isAdmin ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';
    const btnTheme = isMale
        ? 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300'
        : isFemale
            ? 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-300'
            : 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-300';

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4'>
            <div className={`max-w-md w-full bg-white rounded-2xl shadow-md border-t-8 ${borderTopTheme} p-8`}>
                <div className='flex justify-center mb-6'>
                    <div className={`w-24 h-24 rounded-full ${avatarBg} border-4 ${avatarBorder} flex items-center justify-center`}>
                        <span className={`text-4xl font-bold uppercase ${textTheme}`}>
                            {user.name.charAt(0)}
                        </span>
                    </div>
                </div>

                <h1 className='text-3xl font-extrabold text-gray-800 text-center mb-2'>{user.name}</h1>

                <div className='flex justify-center mb-6 gap-1'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${roleTheme}`}>
                        {user.role}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${badgeTheme}`}>
                        {user.gender}
                    </span>
                </div>

                <div className='space-y-4 border-t border-gray-100 pt-6 text-sm text-gray-600 mb-8'>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-400 font-medium'>Email:</span>
                        <span className='text-gray-800 font-semibold'>{user.email}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-400 font-medium'>Age:</span>
                        <span className='text-gray-800 font-semibold'>{user.age} years old</span>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <Link href="/users" className='w-full'>
                        <button className={`w-full py-2.5 rounded-lg text-white font-bold shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 ${btnTheme}`}>
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}