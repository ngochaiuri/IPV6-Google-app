
import React, { useState, useEffect, useCallback } from 'react';
import { ProxyInstance } from '../types';

interface DashboardProps {
  t: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ t, onLogout }) => {
  const [balance, setBalance] = useState<number>(0); 
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isLoadingProxies, setIsLoadingProxies] = useState(true);
  const [proxyError, setProxyError] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'connecting'>('connecting');
  
  const [userPhone] = useState(localStorage.getItem('user_phone') || '');
  const [proxies, setProxies] = useState<ProxyInstance[]>([]);

  const [createForm, setCreateForm] = useState({
    location: 'Việt Nam - VNPT (Dân cư)',
    protocol: 'HTTPS',
    duration: '1 Tháng',
    quantity: 1,
    username: '',
    password: ''
  });

  const fetchProxies = useCallback(async () => {
    if (!userPhone) {
      setProxyError("Không tìm thấy thông tin đăng nhập.");
      setIsLoadingProxies(false);
      return;
    }
    
    setIsLoadingProxies(true);
    setProxyError(null);
    setDbStatus('connecting');
    
    try {
      const apiUrl = `https://proxynuoinick.com/api/api/tasks/proxy?tenkhach=${userPhone}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`Lỗi server: ${response.status}`);

      const data = await response.json();
      if (data && data.du_lieu_proxy && Array.isArray(data.du_lieu_proxy)) {
        const mappedProxies: ProxyInstance[] = data.du_lieu_proxy.map((item: any, index: number) => {
          const parts = (item.fullXuat || "").split(':');
          return {
            id: `proxy-${index}`,
            ip: parts[0] || '0.0.0.0',
            port: parseInt(parts[1]) || 0,
            username: item.username || parts[2] || 'N/A',
            password: item.password || parts[3] || 'N/A',
            protocol: 'HTTP',
            location: 'Việt Nam (VNPT)',
            createdAt: item.ngayTao || 'N/A',
            expiredAt: item.ngayHeThan || 'N/A',
            status: 'active'
          };
        });
        setProxies(mappedProxies);
        setDbStatus('connected');
      } else {
        setProxies([]);
        setDbStatus('connected');
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      setProxyError("Không thể kết nối đến máy chủ API. Vui lòng kiểm tra lại mạng.");
      setDbStatus('error');
    } finally {
      setIsLoadingProxies(false);
    }
  }, [userPhone]);

  const fetchBalance = useCallback(async () => {
    if (!userPhone) return;
    setIsLoadingBalance(true);
    try {
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/diem?tenkhach=${userPhone}`);
      if (response.ok) {
        const data = await response.json();
        setBalance(Number(data.diemhientai) || 0);
      }
    } catch (error) {
      console.error("Lỗi lấy số dư");
    } finally {
      setIsLoadingBalance(false);
    }
  }, [userPhone]);

  useEffect(() => {
    fetchBalance();
    fetchProxies();
  }, [fetchBalance, fetchProxies]);

  const handleCreateProxy = () => {
    alert("Yêu cầu đang được gửi tới hệ thống xử lý...");
  };

  const copyAll = () => {
    if (proxies.length === 0) return;
    const text = proxies.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
    navigator.clipboard.writeText(text);
    alert("Đã sao chép tất cả proxy vào bộ nhớ tạm!");
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || typeof dateStr !== 'string' || dateStr === 'N/A') return 'N/A';
    return dateStr.split(' ')[0] || 'N/A';
  };

  return (
    <div className="min-h-screen bg-[#070b14] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-900/20 transform rotate-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{t.title}</h1>
              <div className="flex items-center space-x-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Tài khoản: {userPhone}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <div className="flex-grow lg:flex-grow-0 bg-[#111827] border border-slate-800 rounded-2xl px-6 py-3 flex items-center justify-between lg:justify-start space-x-6 shadow-2xl">
              <div className="text-right">
                <p className="text-[9px] text-slate-500 font-black uppercase mb-0.5 tracking-widest">{t.balance}</p>
                <p className="text-2xl font-black text-white leading-none">
                  {isLoadingBalance ? "..." : balance.toLocaleString()} <span className="text-[11px] text-orange-500">VND</span>
                </p>
              </div>
              <button 
                onClick={() => {fetchBalance(); fetchProxies();}}
                className="p-2.5 bg-slate-800 hover:bg-orange-600 text-slate-400 hover:text-white rounded-xl transition-all active:scale-90"
              >
                <svg className={`w-5 h-5 ${isLoadingBalance ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
            </div>
            
            <button 
              onClick={onLogout}
              className="p-4 bg-red-500/10 text-red-500 hover:bg-red-500 border border-red-500/20 hover:text-white rounded-2xl transition-all shadow-lg active:scale-95"
              title="Đăng xuất"
            >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Mua Proxy Panel */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-[#111827] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-orange-600/10"></div>
              
              <h2 className="text-xl font-black text-white mb-8 italic uppercase tracking-tighter flex items-center">
                <span className="w-2 h-6 bg-orange-600 mr-3 rounded-full"></span>
                {t.createProxy}
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Vị trí & Loại IP</label>
                  <select className="w-full bg-[#070b14] border border-slate-800 text-slate-200 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-orange-600 outline-none appearance-none cursor-pointer">
                    <option>Việt Nam - VNPT (IPv6)</option>
                    <option>Việt Nam - FPT (IPv6)</option>
                    <option>Việt Nam - Viettel (IPv6)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Gói thời gian</label>
                  <select 
                    value={createForm.duration} 
                    onChange={(e) => setCreateForm({...createForm, duration: e.target.value})}
                    className="w-full bg-[#070b14] border border-slate-800 text-slate-200 rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-orange-600 outline-none cursor-pointer"
                  >
                    <option>1 Tháng</option>
                    <option>3 Tháng</option>
                    <option>1 Năm</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.quantity}</label>
                  <div className="flex items-center space-x-3 bg-[#070b14] border border-slate-800 rounded-2xl p-2">
                    <button onClick={() => setCreateForm({...createForm, quantity: Math.max(1, createForm.quantity - 1)})} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-black transition-colors">-</button>
                    <input type="number" value={createForm.quantity} onChange={(e) => setCreateForm({...createForm, quantity: parseInt(e.target.value) || 1})} className="flex-grow bg-transparent text-white text-center font-black text-lg outline-none" />
                    <button onClick={() => setCreateForm({...createForm, quantity: createForm.quantity + 1})} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-black transition-colors">+</button>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Tổng tiền</span>
                    <span className="text-3xl font-black text-orange-500 italic">{(1000 * createForm.quantity).toLocaleString()} <span className="text-xs">đ</span></span>
                  </div>
                  <button 
                    onClick={handleCreateProxy}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-orange-900/40 uppercase tracking-[0.1em] text-sm transition-all transform active:scale-95 hover:shadow-orange-900/60"
                  >
                    {t.buyBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Danh sách Proxy Panel */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-[#111827] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col min-h-[700px]">
              
              <div className="p-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6 bg-[#111827]">
                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center">
                  <span className="w-2 h-6 bg-orange-600 mr-3 rounded-full"></span>
                  {t.proxyList}
                </h2>
                
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button 
                    onClick={copyAll} 
                    className="flex-grow sm:flex-grow-0 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black py-3 px-6 rounded-2xl uppercase flex items-center justify-center space-x-2 transition-all active:scale-95 border border-slate-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    <span>{t.copyAll}</span>
                  </button>
                  <button 
                    onClick={fetchProxies} 
                    className="flex-grow sm:flex-grow-0 bg-orange-600/10 text-orange-500 hover:bg-orange-600/20 text-[10px] font-black py-3 px-6 rounded-2xl uppercase transition-all border border-orange-500/20"
                  >
                    {t.refresh}
                  </button>
                </div>
              </div>

              {proxyError && (
                <div className="m-8 p-5 bg-red-500/10 border border-red-500/20 rounded-[1.5rem] flex items-center space-x-4">
                  <div className="bg-red-500 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <p className="text-red-500 text-sm font-bold uppercase tracking-tight">{proxyError}</p>
                </div>
              )}

              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#070b14] text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      <th className="px-8 py-5 border-b border-slate-800">Thông tin kết nối (IP:Port)</th>
                      <th className="px-8 py-5 border-b border-slate-800 text-center">Xác thực</th>
                      <th className="px-8 py-5 border-b border-slate-800 text-center">{t.expiredAt}</th>
                      <th className="px-8 py-5 border-b border-slate-800 text-center">{t.status}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                    {isLoadingProxies ? (
                      <tr><td colSpan={4} className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-12 h-12 border-4 border-orange-600/20 border-t-orange-600 rounded-full animate-spin"></div>
                          <p className="text-slate-600 font-black uppercase text-[10px] tracking-widest">Đang tải dữ liệu từ server...</p>
                        </div>
                      </td></tr>
                    ) : proxies.length === 0 ? (
                      <tr><td colSpan={4} className="px-8 py-32 text-center">
                        <div className="flex flex-col items-center space-y-4 opacity-30">
                          <svg className="w-20 h-20 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                          <p className="text-slate-500 font-black uppercase text-xs italic">Chưa có proxy nào trong danh sách</p>
                        </div>
                      </td></tr>
                    ) : (
                      proxies.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-800/20 transition-all group">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="p-2.5 bg-slate-900 rounded-xl group-hover:bg-orange-600/10 transition-colors">
                                <svg className="w-5 h-5 text-slate-500 group-hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10.5 10.5 0 0114.142 0M1.414 8.414a15 15 0 0121.172 0" /></svg>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-white font-mono font-black text-sm tracking-tight">{p.ip}:{p.port}</span>
                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Protocol: HTTP/HTTPS</span>
                              </div>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(`${p.ip}:${p.port}:${p.username}:${p.password}`);
                                  alert("Đã sao chép chi tiết kết nối!");
                                }} 
                                className="opacity-0 group-hover:opacity-100 p-2 bg-slate-800 hover:bg-orange-600 text-white rounded-lg transition-all"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="inline-flex flex-col items-center">
                              <p className="text-xs text-slate-300 font-bold leading-none">{p.username}</p>
                              <p className="text-[10px] text-slate-600 mt-1">********</p>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <span className="text-slate-500 text-[11px] font-black italic tracking-tighter">{formatDate(p.expiredAt)}</span>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="flex justify-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${p.status === 'active' ? 'bg-green-500/5 text-green-500 border-green-500/20' : 'bg-red-500/5 text-red-500 border-red-500/20'}`}>
                                {p.status === 'active' ? '● Đang Live' : '● Hết Hạn'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-5 bg-[#070b14] border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Tổng cộng: {proxies.length} proxy đang hoạt động</p>
                 <div className="flex items-center space-x-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                    <span className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : dbStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {dbStatus === 'connected' ? 'Hệ thống Sẵn Sàng' : dbStatus === 'connecting' ? 'Đang Kết Nối...' : 'Mất Kết Nối API'}
                    </span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
