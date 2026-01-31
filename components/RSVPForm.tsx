import React, { useState, useEffect } from 'react';
import { Guest } from '../types';
import { GiftList } from './GiftList';

interface RSVPFormProps {
  onConfirm: (guest: Guest) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [extraNames, setExtraNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGiftList, setShowGiftList] = useState(false);
  
  // NOVO: Estado para controlar se já foi confirmado
  const [hasConfirmed, setHasConfirmed] = useState(false);

  // NOVO: Verifica se já confirmou assim que a página carrega
  useEffect(() => {
    const jaConfirmou = localStorage.getItem('presenca_confirmada_mib');
    if (jaConfirmou) {
      setHasConfirmed(true);
    }
  }, []);

  const handleNumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setNumPeople(val);
    const newExtraNames = Array(val - 1).fill('');
    setExtraNames(newExtraNames);
  };

  const handleExtraNameChange = (idx: number, val: string) => {
    const updated = [...extraNames];
    updated[idx] = val;
    setExtraNames(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    setIsSubmitting(true);
    
    // Simula tempo de rede
    setTimeout(() => {
      const newGuest: Guest = {
        id: crypto.randomUUID(),
        mainName: name,
        additionalGuests: extraNames.filter(n => n.trim() !== ''),
        totalCount: 1 + extraNames.filter(n => n.trim() !== '').length,
        timestamp: new Date().toISOString()
      };
      
      onConfirm(newGuest);
      
      // Salva o "carimbo" no navegador
      localStorage.setItem('presenca_confirmada_mib', 'true');
      
      // Atualiza o estado para mudar a tela imediatamente
      setHasConfirmed(true); 
      setIsSubmitting(false);
    }, 800);
  };

  // NOVO: Controle de visualização após confirmação
  if (hasConfirmed) {
    // Se o usuário clicou para ver a lista, mostra o componente GiftList
    if (showGiftList) {
      return <GiftList />; 
    }

    // Caso contrário, mostra a mensagem de sucesso com o botão
    return (
      <div className="bg-green-50 p-10 rounded-[2.5rem] shadow-2xl border border-green-100 h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
          ✅
        </div>
        <h2 className="text-3xl font-black text-green-800 mb-4">Presença Confirmada!</h2>
        <p className="text-green-700 font-medium text-lg max-w-xs mx-auto mb-8">
          Muito obrigado pela sua confirmação. <br/>Visite nossas sugestões de presentes.
        </p>

        {/* BOTÃO QUE ATIVA A LISTA */}
        <button 
          onClick={() => setShowGiftList(true)} 
          className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-8 rounded-2xl shadow-lg transform transition-all active:scale-95 mb-8 tracking-wide uppercase text-sm"
        >
          🎁 Ver Lista de Presentes
        </button>

        <div className="text-sm font-bold text-green-600 uppercase tracking-widest">
          Nos vemos em breve! 🇧🇷
        </div>
      </div>
    );
  }

  // Se não confirmou, mostra o formulário normal
  return (
    <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-50 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shadow-inner">
          ✨
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-800 leading-tight">Confirmar Presença</h2>
          <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-widest">Confirme até 10/03/2026</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="block text-xs sm:text-sm font-black text-gray-700 mb-2 uppercase tracking-wide group-focus-within:text-green-600 transition-colors">Seu Nome Completo</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite aqui..."
            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50/30 focus:bg-white focus:border-green-500 transition-all outline-none font-bold text-base sm:text-lg shadow-sm"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Quem virá com você?</label>
          <div className="relative">
            <select
              value={numPeople}
              onChange={handleNumChange}
              className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:border-green-500 transition-all outline-none font-bold text-base sm:text-lg appearance-none cursor-pointer shadow-sm"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Só eu' : 'Pessoas no total'}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-xl">
              🔽
            </div>
          </div>
        </div>

        {extraNames.length > 0 && (
          <div className="space-y-3 p-5 bg-blue-50/50 rounded-3xl border border-blue-100/50 animate-in zoom-in-95 duration-300">
            <p className="text-[10px] sm:text-xs font-black text-blue-700 uppercase tracking-[0.2em] mb-2">Quem mais vem?</p>
            {extraNames.map((n, idx) => (
              <input
                key={idx}
                required
                type="text"
                value={n}
                onChange={(e) => handleExtraNameChange(idx, e.target.value)}
                placeholder={`Nome do convidado #${idx + 1}`}
                className="w-full px-4 py-3 rounded-xl border-2 border-transparent focus:border-blue-400 bg-white outline-none font-bold text-sm sm:text-base shadow-sm"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-5 rounded-2xl font-black text-lg sm:text-xl transition-all transform active:scale-95 shadow-xl ${
            isSubmitting 
              ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
              : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-500/40 relative overflow-hidden group'
          }`}
        >
          <span className="relative z-10">{isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR PRESENÇA'}</span>
          {!isSubmitting && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
        </button>
      </form>
    </div>
  );
};