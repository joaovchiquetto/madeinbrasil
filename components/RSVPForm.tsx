
import React, { useState } from 'react';
import { Guest } from '../types';

interface RSVPFormProps {
  onConfirm: (guest: Guest) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onConfirm }) => {
  const [name, setName] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [extraNames, setExtraNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    setTimeout(() => {
      const newGuest: Guest = {
        id: crypto.randomUUID(),
        mainName: name,
        additionalGuests: extraNames.filter(n => n.trim() !== ''),
        totalCount: 1 + extraNames.filter(n => n.trim() !== '').length,
        timestamp: new Date().toISOString()
      };
      
      onConfirm(newGuest);
      
      setName('');
      setNumPeople(1);
      setExtraNames([]);
      setIsSubmitting(false);
      
      alert('Sua presença foi confirmada com sucesso! 🇧🇷');
    }, 800);
  };

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
