
import React, { useState } from 'react';

interface LoginProps {
  onNavigate: (tab: any) => void;
  onLoginSuccess: (token: string) => void;
  t: any;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLoginSuccess, t }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const payload = {
        tendangnhap_id: phoneNumber,
        matkhau_pass: password,
        ip: "14.163.106.245" 
      };

      const response = await fetch('https://toolregclone.com/login/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage({ type: 'success', text: 'Đăng nhập thành công!' });
        localStorage.setItem('user_phone', phoneNumber);

        // Tách token từ chuỗi message phức tạp: "Login successful ... token: <JWT>"
        let token = "";
        const msg = result.message || "";
        if (msg.includes("token:")) {
          token = msg.split("token:")[1].trim();
        } else {
          token = result.token || "no_token_found";
        }
        
        localStorage.setItem('api_token', token);
        // Lưu cả auth_token để App.tsx nhận diện trạng thái login
        localStorage.setItem('auth_token', token);
        
        setTimeout(() => onLoginSuccess(token), 800);
      } else {
        setMessage({ type: 'error', text: result.message || 'Thông tin không chính xác.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Lỗi kết nối máy chủ.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] px-4">
      <div className="max-w-md w-full bg-[#111827] border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#f97316] rounded-2xl shadow-lg mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-white font-bold text-3xl italic">PN</span>
          </div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Đăng nhập</h2>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl text-xs font-bold uppercase ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-[#070b14] border border-slate-800 text-white rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#f97316] outline-none font-bold"
            placeholder="Số điện thoại"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#070b14] border border-slate-800 text-white rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#f97316] outline-none font-bold"
            placeholder="Mật khẩu"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
            {loading ? 'Đang xử lý...' : 'Đăng nhập ngay'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
