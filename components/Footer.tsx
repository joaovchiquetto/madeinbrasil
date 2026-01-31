
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 border-t border-gray-200 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="inline-block bg-gray-900 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-12 shadow-2xl">
          📌 Checklist da Festa
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-8 bg-white rounded-[2rem] shadow-xl border border-gray-50 flex flex-col items-center group hover:bg-green-50 transition-colors">
            <div className="w-16 h-16 bg-green-50 group-hover:bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner transition-colors">👕</div>
            <h4 className="font-black text-gray-800 mb-2 uppercase tracking-widest text-sm">Dress Code</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed">Vá com traje confortável</p>
          </div>
          <div className="p-8 bg-white rounded-[2rem] shadow-xl border border-gray-50 flex flex-col items-center group hover:bg-yellow-50 transition-colors">
            <div className="w-16 h-16 bg-yellow-50 group-hover:bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner transition-colors">🍻</div>
            <h4 className="font-black text-gray-800 mb-2 uppercase tracking-widest text-sm">Sede e Fome</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed">Teremos petiscos, mas traga sua bebida favorita (coolers são bem-vindos).</p>
          </div>
          <div className="p-8 bg-white rounded-[2rem] shadow-xl border border-gray-50 flex flex-col items-center group hover:bg-blue-50 transition-colors">
            <div className="w-16 h-16 bg-blue-50 group-hover:bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner transition-colors">🇧🇷</div>
            <h4 className="font-black text-gray-800 mb-2 uppercase tracking-widest text-sm">Vibe Positiva</h4>
            <p className="text-xs text-gray-500 font-bold leading-relaxed">Sua alegria é o presente mais importante da nossa festa!</p>
          </div>
        </div>

        <div className="mb-12">
          <p className="font-pacifico text-4xl sm:text-5xl text-green-600 mb-4 animate-pulse">Contamos com vocês!</p>
          <div className="flex justify-center gap-1">
             <div className="w-12 h-1.5 bg-green-500 rounded-full"></div>
             <div className="w-12 h-1.5 bg-yellow-400 rounded-full"></div>
             <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="text-gray-300 text-[10px] sm:text-xs uppercase font-black tracking-[0.5em] mt-10">
          © 2026 Made in Brasil • João & Maria
        </div>
      </div>
    </footer>
  );
};
