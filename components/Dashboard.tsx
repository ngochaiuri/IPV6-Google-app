
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
  const [token] = useState(localStorage.getItem('api_token') || '');
  const [userPhone] = useState(localStorage.getItem('user_phone') || '');

  const [form, setForm] = useState({
    location: 'Việt Nam - VNPT (Dân cư)',
    protocol: 'HTTPS',
    duration: '1 Tháng',
    quantity: 1,
    username: userPhone, // Mặc định dùng SĐT làm username proxy
    password: userPhone  // Mặc định dùng SĐT làm password proxy
  });

  const fetchProxies = useCallback(async () => {
    if (!userPhone) return;
    setIsLoadingProxies(true);
    try {
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/proxy?tenkhach=${userPhone}`);
      const data = await response.json();
      if (data?.du_lieu_proxy) {
        setProxies(data.du_lieu_proxy.map((item: any, idx: number) => ({
          id: `p-${idx}`,
          ip: item.fullXuat?.split(':')[0] || '...',
          port: item.fullXuat?.split(':')[1] || '...',
          username: item.username || '...',
          password: item.password || '...',
          location: 'Việt Nam (VNPT)',
          expiredAt: item.ngayHeThan || '...',
          status: 'active'
        })));
      }
    } catch (e) { 
      console.error(e); 
    }
    finally { setIsLoadingProxies(false); }
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

  const handleOrderProxy = async () => {
    if (!token) {
      alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
      return;
    }

    setIsOrdering(true);
    try {
      // Quy đổi thời gian
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
        // Làm mới dữ liệu
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

  const handleCopyProxies = () => {
    if (proxies.length === 0) return;
    const textToCopy = proxies.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
    navigator.clipboard.writeText(textToCopy)
      .then(() => alert(`Đã sao chép ${proxies.length} proxy!`))
      .catch(err => console.error('Lỗi copy:', err));
  };

  const handleDownloadTxt = () => {
    if (proxies.length === 0) return;
    const content = proxies.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
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
    <div className="min-h-screen bg-[#070b14] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex items-center space-x-8 mb-8 border-b border-slate-800/50 pb-4">
          <button onClick={() => setActiveTab('main')} className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'main' ? 'text-[#f97316]' : 'text-slate-500 hover:text-white'}`}>
            {t.navMain}
          </button>
          <button onClick={() => setActiveTab('api')} className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'api' ? 'text-[#f97316]' : 'text-slate-500 hover:text-white'}`}>
            {t.navApi}
          </button>
          
          <div className="flex-grow"></div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-[#111827] px-4 py-2 rounded-xl border border-slate-800 flex items-center space-x-3">
               <span className="text-[10px] font-black text-slate-500 uppercase">{t.balance}:</span>
               <span className="text-white font-black">{balance.toLocaleString()}đ</span>
            </div>
            
            <button 
              onClick={onLogout}
              className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{t.logout}</span>
            </button>
          </div>
        </div>

        {activeTab === 'main' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cột Trái: ĐẶT MUA PROXY */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-lg font-black text-white italic uppercase mb-8 flex items-center">
                  <span className="w-1.5 h-5 bg-[#f97316] mr-3 rounded-full"></span>
                  {t.createProxy}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{t.serverLocation}</label>
                    <select 
                      value={form.location}
                      onChange={e => setForm({...form, location: e.target.value})}
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3.5 text-sm font-bold outline-none cursor-pointer focus:border-[#f97316]"
                    >
                      <option>Việt Nam - VNPT (Dân cư)</option>
                      <option>Việt Nam - FPT</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">USERNAME</label>
                      <input 
                        type="text" 
                        value={form.username}
                        onChange={e => setForm({...form, username: e.target.value})}
                        placeholder="..." 
                        className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3.5 text-sm font-bold outline-none focus:border-[#f97316]" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">PASSWORD</label>
                      <input 
                        type="text" 
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        placeholder="..." 
                        className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3.5 text-sm font-bold outline-none focus:border-[#f97316]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{t.protocol}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-[#f97316] text-white py-3 rounded-xl font-black text-xs uppercase shadow-lg shadow-orange-900/20">HTTPS</button>
                      <button className="bg-[#070b14] border border-slate-800 text-slate-500 py-3 rounded-xl font-black text-xs uppercase cursor-not-allowed">SOCKS5</button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{t.duration}</label>
                    <select 
                      value={form.duration}
                      onChange={e => setForm({...form, duration: e.target.value})}
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3.5 text-sm font-bold outline-none focus:border-[#f97316]"
                    >
                      <option>1 Tháng</option>
                      <option>3 Tháng</option>
                      <option>1 Năm</option>
                    </select>
                  </div>

                  <div className="bg-orange-600/10 border border-orange-500/20 p-3 rounded-xl text-center">
                    <span className="text-[#f97316] font-black text-[10px] uppercase">{t.promoLabel}</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">{t.quantity}</label>
                    <input 
                      type="number" 
                      min="1"
                      value={form.quantity} 
                      onChange={e => setForm({...form, quantity: Math.max(1, parseInt(e.target.value) || 1)})} 
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-4 text-lg font-black outline-none focus:border-[#f97316]" 
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400 text-xs font-bold uppercase">{t.totalPrice}:</span>
                    <span className="text-xl font-black text-[#f97316]">{(1000 * form.quantity).toLocaleString()} VND</span>
                  </div>

                  <button 
                    onClick={handleOrderProxy}
                    disabled={isOrdering}
                    className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-900/20 uppercase tracking-widest transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    {isOrdering ? 'ĐANG XỬ LÝ...' : t.buyBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Cột Phải: DANH SÁCH PROXY */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[650px]">
                
                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-[#111827]">
                  <h2 className="text-lg font-black text-white italic uppercase flex items-center">
                    <span className="w-1.5 h-5 bg-[#f97316] mr-3 rounded-full"></span>
                    {t.proxyList}
                  </h2>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={fetchProxies}
                      className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all"
                    >
                      <svg className={`w-5 h-5 ${isLoadingProxies ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                    <button 
                      onClick={handleCopyProxies}
                      className="bg-slate-800/50 hover:bg-slate-700 text-slate-400 text-[10px] font-black py-2.5 px-5 rounded-xl uppercase flex items-center space-x-2 transition-all border border-slate-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      <span>{t.copyAll}</span>
                    </button>
                    <button 
                      onClick={handleDownloadTxt}
                      className="bg-slate-800/50 hover:bg-slate-700 text-slate-400 text-[10px] font-black py-2.5 px-5 rounded-xl uppercase flex items-center space-x-2 transition-all border border-slate-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      <span>{t.downloadTxt}</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto flex-grow">
                  {isLoadingProxies ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]"></div>
                    </div>
                  ) : (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#070b14] text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                          <th className="px-8 py-5 w-16 text-center">
                            <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 accent-[#f97316]" />
                          </th>
                          <th className="px-8 py-5">{t.tableIp}</th>
                          <th className="px-8 py-5 text-center">{t.tableAccount}</th>
                          <th className="px-8 py-5 text-center">{t.tableLocation}</th>
                          <th className="px-8 py-5 text-center">{t.expiredAt}</th>
                          <th className="px-8 py-5 text-center">{t.status}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/30">
                        {proxies.length > 0 ? proxies.map((p, i) => (
                          <tr key={i} className="hover:bg-slate-800/20 transition-all group">
                            <td className="px-8 py-6 text-center">
                              <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 accent-[#f97316]" />
                            </td>
                            <td className="px-8 py-6">
                              <span className="text-white font-mono font-black text-sm">{p.ip}:{p.port}</span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-white text-xs font-bold">{p.username}</span>
                              <div className="text-[10px] text-slate-600 font-mono tracking-tighter">{p.password.substring(0, 3)}****</div>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-slate-400 text-[10px] font-black uppercase">{p.location}</span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="text-slate-500 text-[10px] font-bold italic">{p.expiredAt}</span>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-md text-[9px] font-black uppercase">LIVE</span>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={6} className="px-8 py-20 text-center text-slate-600 font-bold uppercase tracking-widest text-xs">
                              Chưa có dữ liệu proxy
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="p-4 bg-[#070b14] border-t border-slate-800 text-center">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{proxies.length} PROXIES</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab TÍCH HỢP API */
          <div className="bg-[#111827] border border-slate-800 rounded-[2.5rem] p-12 shadow-2xl">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-white italic uppercase mb-4 flex items-center">
                <span className="w-1.5 h-6 bg-[#f97316] mr-3 rounded-full"></span>
                {t.apiTitle}
              </h2>
              <p className="text-slate-500 mb-10 leading-relaxed text-sm font-medium">{t.apiSub}</p>
              
              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">{t.apiTokenLabel}</label>
                  <div className="flex bg-[#070b14] border border-slate-800 rounded-2xl p-2 items-center group focus-within:border-[#f97316] transition-all">
                    <input 
                      type="text" 
                      readOnly 
                      value={token} 
                      className="flex-grow bg-transparent text-[#f97316] font-mono text-xs p-3 outline-none overflow-hidden text-ellipsis font-bold"
                    />
                    <button 
                      onClick={() => {navigator.clipboard.writeText(token); alert("Copied!");}}
                      className="bg-[#f97316] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase transition-all active:scale-95 shadow-lg shadow-orange-900/20"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="bg-[#070b14] p-8 rounded-3xl border border-slate-800">
                  <h4 className="text-[#f97316] font-black uppercase text-xs mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {t.apiGuide}
                  </h4>
                  <ul className="text-slate-500 text-xs space-y-4 font-medium">
                    <li className="flex items-start">
                      <span className="text-[#f97316] mr-3 font-bold">01.</span>
                      <span>Endpoint: <code className="text-blue-400 font-mono bg-blue-400/5 px-2 py-1 rounded">GET https://proxynuoinick.com/api/api/tasks/proxy?tenkhach={userPhone}</code></span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#f97316] mr-3 font-bold">02.</span>
                      <span>Header: <code className="text-blue-400 font-mono bg-blue-400/5 px-2 py-1 rounded">Authorization: Bearer [TOKEN]</code></span>
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
