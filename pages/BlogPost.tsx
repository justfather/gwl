import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import { CATEGORIES } from '../data/blogData';
import { getPostById, BlogPost as IBlogPost } from '../src/utils/markdownUtils';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IBlogPost | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            if (!id) return;
            const p = await getPostById(id);
            setPost(p);
            setLoading(false);
        };
        loadPost();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Loading...</div>;
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">ไม่พบบทความ</h1>
                    <button onClick={() => navigate('/blog')} className="text-purple-400 underline">กลับหน้ารวมบทความ</button>
                </div>
            </div>
        );
    }

    const category = CATEGORIES.find(c => c.id === post.category);

    // Create Schema.org Structured Data
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": [
            "https://gwl.vercel.app/og-image.jpg" // Potentially dynamic
        ],
        "datePublished": "2025-12-15", // Placeholder/Fallback
        "dateModified": "2025-12-15",
        "author": [{
            "@type": "Person",
            "name": "GameWongLhao team",
            "url": "https://gwl.vercel.app/about"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "GameWongLhao",
            "logo": {
                "@type": "ImageObject",
                "url": "https://gwl.vercel.app/favicon.ico"
            }
        },
        "description": post.excerpt,
        "articleBody": post.content // Markdown content is fine for schema roughly
    };

    return (
        <>
            <SEO
                title={`${post.title}`}
                description={post.excerpt}
                type="article"
                schema={schema}
            />
            <div className="min-h-screen bg-[#0F172A] text-white">
                {/* Navigation Bar */}
                <div className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition">
                        <ArrowLeft size={20} />
                    </button>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate max-w-[200px]">
                        {category?.label || 'บทความ'}
                    </span>
                    <button className="p-2 -mr-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition">
                        <Share2 size={20} />
                    </button>
                </div>

                <article className="max-w-2xl mx-auto p-6 pb-24">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 rounded-3xl bg-slate-800/50 text-5xl mb-6 shadow-xl border border-slate-700/50">
                            {post.image}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-md">
                                <Calendar size={12} /> {post.date}
                            </span>
                            <span className="flex items-center gap-1 bg-slate-800/50 px-2 py-1 rounded-md">
                                <Clock size={12} /> {post.readTime}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-slate max-w-none 
              prose-headings:text-slate-200 prose-headings:font-bold
              prose-p:text-slate-300 prose-p:leading-7
              prose-li:text-slate-300
              prose-strong:text-purple-400
              prose-a:text-pink-400">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    {/* Sticky CTA for Mobile/Desktop */}
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4 z-40">
                        <button
                            onClick={() => navigate('/wheel')}
                            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-2xl shadow-pink-900/40 animate-pulse hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10"
                        >
                            <span className="text-xl">🎮</span>
                            <span>เริ่มเล่นเกมวงเหล้าเลย!</span>
                        </button>
                    </div>
                </article>
            </div>
        </>
    );
};

export default BlogPost;
