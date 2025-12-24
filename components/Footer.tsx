
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">PN</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">ProxyNuoiNick.com</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Giải pháp hạ tầng Proxy IPv6 chuyên nghiệp hàng đầu Việt Nam, tối ưu cho việc nuôi nick Facebook, TikTok và cày game số lượng lớn.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-all">
                <span className="sr-only">Telegram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.35 3.69-1.54 4.45-1.81 4.95-1.82.11 0 .35.03.5.15.13.1.17.24.18.33 0 .04.01.1.01.12z"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-orange-500">Dịch vụ</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Proxy IPv4</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Proxy IPv6</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Proxy Dân cư</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">SOCKS5 Proxy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-orange-500">Hỗ trợ</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Liên hệ kỹ thuật</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Điều khoản dịch vụ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-orange-500">Bản tin</h4>
            <p className="text-slate-400 mb-4 text-sm">Nhận cập nhật về các mã giảm giá và tính năng mới nhất.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-slate-900 border border-slate-800 rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-orange-500 text-white"
              />
              <button className="bg-orange-600 px-4 py-2 rounded-r-lg hover:bg-orange-700 transition-colors font-bold">
                Gửi
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ProxyNuoiNick.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
