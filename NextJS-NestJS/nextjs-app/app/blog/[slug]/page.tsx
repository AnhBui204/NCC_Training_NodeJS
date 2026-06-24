// function generateStaticParams() {}

// export default function Page() {
//     return (
//         <h1>
//             Hello, Blog Post Page!
//         </h1>
//     )
// }
import Link from 'next/link'
import { getPostBySlug } from '@/lib/posts'

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPostBySlug(slug)
    if (!post) {
        return <div>Post Not Found</div>
    }
    return (
        <div className='max-w-4xl mx-auto px-4 py-8 text-center'>
            <h1 className='text-gray-500 hover:text-blue-500 transition-colors my-4'>{post.title}</h1>
            <p className='text-gray-500 hover:text-red-500 transition-colors my-4'>{post.content}</p>
            <Link href="/blog">
              <button className='inline-block bg-blue-200 rounded-md p-2 text-gray-800 no-underline hover:text-white hover:bg-blue-600 transition-colors'>Go Back</button>
            </Link>
        </div>
    )
}