import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, HelpCircle, RefreshCw, ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';

interface LiarDiceGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: {
    nickname: string;
    avatar: string;
  };
  roles: any[];
}

import imgAnimeBully from '../assets/images/anime_male_bully_1789953557674.jpg';

export const LiarDiceGameModal: React.FC<LiarDiceGameModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  roles,
}) => {
  // Opponent Companion Picker
  const defaultOpponent = {
    id: 'lingye',
    name: 'AI 凌夜',
    avatar: imgAnimeBully,
    portrait: imgAnimeBully,
    score: 98,
  };

  const [activeOpponent, setActiveOpponent] = useState(defaultOpponent);
  const [opponentScore, setOpponentScore] = useState(98);
  const [userScore, setUserScore] = useState(102);

  // Game States
  const [gameState, setGameState] = useState<'idle' | 'rolling' | 'playing' | 'revealed'>('idle');
  const [userDice, setUserDice] = useState<number[]>([]);
  const [opponentDice, setOpponentDice] = useState<number[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'user' | 'opponent'>('user');
  
  // Current Bid State: { quantity, value }
  const [currentBid, setCurrentBid] = useState<{ quantity: number; value: number } | null>(null);
  
  // Bid Selector States
  const [selectedQty, setSelectedQty] = useState<number>(2);
  const [selectedValue, setSelectedValue] = useState<number>(2);

  // Status message state
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [resultMessage, setResultMessage] = useState<{
    winner: string;
    action: string;
    detail: string;
  } | null>(null);

  const [showRules, setShowRules] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [peeking, setPeeking] = useState(true);

  // Load and configure custom sound
  const playShakeSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = 0.15;
      const repeats = 5;
      for (let i = 0; i < repeats; i++) {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(120 + Math.random() * 80, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + duration);
        }, i * 140);
      }
    } catch (e) {
      console.log('Audio Context not allowed yet');
    }
  };

  const playDiceCupSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
  };

  // Start the game and roll dice
  const handleStartGame = () => {
    setGameState('rolling');
    playShakeSound();
    
    // Animate rolling
    setTimeout(() => {
      // Roll 5 dice for user
      const uDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => a - b);
      // Roll 5 dice for opponent
      const oDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => a - b);
      
      setUserDice(uDice);
      setOpponentDice(oDice);
      setGameState('playing');
      setCurrentBid(null);
      setSelectedQty(2);
      setSelectedValue(2);
      setResultMessage(null);
      setPeeking(true);
      
      // Randomize who starts
      const first = Math.random() > 0.5 ? 'user' : 'opponent';
      setCurrentTurn(first);
      
      if (first === 'user') {
        setGameLog(['🎲 骰盒已摇晃，轮到你先喊点！']);
      } else {
        setGameLog(['🎲 骰盒已摇晃，轮到 凌夜 先喊点...']);
        triggerAiTurn(oDice, null);
      }
    }, 1200);
  };

  // Convert number to Chinese words
  const getQtyWord = (qty: number) => {
    const map: Record<number, string> = {
      1: '一个', 2: '两个', 3: '三个', 4: '四个', 5: '五个',
      6: '六个', 7: '七个', 8: '八个', 9: '九个', 10: '十个'
    };
    return map[qty] || `${qty}个`;
  };

  const getDiceWord = (val: number) => {
    const map: Record<number, string> = {
      1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六'
    };
    return map[val] || `${val}`;
  };

  // Human friendly bid string
  const getBidString = (qty: number, value: number) => {
    return `${getQtyWord(qty)}${getDiceWord(value)}`;
  };

  // Handle user bidding
  const handleUserBid = () => {
    if (gameState !== 'playing' || currentTurn !== 'user') return;

    // Validate bid
    if (currentBid) {
      const isHigher = 
        selectedQty > currentBid.quantity || 
        (selectedQty === currentBid.quantity && selectedValue > currentBid.value);
      
      if (!isHigher) {
        // Simple visual warning or toast
        setGameLog((prev) => [...prev, '⚠️ 喊点必须大于当前喊点（数量更多，或同等数量点数更大）']);
        return;
      }
    }

    const newBid = { quantity: selectedQty, value: selectedValue };
    setCurrentBid(newBid);
    setGameLog((prev) => [...prev, `👤 你喊了：${getBidString(selectedQty, selectedValue)}`]);
    setCurrentTurn('opponent');
    playDiceCupSound();

    // Trigger AI response with delay
    triggerAiTurn(opponentDice, newBid);
  };

  // Trigger quick raise
  const handleUserRaise = () => {
    if (gameState !== 'playing' || currentTurn !== 'user') return;

    let targetQty = 2;
    let targetVal = 2;

    if (currentBid) {
      targetQty = currentBid.quantity + 1;
      targetVal = currentBid.value;
    }

    if (targetQty > 10) targetQty = 10;

    setSelectedQty(targetQty);
    setSelectedValue(targetVal);

    const newBid = { quantity: targetQty, value: targetVal };
    setCurrentBid(newBid);
    setGameLog((prev) => [...prev, `👤 你加注喊了：${getBidString(targetQty, targetVal)}`]);
    setCurrentTurn('opponent');
    playDiceCupSound();

    triggerAiTurn(opponentDice, newBid);
  };

  // AI Logic - Smart probability decision tree
  const triggerAiTurn = (aiDice: number[], lastBid: { quantity: number; value: number } | null) => {
    setIsAiThinking(true);
    
    setTimeout(() => {
      setIsAiThinking(false);
      
      if (!lastBid) {
        // First bid of game: AI makes a safe bid based on its own strongest dice
        const counts = Array(7).fill(0);
        aiDice.forEach(d => counts[d]++);
        
        let bestValue = 2;
        let maxCount = 0;
        for (let i = 2; i <= 6; i++) {
          if (counts[i] > maxCount) {
            maxCount = counts[i];
            bestValue = i;
          }
        }
        
        // Count 1s since they are wild
        const onesCount = counts[1];
        const bidQty = Math.max(2, maxCount + onesCount);
        
        setCurrentBid({ quantity: bidQty, value: bestValue });
        setSelectedQty(bidQty + 1); // preload higher for user convenience
        setSelectedValue(bestValue);
        setGameLog((prev) => [...prev, `🍷 凌夜喊了：${getBidString(bidQty, bestValue)}`]);
        setCurrentTurn('user');
        return;
      }

      // AI Decides to Challenge (开蛊) or Bid Higher
      const targetValue = lastBid.value;
      const targetQty = lastBid.quantity;

      // Calculate how many of the target values the AI has (including wild 1s)
      const aiHasTarget = aiDice.filter(d => d === targetValue || d === 1).length;
      
      // Expected total matches under 10 dice:
      // Prob of matching = 1/3 (since targetValue and 1 both count, except 1-value itself is 1/6)
      const prob = targetValue === 1 ? (1/6) : (1/3);
      // AI knows its own matches (aiHasTarget) and expects prob of user's 5 dice
      const expectedInUser = Math.round(5 * prob);
      const totalExpected = aiHasTarget + expectedInUser;

      // Probability check
      const dangerGap = targetQty - totalExpected;

      // If user's bid is extremely unlikely, call "开蛊"!
      const shouldChallenge = dangerGap >= 2 || (targetQty >= 6 && aiHasTarget <= 1) || targetQty > 8;

      if (shouldChallenge) {
        handleReveal('opponent');
      } else {
        // Bid higher: bluff slightly or declare high-value
        let nextQty = targetQty;
        let nextVal = targetValue + 1;

        if (nextVal > 6) {
          nextQty = targetQty + 1;
          nextVal = 2; // wrap around
        }

        // Keep it realistic
        if (nextQty > 10) nextQty = 10;

        setCurrentBid({ quantity: nextQty, value: nextVal });
        // Set selector to next valid level automatically
        setSelectedQty(nextVal === 6 ? nextQty + 1 : nextQty);
        setSelectedValue(nextVal === 6 ? 2 : nextVal + 1);

        setGameLog((prev) => [...prev, `🍷 凌夜喊了：${getBidString(nextQty, nextVal)}`]);
        setCurrentTurn('user');
        playDiceCupSound();
      }
    }, 1500);
  };

  // Reveal Cup and decide winner
  const handleReveal = (challenger: 'user' | 'opponent') => {
    if (!currentBid) return;

    setGameState('revealed');
    playDiceCupSound();

    const value = currentBid.value;
    const bidQty = currentBid.quantity;

    // Check if 1 was ever called
    // (If 1 is called, 1 loses its wildcard ability for all players)
    const isOneWild = value !== 1;

    // Combine and count matching dice
    const userMatches = userDice.filter(d => d === value || (isOneWild && d === 1)).length;
    const opponentMatches = opponentDice.filter(d => d === value || (isOneWild && d === 1)).length;
    const totalMatches = userMatches + opponentMatches;

    const bidder = challenger === 'user' ? 'opponent' : 'user';
    const isBidSuccessful = totalMatches >= bidQty;

    let winnerName = '';
    let actionStr = '';
    let detailStr = '';

    if (isBidSuccessful) {
      // Bidder wins, challenger loses
      if (bidder === 'user') {
        winnerName = userProfile.nickname || '星遥';
        actionStr = '开蛊获胜';
        detailStr = '凌夜 接受惩罚喝一杯！';
        setUserScore(prev => prev + 1);
        setOpponentScore(prev => Math.max(0, prev - 1));
      } else {
        winnerName = '凌夜';
        actionStr = '开蛊获胜';
        detailStr = `${userProfile.nickname || '星遥'} 接受惩罚喝一杯！`;
        setOpponentScore(prev => prev + 1);
        setUserScore(prev => Math.max(0, prev - 1));
      }
    } else {
      // Challenger wins, bidder loses
      if (challenger === 'user') {
        winnerName = userProfile.nickname || '星遥';
        actionStr = '开蛊获胜';
        detailStr = '凌夜 接受惩罚喝一杯！';
        setUserScore(prev => prev + 1);
        setOpponentScore(prev => Math.max(0, prev - 1));
      } else {
        winnerName = '凌夜';
        actionStr = '开蛊获胜';
        detailStr = `${userProfile.nickname || '星遥'} 接受惩罚喝一杯！`;
        setOpponentScore(prev => prev + 1);
        setUserScore(prev => Math.max(0, prev - 1));
      }
    }

    setResultMessage({
      winner: winnerName,
      action: actionStr,
      detail: detailStr,
    });

    setGameLog((prev) => [
      ...prev,
      `📣 开蛊结果：${getBidString(bidQty, value)}`,
      `🎲 你的骰子：[${userDice.join(', ')}] (含赖子计 ${userMatches} 个)`,
      `🎲 凌夜骰子：[${opponentDice.join(', ')}] (含赖子计 ${opponentMatches} 个)`,
      `✨ 桌面上共有 ${totalMatches} 个【${getDiceWord(value)}】，${winnerName} 获胜！`
    ]);
  };

  // Reset scores
  const handleResetScores = () => {
    setOpponentScore(98);
    setUserScore(102);
    setGameLog(['🎲 比分已重置，准备开启全新对决！']);
  };

  if (!isOpen) return null;

  // Custom visual dot elements for Chinese dice (red 1 and 4, blue others)
  const renderDiceDots = (val: number) => {
    const isRed = val === 1 || val === 4;
    const dotColor = isRed ? 'bg-rose-500' : 'bg-[#1e3a8a]';
    
    switch (val) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center bg-white rounded-md shadow-inner border border-black/10">
            <div className="w-4 h-4 rounded-full bg-rose-600 animate-pulse" />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full p-1.5 flex flex-col justify-between bg-white rounded-md shadow-inner border border-black/10">
            <div className="flex justify-start"><div className={`w-2 h-2 rounded-full ${dotColor}`} /></div>
            <div className="flex justify-end"><div className={`w-2 h-2 rounded-full ${dotColor}`} /></div>
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full p-1.5 flex flex-col justify-between bg-white rounded-md shadow-inner border border-black/10">
            <div className="flex justify-start"><div className={`w-2 h-2 rounded-full ${dotColor}`} /></div>
            <div className="flex justify-center"><div className={`w-2 h-2 rounded-full ${dotColor}`} /></div>
            <div className="flex justify-end"><div className={`w-2 h-2 rounded-full ${dotColor}`} /></div>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full p-2 grid grid-cols-2 gap-1 bg-white rounded-md shadow-inner border border-black/10">
            <div className={`w-2 h-2 rounded-full ${dotColor}`} />
            <div className={`w-2 h-2 rounded-full ${dotColor}`} />
            <div className={`w-2 h-2 rounded-full ${dotColor}`} />
            <div className={`w-2 h-2 rounded-full ${dotColor}`} />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full p-1.5 flex flex-col justify-between bg-white rounded-md shadow-inner border border-black/10">
            <div className="flex justify-between">
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            </div>
            <div className="flex justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>
            <div className="flex justify-between">
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="w-full h-full p-2 grid grid-cols-2 gap-x-2 gap-y-1 bg-white rounded-md shadow-inner border border-black/10">
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95">
      {/* Container simulating a sleek mobile layout */}
      <div className="relative w-full max-w-[390px] h-[844px] max-h-screen bg-[#0e0a1f] flex flex-col overflow-hidden text-white font-sans select-none shadow-[0_0_60px_rgba(124,58,237,0.3)]">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_50%_40%,#312e81_0%,#090514_100%)]" />
        <div className="absolute inset-x-0 bottom-0 top-1/2 z-0 pointer-events-none opacity-35 bg-gradient-to-t from-purple-900/30 to-transparent" />

        {/* TOP STATUS NAVIGATION BAR */}
        <div className="relative z-10 px-4 pt-8 pb-3 flex items-center justify-between border-b border-white/5 bg-black/30 backdrop-blur-md">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 active:scale-95 transition cursor-pointer"
            title="返回"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Elegant Sparkly Title */}
          <div className="text-center flex flex-col items-center">
            <span className="text-xs text-amber-400 font-extrabold tracking-[0.15em] opacity-80 uppercase">Liar's Dice</span>
            <h1 className="text-lg font-black tracking-widest bg-gradient-to-b from-yellow-100 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)] mt-0.5">
              ✦ 大话骰王 ✦
            </h1>
          </div>

          <button
            onClick={() => setShowRules(true)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 active:scale-95 transition cursor-pointer"
            title="规则"
          >
            <HelpCircle size={15} className="text-amber-300" />
          </button>
        </div>

        {/* PLAYERS PROFILE CARDS PANEL */}
        <div className="relative z-10 px-4 py-3 flex items-center justify-between">
          {/* Opponent Card (Left) */}
          <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 px-2.5 py-1.5 rounded-2xl w-[145px] relative">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 shadow-md">
                <img src={activeOpponent.portrait} alt="Opponent portrait" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-1 -left-1 bg-amber-500 text-[8px] font-black text-black px-1 rounded-sm uppercase">AI</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold truncate text-white/90">{activeOpponent.name}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-amber-400 font-mono font-bold">🏆 {opponentScore}</span>
              </div>
            </div>
          </div>

          {/* Versus indicator */}
          <div className="text-xs font-black text-white/25 font-mono">VS</div>

          {/* User Card (Right) */}
          <div className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 px-2.5 py-1.5 rounded-2xl w-[145px] justify-end text-right">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold truncate text-white/90">{userProfile.nickname || '星遥'}</div>
              <div className="flex items-center gap-1 mt-0.5 justify-end">
                <span className="text-[10px] text-amber-400 font-mono font-bold">{userScore} 🏆</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 border border-purple-400 flex items-center justify-center text-lg shadow-md shrink-0">
              {userProfile.avatar || '😊'}
            </div>
          </div>
        </div>

        {/* MAIN GAME TABLE CONTAINER (PURPLE FELT ROUND BOARD) */}
        <div className="flex-1 relative z-10 px-3 py-1 flex flex-col justify-between overflow-hidden">
          
          {/* Circular Felt Table Area */}
          <div className="absolute inset-x-2 top-4 bottom-24 bg-gradient-to-b from-[#3a256a] to-[#201140] rounded-[48px] border-4 border-[#523d8c]/60 shadow-[inset_0_0_50px_rgba(0,0,0,0.8),0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between p-4 z-0">
            {/* Table Golden Center Mandala Pattern */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <div className="w-56 h-56 rounded-full border-2 border-dashed border-yellow-300" />
              <div className="absolute w-44 h-44 rounded-full border border-yellow-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-yellow-300" />
              </div>
            </div>

            {/* Decorative Drinks / Barware items */}
            <div className="absolute top-8 left-4 opacity-75 drop-shadow-md text-xl">🍷</div>
            <div className="absolute top-24 right-4 opacity-70 drop-shadow-md text-xl">🍸</div>
            <div className="absolute bottom-20 left-4 opacity-60 drop-shadow-md text-2xl">🥃</div>

            {/* TOP AREA: AI DICE CUPS */}
            <div className="flex justify-center gap-6 pt-4 relative z-10">
              <div className="relative flex flex-col items-center">
                <div className="text-[9px] text-white/40 mb-1 font-bold">凌夜的骰盒</div>
                <div className="flex gap-1.5 justify-center">
                  <div className={`w-14 h-14 rounded-b-xl border-t-4 border-amber-400 bg-gradient-to-b from-[#6b1e22] to-[#401214] flex items-center justify-center shadow-lg border-x border-b border-black/30 transition-transform ${gameState === 'rolling' ? 'animate-bounce' : ''}`}>
                    <span className="text-xl">🏆</span>
                  </div>
                  <div className={`w-14 h-14 rounded-b-xl border-t-4 border-amber-400 bg-gradient-to-b from-[#6b1e22] to-[#401214] flex items-center justify-center shadow-lg border-x border-b border-black/30 transition-transform ${gameState === 'rolling' ? 'animate-bounce' : ''}`}>
                    <span className="text-xl">🏆</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER AREA: PUBLIC TABLE BOARD (ACTIVE BID & FLOATING DICE) */}
            <div className="flex-1 flex flex-col items-center justify-center py-2 relative z-10 min-h-[140px]">
              
              {/* Floating Loose Dice (Image 1 Style) */}
              <AnimatePresence>
                {gameState === 'playing' && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none"
                  >
                    {/* Centered highlighted glowing die */}
                    <div className="w-11 h-11 rotate-[12deg] shadow-[0_0_20px_rgba(251,191,36,0.5)] bg-white rounded-md flex items-center justify-center animate-pulse">
                      {renderDiceDots(5)}
                    </div>
                    {/* Secondary die */}
                    <div className="w-9 h-9 -rotate-[15deg] opacity-75 shadow-lg bg-white rounded-md flex items-center justify-center mt-6">
                      {renderDiceDots(3)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Revealed All Dice State */}
              {gameState === 'revealed' && (
                <div className="space-y-3 w-full bg-black/40 border border-white/5 backdrop-blur-md rounded-2xl p-2.5 z-20">
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-amber-300 font-bold text-center">⚔️ 凌夜的骰子 ⚔️</div>
                    <div className="flex justify-center gap-1.5">
                      {opponentDice.map((d, i) => (
                        <div key={i} className="w-6.5 h-6.5 rounded-sm overflow-hidden bg-white">
                          {renderDiceDots(d)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-white/5 my-1.5" />
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-purple-300 font-bold text-center">⚔️ 你的骰子 ⚔️</div>
                    <div className="flex justify-center gap-1.5">
                      {userDice.map((d, i) => (
                        <div key={i} className="w-6.5 h-6.5 rounded-sm overflow-hidden bg-white">
                          {renderDiceDots(d)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIVE BIDDING STATUS PILL */}
              {gameState === 'playing' && currentBid && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-black/60 border border-amber-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md z-10"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[10px] text-white/50 font-bold">当前喊点:</span>
                  <span className="text-xs text-amber-300 font-black font-mono tracking-wider">
                    {getBidString(currentBid.quantity, currentBid.value)}
                  </span>
                </motion.div>
              )}

              {gameState === 'idle' && (
                <div className="text-center space-y-2 z-10">
                  <p className="text-xs text-white/40">摇响骰盒，开始激情博弈</p>
                  <button
                    onClick={handleStartGame}
                    className="px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-[#211140] font-black text-xs rounded-full shadow-lg active:scale-95 transition cursor-pointer"
                  >
                    🎲 摇骰开局
                  </button>
                </div>
              )}

              {/* Thinking loader */}
              {isAiThinking && (
                <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center gap-2 backdrop-blur-sm rounded-3xl z-15">
                  <RefreshCw className="animate-spin text-amber-400" size={24} />
                  <span className="text-[10px] text-amber-300 font-extrabold tracking-wider">凌夜 思考中...</span>
                </div>
              )}
            </div>

            {/* BOTTOM AREA: USER DICE CUPS / ACTIVE HAND PANEL */}
            <div className="pt-2 relative z-10 border-t border-white/[0.04]">
              
              {/* Peek Button and user dice rendering */}
              {gameState === 'playing' && (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center justify-between w-full px-2">
                    <span className="text-[10px] text-white/50 font-bold">你的骰盒 (点击可翻盖查看)</span>
                    <button
                      onClick={() => setPeeking(!peeking)}
                      className="text-[9px] font-extrabold bg-white/10 hover:bg-white/15 px-2 py-0.5 rounded-full text-purple-300 cursor-pointer"
                    >
                      {peeking ? '👁️ 盖上' : '👁️ 翻开'}
                    </button>
                  </div>

                  <div className="flex justify-center gap-2 w-full mt-1">
                    {peeking ? (
                      userDice.map((val, idx) => (
                        <div key={idx} className="w-10 h-10 rounded-md shadow-lg overflow-hidden shrink-0 animate-fade-in bg-white">
                          {renderDiceDots(val)}
                        </div>
                      ))
                    ) : (
                      <div className="flex gap-1.5">
                        <div className="w-12 h-10 rounded-t-xl border-b-4 border-amber-400 bg-gradient-to-t from-[#6b1e22] to-[#401214] flex items-center justify-center shadow-lg border-x border-t border-black/30">
                          <span className="text-sm">🏆</span>
                        </div>
                        <div className="w-12 h-10 rounded-t-xl border-b-4 border-amber-400 bg-gradient-to-t from-[#6b1e22] to-[#401214] flex items-center justify-center shadow-lg border-x border-t border-black/30">
                          <span className="text-sm">🏆</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Default empty slot when idle */}
              {gameState === 'idle' && (
                <div className="h-14 flex items-center justify-center text-white/15 text-xs font-bold uppercase tracking-wider">
                  No Hand Rolled
                </div>
              )}
            </div>
          </div>

          {/* LOWER CONTROLS & SELECTION PANEL */}
          <div className="relative z-10 shrink-0 space-y-3 pb-4 pt-1">
            
            {/* Bid Selector Panel (Only active during User's turn) */}
            {gameState === 'playing' && currentTurn === 'user' && (
              <div className="bg-black/40 border border-white/5 rounded-2xl p-2.5 space-y-2 backdrop-blur-md">
                
                {/* Quantity picker */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/50 font-extrabold">喊点数量:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedQty(prev => Math.max(2, prev - 1))}
                      className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-black cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-black font-mono w-12 text-center text-amber-400">{getQtyWord(selectedQty)}</span>
                    <button
                      onClick={() => setSelectedQty(prev => Math.min(10, prev + 1))}
                      className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-black cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Point value picker */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-white/50 font-extrabold">骰子点数:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedValue(prev => Math.max(1, prev - 1))}
                      className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-black cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-black font-mono w-12 text-center text-amber-400">点数 {selectedValue}</span>
                    <button
                      onClick={() => setSelectedValue(prev => Math.min(6, prev + 1))}
                      className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-black cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Micro preview of chosen bid */}
                <div className="text-center text-[10px] text-amber-400/80 font-bold bg-amber-400/5 py-1 rounded-lg border border-amber-400/10">
                  ⚡ 准备呼喊：<span className="text-xs text-amber-400 font-extrabold">{getBidString(selectedQty, selectedValue)}</span>
                </div>
              </div>
            )}

            {/* CHAT/GAME ACTIONS BUTTONS GRID (Image 1 Style: 喊点 | 加注 | 开蛊) */}
            <div className="grid grid-cols-3 gap-2 px-1">
              {/* Call button */}
              <button
                onClick={handleUserBid}
                disabled={gameState !== 'playing' || currentTurn !== 'user'}
                className="py-3 bg-gradient-to-b from-[#ffeed1] via-[#f7d6a1] to-[#e4a852] disabled:from-white/5 disabled:to-white/5 disabled:opacity-30 text-[#4c2d0d] disabled:text-white/40 font-black text-xs rounded-full shadow-md active:scale-95 transition cursor-pointer flex items-center justify-center gap-1 border-t border-white/20"
              >
                喊点
              </button>

              {/* Raise button */}
              <button
                onClick={handleUserRaise}
                disabled={gameState !== 'playing' || currentTurn !== 'user'}
                className="py-3 bg-gradient-to-b from-[#ffeed1] via-[#f7d6a1] to-[#e4a852] disabled:from-white/5 disabled:to-white/5 disabled:opacity-30 text-[#4c2d0d] disabled:text-white/40 font-black text-xs rounded-full shadow-md active:scale-95 transition cursor-pointer flex items-center justify-center gap-1 border-t border-white/20"
              >
                加注
              </button>

              {/* Reveal/Open cup button */}
              <button
                onClick={() => handleReveal('user')}
                disabled={gameState !== 'playing' || !currentBid}
                className="py-3 bg-gradient-to-b from-[#ffeed1] via-[#f7d6a1] to-[#e4a852] disabled:from-white/5 disabled:to-white/5 disabled:opacity-30 text-[#4c2d0d] disabled:text-white/40 font-black text-xs rounded-full shadow-md active:scale-95 transition cursor-pointer flex items-center justify-center gap-1 border-t border-white/20"
              >
                开蛊
              </button>
            </div>

            {/* STATUS EVENT BOARD (Image 1 Style Glass Card) */}
            <div className="relative border border-white/10 rounded-2xl bg-black/40 p-3 shadow-lg flex flex-col justify-center min-h-[90px]">
              {resultMessage ? (
                <div className="text-center space-y-1.5 animate-fade-in">
                  <div className="text-sm font-black bg-gradient-to-b from-yellow-200 to-amber-400 bg-clip-text text-transparent tracking-wide">
                    {resultMessage.winner}
                  </div>
                  <div className="text-xs font-bold text-amber-300">
                    {resultMessage.action}
                  </div>
                  <div className="text-[10px] text-white/50">
                    {resultMessage.detail}
                  </div>
                  
                  {/* Next Round Button inside status */}
                  <div className="pt-1.5">
                    <button
                      onClick={handleStartGame}
                      className="px-4 py-1 bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] rounded-full active:scale-95 transition cursor-pointer"
                    >
                      再来一局
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full justify-between">
                  <div className="text-[10px] text-white/30 font-bold mb-1 uppercase tracking-wider flex items-center justify-between">
                    <span>对局日志</span>
                    <button 
                      onClick={handleResetScores}
                      className="text-[8px] hover:underline hover:text-white transition text-white/40 flex items-center gap-0.5"
                    >
                      重置比分
                    </button>
                  </div>
                  <div className="text-[10px] font-bold text-white/70 max-h-[55px] overflow-y-auto space-y-1 leading-normal pr-1 scrollbar-thin">
                    {gameLog.slice(-3).map((log, index) => (
                      <div key={index} className="truncate">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RULES OVERLAY POPUP */}
        <AnimatePresence>
          {showRules && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5"
            >
              <div className="bg-[#1e1435] border border-purple-500/30 rounded-3xl p-6 w-full max-w-[320px] space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-sm font-black text-amber-300 flex items-center gap-1.5">
                    <span>大话骰 游戏规则</span>
                  </h3>
                  <button
                    onClick={() => setShowRules(false)}
                    className="p-1 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition"
                  >
                    <X size={15} />
                  </button>
                </div>
                <div className="text-[11px] text-white/70 space-y-3.5 leading-relaxed max-h-[350px] overflow-y-auto pr-1">
                  <p>
                    <strong className="text-white">1. 基础配置：</strong> 每个玩家拥有 1 个骰盒及 5 个骰子。游戏的目标是通过谎言或推理击败对手。
                  </p>
                  <p>
                    <strong className="text-white">2. 赖子（万能点）：</strong> 骰子点数 <strong className="text-rose-400">1点</strong> 默认为万能牌（赖子），可以充当任意点数。若 <strong className="text-rose-400">1点</strong> 曾被直接呼喊，其万能效果丧失，仅能计作1点。
                  </p>
                  <p>
                    <strong className="text-white">3. 喊点规则：</strong> 玩家轮流喊出桌面上匹配某点数的最小骰子总数（如“三个四”代表猜测场上共有至少 3 个 4 ）。后一玩家的呼喊必须比前一玩家：
                    <br />
                    - 数量更多；或者
                    <br />
                    - 数量相同，但点数更大。
                  </p>
                  <p>
                    <strong className="text-white">4. 开蛊与决胜：</strong> 如果你认为对方说谎或夸大了总数，可叫“开蛊”。双方展示所有骰子：
                    <br />
                    - 若场上实际点数数量 <strong className="text-amber-300">大于或等于</strong> 喊出的数量，喊点方获胜，开蛊方输，罚酒一杯。
                    <br />
                    - 若实际数量 <strong className="text-rose-400">小于</strong> 喊出的数量，开蛊方获胜，喊点方输，罚酒一杯。
                  </p>
                </div>
                <button
                  onClick={() => setShowRules(false)}
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xs rounded-full shadow-lg active:scale-95 transition"
                >
                  我知道了
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
