
import React, { useState, useEffect, useCallback } from 'react';
import { ProxyInstance } from '../types';

interface DashboardProps {
  t: any;
  onLogout: () => void;
}

type Tab = 'main' | 'api';

const Dashboard: React.FC<DashboardProps> = ({ t, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('main');
  const [balance, setBalance] = useState<number>(0);
  const [isLoadingProxies, setIsLoadingProxies] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [proxies, setProxies] = useState<ProxyInstance[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [token] = useState(localStorage.getItem('api_token') || '');
  const [userPhone] = useState(localStorage.getItem('user_phone') || '');

  const [form, setForm] = useState({
    location: 'Việt Nam - VNPT (Dân cư)',
    protocol: 'HTTPS',
    duration: '1 Tháng',
    quantity: 1,
    username: userPhone, 
    password: userPhone  
  });

  const fetchProxies = useCallback(async () => {
    if (!userPhone) return;
    setIsLoadingProxies(true);
    try {
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/proxy?tenkhach=${userPhone}`);
      const data = await response.json();
      if (data?.du_lieu_proxy) {
        const mappedProxies = data.du_lieu_proxy.map((item: any, idx: number) => ({
          id: item.id?.toString() || `p-${idx}`,
          ip: item.fullXuat?.split(':')[0] || '...',
          port: item.fullXuat?.split(':')[1] || '...',
          username: item.username || '...',
          password: item.password || '...',
          location: 'Việt Nam (VNPT)',
          expiredAt: item.ngayHeThan || '...',
          status: 'active'
        }));
        setProxies(mappedProxies);
      }
    } catch (e) { 
      console.error(e); 
    }
    finally { 
      setIsLoadingProxies(false); 
      setSelectedIds(new Set()); // Reset selection on refresh
    }
  }, [userPhone]);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/diem?tenkhach=${userPhone}`);
      const data = await response.json();
      setBalance(Number(data.diemhientai) || 0);
    } catch (e) {}
  }, [userPhone]);

  useEffect(() => {
    fetchBalance();
    fetchProxies();
  }, [fetchBalance, fetchProxies]);

  // Logic Chọn Tất Cả
  const handleSelectAll = () => {
    if (selectedIds.size === proxies.length && proxies.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(proxies.map(p => p.id)));
    }
  };

  // Logic Chọn Từng Dòng
  const handleToggleProxy = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleOrderProxy = async () => {
    if (!token) {
      alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
      return;
    }

    setIsOrdering(true);
    try {
      let soNgay = 30;
      if (form.duration === '3 Tháng') soNgay = 90;
      if (form.duration === '1 Năm') soNgay = 365;

      const payload = {
        userId: userPhone,
        numProxy: form.quantity,
        passwordproxy: form.password,
        usernameproxy: form.username,
        tinhtrangproxy: "Không xoay",
        thoigianxoay: 0,
        soNgay: soNgay,
        tenKhach: userPhone
      };

      const response = await fetch("https://proxynuoinick.com/api/api/tasks/start", {
        method: "POST",
        headers: {
          "accept": "*/*",
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === "success") {
        alert(`Đặt mua thành công ${result.count} proxy!`);
        fetchBalance();
        fetchProxies();
      } else {
        alert(result.message || "Đặt mua thất bại. Vui lòng kiểm tra lại số dư.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối máy chủ khi đặt mua.");
    } finally {
      setIsOrdering(false);
    }
  };

  const getTargetProxies = () => {
    if (selectedIds.size > 0) {
      return proxies.filter(p => selectedIds.has(p.id));
    }
    return proxies;
  };

  const handleCopyProxies = () => {
    const targets = getTargetProxies();
    if (targets.length === 0) return;
    const textToCopy = targets.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => alert(`Đã sao chép ${targets.length} proxy!`))
      .catch(err => console.error('Lỗi copy:', err));
  };

  const handleDownloadTxt = () => {
    const targets = getTargetProxies();
    if (targets.length === 0) return;
    const content = targets.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proxynuoinick_${userPhone}_${new Date().getTime()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070b14] pt-24 pb-12 px-4 md:px-8 selection:bg-orange-500/20">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center space-x-8 mb-8 border-b border-slate-800/50 pb-4">
          <button onClick={() => setActiveTab('main')} className={`text-sm font-black uppercase tracking-widest transition-all relative py-2 ${activeTab === 'main' ? 'text-[#f97316]' : 'text-slate-500 hover:text-white'}`}>
            {t.navMain}
            {activeTab === 'main' && <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#f97316]"></div>}
          </button>
          <button onClick={() => setActiveTab('api')} className={`text-sm font-black uppercase tracking-widest transition-all relative py-2 ${activeTab === 'api' ? 'text-[#f97316]' : 'text-slate-500 hover:text-white'}`}>
            {t.navApi}
            {activeTab === 'api' && <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#f97316]"></div>}
          </button>
          
          <div className="flex-grow"></div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-[#111827] px-5 py-2.5 rounded-2xl border border-slate-800 flex items-center space-x-3 shadow-lg">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">SỐ DƯ VÍ:</span>
               <span className="text-white font-black text-sm">{balance.toLocaleString()}đ</span>
            </div>
            
            <button 
              onClick={onLogout}
              className="bg-red-600/5 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/10 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{t.logout}</span>
            </button>
          </div>
        </div>

        {activeTab === 'main' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-[#111827] border border-slate-800/60 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h2 className="text-lg font-black text-white italic uppercase mb-8 flex items-center tracking-tighter">
                  <span className="w-1.5 h-6 bg-[#f97316] mr-3 rounded-full shadow-lg shadow-orange-900/50"></span>
                  {t.createProxy}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1 opacity-60">{t.serverLocation}</label>
                    <select 
                      value={form.location}
                      onChange={e => setForm({...form, location: e.target.value})}
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-2xl p-4 text-sm font-bold outline-none cursor-pointer focus:border-[#f97316] hover:border-slate-700 transition-all appearance-none"
                    >
                      <option>Việt Nam - VNPT (Dân cư)</option>
                      <option>Việt Nam - FPT</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1 opacity-60">USERNAME</label>
                      <input 
                        type="text" 
                        value={form.username}
                        onChange={e => setForm({...form, username: e.target.value})}
                        className="w-full bg-[#070b14] border border-slate-800 text-white rounded-2xl p-4 text-xs font-bold outline-none focus:border-[#f97316] transition-all" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1 opacity-60">PASSWORD</label>
                      <input 
                        type="text" 
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        className="w-full bg-[#070b14] border border-slate-800 text-white rounded-2xl p-4 text-xs font-bold outline-none focus:border-[#f97316] transition-all" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1 opacity-60">{t.protocol}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-[#f97316] text-white py-3.5 rounded-2xl font-black text-xs uppercase shadow-xl shadow-orange-900/20 active:scale-95 transition-all">HTTPS</button>
                      <button className="bg-[#070b14] border border-slate-800 text-slate-600 py-3.5 rounded-2xl font-black text-xs uppercase cursor-not-allowed">SOCKS5</button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1 opacity-60">{t.duration}</label>
                    <select 
                      value={form.duration}
                      onChange={e => setForm({...form, duration: e.target.value})}
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-2xl p-4 text-sm font-bold outline-none focus:border-[#f97316] appearance-none"
                    >
                      <option>1 Tháng</option>
                      <option>3 Tháng</option>
                      <option>1 Năm</option>
                    </select>
                  </div>

                  <div className="bg-[#f97316]/5 border border-[#f97316]/20 p-4 rounded-2xl text-center">
                    <span className="text-[#f97316] font-black text-[11px] uppercase tracking-tighter">{t.promoLabel}</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block pl-1 opacity-60">{t.quantity}</label>
                    <input 
                      type="number" 
                      min="1"
                      value={form.quantity} 
                      onChange={e => setForm({...form, quantity: Math.max(1, parseInt(e.target.value) || 1)})} 
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-2xl p-4 text-2xl font-black outline-none focus:border-[#f97316] text-center" 
                    />
                  </div>

                  <div className="pt-6 border-t border-slate-800/50 flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{t.totalPrice}:</span>
                    <span className="text-2xl font-black text-[#f97316] italic tracking-tight">{(1000 * form.quantity).toLocaleString()} VND</span>
                  </div>

                  <button 
                    onClick={handleOrderProxy}
                    disabled={isOrdering}
                    className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black py-5 rounded-[1.25rem] shadow-2xl shadow-orange-900/30 uppercase tracking-widest transition-all transform active:scale-[0.97] disabled:opacity-50 mt-4"
                  >
                    {isOrdering ? 'ĐANG XỬ LÝ...' : t.buyBtn}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-[#111827] border border-slate-800/60 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col min-h-[700px]">
                
                <div className="p-8 border-b border-slate-800/50 flex justify-between items-center">
                  <h2 className="text-lg font-black text-white italic uppercase flex items-center tracking-tighter">
                    <span className="w-1.5 h-6 bg-[#f97316] mr-3 rounded-full shadow-lg shadow-orange-900/50"></span>
                    {t.proxyList}
                  </h2>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={fetchProxies}
                      className="p-3 rounded-2xl bg-[#070b14] border border-slate-800 text-slate-500 hover:text-[#f97316] hover:border-[#f97316]/30 transition-all shadow-inner"
                    >
                      <svg className={`w-5 h-5 ${isLoadingProxies ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                    <button 
                      onClick={handleCopyProxies}
                      className="bg-[#070b14] hover:bg-[#f97316]/5 text-slate-400 hover:text-white text-[11px] font-black py-3 px-6 rounded-2xl uppercase flex items-center space-x-2 transition-all border border-slate-800 hover:border-[#f97316]/30 shadow-inner"
                    >
                      <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      <span>{selectedIds.size > 0 ? `SAO CHÉP (${selectedIds.size})` : t.copyAll}</span>
                    </button>
                    <button 
                      onClick={handleDownloadTxt}
                      className="bg-[#070b14] hover:bg-[#f97316]/5 text-slate-400 hover:text-white text-[11px] font-black py-3 px-6 rounded-2xl uppercase flex items-center space-x-2 transition-all border border-slate-800 hover:border-[#f97316]/30 shadow-inner"
                    >
                      <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      <span>{t.downloadTxt}</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto flex-grow custom-scrollbar">
                  {isLoadingProxies ? (
                    <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#f97316]/20 border-t-[#f97316]"></div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Đang tải dữ liệu...</span>
                    </div>
                  ) : (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#070b14]/50 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-slate-800/40">
                          <th className="px-8 py-6 w-20 text-center">
                            <label className="relative flex items-center justify-center cursor-pointer group mx-auto">
                              <input 
                                type="checkbox" 
                                checked={proxies.length > 0 && selectedIds.size === proxies.length}
                                onChange={handleSelectAll}
                                className="peer appearance-none w-5 h-5 bg-[#111827] border-2 border-slate-800 rounded-md checked:bg-[#f97316] checked:border-[#f97316] transition-all cursor-pointer" 
                              />
                              <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                            </label>
                          </th>
                          <th className="px-8 py-6">IP:PORT</th>
                          <th className="px-8 py-6 text-center">TÀI KHOẢN</th>
                          <th className="px-8 py-6 text-center">VỊ TRÍ</th>
                          <th className="px-8 py-6 text-center">HẾT HẠN</th>
                          <th className="px-8 py-6 text-center">TRẠNG THÁI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/20">
                        {proxies.length > 0 ? proxies.map((p, i) => (
                          <tr key={p.id} className={`hover:bg-[#f97316]/5 transition-all group ${selectedIds.has(p.id) ? 'bg-[#f97316]/5' : ''}`}>
                            <td className="px-8 py-6 text-center">
                              <label className="relative flex items-center justify-center cursor-pointer mx-auto">
                                <input 
                                  type="checkbox" 
                                  checked={selectedIds.has(p.id)}
                                  onChange={() => handleToggleProxy(p.id)}
                                  className="peer appearance-none w-5 h-5 bg-[#070b14] border-2 border-slate-800 rounded-md checked:bg-[#f97316] checked:border-[#f97316] transition-all cursor-pointer" 
                                />
                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                              </label>
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-white font-mono font-black text-[15px] tracking-tight group-hover:text-[#f97316] transition-colors">
                                {p.ip}:{p.port}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <div className="flex flex-col">
                                <span className="text-white text-xs font-black tracking-tight">{p.username}</span>
                                <span className="text-[10px] text-slate-600 font-mono tracking-tighter uppercase">{p.password.substring(0, 3)}****</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-slate-500 text-[10px] font-black uppercase tracking-tighter bg-slate-800/30 px-3 py-1 rounded-lg">
                                VIỆT NAM (VNPT)
                              </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-slate-500 text-[11px] font-bold italic tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">
                                {p.expiredAt}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-900/5">
                                LIVE
                              </span>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={6} className="px-8 py-32 text-center">
                              <div className="flex flex-col items-center justify-center opacity-20">
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                <span className="font-black uppercase tracking-[0.5em] text-sm">Trống</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="p-5 bg-[#070b14]/50 border-t border-slate-800/40 text-center">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] opacity-50">
                    {proxies.length} PROXY ĐANG HOẠT ĐỘNG
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#111827] border border-slate-800/60 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/5 blur-[120px] -z-0"></div>
            <div className="max-w-3xl relative z-10">
              <h2 className="text-2xl font-black text-white italic uppercase mb-4 flex items-center tracking-tighter">
                <span className="w-1.5 h-7 bg-[#f97316] mr-3 rounded-full shadow-lg shadow-orange-900/50"></span>
                {t.apiTitle}
              </h2>
              <p className="text-slate-500 mb-12 leading-relaxed text-[15px] font-medium opacity-80">{t.apiSub}</p>
              
              <div className="space-y-10">
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 block pl-1 opacity-60">{t.apiTokenLabel}</label>
                  <div className="flex bg-[#070b14] border border-slate-800 rounded-2xl p-2.5 items-center group focus-within:border-[#f97316]/50 transition-all shadow-inner">
                    <input 
                      type="text" 
                      readOnly 
                      value={token} 
                      className="flex-grow bg-transparent text-[#f97316] font-mono text-xs p-3 outline-none overflow-hidden text-ellipsis font-bold tracking-tight"
                    />
                    <button 
                      onClick={() => {navigator.clipboard.writeText(token); alert("Copied!");}}
                      className="bg-[#f97316] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-orange-900/40"
                    >
                      SAO CHÉP
                    </button>
                  </div>
                </div>

                <div className="bg-[#070b14]/80 p-10 rounded-[2rem] border border-slate-800/60 shadow-inner">
                  <h4 className="text-[#f97316] font-black uppercase text-[11px] mb-6 flex items-center tracking-widest">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {t.apiGuide}
                  </h4>
                  <ul className="text-slate-500 text-[13px] space-y-6 font-medium">
                    <li className="flex items-start">
                      <span className="text-[#f97316] mr-4 font-black">01.</span>
                      <div className="flex flex-col space-y-2">
                        <span className="opacity-60 text-[11px] font-black uppercase">Endpoint Lấy Danh Sách:</span>
                        <code className="text-[#f97316] font-mono text-[11px] bg-[#f97316]/5 px-3 py-2 rounded-lg border border-[#f97316]/10">GET https://proxynuoinick.com/api/api/tasks/proxy?tenkhach={userPhone}</code>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#f97316] mr-4 font-black">02.</span>
                      <div className="flex flex-col space-y-2">
                        <span className="opacity-60 text-[11px] font-black uppercase">Authentication Header:</span>
                        <code className="text-blue-400 font-mono text-[11px] bg-blue-400/5 px-3 py-2 rounded-lg border border-blue-400/10">Authorization: Bearer [TOKEN]</code>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
