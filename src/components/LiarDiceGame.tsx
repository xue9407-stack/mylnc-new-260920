import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, User, Timer, Trophy, RotateCcw, Play, ChevronRight, AlertCircle, Sparkles, Users } from 'lucide-react';
import { Role } from '../types';

interface LiarDiceGameProps {
  isOpen: boolean;
  roles: Role[];
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

type GameState = 'idle' | 'rolling' | 'playing' | 'revealed' | 'result' | 'picking';

export const LiarDiceGame: React.FC<LiarDiceGameProps> = ({ isOpen, roles, onClose, onShowToast }) => {
  const [gameState, setGameState] = useState<GameState>('picking');
  const [opponent, setOpponent] = useState<Role | null>(null);
  const [userDice, setUserDice] = useState<number[]>([1, 1, 1, 1, 1]);
  const [aiDice, setAiDice] = useState<number[]>([1, 1, 1, 1, 1]);
  const [currentBid, setCurrentBid] = useState<{ quantity: number; face: number } | null>(null);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [timer, setTimer] = useState(15);
  const [lastAction, setLastAction] = useState<string>('');
  const [winner, setWinner] = useState<'user' | 'ai' | null>(null);
  const [punishment, setPunishment] = useState<string>('');

  const punishments = [
    '给对方发一张自拍',
    '对对方说一句“我爱你”',
    '发一个飞吻表情',
    '答应对方一个无伤大雅的要求',
    '把对方的备注改成“亲爱的”',
    '发一条语音夸夸对方',
  ];

  // Reset game when picking new opponent
  const handlePickOpponent = (role: Role) => {
    setOpponent(role);
    setGameState('idle');
    setLastAction(`已选择对手 ${role.name}，准备开战！`);
  };

  // Initialize Game
  const startGame = () => {
    setGameState('rolling');
    setTimeout(() => {
      const newDice = () => Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
      setUserDice(newDice());
      setAiDice(newDice());
      setGameState('playing');
      setCurrentBid(null);
      setIsUserTurn(true);
      setTimer(15);
      setLastAction('游戏开始，请你先叫点！');
    }, 1500);
  };

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && gameState === 'playing') {
      if (isUserTurn) {
        handleOpen(); // Auto open if timeout
      } else {
        // AI turn should be handled by logic
      }
    }
    return () => clearInterval(interval);
  }, [gameState, timer, isUserTurn]);

  // AI Logic
  useEffect(() => {
    if (gameState === 'playing' && !isUserTurn) {
      const aiActionTimeout = setTimeout(() => {
        handleAiTurn();
      }, 2000);
      return () => clearTimeout(aiActionTimeout);
    }
  }, [gameState, isUserTurn]);

  const handleAiTurn = () => {
    if (!currentBid) {
      // First bid
      const face = aiDice[Math.floor(Math.random() * 5)];
      const quantity = Math.floor(Math.random() * 2) + 2; // Start with 2 or 3
      setCurrentBid({ quantity, face });
      setLastAction(`他叫了: ${quantity}个${face}`);
      setIsUserTurn(true);
      setTimer(15);
    } else {
      // Analyze current bid
      const { quantity, face } = currentBid;
      const totalPossible = aiDice.filter(d => d === face || d === 1).length + 2; // AI estimate
      
      if (quantity > totalPossible + 2 || (quantity >= 7 && Math.random() > 0.3)) {
        // Challenge
        handleOpen();
      } else {
        // Raise
        let newQuantity = quantity;
        let newFace = face;
        
        if (Math.random() > 0.7 && face < 6) {
          newFace = face + 1;
        } else {
          newQuantity = quantity + 1;
        }
        
        setCurrentBid({ quantity: newQuantity, face: newFace });
        setLastAction(`他叫了: ${newQuantity}个${newFace}`);
        setIsUserTurn(true);
        setTimer(15);
      }
    }
  };

  const handleRaise = () => {
    if (!currentBid) {
      setCurrentBid({ quantity: 2, face: 2 });
      setLastAction('你叫了: 2个2');
    } else {
      const { quantity, face } = currentBid;
      if (face < 6) {
        setCurrentBid({ quantity, face: face + 1 });
        setLastAction(`你升到了: ${quantity}个${face + 1}`);
      } else {
        setCurrentBid({ quantity: quantity + 1, face: 2 });
        setLastAction(`你加到了: ${quantity + 1}个2`);
      }
    }
    setIsUserTurn(false);
  };

  const handleOpen = () => {
    if (!currentBid) return;
    setGameState('revealed');
    const { quantity, face } = currentBid;
    
    // Count total (1 is wild card if not bid)
    const countTotal = (dice: number[]) => dice.filter(d => d === face || (face !== 1 && d === 1)).length;
    const total = countTotal(userDice) + countTotal(aiDice);
    
    setTimeout(() => {
      if (isUserTurn) {
        // User challenged AI
        if (total >= quantity) {
          // AI won
          setWinner('ai');
          setLastAction(`开盅结果: 共有${total}个${face}。他赢了！`);
        } else {
          // User won
          setWinner('user');
          setLastAction(`开盅结果: 只有${total}个${face}。你赢了！`);
        }
      } else {
        // AI challenged User
        if (total >= quantity) {
          // User won
          setWinner('user');
          setLastAction(`开盅结果: 共有${total}个${face}。你赢了！`);
        } else {
          // AI won
          setWinner('ai');
          setLastAction(`开盅结果: 只有${total}个${face}。他赢了！`);
        }
      }
      setPunishment(punishments[Math.floor(Math.random() * punishments.length)]);
      setGameState('result');
    }, 2000);
  };

  const DiceIcon = ({ value, hidden }: { value: number; hidden?: boolean }) => (
    <div className={`w-10 h-10 rounded-lg bg-white shadow-inner flex items-center justify-center relative overflow-hidden ${hidden ? 'bg-gradient-to-br from-gray-700 to-gray-900' : ''}`}>
      {hidden ? (
        <div className="text-white/20 font-black text-xl">?</div>
      ) : (
        <div className="grid grid-cols-3 grid-rows-3 gap-1 p-1.5 w-full h-full">
          {value === 1 && <div className="col-start-2 row-start-2 w-2 h-2 rounded-full bg-red-600" />}
          {value === 2 && (
            <>
              <div className="col-start-1 row-start-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-3 row-start-3 w-1.5 h-1.5 rounded-full bg-black" />
            </>
          )}
          {value === 3 && (
            <>
              <div className="col-start-1 row-start-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-2 row-start-2 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-3 row-start-3 w-1.5 h-1.5 rounded-full bg-black" />
            </>
          )}
          {value === 4 && (
            <>
              <div className="col-start-1 row-start-1 w-1.5 h-1.5 rounded-full bg-red-600" />
              <div className="col-start-3 row-start-1 w-1.5 h-1.5 rounded-full bg-red-600" />
              <div className="col-start-1 row-start-3 w-1.5 h-1.5 rounded-full bg-red-600" />
              <div className="col-start-3 row-start-3 w-1.5 h-1.5 rounded-full bg-red-600" />
            </>
          )}
          {value === 5 && (
            <>
              <div className="col-start-1 row-start-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-3 row-start-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-2 row-start-2 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-1 row-start-3 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-3 row-start-3 w-1.5 h-1.5 rounded-full bg-black" />
            </>
          )}
          {value === 6 && (
            <>
              <div className="col-start-1 row-start-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-1 row-start-2 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-1 row-start-3 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-3 row-start-1 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-3 row-start-2 w-1.5 h-1.5 rounded-full bg-black" />
              <div className="col-start-3 row-start-3 w-1.5 h-1.5 rounded-full bg-black" />
            </>
          )}
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex flex-col bg-black overflow-hidden rounded-[40px]">
      {/* Background with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000" 
          alt="Night Scene" 
          className="w-full h-full object-cover opacity-60 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between p-4 z-10">
        <button onClick={onClose} className="p-2 bg-white/10 rounded-full backdrop-blur-md">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-serif text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] italic font-bold">爱情大话骰</h2>
          <div className="text-[10px] text-white/50 tracking-widest uppercase">{opponent ? `VS ${opponent.name}` : "LOVE LIAR'S DICE"}</div>
        </div>
        <button onClick={() => setGameState('picking')} className="p-2 bg-white/10 rounded-full backdrop-blur-md">
          <Users size={20} className="text-white" />
        </button>
      </div>

      {/* Game Board */}
      <div className="relative flex-1 flex flex-col z-10 px-6 py-4 justify-between">
        
        {/* Opponent Area */}
        <motion.div 
          animate={{ backgroundColor: !isUserTurn ? 'rgba(251, 191, 36, 0.05)' : 'transparent' }}
          className="flex items-center gap-4 p-3 rounded-3xl transition-colors duration-500"
        >
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className={`w-14 h-14 rounded-full border-2 overflow-hidden shadow-xl transition-all duration-500 ${!isUserTurn ? 'border-amber-400 scale-105 shadow-amber-400/20' : 'border-white/10'}`}>
              <img src={opponent?.portraitUrl || opponent?.avatarUrl || "/src/assets/images/ceo_lujingchen_real_1789719543268.jpg"} alt="Opponent" className="w-full h-full object-cover" />
            </div>
            <div className="px-2.5 py-1 rounded-full bg-black/60 text-[10px] text-white font-bold border border-white/10 tracking-tight">
              {opponent?.name || '陆景琛'}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-2">
             <div className="flex justify-center gap-2">
                {aiDice.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <DiceIcon value={d} hidden={gameState !== 'revealed' && gameState !== 'result'} />
                  </motion.div>
                ))}
             </div>
             <AnimatePresence>
               {currentBid && !isUserTurn && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="self-center bg-amber-400 text-black px-3 py-1 rounded-full text-[11px] font-black shadow-lg shadow-amber-400/20"
                  >
                    {currentBid.quantity} 个 {currentBid.face}
                  </motion.div>
               )}
             </AnimatePresence>
          </div>
        </motion.div>

        {/* Center: Timer & Status */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="56" cy="56" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <motion.circle
                cx="56"
                cy="56"
                r="50"
                fill="none"
                stroke={isUserTurn ? "#fbbf24" : "#6366f1"}
                strokeWidth="4"
                strokeDasharray="314"
                animate={{ strokeDashoffset: 314 - (timer / 15) * 314 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>
            <div className="flex flex-col items-center">
               <div className={`mb-1 transition-colors ${isUserTurn ? "text-amber-400" : "text-indigo-400"}`}>
                  <Timer size={20} />
               </div>
               <span className="text-2xl font-black text-white tabular-nums tracking-tighter">00:{timer.toString().padStart(2, '0')}</span>
            </div>
          </div>

          <motion.div 
            key={lastAction}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-xl text-center max-w-[85%] shadow-2xl"
          >
             <p className="text-[11px] text-white/80 font-medium leading-relaxed tracking-wide">{lastAction}</p>
          </motion.div>
        </div>

        {/* User Area */}
        <div className="space-y-6">
          <motion.div 
            animate={{ backgroundColor: isUserTurn ? 'rgba(99, 102, 241, 0.05)' : 'transparent' }}
            className="flex items-center gap-4 p-3 rounded-3xl transition-colors duration-500"
          >
            <div className="flex-1 flex flex-col gap-2">
               <AnimatePresence>
                 {currentBid && isUserTurn && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="self-center bg-indigo-500 text-white px-3 py-1 rounded-full text-[11px] font-black shadow-lg shadow-indigo-500/20"
                    >
                      {currentBid.quantity} 个 {currentBid.face}
                    </motion.div>
                 )}
               </AnimatePresence>
               <div className="flex justify-center gap-2">
                  {userDice.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <DiceIcon value={d} />
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className={`w-14 h-14 rounded-full border-2 overflow-hidden shadow-xl transition-all duration-500 ${isUserTurn ? 'border-indigo-400 scale-105 shadow-indigo-400/20' : 'border-white/10'}`}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Me" className="w-full h-full object-cover" />
              </div>
              <div className="px-3 py-1 rounded-full bg-black/60 text-[10px] text-white font-bold border border-white/10 tracking-tight">
                你
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {gameState === 'idle' ? (
               <button 
                onClick={startGame}
                className="col-span-3 py-3 rounded-2xl bg-amber-500 text-white font-black text-sm shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition"
               >
                 <Play size={18} fill="currentColor" />
                 <span>开始博弈</span>
               </button>
            ) : gameState === 'playing' ? (
              <>
                <button 
                  onClick={() => onShowToast('叫点功能暂由系统自动推荐最优选')}
                  className="py-3 rounded-2xl bg-white/10 border border-white/10 text-white/80 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                   跟叫
                </button>
                <button 
                  onClick={handleRaise}
                  disabled={!isUserTurn}
                  className={`py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${isUserTurn ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20 active:scale-95' : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'}`}
                >
                   升点
                </button>
                <button 
                  onClick={handleOpen}
                  disabled={!isUserTurn || !currentBid}
                  className={`py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${isUserTurn && currentBid ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 active:scale-95' : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'}`}
                >
                   开盅
                </button>
              </>
            ) : (gameState === 'revealed' || gameState === 'result') ? (
               <button 
                onClick={startGame}
                className="col-span-3 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
               >
                 <RotateCcw size={16} />
                 <span>再来一局</span>
               </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Opponent Picker Overlay */}
      <AnimatePresence>
        {gameState === 'picking' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[110] flex flex-col bg-zinc-950/95 backdrop-blur-xl p-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => opponent ? setGameState('idle') : onClose()} className="p-2 hover:bg-white/10 rounded-full transition">
                <ArrowLeft size={24} className="text-white" />
              </button>
              <h3 className="text-xl font-bold text-white">选择你的博弈对象</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePickOpponent(role)}
                    className={`relative rounded-2xl overflow-hidden aspect-[3/4] border-2 transition-all ${opponent?.id === role.id ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'border-white/5'}`}
                  >
                    <img 
                      src={role.portraitUrl || role.avatarUrl} 
                      alt={role.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-sm font-black">{role.name}</div>
                      <div className="text-[10px] opacity-60 truncate">{role.title}</div>
                    </div>
                    {opponent?.id === role.id && (
                      <div className="absolute top-2 right-2 bg-amber-400 rounded-full p-1">
                        <Sparkles size={12} className="text-black" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Overlay */}
      <AnimatePresence>
        {gameState === 'result' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
            >
              <div className={`p-6 text-center ${winner === 'user' ? 'bg-gradient-to-b from-green-500/20 to-transparent' : 'bg-gradient-to-b from-red-500/20 to-transparent'}`}>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                   {winner === 'user' ? <Trophy size={32} className="text-green-400" /> : <AlertCircle size={32} className="text-red-400" />}
                </div>
                <h3 className="text-xl font-black text-white mb-1">
                  {winner === 'user' ? '博弈大胜利！' : '惜败，运气欠佳'}
                </h3>
                <p className="text-xs text-white/50">{winner === 'user' ? '你的眼光真准，成功识破了他的诡计' : '被他成功误导了，看来你还要多练练'}</p>
              </div>
              
              <div className="p-6 space-y-4">
                 <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                       <Sparkles size={14} className="text-amber-400" />
                       <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">失败惩罚</span>
                    </div>
                    <p className="text-sm text-white font-bold italic">“ {winner === 'user' ? `他开盅失败：${punishment}` : `你开盅失败：${punishment}`} ”</p>
                 </div>
                 
                 <button 
                  onClick={startGame}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-black text-sm active:scale-95 transition"
                 >
                   接受惩罚 & 再战一轮
                 </button>
                 <button 
                  onClick={() => setGameState('idle')}
                  className="w-full py-3.5 rounded-xl bg-white/5 text-white/60 font-bold text-sm active:scale-95 transition"
                 >
                   暂告一段落
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rolling Overlay */}
      <AnimatePresence>
        {gameState === 'rolling' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotateX: [0, 360, 720],
                      rotateY: [0, 360, 720],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 0.6, 
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                    className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center"
                  >
                     <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  </motion.div>
                ))}
              </div>
              <p className="text-white font-black text-lg tracking-[0.2em] animate-pulse">正在摇盅...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
