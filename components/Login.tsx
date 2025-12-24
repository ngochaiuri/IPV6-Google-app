
import React, { useState } from 'react';

interface LoginProps {
  onNavigate: (tab: 'home' | 'pricing' | 'support' | 'login' | 'register') => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Backend handling logic would go here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] -z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] -z-0"></div>

      <div className="max-w-md w-full z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
          <div className="text-center mb-10">
            <div 
              className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-2xl shadow-lg shadow-orange-900/40 mb-6 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <span className="text-white font-bold text-3xl">P</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Chào mừng trở lại</h2>
            <p className="text-slate-400">Đăng nhập để quản lý Proxy của bạn</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                Địa chỉ Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-slate-600"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300" htmlFor="password">
                  Mật khẩu
                </label>
                <a href="#" className="text-xs font-medium text-orange-500 hover:text-orange-400">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-slate-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 bg-slate-950 border-slate-800 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400 cursor-pointer select-none">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-900/20 transition-all transform active:scale-95"
            >
              Đăng nhập ngay
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 hover:bg-slate-800 transition-colors group">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.273 0 3.191 2.691 1.245 6.655l4.021 3.11z"/>
                <path fill="#34A853" d="M16.04 18.013c-1.09.591-2.418.914-3.84.914-2.727 0-5.064-1.855-5.882-4.345L2.245 17.7C4.191 21.655 8.273 24.345 12.8 24.345c3.218 0 6.136-1.091 8.318-2.945l-5.078-3.387z"/>
                <path fill="#4285F4" d="M23.49 12.273c0-.818-.082-1.609-.205-2.386H12.8v4.582h6.014c-.259 1.391-1.045 2.573-2.223 3.364l5.078 3.387c2.973-2.727 4.686-6.75 4.686-11.273z"/>
                <path fill="#FBBC05" d="M6.318 14.582c-.227-.682-.364-1.409-.364-2.182s.136-1.5.364-2.182L2.245 7.109C1.455 8.618 1 10.273 1 12s.455 3.382 1.245 4.891l4.073-3.309z"/>
              </svg>
              <span className="text-slate-300 text-sm group-hover:text-white transition-colors">Google</span>
            </button>
            <button className="flex items-center justify-center bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 hover:bg-slate-800 transition-colors group">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-slate-300 text-sm group-hover:text-white transition-colors">Facebook</span>
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Chưa có tài khoản?{' '}
            <button 
              onClick={() => onNavigate('register')}
              className="font-bold text-orange-500 hover:text-orange-400"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => onNavigate('home')}
            className="text-slate-500 hover:text-slate-300 transition-colors text-sm inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
