export interface PostType {
  id: number;
  title: string;
  content: string;
  slug: string;
  date: string;
}

export async function getPosts(): Promise<PostType[]> {
  return [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the first blog post',
      slug: 'first-post',
      date: '2026-06-24',
    },
    {
      id: 2,
      title: 'Second Post',
      content: 'This is the second blog post',
      slug: 'second-post',
      date: '2026-06-23',
    },
    {
      id: 3,
      title: 'Third Post',
      content: 'This is the third blog post',
      slug: 'third-post',
      date: '2026-06-22',
    },
  ];
}


export async function getPostBySlug(slug: string): Promise<PostType | null> {
  const posts = await getPosts()
  return posts.find(post => post.slug === slug) || null
}
