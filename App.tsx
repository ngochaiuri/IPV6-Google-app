
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ProxyAdvisor from './components/ProxyAdvisor';
import Login from './components/Login';
import Register from './components/Register';
import Affiliate from './components/Affiliate';
import Dashboard from './components/Dashboard';
import CTAHome from './components/CTAHome';
import { Tutorials, Contact, Terms } from './components/SupportPages';
import { Language } from './types';
import { translations } from './translations';

export type AppTab = 'home' | 'pricing' | 'support' | 'login' | 'register' | 'tutorials' | 'contact' | 'terms' | 'affiliate' | 'dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [lang, setLang] = useState<Language>('vi');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
      if (activeTab === 'login' || activeTab === 'register') {
        setActiveTab('dashboard');
      }
    }
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleNavigate = (tab: AppTab) => {
    setActiveTab(tab);
  };

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('auth_token', token);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_phone');
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  const showHeaderFooter = activeTab !== 'login' && activeTab !== 'register';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-orange-500/30">
      {showHeaderFooter && (
        <Header 
          onNavigate={handleNavigate} 
          activeTab={activeTab} 
          lang={lang} 
          setLang={setLang}
          t={t.nav}
          isLoggedIn={isLoggedIn}
        />
      )}
      
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} t={t.hero} />
            <Features t={t.features} />
            <Pricing t={t.pricing} />
            <Affiliate t={t.affiliate} />
            <CTAHome t={t.ctaHome} onNavigate={handleNavigate} />
            <FAQ t={t.faq} />
          </>
        )}
        {activeTab === 'dashboard' && (
          <Dashboard t={t.dashboard} onLogout={handleLogout} />
        )}
        {activeTab === 'pricing' && (
          <div className="pt-24 pb-12">
            <Pricing t={t.pricing} />
          </div>
        )}
        {activeTab === 'affiliate' && (
          <div className="pt-24 pb-12">
            <Affiliate t={t.affiliate} />
          </div>
        )}
        {activeTab === 'support' && (
          <div className="pt-24 pb-12">
            <FAQ t={t.faq} />
          </div>
        )}
        {activeTab === 'tutorials' && (
          <div className="pt-24 pb-12">
            <Tutorials t={t.tutorials} />
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="pt-24 pb-12">
            <Contact t={t.contact} />
          </div>
        )}
        {activeTab === 'terms' && (
          <div className="pt-24 pb-12">
            <Terms t={t.terms} />
          </div>
        )}
        {activeTab === 'login' && (
          <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} t={t.auth} />
        )}
        {activeTab === 'register' && (
          <Register onNavigate={handleNavigate} t={t.auth} />
        )}
      </main>

      {activeTab !== 'dashboard' && <ProxyAdvisor lang={lang} />}
      
      {showHeaderFooter && (
        <Footer t={t.footer} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;
