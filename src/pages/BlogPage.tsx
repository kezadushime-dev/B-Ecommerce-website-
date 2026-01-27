import React, { useState } from 'react';
import { Search, Calendar, User, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

const ALL_POSTS = [
  {
    id: 1,
    title: "Do you Have A Passion for Photography",
    category: "BEAUTY, LIFESTYLE",
    author: "Martin Gray",
    date: "May 31, 2019",
    image: "https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=800",
    excerpt: "Discover the art of capturing life's most beautiful moments through the lens of professional photography...",
    content: "Photography is more than just capturing images; it's about freezing moments in time that tell compelling stories. Whether you're drawn to portrait photography, landscape shots, or street photography, developing your passion requires dedication and practice.\n\nThe key to great photography lies in understanding light, composition, and timing. Natural lighting during golden hour creates the most flattering portraits, while dramatic shadows can add depth and mystery to your shots. Composition techniques like the rule of thirds help create visually appealing images that draw the viewer's eye.\n\nInvesting in quality equipment is important, but remember that the photographer's vision matters more than expensive gear. Start with basic equipment and gradually upgrade as your skills develop. Practice regularly, experiment with different styles, and don't be afraid to make mistakes – they're part of the learning process."
  },
  {
    id: 2,
    title: "Notify What Makes You Happy, Smile More!",
    category: "LIFESTYLE, TRAVEL",
    author: "Sarah Johnson",
    date: "May 30, 2019",
    image: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
    excerpt: "Explore the science behind happiness and discover simple daily practices that can transform your outlook on life...",
    content: "Happiness isn't just a fleeting emotion – it's a skill that can be developed through intentional practices and mindset shifts. Research shows that our daily habits and thought patterns significantly impact our overall well-being and life satisfaction.\n\nStart your day with gratitude by writing down three things you're thankful for. This simple practice rewires your brain to notice positive aspects of your life. Regular exercise, even just a 10-minute walk, releases endorphins that naturally boost your mood.\n\nSocial connections are crucial for happiness. Make time for meaningful conversations with friends and family. Practice active listening and show genuine interest in others' experiences. Remember, happiness is contagious – when you smile more, you not only feel better but also positively impact those around you."
  },
  {
    id: 3,
    title: "Fashion Elements In This Right Summer",
    category: "FASHION, STYLE",
    author: "Emma Wilson",
    date: "May 27, 2019",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    excerpt: "Exploring the top trends for the summer season including light fabrics, bold colors, and sustainable fashion choices...",
    content: "Summer 2024 brings exciting fashion trends that blend comfort with style. This season is all about embracing lightweight fabrics, vibrant colors, and sustainable fashion choices that make you look good while feeling great.\n\nLinen and cotton blends dominate summer wardrobes, offering breathability and comfort in hot weather. Flowing maxi dresses, wide-leg pants, and oversized shirts create effortless elegance. Bold tropical prints and bright coral colors add energy to any outfit.\n\nSustainability is no longer optional – it's essential. Invest in quality pieces that will last multiple seasons. Choose brands that prioritize ethical manufacturing and eco-friendly materials. Vintage and second-hand shopping are also great ways to find unique pieces while reducing environmental impact."
  },
  {
    id: 4,
    title: "The Art of Minimalist Living",
    category: "LIFESTYLE, HOME",
    author: "David Chen",
    date: "May 25, 2019",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    excerpt: "Learn how embracing minimalism can lead to a more intentional, peaceful, and fulfilling lifestyle...",
    content: "Minimalism isn't about living with nothing – it's about living with intention. By focusing on what truly matters and eliminating excess, you create space for experiences, relationships, and personal growth that bring genuine fulfillment.\n\nStart small by decluttering one room at a time. Ask yourself: Does this item serve a purpose or bring joy? If not, consider donating or recycling it. The goal isn't to own as little as possible, but to own things that add value to your life.\n\nMinimalism extends beyond possessions to digital spaces, commitments, and relationships. Unsubscribe from unnecessary emails, decline social obligations that drain your energy, and focus on nurturing meaningful connections. This intentional approach creates mental clarity and reduces stress."
  },
  {
    id: 5,
    title: "Healthy Eating on a Budget",
    category: "HEALTH, FOOD",
    author: "Lisa Rodriguez",
    date: "May 23, 2019",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    excerpt: "Discover practical strategies for maintaining a nutritious diet without breaking the bank...",
    content: "Eating healthy doesn't have to be expensive. With smart planning and strategic shopping, you can nourish your body with wholesome foods while staying within your budget. The key is focusing on nutrient-dense, affordable staples.\n\nBuy seasonal produce when it's at peak freshness and lowest cost. Frozen fruits and vegetables are equally nutritious and often more affordable than fresh options. Stock up on pantry staples like beans, lentils, whole grains, and nuts – these provide protein and fiber at a fraction of the cost of meat.\n\nMeal planning is your best friend for budget-friendly eating. Plan your weekly meals around sales and seasonal ingredients. Batch cooking saves both time and money – prepare large portions and freeze individual servings for busy weekdays."
  },
  {
    id: 6,
    title: "Digital Detox: Reclaiming Your Time",
    category: "TECHNOLOGY, WELLNESS",
    author: "Michael Thompson",
    date: "May 20, 2019",
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    excerpt: "Break free from digital overwhelm and rediscover the joy of being present in the moment...",
    content: "Our constant connection to digital devices is rewiring our brains and affecting our ability to focus, sleep, and connect with others. A digital detox isn't about abandoning technology entirely – it's about creating healthy boundaries.\n\nStart with small changes: designate phone-free zones in your home, especially the bedroom and dining area. Use the 'Do Not Disturb' feature during meals and before bedtime. Replace mindless scrolling with intentional activities like reading, walking, or having face-to-face conversations.\n\nNotice how you feel during screen-free time. Many people report improved sleep quality, better concentration, and deeper relationships after reducing their digital consumption. The goal is to use technology as a tool that enhances your life, not controls it."
  }
];

export const BlogPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handleReadMore = (post: any) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Page Header */}
      <div className="py-16 bg-[#f9f9f9] text-center border-b border-gray-100">
        <h1 className="text-5xl font-black text-slate-800 mb-2">
          {selectedPost ? "Blog Detail" : "Our Blog"}
        </h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          Home / {selectedPost ? "Blog Detail" : "Blog"}
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {selectedPost ? (
              /* --- FULL ARTICLE VIEW --- */
              <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-blue-600 mb-8 hover:text-black transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Blog
                </button>
                
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-3">{selectedPost.category}</p>
                  <h1 className="text-4xl font-black text-slate-800 mb-4 uppercase leading-tight">
                    {selectedPost.title}
                  </h1>
                  <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase mb-6">
                    <span className="flex items-center gap-1"><User size={12} /> By {selectedPost.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {selectedPost.date}</span>
                  </div>
                </div>
                
                <img src={selectedPost.image} className="w-full h-96 object-cover mb-8 rounded-sm" alt={selectedPost.title} />
                
                <div className="text-gray-600 leading-loose space-y-6 text-base">
                  {selectedPost.content.split('\n').map((para: string, i: number) => (
                    para.trim() && <p key={i} className="mb-6">{para}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-widest">Tags:</span>
                    {selectedPost.category.split(', ').map((tag: string, i: number) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-bold uppercase tracking-wide hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Share */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-black uppercase tracking-widest">Share This Article:</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-600 text-white rounded-sm hover:bg-black transition-all"><Facebook size={14} /></button>
                    <button className="p-2 bg-sky-400 text-white rounded-sm hover:bg-black transition-all"><Twitter size={14} /></button>
                    <button className="p-2 bg-blue-800 text-white rounded-sm hover:bg-black transition-all"><Linkedin size={14} /></button>
                  </div>
                </div>

                {/* Related Articles */}
                <div className="mt-16 pt-12 border-t border-gray-100">
                  <h3 className="text-2xl font-black text-slate-800 mb-8 uppercase">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ALL_POSTS.filter(post => post.id !== selectedPost.id).slice(0, 2).map((post) => (
                      <div key={post.id} className="group cursor-pointer" onClick={() => handleReadMore(post)}>
                        <img src={post.image} className="w-full h-48 object-cover mb-4 transition-transform duration-700 group-hover:scale-105 rounded-sm" alt={post.title} />
                        <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-2">{post.category}</p>
                        <h4 className="text-lg font-black text-slate-800 hover:text-blue-600 transition-colors uppercase leading-tight">{post.title}</h4>
                        <p className="text-gray-400 text-xs font-bold mt-2 uppercase">{post.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ) : (
              /* --- BLOG LIST VIEW --- */
              <>
                <div className="grid grid-cols-1 gap-12">
                  {ALL_POSTS.map((post) => (
                    <article key={post.id} className="group border-b border-gray-100 pb-12 last:border-b-0">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                          <div className="relative overflow-hidden cursor-pointer" onClick={() => handleReadMore(post)}>
                            <img 
                              src={post.image} 
                              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105 rounded-sm" 
                              alt={post.title} 
                            />
                          </div>
                        </div>
                        <div className="lg:w-2/3">
                          <p className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-3">{post.category}</p>
                          <h2 
                            className="text-2xl font-black text-slate-800 mb-4 hover:text-blue-600 cursor-pointer transition-colors leading-tight uppercase"
                            onClick={() => handleReadMore(post)}
                          >
                            {post.title}
                          </h2>
                          <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase mb-4">
                            <span className="flex items-center gap-1"><User size={12} /> By {post.author}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                          <button 
                            onClick={() => handleReadMore(post)}
                            className="text-[11px] font-black uppercase tracking-[0.2em] bg-blue-600 text-white px-6 py-3 hover:bg-black transition-all"
                          >
                            Read Full Article
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-center mt-16">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-blue-600 text-white font-bold text-sm hover:bg-black transition-all">1</button>
                    <button className="w-10 h-10 border border-gray-200 text-gray-600 font-bold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">2</button>
                    <button className="w-10 h-10 border border-gray-200 text-gray-600 font-bold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">3</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar (Always Visible) */}
          <aside className="lg:w-1/3 space-y-12">
            <div className="relative">
              <input type="text" placeholder="Search..." className="w-full border border-gray-100 bg-[#f9f9f9] p-4 pr-12 text-sm outline-none focus:border-blue-600" />
              <button className="absolute right-0 top-0 h-full w-12 bg-blue-600 text-white flex items-center justify-center"><Search size={18} /></button>
            </div>

            <div className="border border-gray-100">
              <div className="flex border-b border-gray-100">
                <button className="flex-1 py-3 text-[11px] font-black uppercase tracking-widest bg-white border-t-2 border-t-blue-600 text-blue-600">Recent Posts</button>
              </div>
              <div className="p-6 space-y-6">
                {ALL_POSTS.map((post) => (
                  <div key={post.id} onClick={() => handleReadMore(post)} className="flex gap-4 items-start group cursor-pointer">
                    <img src={post.image} className="w-16 h-16 object-cover shrink-0" alt="" />
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors uppercase">{post.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};