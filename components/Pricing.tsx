
import React from 'react';

interface PricingPlan {
  id: string;
  price: number;
  oldPrice: number;
  discount: string;
  features: string[];
  isBestValue?: boolean;
}

const planData: PricingPlan[] = [
  {
    id: '1-month',
    price: 1000,
    oldPrice: 1250,
    discount: '-20%',
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'email_support', 'uptime_99', 'flexible']
  },
  {
    id: '3-months',
    price: 800,
    oldPrice: 1143,
    discount: '-30%',
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'priority_support', 'uptime_99', 'api_access', 'save_30']
  },
  {
    id: '6-months',
    price: 600,
    oldPrice: 1000,
    discount: '-40%',
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'support_247', 'uptime_99', 'api_access', 'multi_region', 'save_40']
  },
  {
    id: '12-months',
    price: 500,
    oldPrice: 1000,
    discount: '-50%',
    isBestValue: true,
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'vip_support', 'uptime_99', 'api_premium', 'multi_region', 'custom', 'save_50']
  }
];

const Pricing: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section className="py-16 md:py-24 bg-slate-950" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">
            {t.title} <span className="text-orange-500">{t.highlight}</span>
          </h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-400 text-sm md:text-lg font-medium">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {planData.map((plan) => (
            <div key={plan.id} className={`relative flex flex-col bg-slate-900/40 border-2 rounded-3xl md:rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:-translate-y-2 group ${plan.isBestValue ? 'border-orange-600 shadow-2xl shadow-orange-900/10 z-10' : 'border-slate-800 hover:border-slate-700'}`}>
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full shadow-lg z-20">{plan.discount}</div>
              {plan.isBestValue && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[10px] md:text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap shadow-xl">{t.bestValue}</div>}

              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-black text-white mb-1 italic uppercase tracking-tight group-hover:text-orange-500 transition-colors">{t.plans[plan.id].name}</h3>
                <p className="text-slate-500 text-[10px] md:text-xs mb-4 md:mb-6 font-bold uppercase tracking-widest opacity-60">{t.plans[plan.id].sub}</p>
                <div className="flex items-baseline space-x-1 md:space-x-2">
                  <span className="text-3xl md:text-4xl font-black text-white">{plan.price.toLocaleString('vi-VN')}đ</span>
                  <span className="text-slate-500 text-xs md:text-sm font-black uppercase tracking-tighter">/proxy</span>
                </div>
                <div className="text-slate-600 text-xs md:text-sm line-through mt-1 font-bold">{plan.oldPrice.toLocaleString('vi-VN')}đ</div>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 pl-1">
                  {plan.features.map((featureKey, idx) => (
                    <li key={idx} className="flex items-start text-[11px] md:text-sm group/item transition-all">
                      <div className="w-5 h-5 bg-orange-600/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover/item:bg-orange-600/20">
                        <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-slate-400 group-hover/item:text-slate-200 transition-colors font-medium">
                        {t.featureLabels[featureKey]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all transform active:scale-95 shadow-xl ${plan.isBestValue ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-900/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                {t.btnSelect}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
