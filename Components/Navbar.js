"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 md:w-full w-[100vw] z-50 bg-[#0d1b2a]/90 backdrop-blur-md border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl text-cyan-400">🔮</div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ToneShift AI
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 ">
            <Link
              href="/"
              className="text-blue-300 hover:text-cyan-200 transition-all duration-300 group"
            >
              Home
              <span className="block h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-1"></span>
            </Link>
            <Link
              href="/Features"
              className="text-blue-300 hover:text-cyan-200 transition-all duration-300 group"
            >
              Features
              <span className="block h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-1"></span>
            </Link>
            <Link
              href="/About"
              className="text-blue-300 hover:text-cyan-200 transition-all duration-300 group"
            >
              About
              <span className="block h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-1"></span>
            </Link>
            <Link
              href="#try-it"
              className="text-blue-300 hover:text-cyan-200 transition-all duration-300 group"
            >
              Try It
              <span className="block h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-1"></span>
            </Link>
          </div>

          {/* GitHub Icon */}
          <div className="flex items-center space-x-4">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-blue-300 hover:text-cyan-200 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* GitHub */}
            <a
              href="#"
              className="text-blue-300 hover:text-cyan-200 transition-colors hidden md:inline"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 
                  0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                  -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 
                  2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 
                  0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 
                  0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 
                  2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 
                  2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 
                  0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 
                  1.855 0 1.338-.012 2.419-.012 2.747 
                  0 .268.18.58.688.482A10.019 10.019 0 0022 12.017 
                  C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3">
            <Link href="/" className="block text-blue-300 hover:text-cyan-200">
              Home
            </Link>
            <Link href="/Features" className="block text-blue-300 hover:text-cyan-200">
              Features
            </Link>
            <Link href="/About" className="block text-blue-300 hover:text-cyan-200">
              About
            </Link>
            <Link href="#try-it" className="block text-blue-300 hover:text-cyan-200">
              Try It
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="mt-20"></div>
    </>
  );
}
