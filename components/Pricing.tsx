
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
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'email_support', 'uptime_99.9', 'flexible']
  },
  {
    id: '3-months',
    price: 800,
    oldPrice: 1143,
    discount: '-30%',
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'priority_support', 'uptime_99.9', 'api_access', 'save_30']
  },
  {
    id: '6-months',
    price: 600,
    oldPrice: 1000,
    discount: '-40%',
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'support_247', 'uptime_99.9', 'api_access', 'multi_region', 'save_40']
  },
  {
    id: '12-months',
    price: 500,
    oldPrice: 1000,
    discount: '-50%',
    isBestValue: true,
    features: ['unlimited_proxy', 'unlimited_bandwidth', 'protocols', 'vip_support', 'uptime_99.99', 'api_premium', 'multi_region', 'custom', 'save_50']
  }
];

const Pricing: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section className="py-24 bg-slate-950" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t.title} <span className="text-orange-500">{t.highlight}</span>
          </h2>
          <p className="text-slate-400 text-lg">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {planData.map((plan) => (
            <div key={plan.id} className={`relative flex flex-col bg-slate-900/40 border-2 rounded-[2rem] p-8 transition-all hover:-translate-y-2 ${plan.isBestValue ? 'border-orange-600 shadow-2xl z-10' : 'border-slate-800'}`}>
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{plan.discount}</div>
              {plan.isBestValue && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">{t.bestValue}</div>}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-1">{t.plans[plan.id].name}</h3>
                <p className="text-slate-500 text-xs mb-6 font-medium">{t.plans[plan.id].sub}</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-white">{plan.price.toLocaleString('vi-VN')}đ</span>
                  <span className="text-slate-500 text-sm font-semibold">/proxy</span>
                </div>
                <div className="text-slate-600 text-sm line-through mt-1">{plan.oldPrice.toLocaleString('vi-VN')}đ</div>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start text-sm group">
                      <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      <span className="text-slate-400 group-hover:text-slate-200 transition-colors capitalize">{f.replace(/_/g, ' ')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${plan.isBestValue ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-300'}`}>{t.btnSelect}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
