
import React, { useState } from 'react';
import { FAQItem } from '../types';

const faqs: FAQItem[] = [
  {
    question: "Proxy là gì và tại sao tôi cần nó?",
    answer: "Proxy là một máy chủ trung gian đứng giữa bạn và Internet. Nó giúp che giấu địa chỉ IP thật của bạn, giúp bạn truy cập Internet an toàn hơn và tránh bị các nền tảng như Facebook, Google khóa tài khoản khi nuôi nick số lượng lớn."
  },
  {
    question: "Sự khác biệt giữa IPv4 và IPv6 là gì?",
    answer: "IPv4 là giao thức cũ hơn nhưng được hỗ trợ rộng rãi bởi hầu hết các trang web. IPv6 là giao thức mới, giá thành rẻ hơn rất nhiều nhưng chỉ sử dụng được trên các trang hỗ trợ IPv6 (như Facebook, Google, YouTube)."
  },
  {
    question: "Làm thế nào để tôi gia hạn Proxy?",
    answer: "Bạn có thể vào mục Quản lý Proxy trong Dashboard, chọn các IP muốn gia hạn và bấm nút 'Gia hạn'. Hệ thống sẽ tự động khấu trừ tiền trong số dư tài khoản của bạn."
  },
  {
    question: "Proxy có hỗ trợ đổi trả không?",
    answer: "Chúng tôi hỗ trợ đổi IP lỗi trong vòng 24h đầu tiên nếu lỗi từ phía máy chủ của chúng tôi. Vui lòng liên hệ đội ngũ support để được xử lý nhanh nhất."
  }
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Câu Hỏi Thường Gặp</h2>
          <p className="text-slate-400">Mọi thắc mắc của bạn về dịch vụ sẽ được giải đáp tại đây</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all shadow-sm bg-slate-900"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-slate-800 transition-colors"
              >
                <span className="font-bold text-slate-100 text-lg">{faq.question}</span>
                <svg 
                  className={`w-6 h-6 text-orange-500 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIdx === idx ? 'max-h-96 py-6 border-t border-slate-800' : 'max-h-0'
                }`}
              >
                <p className="text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
