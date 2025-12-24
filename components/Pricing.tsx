
import React from 'react';

interface PricingPlan {
  id: string;
  duration: string;
  subTitle: string;
  price: number;
  oldPrice: number;
  discount: string;
  features: string[];
  isBestValue?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: '1-month',
    duration: '1 Tháng',
    subTitle: 'Gói ngắn hạn linh hoạt',
    price: 1000,
    oldPrice: 1250,
    discount: '-20%',
    features: [
      'Tự tạo proxy online không giới hạn',
      'Băng thông không giới hạn',
      'HTTP/HTTPS/SOCKS5',
      'Hỗ trợ email',
      'Uptime 99.9%',
      'Gia hạn linh hoạt'
    ]
  },
  {
    id: '3-months',
    duration: '3 Tháng',
    subTitle: 'Tiết kiệm hơn cho dự án vừa',
    price: 800,
    oldPrice: 1143,
    discount: '-30%',
    features: [
      'Tự tạo proxy online không giới hạn',
      'Băng thông không giới hạn',
      'HTTP/HTTPS/SOCKS5',
      'Hỗ trợ ưu tiên',
      'Uptime 99.9%',
      'API Access',
      'Tiết kiệm 30%'
    ]
  },
  {
    id: '6-months',
    duration: '6 Tháng',
    subTitle: 'Lựa chọn thông minh cho dài hạn',
    price: 600,
    oldPrice: 1000,
    discount: '-40%',
    features: [
      'Tự tạo proxy online không giới hạn',
      'Băng thông không giới hạn',
      'HTTP/HTTPS/SOCKS5',
      'Hỗ trợ ưu tiên 24/7',
      'Uptime 99.9%',
      'API Access',
      'Đa vùng miền',
      'Tiết kiệm 40%'
    ]
  },
  {
    id: '12-months',
    duration: '12 Tháng',
    subTitle: 'Tiết kiệm tối đa cho doanh nghiệp',
    price: 500,
    oldPrice: 1000,
    discount: '-50%',
    isBestValue: true,
    features: [
      'Tự tạo proxy online không giới hạn',
      'Băng thông không giới hạn',
      'HTTP/HTTPS/SOCKS5',
      'Hỗ trợ VIP 24/7',
      'Uptime 99.99%',
      'API Access Premium',
      'Đa vùng miền',
      'Tùy chỉnh theo yêu cầu',
      'Tiết kiệm 50%'
    ]
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Bảng Giá <span className="text-orange-500">Ưu Đãi</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Càng dài hạn - Càng tiết kiệm! Khuyến mãi lên đến 50%
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col bg-slate-900/40 border-2 rounded-[2rem] p-8 transition-all hover:-translate-y-2 ${
                plan.isBestValue 
                ? 'border-orange-600 shadow-2xl shadow-orange-900/20 z-10' 
                : 'border-slate-800'
              }`}
            >
              {/* Discount Badge */}
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {plan.discount}
              </div>

              {/* Best Value Badge */}
              {plan.isBestValue && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider whitespace-nowrap">
                  Tiết Kiệm Nhất
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-1">{plan.duration}</h3>
                <p className="text-slate-500 text-xs mb-6 font-medium">{plan.subTitle}</p>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-black text-white">{plan.price.toLocaleString('vi-VN')}đ</span>
                  <span className="text-slate-500 text-sm font-semibold">/proxy</span>
                </div>
                <div className="text-slate-600 text-sm line-through mt-1">
                  {plan.oldPrice.toLocaleString('vi-VN')}đ
                </div>
              </div>

              <div className="flex-grow">
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm group">
                      <svg className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-400 group-hover:text-slate-200 transition-colors leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95 ${
                  plan.isBestValue 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-900/30' 
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                Chọn Gói
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
