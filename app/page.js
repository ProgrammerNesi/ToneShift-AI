"use client"
import Image from "next/image";
import { useState } from "react";
import { copyToClipboard } from '@/utils/copy.js';
import { useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("")
  const [selectedTone, setSelectedTone] = useState("")
  const [selectedIntensity, setSelectedIntensity] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [triggerGenerate, setTriggerGenerate] = useState(false);

  useEffect(() => {
    if (triggerGenerate && text) {
      Generate();
      setTriggerGenerate(false);
    }
  }, [triggerGenerate, text, selectedTone, selectedIntensity]);

  const tones = ["Professional", "Casual", "Funny", "Academic"];


  const Generate = async () => {

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputt: text, tone: selectedTone, intensity: selectedIntensity }),
      });

      const data = await response.json();
      setResult(data.result || data.error);
    } catch (error) {
      setResult('Error connecting to the API');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSurpriseClick = () => {
    const randomTone = tones[Math.floor(Math.random() * tones.length)];
    const randomIntensity = Math.floor(Math.random() * 10) + 1;
    
    setSelectedTone(randomTone);
    setSelectedIntensity(randomIntensity);
    setTriggerGenerate(true);
  };

  const handleCopy = async () => {
    if (!result) return;

    const success = await copyToClipboard(result);
    setCopyStatus(success ? 'success' : 'error');

    // Reset status after 2 seconds
    setTimeout(() => setCopyStatus(''), 2000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-6xl w-full text-center px-6 flex flex-col gap-4 ">
        <div className="flex flex-col gap-6 my-29">
          <h1 className="md:text-8xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500">
            ToneShift AI
          </h1>

          <div className="md:w-65 w-35 h-0.5 mx-auto rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500"></div>

          <p className="md:text-3xl text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-400">
            Transform Your Text with AI
          </p>

        </div>

        <div className="rounded-xl bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 p-[2px] shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <div className="rounded-lg bg-[#0d1b2a]/70 backdrop-blur-md">
            <textarea id="try-it" value={text} onChange={(e) => { setText(e.target.value) }}
              placeholder="Type or paste your text here..."
              className="w-full text-lg font-semibold h-48 p-4 rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none resize-none scroll-mt-24"
            />
          </div>

        </div>
        <div className="text-xl text-left px-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-300 to-indigo-400">
          Character Count : {text.length}
        </div>
        {/* Tone Selection Row */}
        <div className="flex flex-wrap gap-8 items-center justify-between mt-6">
          {/* Tone Dropdown */}
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg blur-sm"></div>
            <select
              value={selectedTone}
              onChange={(e) => { setSelectedTone(e.target.value) }}
              className="relative w-full bg-[#0d1b2a]/90 border border-blue-400/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Funny</option>
              <option>Academic</option>
              <option>Social Media</option>
            </select>
          </div>

          {/* Dynamic Range Slider */}
          {selectedTone === 'Social Media' ? (
            <div className="relative w-full my-4">
              {/* Social Media Platform Slider */}
              <div className="absolute inset-0 h-1.5 mt-3 rounded-full bg-[#0d1b2a] border border-blue-400/10"></div>
              <div
                className="absolute left-0 top-0 h-1.5 mt-3 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                style={{ width: `${(selectedIntensity / 9) * 100}%` }}
              ></div>

              <input
                value={selectedIntensity}
                onChange={(e) => { setSelectedIntensity(e.target.value) }}
                type="range"
                min="0"
                max="9"
                className="relative w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
              />

              {/* Social Media Icons */}
              <div className="flex justify-between text-xs mt-6 px-1">
                {['Twitter(X)', 'WhatsApp', 'Instagram', 'LinkedIn', 'Facebook', 'Reddit', 'Discord', 'Pinterest', 'Snapchat', 'Youtube'].map((platform, index) => (
                  <span
                    key={platform}
                    className={`text-sm ${selectedIntensity == index ? 'text-cyan-300 font-bold' : 'text-blue-300'}`}
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative w-full my-4">
              {/* Tone Intensity Slider */}
              <div className="absolute inset-0 h-1.5 mt-3 rounded-full bg-[#0d1b2a] border border-blue-400/10"></div>
              <div
                className="absolute left-0 top-0 h-1.5 mt-3 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                style={{ width: `${(selectedIntensity / 10) * 100}%` }}
              ></div>

              <input
                value={selectedIntensity}
                onChange={(e) => { setSelectedIntensity(e.target.value) }}
                type="range"
                min="0"
                max="10"
                className="relative w-full h-2 appearance-none bg-transparent cursor-pointer z-10"
              />

              {/* Dynamic Labels Based on Tone */}
              <div className="flex justify-between text-sm mt-6 px-1">
                <span className="text-blue-200">
                  {selectedTone === 'Funny' ? 'Smirk' :
                    selectedTone === 'Professional' ? 'Formal' :
                      selectedTone === 'Casual' ? 'Neutral' :
                        selectedTone === 'Academic' ? 'Simple' : 'Low'}
                </span>
                <span className="text-indigo-200">
                  {selectedTone === 'Funny' ? 'Hilarious' :
                    selectedTone === 'Professional' ? 'Executive' :
                      selectedTone === 'Casual' ? 'Relaxed' :
                        selectedTone === 'Academic' ? 'Scholarly' : 'High'}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-5">
          {/* Primary Button (Transform) */}
          <button className="relative group cursor-pointer" disabled={isLoading} onClick={Generate}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-300 blur-[2px] group-hover:blur-[4px]"></div>
            <div className="relative px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-medium text-white flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
              <span>Transform</span>
              <span className="text-xl">🚀</span>
            </div>
          </button>

          {/* Secondary Button (Clear) */}
          <button className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg opacity-50 group-hover:opacity-70 transition-all duration-300 blur-[1px]"></div>
            <div className="relative px-8 py-3 bg-gray-700/80 rounded-lg font-medium text-white flex items-center gap-2 hover:bg-gray-700 transition-all border border-gray-600/50" onClick={() => { setText("") }}>
              <span>Clear</span>
              <span className="text-xl">❌</span>
            </div>
          </button>

          {/* Tertiary Button (Randomize) */}
          <button className="relative group cursor-pointer" onClick={handleSurpriseClick}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg opacity-60 group-hover:opacity-80 transition-all duration-300 blur-[1px] group-hover:blur-[2px]"></div>
            <div className="relative px-8 py-3 bg-indigo-600/80 rounded-lg font-medium text-white flex items-center gap-2 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all border border-indigo-400/30">
              <span>Surprise Me</span>
              <span className="text-xl">🎲</span>
            </div>
          </button>
        </div>

        <div className="mt-12 rounded-xl bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 p-[2px] shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <div className="rounded-lg bg-[#0d1b2a]/80 backdrop-blur-md">
            {/* Output Header */}
            <div className="flex justify-between items-center p-3 border-b border-indigo-400/20">
              <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                Output
              </h3>
              <div className="flex gap-2">
                <span className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded">
                  Character Count : {result.length}
                </span>
                <span className="text-xs text-indigo-300 bg-indigo-900/30 px-2 py-1 rounded">
                  {selectedTone}
                </span>
              </div>
            </div>

            {/* Output Content */}
            <div className="min-h-48 p-4 text-white">
              {isLoading ? (
                <p className="text-lg font-semibold animate-pulse">⏳ Generating your content...</p>
              ) : result ? (
                <p className="whitespace-pre-wrap text-lg font-semibold">{result}</p>
              ) : (
                <p className="text-lg font-semibold">Your transformed text will appear here.</p>
              )}
            </div>

            {/* Output Actions */}
            <div className="flex justify-between p-3 border-t border-indigo-400/20">
              <div className="flex gap-2">
                <button onClick={handleCopy} className={`px-3 py-1.5 text-sm bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 rounded-lg flex items-center gap-1 transition-colors ${copyStatus === 'success'
                  ? 'bg-green-500/20 text-green-100'
                  : copyStatus === 'error'
                    ? 'bg-red-500/20 text-red-100'
                    : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-100'}`}>
                  <span>📋</span> {copyStatus === 'success' ? 'Copied!' :
                    copyStatus === 'error' ? 'Failed' : 'Copy'}
                </button>
              </div>

            </div>
          </div>
        </div>


        <footer className="mt-12 pb-8 pt-6 border-t border-blue-400/10">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Section - Branding */}
            <div className="flex items-center gap-3">
              <div className="text-2xl">🔮</div>
              <div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
                  ToneShift AI
                </h3>
                <p className="text-xs text-blue-300/70">
                  Transform your words with AI magic
                </p>
              </div>
            </div>



            {/* Right Section - Social/Copyright */}
            <div className="flex flex-col items-center md:items-end gap-1">

              <p className="text-xs text-blue-400/50">
                Powered by Gemini AI.
              </p>
            </div>
          </div>
        </footer>

      </div>



    </div >
  );
}
