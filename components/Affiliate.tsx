
import React from 'react';

const Affiliate: React.FC<{ t: any }> = ({ t }) => {
  const pillarIcons = [
    <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#f97316 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t.title} <span className="text-orange-500">{t.highlight}</span></h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.sub}</p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-orange-600 rounded-2xl p-6 flex items-center space-x-6 shadow-2xl shadow-orange-900/40 transform hover:scale-105 transition-transform">
            <div className="bg-orange-500/20 p-3 rounded-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="text-left">
              <p className="text-orange-200 text-sm font-semibold uppercase tracking-wider">{t.commissionLabel}</p>
              <p className="text-3xl font-bold text-white">{t.commissionValue}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {t.pillars.map((p: any, i: number) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:bg-slate-900 transition-colors text-center group">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">{pillarIcons[i]}</div>
              <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-inner mb-12">
          <div className="flex items-center space-x-4 mb-10">
            <div className="w-10 h-10 bg-orange-600/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white">{t.supportTitle}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {t.policies.map((policy: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 group">
                <div className="mt-1 flex-shrink-0"><svg className="w-5 h-5 text-orange-500 group-hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div>
                <p className="text-slate-300 text-sm md:text-base leading-snug group-hover:text-white transition-colors">{policy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/80 border border-orange-500/20 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h3>
            <p className="text-slate-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t.ctaSub}</p>
            <div className="inline-block w-full max-w-md">
              <a href="https://zalo.me/0813149999" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white py-4 px-8 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-orange-900/30">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.27 1.11l-2.2 2.2z" /></svg>
                <span>{t.ctaBtn}</span>
              </a>
            </div>
            <p className="mt-8 text-slate-500 text-sm md:text-base font-medium">{t.contactInfo}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Affiliate;
