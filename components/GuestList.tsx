import React, { useEffect, useState } from 'react';
import { Guest } from '../types';

interface GuestListProps {
  guests: Guest[];
  onRemoveGuest: (id: string) => void; // Nova prop para deletar
}

// Adicione onRemoveGuest na desestruturação das props
export const GuestList: React.FC<GuestListProps> = ({ guests, onRemoveGuest }) => {
  const [isAdmin, setIsAdmin] = useState(false);

// 1. Verificação de Segurança Simples
  // O componente só vai aparecer se a URL tiver ?mode=admin
  useEffect(() => {
    // 1. Tenta ler da URL padrão (ex: site.com?mode=admin)
    const searchParams = new URLSearchParams(window.location.search);
    
    // 2. Tenta ler de uma URL com Hash (ex: site.com/#/pagina?mode=admin)
    const hashString = window.location.hash.includes('?') 
      ? window.location.hash.split('?')[1] 
      : '';
    const hashParams = new URLSearchParams(hashString);

    // Pega o valor de um ou do outro
    const mode = searchParams.get('mode') || hashParams.get('mode');

    // Verifica se é admin (convertendo para minúsculas para evitar erros se digitar Admin)
    if (mode && mode.toLowerCase() === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const totalGuests = guests.reduce((sum, g) => sum + g.totalCount, 0);

  const simulateWhatsAppUpdate = () => {
    const listString = guests.map(g => {
        const others = g.additionalGuests.length > 0 ? ` (+ ${g.additionalGuests.join(', ')})` : '';
        return `- ${g.mainName}${others}`;
    }).join('%0A');
    
    // Formatação da mensagem para o WhatsApp
    const message = `*Relatório Diário - Made in Brasil*%0A%0ATotal: ${totalGuests} confirmados%0A%0A${listString}`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  // 2. Se não for admin, não renderiza nada (fica invisível no site)
  if (!isAdmin) {
    return null; 
  }

  // 3. Se for admin, mostra o Painel de Controle
  return (
    <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] border-2 border-red-100 shadow-2xl relative overflow-hidden">
      {/* Faixa de aviso de Admin */}
      <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-center text-xs font-bold py-1 uppercase tracking-widest">
        Área Administrativa - Visível apenas para ti
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 mt-4">
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Controle de Convidados</h2>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <p className="text-green-700 font-bold text-sm uppercase">{totalGuests} confirmados até agora</p>
          </div>
        </div>
        
        {/* Botão para gerar o relatório no TEU WhatsApp */}
        <button 
          onClick={simulateWhatsAppUpdate}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl transition-all active:scale-95 group"
        >
          <span className="text-2xl">📊</span>
          <span className="uppercase tracking-widest text-sm">Gerar Relatório Diário</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guests.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400 italic">
             Nenhuma confirmação ainda.
          </div>
        ) : (
          guests.map((guest) => (
            <div key={guest.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative group">
              
              {/* Botão de Excluir (Só aparece no Admin) */}
              <button 
                onClick={() => {
                  if(window.confirm(`Tem certeza que deseja excluir ${guest.mainName}?`)) {
                    onRemoveGuest(guest.id);
                  }
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors font-bold z-10"
                title="Excluir convidado"
              >
                X
              </button>

              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 truncate">
                  {guest.mainName}
                </span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-bold">
                  Total: {guest.totalCount}
                </span>
              </div>
              {guest.additionalGuests.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  + {guest.additionalGuests.join(', ')}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};