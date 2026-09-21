import React from 'react';
import { ArrowLeft, Trash2, Play } from 'lucide-react';
import { MiniTheaterItem } from '../types';
import { DEFAULT_THEATERS } from '../data/storyTheaterPresetData';

interface FavoritesViewProps {
  theaterFavorites: Record<string, boolean>;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onPlayTheater: (theater: MiniTheaterItem) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  theaterFavorites,
  onBack,
  onToggleFavorite,
  onPlayTheater,
}) => {
  // Flatten all theaters from DEFAULT_THEATERS and filter by favorites
  const favoritedTheaters = React.useMemo(() => {
    const allTheaters: MiniTheaterItem[] = [];
    Object.values(DEFAULT_THEATERS).forEach(list => {
      allTheaters.push(...list);
    });
    return allTheaters.filter(th => theaterFavorites[th.id]);
  }, [theaterFavorites]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c] text-white">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-white/5">
        <button onClick={onBack} className="p-1 hover:bg-white/5 rounded-full transition">
          <ArrowLeft size={20} />
        </button>
        <h2 className="ml-3 text-base font-bold">我的收藏</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {favoritedTheaters.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-40">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Play size={24} />
            </div>
            <p className="text-sm">暂无收藏剧场</p>
            <p className="text-xs mt-1">快去剧场大厅探索喜欢的剧场吧</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {favoritedTheaters.map((th) => (
              <div 
                key={th.id}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex p-3 gap-3">
                  {/* Preview Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img 
                      src={th.bgImage} 
                      alt={th.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <button 
                      onClick={() => onPlayTheater(th)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                        <Play size={18} fill="currentColor" />
                      </div>
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{th.title}</h3>
                      <p className="text-xs text-white/40 mt-1 line-clamp-2 leading-relaxed">
                        {th.desc}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-purple-400 font-bold px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                          {th.wordCount}字
                        </span>
                        <span className="text-[10px] text-white/30">
                          互动剧场
                        </span>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(th.id);
                        }}
                        className="p-1.5 text-white/30 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
