import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Clock, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { APP_NAME } from '../constants';
import { CATEGORIES, Category } from '../data/blogData'; // Categories stay static for now
import { getAllPosts, BlogPost } from '../src/utils/markdownUtils';

const Blog: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getAllPosts();
            setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <SEO title={`บทความและเทคนิค - ${APP_NAME}`} />
            <div className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">
                {/* Header */}
                <header className="mb-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-slate-400 hover:text-white transition-colors mb-4"
                    >
                        <ArrowLeft size={20} className="mr-2" /> กลับหน้าแรก
                    </button>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        บทความ & เทคนิค
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">รวมเรื่องราวน่ารู้ กติกา และทริคปาร์ตี้</p>
                </header>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="ค้นหาบทความ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>

                {/* Categories */}
                <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
                    <div className="flex gap-3 w-max">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${selectedCategory === 'all'
                                    ? 'bg-purple-600 border-purple-500 text-white'
                                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            ทั้งหมด
                        </button>
                        {CATEGORIES.map((cat: Category) => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedCategory === cat.id
                                            ? 'bg-slate-700 border-purple-500 text-white shadow-lg shadow-purple-900/20'
                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                        }`}
                                >
                                    <Icon size={14} className={selectedCategory === cat.id ? 'text-purple-400' : ''} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Blog List */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-2 sticky top-0 bg-[#0F172A] z-10 py-2">
                        {selectedCategory === 'all' ? 'บทความล่าสุด' : CATEGORIES.find(c => c.id === selectedCategory)?.label}
                    </h3>

                    {loading ? (
                        <div className="text-center py-12 text-slate-500">
                            <span className="animate-pulse">Loading posts...</span>
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <article
                                key={post.id}
                                onClick={() => navigate(`/blog/${post.id}`)}
                                className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 cursor-pointer hover:bg-slate-800/60 hover:border-slate-600 transition-all active:scale-[0.99]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                                        {post.image}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                                            <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                                                {CATEGORIES.find(c => c.id === post.category)?.label}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                                        </div>
                                        <h4 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
                                            {post.title}
                                        </h4>
                                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <ChevronRight className="text-slate-600 self-center group-hover:text-purple-400 transition-colors" size={20} />
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                            <p>ไม่พบบทความ...</p>
                            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-purple-400 text-sm mt-2 underline">
                                ล้างคำค้นหา
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default Blog;
