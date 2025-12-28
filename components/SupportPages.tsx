
import React from 'react';

export const Tutorials: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section className="py-20 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            {t.title} <span className="text-orange-500">{t.highlight}</span>
          </h2>
          <p className="text-slate-400 text-lg">{t.sub}</p>
        </div>

        <div className="space-y-12">
          {t.items.map((item: any, idx: number) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-orange-500/30 transition-all">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-bold text-white">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              </div>
              <ul className="space-y-4">
                {item.steps.map((step: string, sIdx: number) => (
                  <li key={sIdx} className="flex items-start text-slate-300">
                    <span className="text-orange-500 mr-3 mt-1">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section className="py-20 bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            {t.title} <span className="text-orange-500">{t.highlight}</span>
          </h2>
          <p className="text-slate-400 text-lg">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 text-2xl font-bold">Z</div>
              <div>
                <p className="text-slate-500 text-sm">Zalo Hỗ trợ</p>
                <p className="text-white font-bold text-lg">{t.zalo}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center text-sky-500">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.35 3.69-1.54 4.45-1.81 4.95-1.82.11 0 .35.03.5.15.13.1.17.24.18.33 0 .04.01.1.01.12z"></path></svg>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Telegram</p>
                <p className="text-white font-bold text-lg">{t.telegram}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-slate-500 text-sm">Email</p>
                <p className="text-white font-bold text-lg">{t.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-center">
            <h4 className="text-xl font-bold text-white mb-4">📍 Địa chỉ văn phòng</h4>
            <p className="text-slate-400 mb-6 leading-relaxed">{t.address}</p>
            <div className="h-48 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 italic">
              Google Maps Loading...
            </div>
            <p className="mt-6 text-orange-500 font-semibold">{t.workingHours}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Terms: React.FC<{ t: any }> = ({ t }) => {
  return (
    <section className="py-20 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            {t.title} <span className="text-orange-500">{t.highlight}</span>
          </h2>
          <p className="text-slate-400 text-lg">{t.sub}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-12">
          {t.sections.map((section: any, idx: number) => (
            <div key={idx} className="bg-slate-900/30 border-l-4 border-orange-600 p-8 rounded-r-3xl">
              <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
