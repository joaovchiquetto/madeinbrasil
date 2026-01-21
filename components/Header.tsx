
import React, { useRef } from 'react';

interface HeaderProps {
  wallpaper: string | null;
  onWallpaperChange: (url: string) => void;
  onRemoveWallpaper: () => void;
}

export const Header: React.FC<HeaderProps> = ({ wallpaper, onWallpaperChange, onRemoveWallpaper }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onWallpaperChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const headerStyle: React.CSSProperties = wallpaper ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${wallpaper})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <header 
      style={headerStyle}
      className={`text-white pt-10 pb-24 sm:pt-20 sm:pb-36 px-4 relative overflow-hidden transition-all duration-700 ${!wallpaper ? 'br-gradient' : ''}`}
    >
      <div className="pattern-overlay absolute inset-0 opacity-15"></div>
      
      {/* Botão de Customização Adaptativo */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-30 flex gap-2">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-black/20 hover:bg-black/40 backdrop-blur-lg text-white p-2 sm:px-4 sm:py-2.5 rounded-full sm:rounded-xl text-[10px] sm:text-xs font-black flex items-center gap-2 border border-white/20 transition-all shadow-2xl active:scale-90"
        >
          <span className="text-sm sm:text-base">🖼️</span>
          <span className="hidden md:inline uppercase tracking-widest">{wallpaper ? 'Trocar Fundo' : 'Personalizar'}</span>
        </button>
        {wallpaper && (
          <button 
            onClick={onRemoveWallpaper}
            className="bg-red-500/30 hover:bg-red-500/50 backdrop-blur-lg text-white p-2 sm:px-4 sm:py-2.5 rounded-full sm:rounded-xl border border-white/20 transition-all shadow-2xl active:scale-90"
          >
            <span className="text-sm sm:text-base">🗑️</span>
          </button>
        )}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/95 text-green-800 font-black px-4 py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-6 shadow-xl animate-bounce">
          <span>Festa de Aniversário</span>
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
        </div>
        
        <h1 className="text-[10vw] sm:text-6xl md:text-8xl font-black mb-1 drop-shadow-2xl leading-[0.9] tracking-tighter">
          MADE IN <span className="text-yellow-300">BRASIL</span>
        </h1>
        
        <p className="font-pacifico text-3xl sm:text-5xl md:text-6xl text-blue-50 mb-10 drop-shadow-lg transform -rotate-2">
          João & Maria
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
           <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 shadow-lg min-w-[180px]">
             <span className="text-xl sm:text-2xl">📅</span>
             <span className="text-sm sm:text-lg font-black tracking-tight">04 DE ABRIL, 2026</span>
           </div>
           <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 shadow-lg min-w-[180px]">
             <span className="text-xl sm:text-2xl">⏰</span>
             <span className="text-sm sm:text-lg font-black tracking-tight">INÍCIO ÀS 16H30</span>
           </div>
        </div>
      </div>
    </header>
  );
};
