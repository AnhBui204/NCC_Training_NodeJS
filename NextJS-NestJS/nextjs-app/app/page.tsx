import Link from 'next/link';
import { getPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold text-blue-600 mb-6'>Hello NextJS</h1>
      <nav className='bg-gray-100 p-4 rounded-lg mb-8 text-center'>
        <Link href="/blog" className='text-blue-500 hover:text-blue font-semibold'>View All Blog Posts</Link>
      </nav>
      
      <section className='bg-white shadow-lg rounded-lg p-6'>
        <h2 className='text-2xl font-bold mb-4'>Recent Posts</h2>
        <ul className='bg-gray-300 text-xl font-bold text-center rounded-lg my-6 shadow-lg py-2'>
          {posts.map((post) => (
            <li className='my-4' key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
              <p>{post.date}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
