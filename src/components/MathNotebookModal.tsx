import React, { useState } from 'react';
import { X, BookOpen, Calculator, Check, ArrowRight } from 'lucide-react';

interface MathNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MathNotebookModal: React.FC<MathNotebookModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [testRadius, setTestRadius] = useState<number>(5);

  if (!isOpen) return null;

  const testArea = 3 * testRadius * testRadius;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#fffdf5] text-stone-900 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-amber-800 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          title="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Notebook Title Lockup */}
        <div className="flex items-center gap-3 border-b-2 border-dashed border-amber-300 pb-4 mb-5">
          <div className="p-3 bg-amber-100 rounded-2xl border border-amber-300 text-amber-900">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-fredoka text-xl md:text-2xl font-bold text-amber-950">
              Merve Hanım'ın Yufka Hesap Defteri
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-medium">
              7. Sınıf Matematik · Dairenin Alanı Konu Özeti & Kolay İpuçları
            </p>
          </div>
        </div>

        {/* Core Formula Box */}
        <div className="bg-amber-100/70 border-2 border-amber-400/80 rounded-2xl p-4 mb-6 shadow-xs">
          <div className="text-center">
            <div className="text-xs uppercase font-bold text-amber-800 tracking-wider mb-1 font-mono">
              Temel Daire Alan Formülü
            </div>
            <div className="font-fredoka text-2xl md:text-3xl text-amber-950 font-bold tracking-wide">
              Alan = π · r²
            </div>
            <div className="inline-block mt-2 bg-amber-200 text-amber-900 font-semibold text-xs px-3 py-1 rounded-full border border-amber-400">
              Şenliğimizde π sayısı daima <span className="font-bold font-mono">3</span> olarak kabul edilir!
            </div>
          </div>
        </div>

        {/* Step-by-Step Problem Solving Guide */}
        <div className="space-y-4 mb-6 text-sm">
          <h3 className="font-fredoka text-base font-bold text-amber-900 flex items-center gap-2">
            <span>💡</span>
            <span>Siparişte Alan Verildiğinde Yarıçapı (r) Nasıl Buluruz?</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1 */}
            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center mb-2 font-mono">
                1
              </div>
              <h4 className="font-bold text-stone-900 mb-1 text-xs">Alanı 3'e Böl</h4>
              <p className="text-stone-600 text-xs">
                π = 3 olduğu için:
                <br />
                <span className="font-mono font-bold text-amber-800">r² = Alan ÷ 3</span>
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center mb-2 font-mono">
                2
              </div>
              <h4 className="font-bold text-stone-900 mb-1 text-xs">Karekökünü Düşün</h4>
              <p className="text-stone-600 text-xs">
                Hangi sayıyı kendisiyle çarparsan bu sonucu elde edersin?
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs">
              <div className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center mb-2 font-mono">
                3
              </div>
              <h4 className="font-bold text-stone-900 mb-1 text-xs">Oklavayla Aç</h4>
              <p className="text-stone-600 text-xs">
                Bulduğun yarıçapa (r) kadar yufkayı tezgâhta genişlet!
              </p>
            </div>
          </div>

          {/* Example Breakdown */}
          <div className="bg-stone-100 p-4 rounded-2xl border border-stone-300 font-mono text-xs space-y-1.5">
            <div className="font-bold text-stone-900 text-sm mb-1 font-sans flex items-center gap-1.5">
              <span>📌</span> Örnek İnceleme: Alan = 75 cm²
            </div>
            <div className="text-stone-700">1. Adım: 75 ÷ 3 = 25 (Demek ki r² = 25)</div>
            <div className="text-stone-700">2. Adım: Hangi sayının karesi 25'tir? 5 × 5 = 25</div>
            <div className="font-bold text-emerald-700">3. Sonuç: Yarıçap (r) = 5 cm olmalıdır!</div>
          </div>
        </div>

        {/* Interactive Practice Calculator */}
        <div className="bg-amber-50/80 p-4 rounded-2xl border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-amber-700" />
            <h4 className="font-fredoka text-sm font-bold text-amber-950">
              İnteraktif Deneme Hesaplayıcısı
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <label htmlFor="radiusRange" className="font-semibold text-stone-700">
                Yarıçapı dene (r):
              </label>
              <input
                id="radiusRange"
                type="range"
                min="1"
                max="12"
                value={testRadius}
                onChange={(e) => setTestRadius(Number(e.target.value))}
                className="w-28 accent-amber-600"
              />
              <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-stone-300">
                {testRadius} cm
              </span>
            </div>

            <div className="flex items-center gap-2 text-stone-800">
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span>Hesaplanan Alan:</span>
              <span className="font-mono font-bold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded border border-amber-300">
                3 × {testRadius}² = {testArea} cm²
              </span>
            </div>
          </div>
        </div>

        {/* Footer OK button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-fredoka font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Anladım, Tezgâha Dön!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
