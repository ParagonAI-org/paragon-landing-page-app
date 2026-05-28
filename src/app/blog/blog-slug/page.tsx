import Navbar from '@/components/Navbar'

const BlogPost = () => {
  const relatedPosts = [
    {
      title: 'The Future of Multi-Modal Reasoning',
      category: 'Research',
      date: 'May 12, 2024',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Optimizing Inference on Edge Devices',
      category: 'Engineering',
      date: 'May 10, 2024',
      image:
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Safety Paradigms in Autonomous Agents',
      category: 'Safety',
      date: 'May 08, 2024',
      image:
        'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800',
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Header Hero Image */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000"
          alt="Hero"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent"></div>
      </div>

      {/* Main Content */}
      <article className="relative max-w-[800px] mx-auto px-6 -mt-32 z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold uppercase tracking-widest text-gray-300">
            Research
          </span>
          <span className="text-sm text-gray-500 font-medium tracking-tight">
            May 15, 2024 — 12 min read
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-10">
          Introducing Paragon-1: <br />
          The Next Leap in Neural Architectures
        </h1>

        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-white/10">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
            alt="Author"
            className="w-12 h-12 rounded-full border border-white/20"
          />
          <div>
            <p className="text-sm font-bold text-white">Dr. Aris Thorne</p>
            <p className="text-xs text-gray-500 font-medium">
              Chief Scientist, ParagonAI
            </p>
          </div>
        </div>

        {/* Body Text */}
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white prose-blockquote:border-white">
          <p className="text-xl !text-white font-normal">
            Today, we are thrilled to unveil Paragon-1, our most capable model
            to date. It represents a paradigm shift in how transformers process
            long-context tokens.
          </p>

          <p>
            The fundamental challenge of modern LLMs has always been the
            quadratic cost of attention. As context grows, so does the compute
            requirement. Paragon-1 breaks this barrier by selectively activating
            neural pathways.
          </p>

          <figure className="my-16">
            <img
              src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?auto=format&fit=crop&q=80&w=1200"
              alt="Architecture"
              className="rounded-2xl border border-white/10 shadow-2xl"
            />
            <figcaption className="text-center text-xs text-gray-500 mt-4 italic">
              Fig 1.1: The latent space visualization of Paragon-1 during active
              reasoning tasks.
            </figcaption>
          </figure>

          <h3>Breaking the Context Barrier</h3>
          <p>
            During our internal benchmarking, Paragon-1 demonstrated an
            unprecedented ability to maintain coherence across 2 million tokens.
            This allows entire codebases or legal libraries to be ingested in a
            single pass.
          </p>

          <blockquote>
            <p>
              "We didn't just build a bigger model; we built a smarter way for
              information to flow."
            </p>
          </blockquote>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-16 pb-16 border-b border-white/10">
          {['AI', 'Neural Networks', 'Tech Architecture', 'Open Source'].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-400 hover:text-white cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ),
          )}
        </div>
      </article>

      {/* Related Articles */}
      <section className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
              Continue Reading
            </h2>
            <p className="text-gray-500 text-sm">
              Explore more insights from our research team.
            </p>
          </div>
          <button className="text-sm font-bold border-b border-white/20 hover:border-white transition-all pb-1 cursor-pointer">
            View all posts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 border border-white/10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">
                {post.category}
              </p>
              <h3 className="text-lg font-bold leading-snug group-hover:text-gray-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                {post.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center text-gray-600 text-xs">
        © 2024 ParagonAI Research. All rights reserved.
      </footer>
    </div>
  )
}

export default BlogPost
