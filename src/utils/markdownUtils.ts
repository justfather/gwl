import fm from 'front-matter';

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    excerpt: string;
    content: string;
}

export interface FrontMatterAttributes {
    title: string;
    date: Date;
    category: string;
    readTime: string;
    image: string;
    excerpt: string;
}

export const getAllPosts = async (): Promise<BlogPost[]> => {
    const modules = import.meta.glob('/src/posts/*.md', { query: '?raw', import: 'default' });
    const posts: BlogPost[] = [];

    for (const path in modules) {
        // Extract ID from filename (e.g., /src/posts/kings-cup-rules.md -> kings-cup-rules)
        const id = path.split('/').pop()?.replace('.md', '') || '';

        // Load raw content
        const rawContent = await modules[path]() as string;

        // Parse front-matter
        const { attributes, body } = fm<FrontMatterAttributes>(rawContent);

        posts.push({
            id,
            title: attributes.title,
            date: new Date(attributes.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            category: attributes.category,
            readTime: attributes.readTime,
            image: attributes.image,
            excerpt: attributes.excerpt,
            content: body
        });
    }

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostById = async (id: string): Promise<BlogPost | undefined> => {
    // This is a bit inefficient (loading all) but fine for small blog volume.
    // For optimized loading, we could try dynamic import directly if strict paths are known.
    const allPosts = await getAllPosts();
    return allPosts.find(p => p.id === id);
};
