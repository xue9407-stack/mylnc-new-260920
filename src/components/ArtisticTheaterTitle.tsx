import React from 'react';
import { Sparkles, Star } from 'lucide-react';

interface ArtisticTheaterTitleProps {
  title: string;
  className?: string;
}

export const ArtisticTheaterTitle: React.FC<ArtisticTheaterTitleProps> = ({ title, className = '' }) => {
  // Clean book brackets
  const cleanTitle = title.replace(/[《》]/g, '').trim();

  // Helper to split title into artistic 2 or 3 lines like poster art
  const getArtisticLines = (raw: string): string[] => {
    if (raw === '豪门书房的夜读演练') return ['豪门书房', '夜读演练'];
    if (raw === '重生后撩个校霸带回家') return ['重生后', '撩个校霸', '带回家'];
    if (raw === '游艇夜宴的星空拥吻') return ['游艇夜宴', '星空拥吻'];
    if (raw === '试衣间里的霸道宣示') return ['试衣间里', '霸道宣示'];
    if (raw === '雨夜车厢里的倾诉') return ['雨夜车厢', '倾诉'];
    if (raw === '天文台的夏夜看星') return ['天文台', '夏夜看星'];
    if (raw === '阳台小酌与心事倾诉') return ['阳台小酌', '心事倾诉'];
    if (raw === '私人陈列室的永恒锁扣') return ['私人陈列室', '永恒锁扣'];

    // Fallback auto split for custom titles
    if (raw.length <= 4) return [raw];
    if (raw.length <= 7) {
      const mid = Math.ceil(raw.length / 2);
      return [raw.slice(0, mid), raw.slice(mid)];
    }
    // 8+ chars -> 3 lines or balanced 2 lines
    if (raw.length <= 9) {
      const part1 = raw.slice(0, 4);
      const part2 = raw.slice(4);
      return [part1, part2];
    }
    const third = Math.ceil(raw.length / 3);
    return [raw.slice(0, third), raw.slice(third, third * 2), raw.slice(third * 2)];
  };

  const lines = getArtisticLines(cleanTitle);

  return (
    <div className={`relative flex flex-col items-center justify-center py-4 px-6 text-center select-none ${className}`}>
      
      {/* Background Ambient Glow Ribbon Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 z-0">
        <svg viewBox="0 0 300 160" className="w-full max-w-[320px] h-auto overflow-visible filter drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
          <defs>
            <linearGradient id="glowLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="65%" stopColor="rgba(244,208,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="swirlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,230,250,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
          
          {/* Elegant swirling art arcs wrapping around the title */}
          <path
            d="M 10,30 Q 150,-10 290,30 Q 200,80 150,80 Q 100,80 10,130 Q 150,170 290,130"
            fill="none"
            stroke="url(#glowLineGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 30,15 C 100,-5 200,20 270,10 C 290,35 250,60 150,65"
            fill="none"
            stroke="url(#swirlGrad)"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
        </svg>
      </div>

      {/* Decorative Sparkles Starbursts */}
      <div className="absolute -top-1 right-6 text-amber-100 animate-pulse pointer-events-none z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <Sparkles size={22} className="fill-white/80 text-purple-200" />
      </div>
      <div className="absolute bottom-2 left-6 text-pink-200 animate-pulse delay-500 pointer-events-none z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
        <Sparkles size={18} className="fill-white/90 text-amber-200" />
      </div>
      <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 text-white/60 pointer-events-none z-10">
        <Star size={12} className="fill-white text-white animate-spin" style={{ animationDuration: '8s' }} />
      </div>
      <div className="absolute top-1/3 -right-2 transform -translate-y-1/2 text-white/60 pointer-events-none z-10">
        <Star size={10} className="fill-white text-white animate-spin" style={{ animationDuration: '12s' }} />
      </div>

      {/* Main Multi-line Artistic Gradient Text */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-1 my-1">
        {lines.map((lineText, idx) => {
          // Dynamic scale & font styling based on line position and length
          const isSingle = lines.length === 1;
          const isMiddle = idx === 1 && lines.length === 3;
          
          return (
            <div
              key={idx}
              className={`font-serif font-black italic tracking-[0.12em] leading-none transition-all duration-300 transform hover:scale-105 ${
                isSingle ? 'text-4xl md:text-5xl' : 'text-3xl sm:text-4xl md:text-5xl'
              }`}
              style={{
                fontFamily: '"Georgia", "Noto Serif SC", "Songti SC", "STSong", "KaiTi", serif',
                letterSpacing: '0.15em',
                textShadow: `
                  0 0 1px rgba(255,255,255,0.9),
                  0 2px 4px rgba(0,0,0,0.9),
                  0 0 15px rgba(255,255,255,0.6),
                  0 0 30px rgba(216,180,254,0.4)
                `
              }}
            >
              <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]">
                {lineText}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Sparkle Glow Divider Line */}
      <div className="relative z-10 w-24 h-[1.5px] mt-3 bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
    </div>
  );
};
