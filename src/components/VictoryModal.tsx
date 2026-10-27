import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Sparkles, CheckCircle2, Shuffle } from 'lucide-react';
import { sound } from '../utils/sound';

interface VictoryModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onStartEndless: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onRestart,
  onStartEndless,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playFanfare();
      // Launch celebratory festive confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#fef08a'],
      });
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-linear-to-b from-[#fffdf5] to-[#fef3c7] text-stone-900 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-amber-600 text-center max-h-[90vh] overflow-y-auto">
        {/* Certificate Emblem */}
        <div className="inline-flex p-4 rounded-full bg-amber-500/20 border-2 border-amber-400 mb-3 text-amber-700 animate-bounce">
          <Award className="w-12 h-12" />
        </div>

        <div className="text-xs uppercase font-bold tracking-widest text-amber-800 font-mono mb-1">
          7. Sınıf Geometri Başarı Belgesi
        </div>

        <h2 className="font-fredoka text-2xl md:text-3xl font-extrabold text-amber-950 mb-2">
          Şenliğin Baş Yufkacısı İlan Edildin!
        </h2>

        <p className="text-sm text-stone-700 font-medium mb-6 max-w-md mx-auto leading-relaxed">
          Tebrikler! Merve Hanım ile birlikte köy meydanındaki bütün masaların yufkalarını <span className="font-bold text-amber-900 font-mono">A = π · r²</span> bağıntısını kullanarak tam ölçüsünde açtın. Şenlik ziyafeti başladı!
        </p>

        {/* Certificate Summary Card */}
        <div className="bg-white/80 p-4 rounded-2xl border-2 border-dashed border-amber-300 mb-6 text-left space-y-2 text-xs md:text-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
            <span className="text-stone-600">Tamamlanan Şenlik Masaları:</span>
            <span className="font-bold font-mono text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> 8 / 8 Masa
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
            <span className="text-stone-600">Kullanılan Sabit Değer:</span>
            <span className="font-bold font-mono text-amber-900">π = 3</span>
          </div>
          <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
            <span className="text-stone-600">Kazanılan Beceriler:</span>
            <span className="font-semibold text-stone-900">Daire Alanı & Yarıçap Hesaplama</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-stone-600">Merve Hanım'ın Notu:</span>
            <span className="font-bold text-amber-800 italic">“Ellerine sağlık, sen harika bir matematik ustasısın!”</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-fredoka font-bold text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Şenliği Yeniden Oyna</span>
          </button>

          <button
            onClick={onStartEndless}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-fredoka font-bold text-sm shadow-lg transition-transform active:scale-95 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Sonsuz Serbest Atölye Modu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
