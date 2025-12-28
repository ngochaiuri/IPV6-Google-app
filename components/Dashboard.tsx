
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  const [isRenewing, setIsRenewing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewDuration, setRenewDuration] = useState('1 Tháng');
  const [proxies, setProxies] = useState<ProxyInstance[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [token] = useState(localStorage.getItem('api_token') || '');
  const [userPhone] = useState(localStorage.getItem('user_phone') || '');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [form, setForm] = useState({
    location: 'Việt Nam - VNPT (Dân cư)',
    protocol: 'HTTPS',
    duration: '1 Tháng',
    quantity: 1,
    username: userPhone, 
    password: userPhone  
  });

  const pricingConfig = useMemo(() => ({
    '1 Tháng': { pricePerUnit: 1000, days: 30, label: "1000 VND / 1 Proxy ( khuyến mãi 20% )" },
    '3 Tháng': { pricePerUnit: 2400, days: 90, label: "800 VND / 1 Proxy ( khuyến mãi 30% )" },
    '6 Tháng': { pricePerUnit: 3600, days: 180, label: "600 VND / 1 Proxy ( khuyến mãi 40% )" },
    '12 Tháng': { pricePerUnit: 6000, days: 360, label: "500 VND / 1 Proxy ( khuyến mãi 50% )" },
  }), []);

  const currentPricing = pricingConfig[form.duration as keyof typeof pricingConfig] || pricingConfig['1 Tháng'];
  const totalPrice = currentPricing.pricePerUnit * form.quantity;

  const fetchProxies = useCallback(async () => {
    if (!userPhone) return;
    setIsLoadingProxies(true);
    try {
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/proxy?tenkhach=${userPhone}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        }
      });
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
        setProxies(mappedProxies.reverse());
      }
    } catch (e) { 
      console.error(e); 
    }
    finally { 
      setIsLoadingProxies(false); 
      setSelectedIds(new Set());
      setCurrentPage(1);
    }
  }, [userPhone, token]);

  const fetchBalance = useCallback(async () => {
    try {
      const response = await fetch(`https://proxynuoinick.com/api/api/tasks/diem?tenkhach=${userPhone}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        }
      });
      const data = await response.json();
      setBalance(Number(data.diemhientai) || 0);
    } catch (e) {}
  }, [userPhone, token]);

  useEffect(() => {
    fetchBalance();
    fetchProxies();
  }, [fetchBalance, fetchProxies]);

  const totalPages = Math.ceil(proxies.length / itemsPerPage);
  const paginatedProxies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return proxies.slice(start, start + itemsPerPage);
  }, [proxies, currentPage]);

  const handleSelectAll = () => {
    if (selectedIds.size === proxies.length && proxies.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(proxies.map(p => p.id)));
    }
  };

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
    if (!token) { alert("Phiên đăng nhập hết hạn."); return; }
    if (balance < totalPrice) { alert("Số dư không đủ."); return; }
    
    setIsOrdering(true);
    try {
      const payload = {
        userId: userPhone,
        numProxy: form.quantity,
        passwordproxy: form.password,
        usernameproxy: form.username,
        tinhtrangproxy: "Không xoay",
        thoigianxoay: 0,
        soNgay: currentPricing.days,
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
        alert(`Đặt mua thành công!`);
        fetchBalance();
        fetchProxies();
      } else {
        alert(result.message || "Thất bại.");
      }
    } catch (err) { alert("Lỗi kết nối."); } finally { setIsOrdering(false); }
  };

  const handleRenewProxies = async () => {
    const targets = proxies.filter(p => selectedIds.has(p.id));
    if (targets.length === 0) {
      alert("Vui lòng chọn proxy cần gia hạn.");
      return;
    }

    const renewCost = pricingConfig[renewDuration as keyof typeof pricingConfig].pricePerUnit * targets.length;
    if (balance < renewCost) {
      alert("Số dư không đủ để gia hạn. Vui lòng nạp thêm tiền.");
      return;
    }

    setIsRenewing(true);
    try {
      const selectedStrings = targets.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`);
      const payload = {
        tenkhach: userPhone,
        selected: selectedStrings,
        dulieune: renewDuration
      };

      const response = await fetch("https://proxynuoinick.com/api/api/tasks/giahanproxy", {
        method: "POST",
        headers: { 
          "accept": "*/*", 
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.message) {
        alert(result.message);
        if (result.message.toLowerCase().includes("thành công")) {
          setShowRenewModal(false);
          fetchBalance();
          fetchProxies();
        }
      }
    } catch (err) {
      alert("Lỗi kết nối khi gia hạn.");
    } finally {
      setIsRenewing(false);
    }
  };

  const handleDeleteProxy = async (proxy: ProxyInstance) => {
    if (!window.confirm(t.confirmDelete || "Bạn có chắc chắn muốn xóa proxy này?")) return;
    
    setIsDeleting(true);
    try {
      const fullProxy = `${proxy.ip}:${proxy.port}:${proxy.username}:${proxy.password}`;
      const url = `https://proxynuoinick.com/api/api/tasks/xoaproxy?tenkhach=${userPhone}&fullproxy=${encodeURIComponent(fullProxy)}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        },
        body: '' // Empty body as per curl example
      });
      
      const result = await response.json();
      alert(result.message || "Đã xóa thành công.");
      fetchProxies();
    } catch (err) {
      alert("Lỗi kết nối khi xóa proxy.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    const targets = proxies.filter(p => selectedIds.has(p.id));
    if (targets.length === 0) return;
    
    if (!window.confirm(`Bạn có chắc muốn xóa ${targets.length} proxy đã chọn?`)) return;
    
    setIsDeleting(true);
    try {
      // API hiện tại nhận 1 fullproxy mỗi lần, nên ta sẽ loop hoặc nếu backend hỗ trợ mảng thì cập nhật sau
      // Ở đây ta dùng Promise.all để tối ưu hóa thời gian
      const deletePromises = targets.map(proxy => {
        const fullProxy = `${proxy.ip}:${proxy.port}:${proxy.username}:${proxy.password}`;
        const url = `https://proxynuoinick.com/api/api/tasks/xoaproxy?tenkhach=${userPhone}&fullproxy=${encodeURIComponent(fullProxy)}`;
        return fetch(url, {
          method: 'POST',
          headers: { 
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          },
          body: ''
        });
      });

      await Promise.all(deletePromises);
      alert(`Đã xóa thành công ${targets.length} proxy.`);
      fetchProxies();
    } catch (err) {
      alert("Lỗi trong quá trình xóa hàng loạt.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getTargetProxies = () => selectedIds.size > 0 ? proxies.filter(p => selectedIds.has(p.id)) : proxies;

  const handleCopyProxies = () => {
    const targets = getTargetProxies();
    if (targets.length === 0) return;
    const textToCopy = targets.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => alert(`Đã sao chép ${targets.length} proxy!`));
  };

  const handleDownloadTxt = () => {
    const targets = getTargetProxies();
    if (targets.length === 0) return;
    const content = targets.map(p => `${p.ip}:${p.port}:${p.username}:${p.password}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proxynuoinick_${userPhone}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070b14] pt-20 md:pt-24 pb-12 px-2 md:px-8 selection:bg-orange-500/20">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Responsive Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-800/50 pb-4 gap-4">
          <div className="flex items-center space-x-4 md:space-x-8 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <button onClick={() => setActiveTab('main')} className={`text-[11px] md:text-sm font-black uppercase tracking-widest transition-all relative py-2 whitespace-nowrap ${activeTab === 'main' ? 'text-[#f97316]' : 'text-slate-500 hover:text-white'}`}>
              {t.navMain}
              {activeTab === 'main' && <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#f97316]"></div>}
            </button>
            <button onClick={() => setActiveTab('api')} className={`text-[11px] md:text-sm font-black uppercase tracking-widest transition-all relative py-2 whitespace-nowrap ${activeTab === 'api' ? 'text-[#f97316]' : 'text-slate-500 hover:text-white'}`}>
              {t.navApi}
              {activeTab === 'api' && <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#f97316]"></div>}
            </button>
          </div>
          
          <div className="flex items-center justify-between md:justify-end space-x-2 md:space-x-4">
            <div className="bg-[#111827] px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl border border-slate-800 flex items-center space-x-2 md:space-x-3 shadow-lg flex-shrink-0">
               <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-tighter">SỐ DƯ:</span>
               <span className="text-white font-black text-xs md:text-sm">{balance.toLocaleString()}đ</span>
            </div>
            
            <button 
              onClick={onLogout}
              className="bg-red-600/5 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/10 px-3 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center space-x-1 md:space-x-2"
            >
              <svg className="w-3.5 h-3.5 md:w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>{t.logout}</span>
            </button>
          </div>
        </div>

        {activeTab === 'main' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Form Section */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="bg-[#111827] border border-slate-800/60 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-2xl relative overflow-hidden">
                <h2 className="text-base md:text-lg font-black text-white italic uppercase mb-6 flex items-center tracking-tighter">
                  <span className="w-1.5 h-6 bg-[#f97316] mr-3 rounded-full"></span>
                  {t.createProxy}
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block pl-1 opacity-60">{t.serverLocation}</label>
                    <select 
                      value={form.location}
                      onChange={e => setForm({...form, location: e.target.value})}
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3 md:p-4 text-xs md:text-sm font-bold outline-none cursor-pointer focus:border-[#f97316] appearance-none"
                    >
                      <option>Việt Nam - VNPT (Dân cư)</option>
                      <option>Việt Nam - FPT</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block pl-1">USER</label>
                      <input 
                        type="text" 
                        value={form.username}
                        onChange={e => setForm({...form, username: e.target.value})}
                        className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3 md:p-4 text-[10px] md:text-xs font-bold outline-none focus:border-[#f97316]" 
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block pl-1">PASS</label>
                      <input 
                        type="text" 
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})}
                        className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3 md:p-4 text-[10px] md:text-xs font-bold outline-none focus:border-[#f97316]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block pl-1">{t.protocol}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-[#f97316] text-white py-3 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-orange-900/20 active:scale-95 transition-all">HTTPS</button>
                      <button className="bg-[#070b14] border border-slate-800 text-slate-700 py-3 rounded-xl font-black text-[10px] uppercase cursor-not-allowed">SOCKS5</button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block pl-1">{t.duration}</label>
                    <select 
                      value={form.duration}
                      onChange={e => setForm({...form, duration: e.target.value})}
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3 md:p-4 text-xs md:text-sm font-bold outline-none focus:border-[#f97316] appearance-none"
                    >
                      <option value="1 Tháng">1 Tháng</option>
                      <option value="3 Tháng">3 Tháng</option>
                      <option value="6 Tháng">6 Tháng</option>
                      <option value="12 Tháng">12 Tháng</option>
                    </select>
                  </div>

                  <div className="bg-[#f97316]/10 border border-[#f97316]/30 p-3 rounded-xl text-center">
                    <span className="text-[#f97316] font-black text-[10px] uppercase tracking-tighter leading-tight block">
                      {currentPricing.label}
                    </span>
                  </div>

                  <div>
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 block pl-1">{t.quantity}</label>
                    <input 
                      type="number" 
                      min="1"
                      value={form.quantity} 
                      onChange={e => setForm({...form, quantity: Math.max(1, parseInt(e.target.value) || 1)})} 
                      className="w-full bg-[#070b14] border border-slate-800 text-white rounded-xl p-3 md:p-4 text-xl md:text-2xl font-black outline-none focus:border-[#f97316] text-center" 
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.totalPrice}:</span>
                    <span className="text-xl md:text-2xl font-black text-[#f97316] italic tracking-tight">{totalPrice.toLocaleString()}đ</span>
                  </div>

                  <button 
                    onClick={handleOrderProxy}
                    disabled={isOrdering}
                    className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black py-4 md:py-5 rounded-xl md:rounded-[1.25rem] shadow-xl uppercase tracking-widest transition-all transform active:scale-[0.97] disabled:opacity-50 mt-2"
                  >
                    {isOrdering ? 'ĐANG XỬ LÝ...' : t.buyBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* List Section */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="bg-[#111827] border border-slate-800/60 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col min-h-[500px] md:min-h-[700px]">
                
                <div className="p-4 md:p-8 border-b border-slate-800/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-base md:text-lg font-black text-white italic uppercase flex items-center tracking-tighter">
                    <span className="w-1.5 h-6 bg-[#f97316] mr-3 rounded-full"></span>
                    {t.proxyList}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={fetchProxies}
                      className="p-2 md:p-3 rounded-xl bg-[#070b14] border border-slate-800 text-slate-500 hover:text-[#f97316] transition-all"
                    >
                      <svg className={`w-4 h-4 md:w-5 h-5 ${isLoadingProxies ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                    
                    {/* GIA HẠN Proxy Button */}
                    <button 
                      onClick={() => {
                        if (selectedIds.size === 0) {
                           alert("Vui lòng chọn ít nhất 1 proxy để gia hạn.");
                        } else {
                           setShowRenewModal(true);
                        }
                      }}
                      className={`flex-grow sm:flex-grow-0 bg-[#f97316]/10 hover:bg-[#f97316] text-[#f97316] hover:text-white text-[9px] md:text-[11px] font-black py-2.5 md:py-3 px-4 md:px-6 rounded-xl md:rounded-2xl uppercase flex items-center justify-center space-x-2 transition-all border border-[#f97316]/20 shadow-inner group active:scale-95`}
                    >
                      <svg className="w-3.5 h-3.5 md:w-4 h-4 text-[#f97316] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 2m9-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="whitespace-nowrap italic tracking-tighter">GIA HẠN {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}</span>
                    </button>

                    {/* XÓA HÀNG LOẠT Button */}
                    {selectedIds.size > 0 && (
                      <button 
                        onClick={handleBulkDelete}
                        disabled={isDeleting}
                        className="flex-grow sm:flex-grow-0 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white text-[9px] md:text-[11px] font-black py-2.5 md:py-3 px-4 md:px-6 rounded-xl md:rounded-2xl uppercase flex items-center justify-center space-x-2 transition-all border border-red-500/20 shadow-inner group active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 md:w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        <span className="whitespace-nowrap italic tracking-tighter">XÓA ĐÃ CHỌN ({selectedIds.size})</span>
                      </button>
                    )}

                    <button 
                      onClick={handleCopyProxies}
                      className="flex-grow sm:flex-grow-0 bg-[#070b14] hover:bg-[#f97316]/5 text-slate-400 hover:text-white text-[9px] md:text-[11px] font-black py-2.5 md:py-3 px-4 md:px-6 rounded-xl md:rounded-2xl uppercase flex items-center justify-center space-x-2 transition-all border border-slate-800 shadow-inner"
                    >
                      <svg className="w-3.5 h-3.5 md:w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      <span className="whitespace-nowrap">{selectedIds.size > 0 ? `CHÉP (${selectedIds.size})` : t.copyAll}</span>
                    </button>
                    <button 
                      onClick={handleDownloadTxt}
                      className="flex-grow sm:flex-grow-0 bg-[#070b14] hover:bg-[#f97316]/5 text-slate-400 hover:text-white text-[9px] md:text-[11px] font-black py-2.5 md:py-3 px-4 md:px-6 rounded-xl md:rounded-2xl uppercase flex items-center justify-center space-x-2 transition-all border border-slate-800 shadow-inner"
                    >
                      <svg className="w-3.5 h-3.5 md:w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      <span className="whitespace-nowrap">{t.downloadTxt}</span>
                    </button>
                  </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto flex-grow custom-scrollbar w-full">
                  {isLoadingProxies ? (
                    <div className="flex flex-col items-center justify-center h-[300px] md:h-[500px] space-y-4">
                      <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#f97316]/20 border-t-[#f97316]"></div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Đang tải...</span>
                    </div>
                  ) : (
                    <table className="min-w-[900px] w-full text-left">
                      <thead>
                        <tr className="bg-[#070b14]/50 text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800/40">
                          <th className="px-4 md:px-8 py-4 md:py-6 w-16 text-center">
                            <label className="relative flex items-center justify-center cursor-pointer group mx-auto">
                              <input 
                                type="checkbox" 
                                checked={proxies.length > 0 && selectedIds.size === proxies.length}
                                onChange={handleSelectAll}
                                className="peer appearance-none w-4 h-4 md:w-5 h-5 bg-[#111827] border-2 border-slate-800 rounded-md checked:bg-[#f97316] checked:border-[#f97316] transition-all cursor-pointer" 
                              />
                              <svg className="absolute w-2.5 h-2.5 md:w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                            </label>
                          </th>
                          <th className="px-4 md:px-8 py-4 md:py-6">IP:PORT</th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-center">TÀI KHOẢN</th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-center">VỊ TRÍ</th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-center">HẾT HẠN</th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-center">TRẠNG THÁI</th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-center">THAO TÁC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/10">
                        {paginatedProxies.length > 0 ? paginatedProxies.map((p) => (
                          <tr key={p.id} className={`hover:bg-[#f97316]/5 transition-all group ${selectedIds.has(p.id) ? 'bg-[#f97316]/5' : ''}`}>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                              <label className="relative flex items-center justify-center cursor-pointer mx-auto">
                                <input 
                                  type="checkbox" 
                                  checked={selectedIds.has(p.id)}
                                  onChange={() => handleToggleProxy(p.id)}
                                  className="peer appearance-none w-4 h-4 md:w-5 h-5 bg-[#070b14] border-2 border-slate-800 rounded-md checked:bg-[#f97316] checked:border-[#f97316] transition-all cursor-pointer" 
                                />
                                <svg className="absolute w-2.5 h-2.5 md:w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                              </label>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6">
                              <span className="text-white font-mono font-black text-xs md:text-[15px] tracking-tight group-hover:text-[#f97316] transition-colors">
                                {p.ip}:{p.port}
                              </span>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                              <div className="flex flex-col">
                                <span className="text-white text-[10px] md:text-xs font-black tracking-tight">{p.username}</span>
                                <span className="text-[9px] md:text-[10px] text-slate-600 font-mono tracking-tighter uppercase">{p.password?.substring(0, 3)}****</span>
                              </div>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                              <span className="text-slate-500 text-[9px] font-black uppercase tracking-tighter bg-slate-800/30 px-2 md:px-3 py-1 rounded-lg">
                                VIỆT NAM
                              </span>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                              <span className="text-slate-500 text-[10px] md:text-[11px] font-bold italic opacity-80">
                                {p.expiredAt}
                              </span>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                              <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 md:px-4 py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                                LIVE
                              </span>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-center">
                              <button 
                                onClick={() => handleDeleteProxy(p)}
                                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all active:scale-90"
                                title="Xóa Proxy"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={7} className="px-8 py-20 text-center">
                              <div className="flex flex-col items-center justify-center opacity-20">
                                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                <span className="font-black uppercase tracking-widest text-xs">Trống</span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="p-4 md:p-6 border-t border-slate-800/40 bg-[#070b14]/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <span className="hidden sm:inline">Hiển thị</span> <span className="text-white">{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, proxies.length)}</span> / <span className="text-white">{proxies.length}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-slate-800 disabled:opacity-20"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg></button>
                       <span className="text-white font-black text-xs px-4">{currentPage} / {totalPages}</span>
                       <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-slate-800 disabled:opacity-20"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg></button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#111827] border border-slate-800/60 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
             <div className="max-w-4xl relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-white italic uppercase mb-4 flex items-center tracking-tighter">
                <span className="w-1.5 h-7 bg-[#f97316] mr-3 rounded-full"></span>
                {t.apiTitle}
              </h2>
              <p className="text-slate-500 mb-8 md:mb-12 leading-relaxed text-sm font-medium opacity-80">{t.apiSub}</p>
              
              <div className="space-y-12">
                {/* API Token Section */}
                <div>
                  <label className="text-[10px] md:text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block opacity-60">{t.apiTokenLabel}</label>
                  <div className="flex flex-col sm:flex-row bg-[#070b14] border border-slate-800 rounded-xl md:rounded-2xl p-2 gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={token} 
                      className="flex-grow bg-transparent text-[#f97316] font-mono text-[10px] md:text-xs p-3 outline-none overflow-hidden text-ellipsis font-bold"
                    />
                    <button 
                      onClick={() => {navigator.clipboard.writeText(token); alert("Copied!");}}
                      className="bg-[#f97316] hover:bg-orange-600 text-white px-6 py-3 rounded-lg md:rounded-xl font-black text-[10px] md:text-[11px] uppercase tracking-widest transition-all shadow-lg"
                    >
                      SAO CHÉP
                    </button>
                  </div>
                </div>

                {/* API Documentation */}
                <div className="space-y-8">
                  <div className="bg-[#070b14]/80 p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-slate-800/60">
                    <h4 className="text-[#f97316] font-black uppercase text-[10px] md:text-[11px] mb-6 flex items-center tracking-widest">
                      <svg className="w-4 h-4 md:w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 2m9-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      03. API GIA HẠN PROXY
                    </h4>
                    <div className="space-y-6">
                      <div className="flex flex-col space-y-2">
                        <span className="opacity-60 text-[9px] md:text-[11px] font-black uppercase text-slate-400">Endpoint & Method:</span>
                        <code className="text-[#f97316] font-mono text-[9px] md:text-[11px] bg-[#f97316]/5 px-3 py-3 rounded-lg border border-[#f97316]/20 break-all font-bold">
                          POST https://proxynuoinick.com/api/api/tasks/giahanproxy
                        </code>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="opacity-60 text-[9px] md:text-[11px] font-black uppercase text-slate-400">Headers:</span>
                        <code className="text-blue-400 font-mono text-[9px] md:text-[11px] bg-blue-400/5 px-3 py-3 rounded-lg border border-blue-400/20 font-bold">
                          Content-Type: application/json<br/>
                          Authorization: Bearer [TOKEN]
                        </code>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="opacity-60 text-[9px] md:text-[11px] font-black uppercase text-slate-400">JSON Body Payload:</span>
                        <pre className="text-slate-300 font-mono text-[9px] md:text-[11px] bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
{`{
  "tenkhach": "${userPhone}",
  "selected": [
    "ip:port:user:pass",
    "ip:port:user:pass"
  ],
  "dulieune": "1 Tháng"
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RENEW MODAL */}
      {showRenewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111827] border border-slate-800 w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f97316]/5 blur-[60px] rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter">Gia hạn Proxy</h3>
                <button onClick={() => setShowRenewModal(false)} className="text-slate-500 hover:text-white transition-colors p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="bg-[#070b14] p-5 rounded-2xl border border-slate-800/50 mb-8">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#f97316]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest pl-1">ĐANG CHỌN:</span>
                  </div>
                  <span className="text-white font-black text-sm italic tracking-widest">{selectedIds.size} PROXY</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block pl-1 opacity-70">Thời gian gia hạn</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['1 Tháng', '3 Tháng', '6 Tháng', '12 Tháng'].map((duration) => (
                      <button 
                        key={duration}
                        onClick={() => setRenewDuration(duration)}
                        className={`py-4 rounded-xl md:rounded-2xl font-black text-[11px] md:text-xs uppercase tracking-widest transition-all border ${renewDuration === duration ? 'bg-[#f97316] border-[#f97316] text-white shadow-lg shadow-orange-900/40' : 'bg-[#070b14] border-slate-800 text-slate-500 hover:border-[#f97316]/50 hover:text-[#f97316]'}`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/50 flex justify-between items-center">
                   <div className="flex flex-col">
                      <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest opacity-60">GÓI GIA HẠN:</span>
                      <span className="text-white font-black text-sm italic tracking-tight">{renewDuration}</span>
                   </div>
                   <div className="text-right">
                      <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest opacity-60">TỔNG CHI PHÍ:</span>
                      <p className="text-xl md:text-2xl font-black text-[#f97316] italic tracking-tighter">
                        {(pricingConfig[renewDuration as keyof typeof pricingConfig].pricePerUnit * selectedIds.size).toLocaleString()}đ
                      </p>
                   </div>
                </div>

                <button 
                  onClick={handleRenewProxies}
                  disabled={isRenewing}
                  className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-black py-4 md:py-5 rounded-2xl text-[13px] uppercase tracking-widest shadow-2xl shadow-orange-900/40 transition-all transform active:scale-[0.97] disabled:opacity-50 mt-4 italic"
                >
                  {isRenewing ? 'HỆ THỐNG ĐANG XỬ LÝ...' : 'XÁC NHẬN GIA HẠN NGAY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
