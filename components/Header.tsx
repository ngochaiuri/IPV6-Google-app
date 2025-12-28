
import React, { useState } from 'react';
import { Language } from '../types';

interface HeaderProps {
  onNavigate: (tab: any) => void;
  activeTab: string;
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
  isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activeTab, lang, setLang, t, isLoggedIn }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);

  const langFlags: Record<Language, string> = {
    vi: '🇻🇳',
    en: '🇺🇸',
    zh: '🇨🇳',
    ru: '🇷🇺'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-orange-900/20">
              <span className="text-white font-bold text-xl tracking-tighter">PN</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
              ProxyNuoiNick
            </span>
          </div>

          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <button onClick={() => onNavigate('home')} className={`${activeTab === 'home' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} transition-colors`}>
              {t.home}
            </button>
            <button onClick={() => onNavigate('pricing')} className={`${activeTab === 'pricing' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} transition-colors`}>
              {t.pricing}
            </button>
            {isLoggedIn && (
              <button onClick={() => onNavigate('dashboard')} className={`${activeTab === 'dashboard' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} transition-colors`}>
                Bảng điều khiển
              </button>
            )}
            <button onClick={() => onNavigate('affiliate')} className={`${activeTab === 'affiliate' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} transition-colors`}>
              {t.affiliate}
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 hover:bg-slate-800 transition-colors"
              >
                <span>{langFlags[lang]}</span>
                <span className="text-slate-300 uppercase font-bold text-xs">{lang}</span>
                <svg className={`w-4 h-4 text-slate-500 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
                  {(Object.keys(langFlags) as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setShowLangMenu(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-slate-800 transition-colors ${lang === l ? 'bg-orange-600/10 text-orange-500' : 'text-slate-400'}`}
                    >
                      <span>{langFlags[l]}</span>
                      <span className="font-bold text-xs uppercase">{l}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!isLoggedIn ? (
              <>
                <button onClick={() => onNavigate('login')} className={`${activeTab === 'login' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} font-medium hidden sm:block`}>
                  {t.login}
                </button>
                <button onClick={() => onNavigate('register')} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-medium transition-all">
                  {t.register}
                </button>
              </>
            ) : (
              <button onClick={() => onNavigate('dashboard')} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl font-medium transition-all shadow-lg shadow-orange-900/20">
                Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
