
import React, { useState } from 'react';

interface LoginProps {
  onNavigate: (tab: 'home' | 'pricing' | 'support' | 'login' | 'register' | 'dashboard') => void;
  onLoginSuccess: (token: string) => void;
  t: any;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLoginSuccess, t }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const getPublicIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return "14.163.106.245"; 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const userIP = await getPublicIP();
      
      const payload = {
        tendangnhap_id: phoneNumber,
        matkhau_pass: password,
        ip: userIP
      };

      const response = await fetch('https://toolregclone.com/login/login.php', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      let apiText = "";
      let result: any = {};

      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
        apiText = result.message || result.result || JSON.stringify(result);
      } else {
        apiText = await response.text();
      }

      const lowRes = apiText.toLowerCase();
      const isSuccess = lowRes.includes('thành công') || lowRes.includes('success') || apiText.trim() === '1' || result.status === 'success';

      if (isSuccess) {
        setMessage({ type: 'success', text: 'Đăng nhập thành công! Đang chuyển hướng...' });
        
        // Save the phone number for display in Dashboard
        localStorage.setItem('user_phone', phoneNumber);

        let token = result.token || result.access_token || result.data?.token;
        if (!token) {
          const cookieMatch = document.cookie.match(/token=([^;]+)/);
          if (cookieMatch) {
            token = cookieMatch[1];
          }
        }
        
        if (!token) {
          token = 'pn_user_' + Math.random().toString(36).substr(2, 9);
        }

        setTimeout(() => {
          onLoginSuccess(token);
        }, 800);
      } else {
        setMessage({ type: 'error', text: apiText || 'Thông tin đăng nhập không chính xác.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage({ type: 'error', text: 'Lỗi kết nối hoặc yêu cầu bị chặn. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] -z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] -z-0"></div>

      <div className="max-w-md w-full z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-2xl shadow-lg mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="text-white font-bold text-3xl">PN</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{t.loginTitle}</h2>
            <p className="text-slate-400">{t.loginSub}</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.phone}</label>
              <input
                type="tel"
                disabled={loading}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all placeholder-slate-600"
                placeholder="Số điện thoại"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{t.pass}</label>
              <input
                type="password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all placeholder-slate-600"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:opacity-70 flex items-center justify-center space-x-2"
            >
              {loading && <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              <span>{loading ? 'Đang xác thực...' : t.btnLogin}</span>
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            {t.noAccount} <button onClick={() => onNavigate('register')} className="font-bold text-orange-500 hover:text-orange-400">{t.btnReg}</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
