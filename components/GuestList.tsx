
import React from 'react';
import { Guest } from '../types';

interface GuestListProps {
  guests: Guest[];
}

export const GuestList: React.FC<GuestListProps> = ({ guests }) => {
  const totalGuests = guests.reduce((sum, g) => sum + g.totalCount, 0);

  const simulateWhatsAppUpdate = () => {
    const listString = guests.map(g => {
        const others = g.additionalGuests.length > 0 ? ` (+ ${g.additionalGuests.join(', ')})` : '';
        return `- ${g.mainName}${others}`;
    }).join('%0A');
    
    const message = `*Lista de Convidados - Made in Brasil*%0A%0ATotal: ${totalGuests} confirmados%0A%0A${listString}`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Presenças Confirmadas</h2>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-green-700 font-black text-sm uppercase tracking-wider">{totalGuests} pessoas garantidas no fervo!</p>
          </div>
        </div>
        <button 
          onClick={simulateWhatsAppUpdate}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95 group"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">📱</span>
          <span className="uppercase tracking-widest text-sm">Enviar Lista p/ Zap</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {guests.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <span className="text-6xl block mb-4 opacity-30">🤔</span>
             <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-sm italic">Ninguém confirmou ainda...</p>
          </div>
        ) : (
          guests.map((guest) => (
            <div key={guest.id} className="bg-gray-50/50 p-5 rounded-3xl border border-transparent hover:border-yellow-400 hover:bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="flex justify-between items-start mb-3">
                <span className="font-black text-gray-800 text-lg group-hover:text-blue-900 truncate pr-2" title={guest.mainName}>
                  {guest.mainName}
                </span>
                <span className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-1 rounded-lg font-black shrink-0 shadow-sm uppercase">
                  {guest.totalCount}x
                </span>
              </div>
              {guest.additionalGuests.length > 0 && (
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Acompanhantes</p>
                   <p className="text-xs text-gray-600 font-bold leading-relaxed line-clamp-2">
                     {guest.additionalGuests.join(', ')}
                   </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-10 p-5 bg-blue-50/50 border border-blue-100 rounded-3xl text-xs text-blue-800 flex items-start gap-4">
        <span className="text-2xl shrink-0">💡</span>
        <p className="font-medium leading-relaxed">
          <span className="font-black uppercase tracking-wider block mb-1">Nota da Organização</span>
          Esta lista serve apenas para controle prévio dos aniversariantes. Traga sua melhor energia para celebrarmos juntos!
        </p>
      </div>
    </div>
  );
};
