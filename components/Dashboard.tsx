
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
  
  const [userPhone, setUserPhone] = useState(localStorage.getItem('user_phone') || '0813149999');
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
    setIsLoadingProxies(true);
    setProxyError(null);
    try {
      const apiUrl = `https://proxynuoinick.com/api/api/tasks/proxy?tenkhach=${userPhone}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error(`Lỗi server: ${response.status}`);

      const data = await response.json();
      if (data.du_lieu_proxy && Array.isArray(data.du_lieu_proxy)) {
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
      } else {
        setProxies([]);
      }
    } catch (error: any) {
      setProxyError("Không thể tải danh sách proxy.");
      setProxies([]);
    } finally {
      setIsLoadingProxies(false);
    }
  }, [userPhone]);

  const fetchBalance = useCallback(async () => {
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
    alert("Hệ thống đang xử lý yêu cầu mua proxy của bạn...");
  };

  const copyAll = () => {
    const text = proxies.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
    navigator.clipboard.writeText(text);
    alert("Đã sao chép tất cả proxy!");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Info Bar (Optional, for better UX) */}
        <div className="flex justify-end mb-4">
           <div className="bg-[#161b2c] border border-slate-800 rounded-xl px-4 py-2 flex items-center space-x-3">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Số dư:</span>
              <span className="text-orange-500 font-black text-lg">{balance.toLocaleString()} VND</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT: FORM ĐẶT MUA */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div>
                <h2 className="text-white font-black text-lg uppercase italic tracking-tighter">ĐẶT MUA PROXY</h2>
              </div>

              <div className="space-y-5">
                {/* Vị trí server */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 tracking-widest">VỊ TRÍ SERVER</label>
                  <select 
                    value={createForm.location}
                    onChange={(e) => setCreateForm({...createForm, location: e.target.value})}
                    className="w-full bg-[#0a0f1d] border border-slate-800 text-slate-200 rounded-lg p-3 text-sm font-medium focus:ring-1 focus:ring-orange-500 outline-none appearance-none cursor-pointer"
                  >
                    <option>Việt Nam - VNPT (Dân cư)</option>
                    <option>Việt Nam - FPT (Dân cư)</option>
                    <option>Việt Nam - Viettel (Dân cư)</option>
                  </select>
                </div>

                {/* Username & Password */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 tracking-widest">USERNAME</label>
                    <input 
                      type="text" 
                      placeholder="Tùy chọn"
                      className="w-full bg-[#0a0f1d] border border-slate-800 text-slate-200 rounded-lg p-3 text-sm font-medium focus:ring-1 focus:ring-orange-500 outline-none placeholder-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 tracking-widest">PASSWORD</label>
                    <input 
                      type="text" 
                      placeholder="Tùy chọn"
                      className="w-full bg-[#0a0f1d] border border-slate-800 text-slate-200 rounded-lg p-3 text-sm font-medium focus:ring-1 focus:ring-orange-500 outline-none placeholder-slate-700"
                    />
                  </div>
                </div>

                {/* Giao thức */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 tracking-widest">GIAO THỨC</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setCreateForm({...createForm, protocol: 'HTTPS'})}
                      className={`py-2.5 rounded-lg text-xs font-black transition-all ${createForm.protocol === 'HTTPS' ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' : 'bg-[#1e293b] text-slate-500'}`}
                    >
                      HTTPS
                    </button>
                    <button 
                      className="py-2.5 rounded-lg text-xs font-black bg-[#1e293b] text-slate-600 cursor-not-allowed"
                      disabled
                    >
                      SOCKS5 (Sắp có)
                    </button>
                  </div>
                </div>

                {/* Gói thời gian */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 tracking-widest">GÓI THỜI GIAN</label>
                  <select 
                    value={createForm.duration}
                    onChange={(e) => setCreateForm({...createForm, duration: e.target.value})}
                    className="w-full bg-[#0a0f1d] border border-slate-800 text-slate-200 rounded-lg p-3 text-sm font-black focus:ring-1 focus:ring-orange-500 outline-none appearance-none cursor-pointer"
                  >
                    <option>1 Tháng</option>
                    <option>3 Tháng</option>
                    <option>1 Năm</option>
                  </select>
                </div>

                {/* Khuyến mãi Box */}
                <div className="bg-[#1e293b]/50 border border-orange-500/20 rounded-lg py-2 px-4 text-center">
                   <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest">1000 VND / 1 PROXY (KHUYẾN MÃI 20%)</p>
                </div>

                {/* Số lượng */}
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5 tracking-widest">SỐ LƯỢNG</label>
                  <input 
                    type="number" 
                    value={createForm.quantity}
                    onChange={(e) => setCreateForm({...createForm, quantity: parseInt(e.target.value) || 1})}
                    className="w-full bg-[#0a0f1d] border border-slate-800 text-slate-200 rounded-lg p-3 text-sm font-black focus:ring-1 focus:ring-orange-500 outline-none"
                  />
                </div>

                {/* Tổng tiền */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">TỔNG TIỀN:</span>
                  <span className="text-xl font-black text-orange-500 italic">{(1000 * createForm.quantity).toLocaleString()} VND</span>
                </div>

                {/* Submit Button */}
                <button 
                  onClick={handleCreateProxy}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-900/30 transition-all active:scale-95 uppercase text-sm tracking-tighter italic"
                >
                  THANH TOÁN & KÍCH HOẠT
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: DANH SÁCH PROXY */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full min-h-[700px]">
              
              {/* Header List */}
              <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                  <h2 className="text-white font-black text-lg uppercase italic tracking-tighter">DANH SÁCH PROXY</h2>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button onClick={copyAll} className="bg-[#1e293b] hover:bg-slate-700 text-slate-400 text-[10px] font-black py-2 px-4 rounded-lg uppercase transition-all flex items-center space-x-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    <span>SAO CHÉP</span>
                  </button>
                  <button className="bg-[#1e293b] hover:bg-slate-700 text-slate-400 text-[10px] font-black py-2 px-4 rounded-lg uppercase transition-all flex items-center space-x-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>TẢI TXT</span>
                  </button>
                  <button className="bg-[#334155] hover:bg-slate-600 text-white text-[10px] font-black py-2 px-4 rounded-lg uppercase transition-all">
                    XUẤT EXCEL
                  </button>
                </div>
              </div>

              {/* Proxy Table */}
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0a0f1d] border-b border-slate-800">
                      <th className="px-6 py-4 w-12 text-center">
                        <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-orange-600" />
                      </th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">IP:PORT</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">TÀI KHOẢN</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">VỊ TRÍ</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">HẾT HẠN</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">TRẠNG THÁI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {isLoadingProxies ? (
                      <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-600 font-bold uppercase text-xs animate-pulse">Đang tải dữ liệu...</td></tr>
                    ) : proxies.length === 0 ? (
                      <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-600 font-bold uppercase text-xs italic">Không tìm thấy proxy nào</td></tr>
                    ) : (
                      proxies.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-800/20 transition-all group">
                          <td className="px-6 py-5 text-center">
                            <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-orange-600" />
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-white font-black text-sm tracking-tight">{p.ip}:{p.port}</span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <div className="text-[11px] text-slate-300 font-bold">{p.username}</div>
                            <div className="text-[10px] text-slate-500 font-medium">********</div>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-slate-400 text-xs font-bold">{p.location}</span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-slate-500 text-[10px] font-black italic">{p.expiredAt.split(' ')[0]}</span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="bg-green-500/10 text-green-500 border border-green-500/30 px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">LIVE</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-[#0a0f1d]/50 border-t border-slate-800 text-center">
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">HIỂN THỊ {proxies.length} PROXY</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
