// app/about/page.jsx
'use client';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      {/* Shared Navbar */}
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

      {/* About Content */}
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 text-center mb-12">
          About ToneShift
        </h1>

        <div className="space-y-8 text-blue-100">
          {/* Mission Card */}
          <div className="rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-[2px]">
            <div className="bg-[#0d1b2a]/80 rounded-lg p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4">
                Transform Text, Elevate Communication
              </h2>
              <p className="text-lg leading-relaxed">
                ToneShift AI helps you instantly adapt your writing style for any context. 
                Whether you need professional polish, casual charm, or viral-worthy social posts, 
                it delivers natural-sounding transformations with precision.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-600/10 p-[2px] mt-12">
            <div className="bg-[#0d1b2a]/80 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">How It Works</h3>
              <ol className="space-y-4 list-decimal list-inside marker:text-blue-400">
                <li className="text-lg">Paste your text into the editor</li>
                <li className="text-lg">Select your desired tone and intensity</li>
                <li className="text-lg">Get instant AI-powered transformations</li>
                <li className="text-lg">Copy/paste perfected text anywhere</li>
              </ol>
            </div>
          </div>

          {/* Back to App CTA */}
          <div className="text-center mt-16">
            <Link 
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-bold text-white hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all"
            >
              Start Using ToneShift
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}