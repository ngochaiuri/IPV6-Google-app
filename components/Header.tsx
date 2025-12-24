
import React from 'react';

interface HeaderProps {
  onNavigate: (tab: 'home' | 'pricing' | 'support' | 'login' | 'register') => void;
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activeTab }) => {
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

          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className={`${activeTab === 'home' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} transition-colors`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className={`${activeTab === 'pricing' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} transition-colors`}
            >
              Bảng giá
            </button>
            <button 
              onClick={() => onNavigate('support')}
              className={`${activeTab === 'support' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} transition-colors`}
            >
              Hỗ trợ
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('login')}
              className={`${activeTab === 'login' ? 'text-orange-500 font-semibold' : 'text-slate-400 hover:text-orange-400'} font-medium hidden sm:block`}
            >
              Đăng nhập
            </button>
            <button 
              onClick={() => onNavigate('register')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md shadow-orange-900/20 hover:shadow-orange-900/40 active:scale-95"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
