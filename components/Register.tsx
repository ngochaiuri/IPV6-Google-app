
import React, { useState } from 'react';

interface RegisterProps {
  onNavigate: (tab: 'home' | 'pricing' | 'support' | 'login' | 'register' | 'affiliate' | 'tutorials' | 'contact' | 'terms') => void;
  t: any;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, t }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Sinh 13 ký tự ngẫu nhiên base36 tương tự logic C# Substring(0, 13)
  const generateSalt = () => {
    return Math.random().toString(36).substring(2, 15).padEnd(13, '0').substring(0, 13);
  };

  // Băm SHA-256 và chuyển sang Base64
  const hashPassword = async (password: string, salt: string) => {
    const combined = password + salt;
    const msgUint8 = new TextEncoder().encode(combined);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    
    // Chuyển ArrayBuffer sang Base64
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const binary = hashArray.map(b => String.fromCharCode(b)).join('');
    return window.btoa(binary);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{9,11}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validatePhone(formData.phoneNumber)) {
      setMessage({ type: 'error', text: 'Số điện thoại không hợp lệ (9-11 chữ số)!' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu tối thiểu 6 ký tự!' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    setLoading(true);
    try {
      const nameParts = formData.fullName.trim().split(' ');
      const ten = nameParts.length > 0 ? nameParts[nameParts.length - 1] : '';
      const ho = nameParts.length > 1 ? nameParts.slice(0, nameParts.length - 1).join(' ') : 'User';

      const salt = generateSalt();
      const hashedPassword = await hashPassword(formData.password, salt);

      const payload = {
        tendangnhap_id: formData.phoneNumber,
        matkhau_pass: hashedPassword,
        salthtml: salt,
        ho: ho,
        ten: ten
      };

      const response = await fetch('https://toolregclone.com/login/register.php', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      let apiResponseText = "";
      let result: any = {};

      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
        apiResponseText = result.message || result.result || JSON.stringify(result);
      } else {
        apiResponseText = await response.text();
      }

      const lowRes = apiResponseText.toLowerCase();
      const isSuccess = lowRes.includes('thành công') || lowRes.includes('success') || apiResponseText.trim() === '1';

      if (isSuccess) {
        setMessage({ type: 'success', text: 'Đăng ký thành công! Đang chuyển hướng...' });
        setTimeout(() => onNavigate('login'), 2000);
      } else {
        setMessage({ type: 'error', text: apiResponseText || 'Đăng ký thất bại. Vui lòng kiểm tra lại.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: 'Lỗi kết nối API hoặc CORS. Vui lòng thử lại.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] -z-0"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] -z-0"></div>

      <div className="max-w-md w-full z-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-2xl shadow-lg shadow-orange-900/40 mb-6 cursor-pointer" onClick={() => onNavigate('home')}>
              <span className="text-white font-bold text-3xl">PN</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{t.regTitle}</h2>
            <p className="text-slate-400 text-sm">{t.regSub}</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.fullName}</label>
              <input
                type="text"
                disabled={loading}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all placeholder-slate-600 disabled:opacity-50"
                placeholder="Họ và Tên"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.phone}</label>
              <input
                type="tel"
                disabled={loading}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/[^0-9]/g, '') })}
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all placeholder-slate-600 disabled:opacity-50"
                placeholder="Số điện thoại (Chỉ nhập số)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.pass}</label>
              <input
                type="password"
                disabled={loading}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all placeholder-slate-600 disabled:opacity-50"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{t.confirmPass}</label>
              <input
                type="password"
                disabled={loading}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="block w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 transition-all placeholder-slate-600 disabled:opacity-50"
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
              <span>{loading ? 'Đang xử lý...' : t.btnReg}</span>
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            {t.hasAccount} <button onClick={() => onNavigate('login')} className="font-bold text-orange-500 hover:text-orange-400">{t.btnLogin}</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
