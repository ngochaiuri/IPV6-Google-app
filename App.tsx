
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

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'pricing' | 'support' | 'login' | 'register'>('home');

  // Cuộn lên đầu trang khi chuyển tab
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={(tab) => setActiveTab(tab)} activeTab={activeTab} />
      
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero onNavigate={(tab) => setActiveTab(tab)} />
            <Features />
            <Pricing />
            <Affiliate />
            <FAQ />
          </>
        )}
        {activeTab === 'pricing' && (
          <div className="pt-24 pb-12">
            <Pricing />
          </div>
        )}
        {activeTab === 'support' && (
          <div className="pt-24 pb-12">
            <FAQ />
          </div>
        )}
        {activeTab === 'login' && (
          <Login onNavigate={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'register' && (
          <Register onNavigate={(tab) => setActiveTab(tab)} />
        )}
      </main>

      {/* Floating Proxy Advisor powered by Gemini */}
      <ProxyAdvisor />
      
      {activeTab !== 'login' && activeTab !== 'register' && <Footer />}
    </div>
  );
};

export default App;
