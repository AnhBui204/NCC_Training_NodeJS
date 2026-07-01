import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { getUser } from './api/user.api';
import { LogoutButton } from '@/ui/logout-button';

export default async function Home() {
  const posts = await getPosts();
  const users = await getUser();

  return (
    <div className='min-h-screen bg-gray-50 text-gray-800 font-sans'>
      {/* <header className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10'>
        <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm'>
              N
            </div>
            <h1 className='text-xl font-bold text-gray-900'>NextJS Dashboard</h1>
          </div>

          <div className='flex items-center gap-6'>
            <nav className='flex gap-6 text-sm font-semibold'>
              <Link href="/blog" className='text-gray-600 hover:text-blue-600 transition-colors'>Blog Posts</Link>
              <Link href="/users" className='text-gray-600 hover:text-blue-600 transition-colors'>Users (Client)</Link>
              <Link href="/server-users" className='text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 font-bold'>
                <span>Users (Server RSC)</span>
              </Link>
              <Link href="/admin" className='text-gray-600 hover:text-red-600 transition-colors'>Admin</Link>
            </nav>
            <div className='h-4 w-px bg-gray-200'></div>
            <LogoutButton />
          </div>
        </div>
      </header> */}

      <main className='max-w-6xl mx-auto px-6 py-8'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900'>Welcome Back!</h2>
          <p className='text-gray-500 text-sm mt-1'>Here is the summary of your application statistics and recent activity.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow'>
            <div>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Total Blog Posts</p>
              <h3 className='text-3xl font-extrabold text-gray-900 mt-2'>{posts.length}</h3>
            </div>
            <div className='p-3 bg-blue-50 text-blue-600 rounded-lg'>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow'>
            <div>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Registered Users</p>
              <h3 className='text-3xl font-extrabold text-gray-900 mt-2'>{users.length}</h3>
            </div>
            <div className='p-3 bg-emerald-50 text-emerald-600 rounded-lg'>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <section className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-bold text-gray-900'>Recent Posts</h3>
              <Link href="/blog" className='text-sm text-blue-600 hover:underline font-medium'>View All</Link>
            </div>
            <div className='space-y-4 flex-1'>
              {posts.slice(0, 3).map((post) => (
                <div key={post.id} className='group border border-gray-100 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50/10 transition-all'>
                  <Link href={`/blog/${post.slug}`} className='block'>
                    <h4 className='font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-1'>{post.title}</h4>
                  </Link>
                  <p className='text-xs text-gray-400'>{post.date}</p>
                </div>
              ))}
            </div>
          </section>

          <section className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-bold text-gray-900'>Recent Users</h3>
              <Link href="/users" className='text-sm text-blue-600 hover:underline font-medium'>View All</Link>
            </div>
            <div className='space-y-4 flex-1'>
              {users.slice(0, 3).map((user, index) => {
                const isMale = user.gender?.toLowerCase() === 'male';
                const isFemale = user.gender?.toLowerCase() === 'female';
                const avatarBg = isMale ? 'bg-blue-100 text-blue-700' : isFemale ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-700';

                return (
                  <div key={user._id ?? index} className='flex items-center justify-between border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-all'>
                    <div className='flex items-center gap-3'>
                      <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center font-bold text-sm uppercase`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/users/${user.name}`} className='block font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
                          {user.name}
                        </Link>
                        <p className='text-xs text-gray-400'>{user.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full uppercase tracking-wider ${isMale ? 'bg-blue-50 text-blue-600' : isFemale ? 'bg-pink-50 text-pink-600' : 'bg-gray-50 text-gray-600'}`}>
                      {user.gender}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
