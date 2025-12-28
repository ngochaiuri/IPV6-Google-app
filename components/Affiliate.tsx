
import React from 'react';

const Affiliate: React.FC<{ t: any }> = ({ t }) => {
  const pillarIcons = [
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  ];

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 blur-[150px] rounded-full -mr-100 -mt-100"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/5 blur-[150px] rounded-full -ml-100 -mb-100"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            {t.title} <span className="text-orange-500">{t.highlight}</span>
          </h2>
          <div className="w-32 h-2 bg-orange-600 mx-auto mb-10 rounded-full"></div>
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Commission Box */}
        <div className="flex justify-center mb-24">
          <div className="relative group">
            <div className="absolute inset-0 bg-orange-600 blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-orange-600 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:space-x-10 shadow-2xl border border-orange-400/20 transform group-hover:scale-[1.02] transition-transform duration-500">
              <div className="bg-white/10 p-5 rounded-3xl mb-6 md:mb-0">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.59 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.59-1M12 16v1m4-12V3m0 0l-1 1m1-1l1 1m-7 4V7m0 0l-1 1m1-1l1 1m7 9v1m0 0l-1 1m1-1l1 1m-7 4v1m0 0l-1 1m1-1l1 1" /></svg>
              </div>
              <div className="text-center md:text-left">
                <p className="text-orange-100 text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-3">{t.commissionLabel}</p>
                <p className="text-5xl md:text-7xl font-black text-white italic tracking-tighter shadow-sm">{t.commissionValue}</p>
              </div>
              <div className="mt-8 md:mt-0 md:pl-10 md:border-l border-white/20">
                <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-50 transition-all shadow-xl active:scale-95">
                  ĐĂNG KÝ NGAY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {t.pillars.map((p: any, i: number) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2rem] hover:bg-slate-900/80 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                {pillarIcons[i]}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 italic uppercase tracking-tight group-hover:text-orange-500 transition-colors">{p.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed font-medium opacity-80">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* 3 Step Process */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-black text-white text-center italic uppercase mb-16 tracking-tighter">
            {t.processTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connection Line PC */}
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-8 -z-0"></div>
             
             {t.processSteps.map((step: any, idx: number) => (
               <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                 <div className="w-16 h-16 bg-slate-950 border-4 border-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:border-orange-600 transition-all duration-500 shadow-xl">
                   <span className="text-white font-black text-xl italic">{idx + 1}</span>
                 </div>
                 <h4 className="text-xl font-black text-white mb-3 italic uppercase tracking-tight">{step.title}</h4>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Support Policies List */}
        <div className="bg-[#111827] border border-slate-800/60 rounded-[3rem] p-8 md:p-16 shadow-2xl mb-24 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-orange-600/5 blur-[80px] rounded-full"></div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">{t.supportTitle}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {t.policies.map((policy: string, index: number) => (
              <div key={index} className="flex items-start space-x-4 group p-4 rounded-2xl hover:bg-slate-900/50 transition-colors">
                <div className="mt-1 flex-shrink-0">
                  <div className="w-6 h-6 bg-orange-600/10 rounded-full flex items-center justify-center group-hover:bg-orange-600 transition-all">
                    <svg className="w-3.5 h-3.5 text-orange-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
                <p className="text-slate-400 text-base md:text-lg leading-snug font-medium group-hover:text-white transition-colors">{policy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-orange-500/20 rounded-[3.5rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">{t.ctaTitle}</h3>
            <p className="text-slate-400 text-base md:text-xl mb-12 max-w-xl mx-auto leading-relaxed font-medium">{t.ctaSub}</p>
            
            <div className="inline-block w-full max-w-md relative z-10">
              <a href="https://zalo.me/0813149999" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-4 bg-orange-600 hover:bg-orange-700 text-white py-5 px-10 rounded-2xl text-xl md:text-2xl font-black uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-orange-900/40 italic">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.27 1.11l-2.2 2.2z" /></svg>
                <span>{t.ctaBtn}</span>
              </a>
            </div>
            
            <p className="mt-10 text-slate-500 text-sm md:text-lg font-black uppercase tracking-widest opacity-60">
              {t.contactInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Affiliate;
