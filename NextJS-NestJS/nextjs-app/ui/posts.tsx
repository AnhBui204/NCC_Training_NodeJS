import Link from 'next/link';
import { PostType } from '@/lib/posts';

export function Post({ post }: { post: PostType }) {
    return (
        <li className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow post-item my-4">
            <Link href={`/blog/${post.slug}`} className='block'>
                <h3 className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors mb-2'>{post.title}</h3>
            </Link>
            <p className='text-gray-600 text-sm mb-3 line-clamp-2'>{post.content}</p>
            <div className="post-meta flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1..." />
                </svg>
                <span>{post.date}</span>
            </div>
        </li>
    );
}
