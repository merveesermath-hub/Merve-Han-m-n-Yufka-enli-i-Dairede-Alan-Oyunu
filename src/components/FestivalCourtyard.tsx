import React from 'react';
import { FestivalOrder } from '../types/game';
import { CheckCircle2, Utensils } from 'lucide-react';

interface FestivalCourtyardProps {
  orders: FestivalOrder[];
  completedOrderIds: number[];
  currentOrderIndex: number;
  onSelectOrder?: (index: number) => void;
}

export const FestivalCourtyard: React.FC<FestivalCourtyardProps> = ({
  orders,
  completedOrderIds,
  currentOrderIndex,
  onSelectOrder,
}) => {
  const completedCount = completedOrderIds.length;
  const progressPercent = Math.round((completedCount / orders.length) * 100);

  return (
    <div className="bg-stone-900/90 border-2 border-amber-800/80 rounded-3xl p-4 md:p-6 shadow-2xl backdrop-blur-xs">
      {/* Header with Festival Bunting & Semaver */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎪</span>
            <h2 className="font-fredoka text-lg md:text-xl font-bold text-amber-200">
              Köy Şenliği Meydanı
            </h2>
          </div>
          <p className="text-xs text-stone-400">
            Hazırladığın her yufka köy meydanındaki bir masayı ziyafete dönüştürür
          </p>
        </div>

        {/* Festival Progress Indicator */}
        <div className="flex items-center gap-3 bg-stone-950/70 px-3.5 py-2 rounded-2xl border border-stone-800">
          <div className="text-right">
            <div className="text-[11px] uppercase font-bold text-amber-400 font-mono">
              Şenlik Hazırlığı
            </div>
            <div className="text-xs font-semibold text-stone-200 font-mono">
              {completedCount} / {orders.length} Masa Donatıldı
            </div>
          </div>
          <div className="w-20 bg-stone-800 h-2.5 rounded-full overflow-hidden border border-stone-700">
            <div
              style={{ width: `${progressPercent}%` }}
              className="h-full bg-linear-to-r from-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Decorative Traditional Bunting Flags */}
      <div className="flex justify-between items-center mb-4 px-2 opacity-85 pointer-events-none select-none">
        {['🔴', '🟡', '🟢', '🔵', '🟠', '🟣', '🟤', '🔴'].map((flag, idx) => (
          <span key={idx} className="text-sm transform hover:scale-125 transition-transform">
            {flag}
          </span>
        ))}
      </div>

      {/* Grid of Festival Tables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {orders.map((order, idx) => {
          const isCompleted = completedOrderIds.includes(order.id);
          const isCurrent = idx === currentOrderIndex;

          return (
            <div
              key={order.id}
              onClick={() => onSelectOrder && onSelectOrder(idx)}
              className={`relative rounded-2xl p-3.5 border-2 transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-400/40 shadow-lg scale-102'
                  : isCompleted
                  ? 'bg-emerald-950/40 border-emerald-600/70 shadow-sm'
                  : 'bg-stone-950/50 border-stone-800 opacity-70 hover:opacity-100 hover:border-stone-700'
              }`}
            >
              {/* Status Header */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xl">{order.tableIcon}</span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-300">
                  {order.targetArea} cm²
                </span>
              </div>

              {/* Table Name */}
              <h3 className="font-fredoka text-sm font-bold text-stone-100 truncate mb-1">
                {order.tableName}
              </h3>

              {/* Dish Name */}
              <p className="text-[11px] text-stone-400 truncate mb-3 flex items-center gap-1">
                <Utensils className="w-3 h-3 text-amber-500" />
                <span>{order.dishName}</span>
              </p>

              {/* Status Footer */}
              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                {isCompleted ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Donatıldı! (r={order.targetRadius}cm)
                  </span>
                ) : isCurrent ? (
                  <span className="text-amber-300 font-bold flex items-center gap-1 animate-pulse font-mono">
                    ● Açılıyor...
                  </span>
                ) : (
                  <span className="text-stone-500 font-mono">
                    Bekliyor (r=?)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
