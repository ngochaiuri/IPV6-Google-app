
import React from 'react';

interface CTAHomeProps {
  t: any;
  onNavigate: (tab: string) => void;
}

const CTAHome: React.FC<CTAHomeProps> = ({ t, onNavigate }) => {
  return (
    <section className="py-24 bg-[#1a161f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 flex flex-col items-center">
          <span className="text-white">{t.title1}</span>
          <span className="text-[#f97316] mt-2">{t.title2}</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl mb-12">
          {t.sub}
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          <button 
            onClick={() => onNavigate('login')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#f97316] hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl shadow-orange-900/20 transition-all transform hover:scale-105"
          >
            <span>{t.btnStart}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <a 
            href="https://zalo.me/0813149999" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#1e293b] hover:bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-xl transition-all border border-slate-700"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.27 1.11l-2.2 2.2z" />
            </svg>
            <span>{t.btnContact}</span>
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
            <span className="text-slate-400 font-medium">{t.feat1}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
            <span className="text-slate-400 font-medium">{t.feat2}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
            <span className="text-slate-400 font-medium">{t.feat3}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAHome;
