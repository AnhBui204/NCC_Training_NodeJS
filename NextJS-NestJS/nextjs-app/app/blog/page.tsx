import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/posts'
import Link from 'next/link';
export default async function Page() {
    const posts = await getPosts();
    return (
        <div className='max-2-4xl mx-auto px-4 py-8'>
            <h1 className='text-4xl font-bold mb-8 text-center'>All Blog Posts</h1>
            <ul className='grid grid-cols-1 gap-6'>
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </ul>
            <Link href="/">
              <button className='inline-block bg-blue-200 rounded-md p-2 text-gray-800 no-underline hover:text-white hover:bg-blue-600 transition-colors'>Go Back</button>
            </Link>
        </div>
    )
}