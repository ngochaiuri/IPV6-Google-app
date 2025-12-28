
import React from 'react';

const Features: React.FC<{ t: any }> = ({ t }) => {
  const icons = [
    // 1Gbps
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    // 99.9%
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    // Auto
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    // Security
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    // Residential
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    // Support
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  ];

  return (
    <section className="py-24 bg-slate-950 relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
            {t.title}
          </h2>
          <div className="w-24 h-1.5 bg-orange-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.items.map((f: any, i: number) => (
            <div key={i} className="group relative p-8 md:p-10 rounded-[2rem] bg-slate-900/40 border border-slate-800 hover:border-orange-500/30 hover:bg-slate-900/60 transition-all duration-500 shadow-xl overflow-hidden">
              {/* Card Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-600/10 blur-[50px] rounded-full group-hover:bg-orange-600/20 transition-all duration-500"></div>
              
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 border border-slate-800 group-hover:scale-110 group-hover:border-orange-500/20 transition-all duration-500 shadow-inner">
                {icons[i]}
              </div>
              
              <h3 className="text-xl md:text-2xl font-black text-white mb-4 italic uppercase tracking-tight group-hover:text-orange-500 transition-colors">
                {f.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed text-sm md:text-base font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {f.desc}
              </p>

              {/* Decorative Corner Arrow */}
              <div className="absolute bottom-6 right-8 text-slate-800 group-hover:text-orange-500/20 transition-colors">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
