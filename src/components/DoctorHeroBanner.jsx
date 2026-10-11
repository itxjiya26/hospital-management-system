import React from 'react';

export default function DoctorHeroBanner() {
  return (
    <div className="relative w-full bg-slate-900 text-white overflow-hidden shadow-lg">
      
      {/* Background Image with Stethoscope & Medical Equipment Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=80" 
          alt="Medical Stethoscope and Equipment" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        {/* Sky Blue & Slate Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-sky-950/70"></div>
      </div>

      {/* Full-Width Horizontal Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 sm:py-16 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Headline & Mission */}
        <div className="max-w-2xl space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Advanced Clinical Infrastructure
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Precision Diagnostics & <br className="hidden sm:inline" />
            <span className="text-sky-400">Smart Hospital Care</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            Integrating modern diagnostic technology, real-time bed capacity tracking, and emergency response workflows across all specialized hospital departments.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a 
              href="/departments" 
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl shadow-md transition-all duration-200 flex items-center gap-2"
            >
              Explore Departments
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
            <a 
              href="/triage-queue" 
              className="px-6 py-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition"
            >
              Emergency Triage
            </a>
          </div>
        </div>

        {/* Right Side: Horizontal Feature Highlights */}
        <div className="w-full md:w-auto grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl backdrop-blur-sm">
            <p className="text-2xl font-bold text-sky-400">24/7</p>
            <p className="text-xs font-medium text-slate-300 mt-1">Diagnostic Monitoring</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl backdrop-blur-sm">
            <p className="text-2xl font-bold text-sky-400">100%</p>
            <p className="text-xs font-medium text-slate-300 mt-1">Sterilized Units</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl backdrop-blur-sm col-span-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-semibold text-slate-200">ISO Certified Medical Equipment</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}