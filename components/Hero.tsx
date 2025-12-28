
import React from 'react';

interface HeroProps {
  onNavigate: (tab: 'home' | 'pricing' | 'support' | 'login' | 'register') => void;
  t: any;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, t }) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-slate-950 min-h-[70vh] md:min-h-[85vh] flex items-center">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>
        <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" alt="World Map" className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4 md:mb-6">
            <svg className="w-4 h-4 md:w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-orange-500 text-[10px] md:text-sm font-bold tracking-widest uppercase">{t.label}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6 md:mb-8">
            <span className="text-white">{t.title1}</span> <br className="hidden sm:block" />
            <span className="text-orange-500">{t.title2}</span>
          </h1>

          <p className="text-base md:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">{t.sub}</p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-10 md:mb-12">
            <div className="bg-orange-600/20 border border-orange-500/30 rounded-full px-4 py-1.5 md:px-5 md:py-2 flex items-center space-x-2">
              <span className="text-orange-500 text-xs md:text-base">🎁</span>
              <span className="text-orange-400 font-bold text-[10px] md:text-sm">{t.promo}</span>
              <span className="text-white text-[10px] md:text-sm font-medium">{t.promoDesc}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-700 rounded-full px-5 py-1.5 md:py-2">
              <span className="text-orange-500 font-bold text-lg md:text-xl">{t.priceLabel}</span>
              <span className="text-slate-500 text-xs md:text-sm"> {t.unit}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-12 md:mb-20">
            <button onClick={() => onNavigate('login')} className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-2xl transition-all transform active:scale-95">{t.btnStart}</button>
            <button onClick={() => onNavigate('pricing')} className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-slate-900/50 border border-slate-800 text-slate-200 hover:bg-slate-800 rounded-xl md:rounded-2xl font-bold text-base md:text-lg">{t.btnPrice}</button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-16 opacity-80">
            <div className="flex items-center space-x-2 md:space-x-3"><span className="text-orange-500 text-sm">⚡</span><span className="text-slate-300 text-xs md:text-sm font-semibold">{t.feat1}</span></div>
            <div className="flex items-center space-x-2 md:space-x-3"><span className="text-orange-500 text-sm">🛡️</span><span className="text-slate-300 text-xs md:text-sm font-semibold">{t.feat2}</span></div>
            <div className="flex items-center space-x-2 md:space-x-3"><span className="text-orange-500 text-sm">✅</span><span className="text-slate-300 text-xs md:text-sm font-semibold">{t.feat3}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
