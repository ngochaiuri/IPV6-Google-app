
import React, { useState } from 'react';

const FAQ: React.FC<{ t: any }> = ({ t }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-slate-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-slate-400">{t.sub}</p>
        </div>

        <div className="space-y-4">
          {t.items.map((faq: any, idx: number) => (
            <div key={idx} className="border border-slate-800 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all shadow-sm bg-slate-900">
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-slate-800 transition-colors">
                <span className="font-bold text-slate-100 text-lg">{faq.question}</span>
                <svg className={`w-6 h-6 text-orange-500 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-96 py-6 border-t border-slate-800' : 'max-h-0'}`}>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
