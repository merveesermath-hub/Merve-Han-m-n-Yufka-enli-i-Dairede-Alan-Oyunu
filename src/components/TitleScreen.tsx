import React, { useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Play } from 'lucide-react';
import { sound } from '../utils/sound';

interface TitleScreenProps {
  onStartGame: () => void;
  onOpenNotebook: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStartGame,
  onOpenNotebook,
  isMuted,
  onToggleMute,
}) => {
  // Listen for Enter or Space to start game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        sound.playFanfare();
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden bg-amber-950 text-stone-100 select-none">
      {/* BACKGROUND ATMOSPHERE: Traditional Workshop Kitchen */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
        {/* Soft warmth glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-600/30 rounded-full blur-3xl" />
      </div>

      {/* TOP BAR: Badge & Sound Mute Toggle */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase bg-amber-900/80 border border-amber-700/80 text-amber-300 px-3 py-1 rounded-full shadow-sm">
            7. Sınıf Matematik · Dairenin Alanı (π = 3)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNotebook}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-900/80 hover:bg-amber-800 text-amber-200 text-xs font-semibold border border-amber-700 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Hesap Defteri</span>
          </button>
          <button
            onClick={onToggleMute}
            className="p-2 rounded-full bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700 transition-colors cursor-pointer"
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* CENTERPIECE: Workshop Visual Scene & Title Lockup */}
      <main className="relative z-10 flex flex-col items-center text-center my-auto max-w-4xl w-full">
        {/* Bespoke Turkish Folk Title Lockup */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/70 border border-amber-500/50 text-amber-300 text-xs md:text-sm font-medium mb-3 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Geleneksel Anadolu Lezzet & Geometri Şöleni</span>
          </div>
          
          <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
            Merve Hanım'ın <br />
            <span className="text-amber-400 bg-linear-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Yufka Şenliği
            </span>
          </h1>
          <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Köy meydanındaki masalar çıtır çıtır yufkalar bekliyor! Daire alan bağıntısını (<span className="text-amber-400 font-bold font-mono">A = π · r²</span>) kullanarak doğru yarıçapta yufkaları aç ve şenliği başlat!
          </p>
        </div>

        {/* WORKSHOP ILLUSTRATION SCENE (Merve Hanım, Oklava, Un Çuvalı, Sipariş Panosu) */}
        <div className="relative w-full max-w-2xl bg-amber-900/40 border-2 border-amber-700/60 rounded-3xl p-4 md:p-6 shadow-2xl backdrop-blur-xs mb-8 flex flex-col md:flex-row items-center justify-around gap-6">
          {/* Workshop Character: Merve Hanım */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Merve Hanım Figure */}
              <svg viewBox="0 0 160 160" className="w-28 h-28 md:w-32 md:h-32 drop-shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <circle cx="80" cy="80" r="74" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" />
                <path d="M 32 145 C 32 115 50 102 80 102 C 110 102 128 115 128 145 Z" fill="#be123c" />
                <path d="M 52 108 L 108 108 L 118 155 L 42 155 Z" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
                <path d="M 35 68 C 35 32 50 18 80 18 C 110 18 125 32 125 68 C 125 90 114 98 80 98 C 46 98 35 90 35 68 Z" fill="#dc2626" />
                <path d="M 40 65 Q 50 72 60 65 Q 70 72 80 65 Q 90 72 100 65 Q 110 72 120 65" stroke="#fef08a" strokeWidth="3" fill="none" />
                <ellipse cx="80" cy="62" rx="30" ry="28" fill="#fde68a" />
                <ellipse cx="60" cy="70" rx="6" ry="4" fill="#fda4af" opacity="0.8" />
                <ellipse cx="100" cy="70" rx="6" ry="4" fill="#fda4af" opacity="0.8" />
                <ellipse cx="70" cy="56" rx="4" ry="5" fill="#451a03" />
                <circle cx="68.5" cy="54" r="1.5" fill="#ffffff" />
                <ellipse cx="90" cy="56" rx="4" ry="5" fill="#451a03" />
                <circle cx="88.5" cy="54" r="1.5" fill="#ffffff" />
                <path d="M 70 73 Q 80 83 90 73" stroke="#7f1d1d" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
              {/* Rolling pin in hand */}
              <div className="absolute -right-2 top-10 transform rotate-12 bg-amber-700 border border-amber-900 text-[10px] text-amber-100 font-mono px-2 py-0.5 rounded shadow">
                🥢 Oklava
              </div>
            </div>
            <span className="font-fredoka text-amber-200 font-bold text-sm mt-1">Merve Usta</span>
          </div>

          {/* Flour Sack & Fresh Rolled Dough */}
          <div className="flex items-center gap-4">
            {/* Flour sack */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-20 bg-stone-100 border-2 border-amber-300 rounded-t-xl rounded-b-lg shadow-lg relative flex flex-col items-center justify-center p-2 text-stone-800">
                <span className="text-[10px] font-bold font-mono text-red-700 border-b border-red-300">
                  HALİS UN
                </span>
                <span className="text-xl">🌾</span>
                <span className="text-[9px] font-mono text-stone-500">50 KG</span>
              </div>
              <span className="text-xs text-amber-200 font-medium mt-1">Un Çuvalı</span>
            </div>

            {/* Pastry dough stack */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full wood-texture border-4 border-amber-950 flex items-center justify-center shadow-md">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-100 to-amber-300 border border-amber-400 flex items-center justify-center text-xs font-mono font-bold text-amber-950 shadow-inner">
                  r = 5 cm
                </div>
              </div>
              <span className="text-xs text-amber-200 font-medium mt-1">Açılan Yufka</span>
            </div>
          </div>

          {/* Festival Order Board */}
          <div className="bg-amber-950/90 border border-amber-500/60 rounded-2xl p-3 shadow-lg max-w-[200px] text-left">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold font-fredoka border-b border-amber-800 pb-1 mb-1.5">
              <span>📋</span>
              <span>Şenlik Panosu</span>
            </div>
            <ul className="text-[11px] text-stone-300 space-y-1 font-mono">
              <li className="flex items-center justify-between">
                <span>1. Masa:</span>
                <span className="text-amber-300 font-bold">75 cm²</span>
              </li>
              <li className="flex items-center justify-between">
                <span>2. Masa:</span>
                <span className="text-amber-300 font-bold">108 cm²</span>
              </li>
              <li className="flex items-center justify-between">
                <span>3. Masa:</span>
                <span className="text-amber-300 font-bold">192 cm²</span>
              </li>
            </ul>
          </div>
        </div>

        {/* PROMINENT START BUTTON */}
        <button
          onClick={() => {
            sound.playFanfare();
            onStartGame();
          }}
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-amber-950 font-fredoka text-2xl md:text-3xl font-extrabold shadow-2xl hover:shadow-amber-500/50 transition-all duration-200 transform hover:scale-105 active:scale-98 cursor-pointer border-2 border-amber-200"
        >
          <Play className="w-7 h-7 fill-amber-950 group-hover:translate-x-1 transition-transform" />
          <span>ŞENLİĞE BAŞLA</span>
        </button>

        <p className="mt-4 text-xs text-stone-400 font-mono">
          Başlamak için butona tıkla veya klavyeden <kbd className="px-2 py-0.5 bg-amber-900 border border-amber-700 rounded text-amber-200">Space</kbd> / <kbd className="px-2 py-0.5 bg-amber-900 border border-amber-700 rounded text-amber-200">Enter</kbd> tuşuna bas
        </p>
      </main>

      {/* FOOTER: Flat Control-Hint Line */}
      <footer className="relative z-10 w-full text-center py-2 text-stone-400 text-xs font-mono border-t border-amber-900/60 mt-4">
        Sürükle Boyutlandır · Enter Siparişi Teslim Et · F Un Serpiştir · M Ses
      </footer>
    </div>
  );
};
