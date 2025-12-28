
import React, { useState } from 'react';

interface GmailVerifyProps {
  t: any;
  userPhone: string;
  onSuccess: () => void;
  onLogout: () => void;
}

const GmailVerify: React.FC<GmailVerifyProps> = ({ t, userPhone, onSuccess, onLogout }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const validateGmail = (emailStr: string) => {
    // Regex kiểm tra định dạng Gmail chuẩn
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(emailStr.trim().toLowerCase());
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanEmail = email.trim();
    
    if (!validateGmail(cleanEmail)) {
      setMessage({ type: 'error', text: t.errorEmail });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      // Gọi API trực tiếp không dùng dấu ngoặc kép bọc ngoài giá trị
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/LayotpGmail?tenkhach=${userPhone}&email=${encodeURIComponent(cleanEmail)}`);
      const result = await response.json();
      
      // Kiểm tra phản hồi dựa trên cấu trúc: { ten: "...", otp_mail: "Đã gửi otp..." }
      if (result && result.otp_mail) {
        setStep('otp');
        setMessage({ type: 'success', text: result.otp_mail });
      } else {
        setMessage({ type: 'error', text: result.message || 'Không thể gửi mã OTP. Vui lòng thử lại.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Lỗi kết nối máy chủ.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (cleanOtp.length < 4) return;

    setLoading(true);
    setMessage(null);
    try {
      // Gọi API verify trực tiếp không dùng dấu ngoặc kép bọc ngoài giá trị
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/checkotpmail?tenkhach=${userPhone}&otp=${encodeURIComponent(cleanOtp)}`);
      
      const result = await response.json();

      // Detection based on: { "ten": "...", "message": "Xác nhận OTP thành công" }
      if (result && result.message && result.message.toLowerCase().includes('thành công')) {
        setMessage({ type: 'success', text: t.success });
        setTimeout(onSuccess, 1500);
      } else {
        setMessage({ type: 'error', text: result.message || t.errorOtp });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Lỗi kết nối máy chủ.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b14] px-4 font-sans selection:bg-orange-500/30">
      <div className="max-w-[440px] w-full bg-[#111827] border border-slate-800/80 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        {/* Glow Ambient */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#f97316]/5 blur-[100px] -z-0"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            {/* Mail Icon Square Container */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f97316]/5 rounded-[1.5rem] mb-8 border border-orange-500/10">
              <svg className="w-10 h-10 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h2 className="text-[34px] font-black text-white italic uppercase tracking-tighter mb-4">
              {t.title}
            </h2>
            <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-[300px] mx-auto opacity-80">
              {t.sub}
            </p>
          </div>

          {message && (
            <div className={`mb-8 p-5 rounded-2xl text-[13px] font-black uppercase border transition-all flex items-center ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
              <span className="mr-3 text-lg">{message.type === 'success' ? '✓' : '⚠'}</span>
              <span className="flex-grow">{message.text}</span>
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="space-y-8">
              <div>
                <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1">
                  {t.labelEmail}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (message) setMessage(null);
                  }}
                  className="w-full bg-[#070b14] border border-slate-800/80 text-white rounded-2xl px-6 py-5 text-base focus:ring-2 focus:ring-[#f97316]/40 focus:border-[#f97316] outline-none font-bold transition-all placeholder-slate-800"
                  placeholder={t.placeholderEmail}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black py-5 rounded-[1.5rem] text-[18px] uppercase tracking-wider transition-all transform active:scale-[0.97] shadow-2xl shadow-orange-900/40 disabled:opacity-50"
              >
                {loading ? 'ĐANG XỬ LÝ...' : t.btnSendOtp}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div>
                <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1">
                  {t.labelOtp}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/[^0-9]/g, ''));
                    if (message) setMessage(null);
                  }}
                  className="w-full bg-[#070b14] border border-slate-800/80 text-[#f97316] rounded-2xl px-6 py-5 text-center text-3xl font-black tracking-[0.6em] focus:ring-2 focus:ring-[#f97316]/40 focus:border-[#f97316] outline-none transition-all placeholder-slate-800"
                  placeholder="000000"
                  autoFocus
                  required
                />
              </div>
              
              <div className="flex flex-col space-y-4">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black py-5 rounded-[1.5rem] text-[18px] uppercase tracking-wider transition-all transform active:scale-[0.97] shadow-2xl shadow-orange-900/40 disabled:opacity-50"
                >
                  {loading ? 'ĐANG XÁC THỰC...' : t.btnVerify}
                </button>
                <button 
                  type="button" 
                  onClick={() => { setStep('email'); setMessage(null); }} 
                  className="w-full text-slate-500 hover:text-white font-black py-2 rounded-xl uppercase text-[11px] tracking-widest transition-all"
                >
                  ← {t.resend}
                </button>
              </div>
            </form>
          )}

          <div className="mt-12 pt-8 border-t border-slate-800/40 text-center">
             <button 
              onClick={onLogout} 
              className="text-red-500/40 hover:text-red-500 text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center mx-auto space-x-2 group"
             >
               <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               <span>{t.logout}</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GmailVerify;
