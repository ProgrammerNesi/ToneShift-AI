// features/page.jsx
'use client';
import Link from 'next/link';

export default function Features() {
  const features = [
    {
      title: "Tone Transformation",
      icon: "🎭",
      description: "Instantly convert text between professional, casual, funny, and academic tones with AI precision.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      title: "Social Media Optimization",
      icon: "📱",
      description: "Auto-format text for Twitter, LinkedIn, Instagram with platform-specific styling.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      title: "Intensity Control",
      icon: "🎚️",
      description: "Fine-tune tone strength from subtle to extreme with our dynamic slider.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Real-Time Editing",
      icon: "⚡",
      description: "See changes instantly as you tweak settings with live preview.",
      gradient: "from-amber-400 to-orange-500"
    },
    {
      title: "Smart Formatting",
      icon: "✨",
      description: "Auto-add emojis, bullet points, and hashtags based on context.",
      gradient: "from-emerald-400 to-teal-600"
    },
    {
      title: "API Access",
      icon: "🔌",
      description: "Integrate our AI into your apps with developer-friendly API.",
      gradient: "from-violet-500 to-fuchsia-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      {/* Reuse Your Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0d1b2a]/90 backdrop-blur-md border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl text-cyan-400">🔮</div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ToneShift AI
            </span>
          </Link>
          <Link href="/" className="text-blue-300 hover:text-cyan-200 transition-colors">
            ← Back to App
          </Link>
        </div>
      </nav>

      {/* Features Grid */}
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 text-center mb-6">
          Features
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`rounded-xl bg-gradient-to-r ${feature.gradient} p-[2px] shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all`}
            >
              <div className="h-full bg-[#0d1b2a]/80 rounded-lg p-6 flex flex-col">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-300 mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-100 flex-grow">{feature.description}</p>
                <Link 
                  href="/" 
                  className="mt-4 text-cyan-300 hover:text-cyan-100 text-sm font-medium transition-colors self-start"
                >
                  Try it now →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Link 
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-bold text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all"
          >
            Start Transforming Text
          </Link>
        </div>
      </div>
    </div>
  );
}