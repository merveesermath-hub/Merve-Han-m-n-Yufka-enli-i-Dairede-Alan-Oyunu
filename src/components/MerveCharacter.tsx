import React from 'react';

interface MerveCharacterProps {
  dialogue: string;
  mood?: 'happy' | 'thinking' | 'celebrating';
  compact?: boolean;
}

export const MerveCharacter: React.FC<MerveCharacterProps> = ({
  dialogue,
  mood = 'happy',
  compact = false,
}) => {
  return (
    <div className={`flex items-start gap-4 ${compact ? 'flex-col sm:flex-row' : 'flex-col md:flex-row'} items-center`}>
      {/* Merve Hanım SVG Avatar */}
      <div className="relative shrink-0 select-none">
        <svg
          viewBox="0 0 160 160"
          className="w-24 h-24 md:w-28 md:h-28 drop-shadow-lg transition-transform duration-300 hover:scale-105"
        >
          {/* Background Glow */}
          <circle cx="80" cy="80" r="74" fill="#fef3c7" stroke="#f59e0b" strokeWidth="4" />

          {/* Shoulders / Dress with floral traditional pattern */}
          <path
            d="M 32 145 C 32 115 50 102 80 102 C 110 102 128 115 128 145 Z"
            fill="#be123c"
          />
          {/* White Chef Apron with flour smudges */}
          <path
            d="M 52 108 L 108 108 L 118 155 L 42 155 Z"
            fill="#fffbeb"
            stroke="#fde68a"
            strokeWidth="1.5"
          />
          {/* Apron Pocket */}
          <path
            d="M 62 124 L 98 124 C 98 142 62 142 62 124 Z"
            fill="#fef3c7"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          {/* Tiny rolling pin in pocket */}
          <rect x="76" y="112" width="8" height="20" rx="3" fill="#b45309" transform="rotate(15 76 112)" />

          {/* Traditional Headscarf (Yazma / Eşarp) with red flowers */}
          <path
            d="M 35 68 C 35 32 50 18 80 18 C 110 18 125 32 125 68 C 125 90 114 98 80 98 C 46 98 35 90 35 68 Z"
            fill="#dc2626"
          />
          {/* Scarf edge lace (oya) */}
          <path
            d="M 40 65 Q 50 72 60 65 Q 70 72 80 65 Q 90 72 100 65 Q 110 72 120 65"
            stroke="#fef08a"
            strokeWidth="3"
            fill="none"
          />

          {/* Face */}
          <ellipse cx="80" cy="62" rx="30" ry="28" fill="#fde68a" />
          
          {/* Cheerful Rosy Cheeks */}
          <ellipse cx="60" cy="70" rx="6" ry="4" fill="#fda4af" opacity="0.75" />
          <ellipse cx="100" cy="70" rx="6" ry="4" fill="#fda4af" opacity="0.75" />

          {/* Flour smudges on cheek */}
          <circle cx="58" cy="66" r="2.5" fill="#ffffff" opacity="0.9" />
          <circle cx="62" cy="68" r="1.5" fill="#ffffff" opacity="0.9" />

          {/* Eyes */}
          {mood === 'celebrating' ? (
            // Happy closed crescent eyes
            <>
              <path d="M 64 56 Q 70 50 76 56" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 84 56 Q 90 50 96 56" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Wide bright friendly eyes
            <>
              <ellipse cx="70" cy="56" rx="4" ry="5" fill="#451a03" />
              <circle cx="68.5" cy="54" r="1.5" fill="#ffffff" />
              <ellipse cx="90" cy="56" rx="4" ry="5" fill="#451a03" />
              <circle cx="88.5" cy="54" r="1.5" fill="#ffffff" />
            </>
          )}

          {/* Eyebrows */}
          <path d="M 63 48 Q 70 45 77 48" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 83 48 Q 90 45 97 48" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Nose */}
          <path d="M 78 62 Q 80 66 83 64" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Warm Smile */}
          <path
            d="M 70 73 Q 80 83 90 73"
            stroke="#7f1d1d"
            strokeWidth="3"
            strokeLinecap="round"
            fill={mood === 'celebrating' ? '#be123c' : 'none'}
          />

          {/* Rolling Pin in Hand (Oklava) */}
          <g transform="translate(116, 80) rotate(-28)">
            <rect x="0" y="0" width="12" height="60" rx="5" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
            <rect x="3" y="4" width="6" height="52" rx="2" fill="#d97706" />
          </g>
        </svg>

        {/* Status Badge */}
        <div className="absolute -bottom-1 -right-1 bg-amber-600 text-white font-fredoka text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm border border-amber-300">
          Merve Usta
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="relative flex-1 bg-amber-50/95 border-2 border-amber-300/80 rounded-2xl p-4 shadow-md text-stone-800 text-sm md:text-base leading-relaxed">
        {/* Triangle pointer */}
        <div className="hidden md:block absolute -left-2.5 top-6 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-amber-300 border-b-8 border-b-transparent" />
        <div className="hidden md:block absolute -left-2 top-6 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-amber-50 border-b-8 border-b-transparent" />

        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-fredoka text-amber-900 font-bold tracking-wide flex items-center gap-1.5 text-xs uppercase">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Merve Hanım Diyor ki:
          </span>
          <span className="text-xs font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
            π = 3
          </span>
        </div>
        <p className="font-medium text-stone-800 italic">
          {dialogue}
        </p>
      </div>
    </div>
  );
};
