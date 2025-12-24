
import React from 'react';

interface HeroProps {
  onNavigate: (tab: 'home' | 'pricing' | 'support' | 'login' | 'register') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950 min-h-[85vh] flex items-center">
      {/* Background World Map Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
          alt="World Map" 
          className="w-full h-full object-cover filter grayscale brightness-50 contrast-125"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Label */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-orange-500 text-sm font-bold tracking-widest uppercase">Tự tạo Proxy IPv6 Online</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
            <span className="text-white">Proxy IPv6 Dân Cư</span> <br />
            <span className="text-orange-500">Nhanh Chóng & Dễ Dàng</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Tạo và quản lý proxy IPv6 online của riêng bạn với băng thông không giới hạn, hỗ trợ HTTP/HTTPS/SOCKS5 chỉ trong vài phút
          </p>

          {/* Badges Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <div className="bg-orange-600/20 border border-orange-500/30 rounded-full px-5 py-2 flex items-center space-x-2 group hover:bg-orange-600/30 transition-colors">
              <span className="text-orange-500">🎁</span>
              <span className="text-orange-400 font-bold text-sm">KHUYẾN MÃI:</span>
              <span className="text-white text-sm font-medium">Tặng 10,000 VND khi đăng ký mới</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-700 rounded-full px-6 py-2 flex items-center space-x-1">
              <span className="text-orange-500 font-bold text-xl">Chỉ 500đ</span>
              <span className="text-slate-500 text-sm">/ 1 Proxy</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <button 
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-orange-900/40 transition-all transform hover:scale-105 active:scale-95"
            >
              Tạo Proxy Online Ngay
            </button>
            <button 
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto px-10 py-4 bg-slate-900/50 border border-slate-800 text-slate-200 hover:bg-slate-800 rounded-2xl font-bold text-lg transition-all"
            >
              Xem Bảng Giá
            </button>
          </div>

          {/* Bottom Features Bar */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
            <div className="flex items-center space-x-3 group">
              <div className="text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-slate-300 font-semibold text-base group-hover:text-white transition-colors">Tốc độ 100Mbps+</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-slate-300 font-semibold text-base group-hover:text-white transition-colors">Bảo mật SSL/TLS</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-slate-300 font-semibold text-base group-hover:text-white transition-colors">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
