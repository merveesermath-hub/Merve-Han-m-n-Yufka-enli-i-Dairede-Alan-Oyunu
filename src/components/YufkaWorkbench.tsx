import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../utils/sound';
import { Sparkles, MoveHorizontal, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';

interface YufkaWorkbenchProps {
  targetArea: number;
  targetRadius: number;
  onDeliverOrder: (currentRadius: number, currentArea: number) => void;
  isDelivering: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const YufkaWorkbench: React.FC<YufkaWorkbenchProps> = ({
  targetArea,
  targetRadius,
  onDeliverOrder,
  isDelivering,
}) => {
  // Current radius in cm (starts around 2 or 3 cm dough ball)
  const [radiusCm, setRadiusCm] = useState<number>(3);
  const [isDraggingRadius, setIsDraggingRadius] = useState<boolean>(false);
  const [flourParticles, setFlourParticles] = useState<Particle[]>([]);
  const [isRollingAnimation, setIsRollingAnimation] = useState<boolean>(false);
  const [isHoveringDropZone, setIsHoveringDropZone] = useState<boolean>(false);

  const workbenchRef = useRef<HTMLDivElement>(null);
  const doughRef = useRef<HTMLDivElement>(null);

  // Mathematical Area calculation: A = π * r² where π = 3
  const currentArea = 3 * radiusCm * radiusCm;
  const isMatch = radiusCm === targetRadius;

  // Visual scaling: 1 cm corresponds to 20 pixels on the table
  const pixelsPerCm = 19;
  const visualRadiusPx = radiusCm * pixelsPerCm;
  const visualDiameterPx = visualRadiusPx * 2;

  // Add flour particles effect
  const handleSprinkleFlour = useCallback(() => {
    sound.playFlour();
    const newParticles: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      newParticles.push({
        id: Math.random() + Date.now(),
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        size: 3 + Math.random() * 6,
        opacity: 0.8 + Math.random() * 0.2,
      });
    }
    setFlourParticles(newParticles);
    setTimeout(() => {
      setFlourParticles([]);
    }, 1200);
  }, []);

  // Animate rolling pin action
  const handleRollAction = useCallback(() => {
    sound.playRoll();
    setIsRollingAnimation(true);
    setTimeout(() => {
      setIsRollingAnimation(false);
    }, 800);
  }, []);

  // Update radius safely clamped between 1 and 12 cm
  const updateRadius = useCallback((newR: number) => {
    const clamped = Math.max(1, Math.min(12, Math.round(newR * 2) / 2));
    setRadiusCm(clamped);
    sound.playRoll();
  }, []);

  // Dragging interaction from center of workbench to calculate distance
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDraggingRadius(true);
    handlePointerMove(e);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!isDraggingRadius || !workbenchRef.current) return;
      const rect = workbenchRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distancePx = Math.sqrt(dx * dx + dy * dy);

      // Convert distance in px to radius in cm
      const calculatedCm = distancePx / pixelsPerCm;
      const roundedCm = Math.max(1, Math.min(12, Math.round(calculatedCm)));
      if (roundedCm !== radiusCm) {
        setRadiusCm(roundedCm);
        sound.playRoll();
      }
    },
    [isDraggingRadius, pixelsPerCm, radiusCm]
  );

  const handlePointerUp = useCallback(() => {
    setIsDraggingRadius(false);
  }, []);

  useEffect(() => {
    if (isDraggingRadius) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [isDraggingRadius, handlePointerMove, handlePointerUp]);

  // Reset dough ball to small size
  const handleResetDough = () => {
    setRadiusCm(2);
    sound.playRoll();
  };

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === '+') {
        updateRadius(radiusCm + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === '-') {
        updateRadius(radiusCm - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        handleSprinkleFlour();
      } else if (e.key === 'Enter') {
        onDeliverOrder(radiusCm, currentArea);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [radiusCm, updateRadius, handleSprinkleFlour, onDeliverOrder, currentArea]);

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-stretch w-full max-w-6xl mx-auto">
      {/* LEFT: Main Wooden Workbench (Yufka Tezgâhı) */}
      <div className="flex-1 flex flex-col bg-amber-900/60 p-3 sm:p-5 rounded-3xl border-4 border-amber-800/80 shadow-2xl backdrop-blur-xs">
        {/* Table Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪵</span>
            <div>
              <h2 className="font-fredoka text-lg md:text-xl font-bold text-amber-100 flex items-center gap-2">
                Merve Hanım'ın Unlu Tezgâhı
              </h2>
              <p className="text-xs text-amber-300/80">
                Oklavayı veya yufkayı sürükleyerek genişlet · Ölçüm cetveli tezgâha kazınmıştır
              </p>
            </div>
          </div>

          {/* Quick Action Tools: Flour & Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSprinkleFlour}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-white text-amber-950 font-semibold text-xs rounded-xl shadow transition-transform active:scale-95 cursor-pointer border border-amber-300"
              title="Tezgâha un serpiştir (Kısayol: F)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Un Serpiştir</span>
            </button>
            <button
              onClick={handleRollAction}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-amber-100 font-semibold text-xs rounded-xl shadow transition-transform active:scale-95 cursor-pointer border border-amber-500/40"
              title="Oklava ile aç"
            >
              <span>🥢 Oklavala</span>
            </button>
            <button
              onClick={handleResetDough}
              className="p-1.5 bg-amber-950/60 hover:bg-amber-950 text-amber-300 hover:text-white rounded-xl transition-colors cursor-pointer border border-amber-700/50"
              title="Hamuru baştan toparla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* WORKBENCH INTERACTIVE CANVAS / SURFACE */}
        <div
          ref={workbenchRef}
          onPointerDown={handlePointerDown}
          className="relative w-full aspect-square max-h-[460px] md:max-h-[500px] mx-auto rounded-full wood-texture border-8 border-amber-950 shadow-inner flex items-center justify-center overflow-hidden touch-none cursor-grab active:cursor-grabbing select-none"
        >
          {/* Wooden Grain & Concentric Radius Ruler Rings */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[2, 4, 6, 8, 10, 12].map((r) => {
              const ringDiameter = r * pixelsPerCm * 2;
              return (
                <div
                  key={r}
                  style={{ width: `${ringDiameter}px`, height: `${ringDiameter}px` }}
                  className="absolute rounded-full border border-amber-900/35 flex items-start justify-center"
                >
                  <span className="text-[10px] font-mono text-amber-950/60 font-semibold -mt-2.5 bg-amber-200/40 px-1 rounded">
                    r = {r} cm
                  </span>
                </div>
              );
            })}
            {/* Center Pin Indicator */}
            <div className="w-3 h-3 rounded-full bg-amber-950/60 border border-amber-300/60" />
          </div>

          {/* Flour Dust Particle Overlay */}
          {flourParticles.map((p) => (
            <div
              key={p.id}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
              }}
              className="absolute rounded-full bg-white shadow-sm pointer-events-none animate-puff"
            />
          ))}

          {/* THE REAL INTERACTIVE YUFKA DOUGH */}
          <div
            ref={doughRef}
            style={{
              width: `${visualDiameterPx}px`,
              height: `${visualDiameterPx}px`,
            }}
            className={`relative rounded-full transition-all duration-150 ease-out flex items-center justify-center select-none shadow-xl ${
              isDelivering
                ? 'scale-75 -translate-y-24 opacity-0 transition-all duration-500'
                : ''
            }`}
          >
            {/* Dough Organic Appearance (Thin flaky golden dough) */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-100 via-amber-200 to-amber-300/90 border-2 border-amber-400/80 shadow-md">
              {/* Subtle flour dusting spots */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7)_0%,transparent_50%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_65%,rgba(255,255,255,0.5)_0%,transparent_40%)]" />
            </div>

            {/* Radius Measurement Line & Dimension Label */}
            <div
              style={{ width: `${visualRadiusPx}px` }}
              className="absolute left-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-amber-900/90 pointer-events-none origin-left flex items-center justify-end"
            >
              {/* Center point */}
              <div className="w-2 h-2 rounded-full bg-amber-950 -ml-1" />
              
              {/* Radius Label Tag */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-950 text-amber-100 font-bold font-mono text-xs px-2 py-0.5 rounded-md shadow-md whitespace-nowrap border border-amber-400/50">
                r = {radiusCm} cm
              </div>

              {/* Edge marker arrow */}
              <div className="w-2.5 h-2.5 rotate-45 border-t-2 border-r-2 border-amber-900 -mr-1" />
            </div>

            {/* Drag Handle on the Edge */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 border-2 border-white shadow-lg flex items-center justify-center cursor-ew-resize group active:scale-110 transition-transform"
              title="Yufkayı buradan tutarak büyüt veya küçült"
            >
              <MoveHorizontal className="w-4 h-4 text-white group-hover:scale-110" />
            </div>

            {/* Target Ring Overlay: Shows ghost outline of desired size when close */}
            {Math.abs(radiusCm - targetRadius) <= 2 && !isMatch && (
              <div
                style={{
                  width: `${targetRadius * pixelsPerCm * 2}px`,
                  height: `${targetRadius * pixelsPerCm * 2}px`,
                }}
                className="absolute rounded-full border-2 border-dashed border-emerald-400/70 pointer-events-none animate-pulse"
              />
            )}
          </div>

          {/* WOODEN ROLLING PIN (OKLAVA) */}
          <div
            className={`absolute pointer-events-none select-none transition-transform duration-300 ${
              isRollingAnimation ? 'animate-roll' : ''
            }`}
            style={{ width: '90%', height: '18px' }}
          >
            <div className="relative w-full h-full rounded-full bg-linear-to-b from-amber-600 via-amber-800 to-amber-950 shadow-2xl border border-amber-700 flex items-center justify-between px-2">
              {/* Oklava Wood Handles */}
              <div className="w-6 h-5 -ml-4 rounded-l-md bg-amber-900 border-y border-l border-amber-700" />
              <div className="text-[9px] text-amber-200/50 font-mono tracking-widest uppercase">
                Geleneksel Gürgen Oklava
              </div>
              <div className="w-6 h-5 -mr-4 rounded-r-md bg-amber-900 border-y border-r border-amber-700" />
            </div>
          </div>

          {/* Overlay Helper Text */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-amber-950/80 text-amber-200 text-[11px] font-medium px-3 py-1 rounded-full pointer-events-none border border-amber-700/60">
            Tezgâhta sürükleyerek yufkayı istediğin yarıçapa getir
          </div>
        </div>

        {/* WORKBENCH BOTTOM CONTROL SLIDER & STEPPERS */}
        <div className="mt-4 p-3 bg-amber-950/60 rounded-2xl border border-amber-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-200 text-xs font-bold font-fredoka">
              Yarıçap Ayarı:
            </span>
            <button
              onClick={() => updateRadius(radiusCm - 1)}
              disabled={radiusCm <= 1}
              className="w-8 h-8 rounded-lg bg-amber-800 hover:bg-amber-700 disabled:opacity-40 text-amber-100 font-bold text-lg flex items-center justify-center cursor-pointer transition-colors"
            >
              -
            </button>
            <span className="font-mono font-bold text-base text-amber-100 w-12 text-center bg-amber-900/90 py-1 rounded-md border border-amber-700">
              {radiusCm} cm
            </span>
            <button
              onClick={() => updateRadius(radiusCm + 1)}
              disabled={radiusCm >= 12}
              className="w-8 h-8 rounded-lg bg-amber-800 hover:bg-amber-700 disabled:opacity-40 text-amber-100 font-bold text-lg flex items-center justify-center cursor-pointer transition-colors"
            >
              +
            </button>
          </div>

          {/* Quick Slider */}
          <div className="flex-1 min-w-[140px] flex items-center gap-2">
            <span className="text-[11px] text-amber-400 font-mono">1</span>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={radiusCm}
              onChange={(e) => updateRadius(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-amber-950 rounded-lg"
            />
            <span className="text-[11px] text-amber-400 font-mono">12 cm</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Mathematical Live Calculation & Delivery Tray Panel */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        {/* Math Calculation Card */}
        <div className="bg-stone-900/90 border-2 border-amber-600/60 rounded-3xl p-5 shadow-xl text-stone-100 flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2">
            <span className="font-fredoka text-amber-400 font-bold text-sm tracking-wide flex items-center gap-1.5">
              📐 Matematik Formülü
            </span>
            <span className="font-mono text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              π = 3
            </span>
          </div>

          {/* Formula Breakdown */}
          <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800 font-mono text-sm space-y-1.5">
            <div className="text-amber-300 font-semibold text-center text-base pb-1 border-b border-stone-800">
              Alan (A) = π · r²
            </div>
            <div className="flex items-center justify-between text-xs text-stone-300">
              <span>π sayısı:</span>
              <span className="font-bold text-amber-400">3</span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-300">
              <span>Yufka yarıçapı (r):</span>
              <span className="font-bold text-amber-400">{radiusCm} cm</span>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-300">
              <span>Yarıçapın karesi (r²):</span>
              <span className="font-bold text-amber-400">
                {radiusCm} × {radiusCm} = {radiusCm * radiusCm}
              </span>
            </div>

            {/* Current Result */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
              <span className="font-semibold text-stone-300 text-xs">Mevcut Alan (A):</span>
              <div className="text-right">
                <span className="font-bold text-lg text-amber-200">
                  3 × {radiusCm * radiusCm} = {currentArea} cm²
                </span>
              </div>
            </div>
          </div>

          {/* Target comparison */}
          <div
            className={`p-3 rounded-2xl border transition-all ${
              isMatch
                ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                : currentArea < targetArea
                ? 'bg-amber-950/50 border-amber-600/50 text-amber-200'
                : 'bg-rose-950/50 border-rose-600/50 text-rose-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1 font-semibold">
              <span>Hedef Sipariş Alanı:</span>
              <span className="text-sm font-bold font-mono">{targetArea} cm²</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Açılan Yufka Alanı:</span>
              <span className="text-sm font-bold font-mono">{currentArea} cm²</span>
            </div>

            <div className="mt-2 text-xs font-medium pt-2 border-t border-white/10 flex items-center gap-1.5">
              {isMatch ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kusursuz! Yufka tam istenen ölçüde. Sepete taşıyabilirsin!</span>
                </>
              ) : currentArea < targetArea ? (
                <>
                  <span className="text-amber-400 font-bold">⚠️</span>
                  <span>Bu yufka biraz küçük kaldı. Oklavayla biraz daha açalım.</span>
                </>
              ) : (
                <>
                  <span className="text-rose-400 font-bold">⚠️</span>
                  <span>Bu yufka masaya sığmaz, fazla büyük oldu. Biraz küçültelim.</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FESTIVAL DELIVERY TRAY / DROP ZONE */}
        <div
          onPointerEnter={() => setIsHoveringDropZone(true)}
          onPointerLeave={() => setIsHoveringDropZone(false)}
          className={`flex-1 min-h-[170px] rounded-3xl border-3 border-dashed p-4 flex flex-col items-center justify-center text-center transition-all ${
            isHoveringDropZone || isMatch
              ? 'bg-emerald-900/40 border-emerald-400 shadow-lg scale-102'
              : 'bg-stone-900/60 border-stone-700 hover:border-amber-500'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl mb-2">
            🧺
          </div>
          <h3 className="font-fredoka text-amber-100 font-bold text-base mb-1">
            Şenlik Sipariş Tepsisi
          </h3>
          <p className="text-xs text-stone-300 mb-3 max-w-xs">
            Yufkayı hazır hissettiğinde siparişi şenlik masasına teslim et
          </p>

          {/* Delivery Button */}
          <button
            onClick={() => onDeliverOrder(radiusCm, currentArea)}
            disabled={isDelivering}
            className={`w-full py-3 px-5 rounded-2xl font-fredoka font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-98 ${
              isMatch
                ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-900/50 animate-pulse'
                : 'bg-amber-600 hover:bg-amber-500 text-amber-50 shadow-amber-950/60'
            }`}
          >
            <span>Yufkayı Masaya Taşı & Teslim Et</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
