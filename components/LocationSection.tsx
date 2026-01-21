
import React from 'react';

export const LocationSection: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-5 sm:p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 flex-grow">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-inner">
            📍
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-tight">Localização</h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">ONDE A FESTA ACONTECE</p>
          </div>
        </div>

        <p className="mb-5 sm:mb-6 font-medium text-gray-600 text-sm leading-relaxed">
          Nossa festa será na <span className="font-bold text-gray-800">Chácara De Bortole</span>. Confira o mapa interativo abaixo:
        </p>

        {/* Mapa Interativo Incorporado */}
        <div className="w-full aspect-[16/10] sm:aspect-video rounded-3xl overflow-hidden border-2 border-blue-100 shadow-lg relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.637172818648!2d-49.99649692497676!3d-20.40480278109045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bd58f43a67269b%3A0x459e2b3d8ba2d42f!2sChacar%C3%A1%20De%20Bortole!5e0!3m2!1spt-BR!2sbr!4v1705520000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa da Localização - Chácara De Bortole"
            className="opacity-95 group-hover:opacity-100 transition-opacity"
          ></iframe>
          
          {/* Badge flutuante sobre o mapa */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-md border border-gray-100 pointer-events-none flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Toque para interagir</span>
          </div>
        </div>
      </div>
    </div>
  );
};
