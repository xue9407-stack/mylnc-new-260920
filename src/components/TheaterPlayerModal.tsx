import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Volume2, RotateCcw, Music, Menu, Heart, Play, BookOpen, Settings2, X, Diamond, Phone, Video, Mic, ChevronDown, ChevronRight } from 'lucide-react';
import { MiniTheaterItem, Role, TheaterScene } from '../types';
import { speakRoleDialogue } from '../utils/ttsHelper';
import { ArtisticTheaterTitle } from './ArtisticTheaterTitle';
import { TransparentSprite } from './TransparentSprite';
import imgAnimeBully from '../assets/images/anime_sprite_bully_1789953827113.jpg';
import imgAnimeCgBullyMansion from '../assets/images/anime_cg_bully_mansion_1789954051013.jpg';
import { ROLE_MEDIA_MAP } from '../data/rolePortraits';
import { resolveTheaterBg, resolveNarrationText, resolveSceneChoices, formatChapterBadge } from '../utils/theaterHelper';

interface TheaterPlayerModalProps {
  isOpen: boolean;
  role: Role;
  theater: MiniTheaterItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onStartChat: (role: Role, prompt?: string) => void;
}

const WEATHER_BACKGROUNDS = {
  rainy: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
  starry: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
  dawn: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80',
  cozy: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80',
};

export const TheaterPlayerModal: React.FC<TheaterPlayerModalProps> = ({
  isOpen,
  role,
  theater,
  onClose,
  onShowToast,
  onStartChat,
}) => {
  const [stage, setStage] = useState<'cover' | 'reader'>('cover');
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [interactionStep, setInteractionStep] = useState<'narration' | 'dialogue' | 'choices'>('narration');

  // Advanced menu modals
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  // Customizable settings that drive the content
  const [aiTone, setAiTone] = useState<'gentle' | 'tsundere' | 'possessive'>('gentle');
  const [selectedWeather, setSelectedWeather] = useState<'rainy' | 'starry' | 'dawn' | 'cozy' | null>(null);
  const [customDialogueHistory, setCustomDialogueHistory] = useState<TheaterScene[]>([]);

  useEffect(() => {
    setStage('cover');
    setCurrentSceneIdx(0);
    setIsPlayingVoice(false);
    setCustomDialogueHistory([]);
    setInteractionStep('narration');
  }, [theater?.id]);

  if (!isOpen || !theater) return null;

  // Dynamically resolve scenes from theater, fallback to beautiful story chapters if empty
  const baseScenes: TheaterScene[] = theater.scenes?.length > 0 ? theater.scenes : [
    {
      id: 'default_s1',
      speaker: role.name,
      narrationText: `深色木质书房里只有一盏绿荫台灯散发着幽微的光芒，窗外淅淅沥沥的雨声打破了深夜的沉寂。${role.name}停下手中的工作，眼神深沉地凝视着推门而入的你……`,
      dialogue: `（放下手中的签字笔，解开两颗领口扣子，眼神深沉地看向你） “深夜跑进我的私人书房，是公事没汇报完，还是单纯想我了？”`,
    },
    {
      id: 'default_s2',
      speaker: role.name,
      narrationText: `琥珀色的红酒在水晶杯壁上划过优雅的弧线，夜风掀起半透明的纱帘，将两人的距离拉得极近。空气中弥漫着淡雅沉稳的木质雪松香气。`,
      dialogue: `（微微摇晃着手中的红酒杯，眼神里藏着几分不易察觉的温柔） “工作遇到烦心事了？跟我说说呗，哥可是很会开导人的。”`,
    },
    {
      id: 'default_s3',
      speaker: role.name,
      narrationText: `顶楼阳台的夜风带着几分凉意，远处的都市霓虹在水汽中模糊成斑斓的光晕。他脱下身上带有体温的黑色大衣，轻柔地搭在你的肩头。`,
      dialogue: `（他将外套解下，轻轻披在你的肩头，动作带着不容置疑的霸道） “夜里风凉，要是冻坏了，我可是会心疼的。”`,
    },
    {
      id: 'default_s4',
      speaker: role.name,
      narrationText: `月光倒映在他深邃的眼眸里，像是落入了整片星海。周围的一切嘈杂声仿佛都随之退去，只剩下彼此起伏的呼吸声。`,
      dialogue: `（俊朗的脸庞在朦胧的月光下显得格外深邃，他忽然定定地看着你） “其实……我一直想问你一件事，你真的甘心只当我的‘合伙人’吗？”`,
    },
    {
      id: 'default_s5',
      speaker: role.name,
      narrationText: `他向前跨出半步，将你笼罩在他的影子与怀抱之中。温热的呼吸拂过耳际，强有力的心跳声在寂静的夜里格外清晰。`,
      dialogue: `（他微微低下头，温热的呼吸扑在你的耳畔） “前世我错过了你，今生今世，我绝对不会再放手。”`,
    },
    {
      id: 'default_s6',
      speaker: role.name,
      narrationText: `夜色渐深，繁星点点。他紧紧将你按在胸口，这一刻，宿命的羁绊在彼此相拥的体温中彻底定格。`,
      dialogue: `（紧紧拥你入怀，像是要把你揉进他的生命里） “这一生，执子之手，与子偕老。你是我唯一的星光，也是我心之所向。”`,
    }
  ];

  // Merge predefined scenes with custom-generated or dynamic scenes
  const allScenes = [...baseScenes, ...customDialogueHistory];
  const currentScene = allScenes[currentSceneIdx] || allScenes[0];

  // Dynamic Background Image driven by title and AI Weather settings
  const activeBg = (selectedWeather ? WEATHER_BACKGROUNDS[selectedWeather] : null) || resolveTheaterBg(theater.title, theater.bgImage);

  const handleNextScene = () => {
    if (currentSceneIdx < allScenes.length - 1) {
      setCurrentSceneIdx(currentSceneIdx + 1);
    } else {
      // Loop or append dynamic infinite AI scenes
      onShowToast('✨ 正在由 AI 导演为您续写星空后续浪漫情愫……');
      const newScene: TheaterScene = {
        id: `ai_scene_${Date.now()}`,
        speaker: role.name,
        dialogue: `（${role.name}深情地吻了吻你的额头，目光如火）“无论未来的夜色如何变幻，我都只想牵着你的手，走过每一个朝朝暮暮。”`,
      };
      setCustomDialogueHistory((prev) => [...prev, newScene]);
      setCurrentSceneIdx(allScenes.length);
    }
  };

  // TTS Speech Player
  const toggleVoice = () => {
    if (isPlayingVoice) {
      window.speechSynthesis?.cancel();
      setIsPlayingVoice(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      onShowToast('当前浏览器暂不支持原声语音播放');
      return;
    }

    const success = speakRoleDialogue({
      text: currentScene.dialogue,
      roleName: role.name,
      roleTags: role.tags,
      roleTitle: role.title,
      onStart: () => setIsPlayingVoice(true),
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });

    if (success) {
      onShowToast(`🔊 正在原声情感配音【${role.name}】的剧情对白……`);
    } else {
      onShowToast('语音播放失败');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden animate-fadeIn select-none font-sans">
      {/* Mobile App Shell / Fullscreen Immersive Stage */}
      <div className="w-full max-w-[420px] h-full bg-[#0a0a0f] text-white flex flex-col relative overflow-hidden sm:shadow-[0_25px_60px_rgba(0,0,0,0.9)] sm:border-x sm:border-white/10">
        
        {/* Immersive Fullscreen Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeBg}
            alt="Theater Atmosphere"
            className="w-full h-full object-cover filter brightness-[0.62] contrast-110 transition-all duration-1000"
          />
          {/* Cinematic Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60" />
        </div>

        {/* Top Header Bar (Exact match for Image 2) */}
        <div className="relative z-30 pt-4 px-4 pb-2 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={stage === 'reader' ? () => setStage('cover') : onClose}
            className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/90 transition active:scale-95 cursor-pointer shadow-md"
            aria-label="返回"
          >
            <ArrowLeft size={18} />
          </button>

          <h2 className="text-sm sm:text-base font-bold text-white tracking-wide truncate max-w-[200px] text-center drop-shadow-md">
            {theater.title.replace(/[《》]/g, '')}
          </h2>

          <div className="w-9" />
        </div>

        {stage === 'cover' ? (
          /* ================= PHASE 1: COVER / ENTRY SCREEN ================= */
          <div className="flex-1 flex flex-col justify-between p-6 relative z-20 text-center">
            <div className="flex-1 flex flex-col justify-center items-center text-center px-2 z-10 my-auto">
              <ArtisticTheaterTitle title={theater.title} />

              {theater.id === 'theater_school_bully' && (
                <p className="mt-2 text-[10px] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-bold tracking-[0.1em] max-w-[280px] mx-auto bg-black/30 py-1.5 px-3 rounded-full border border-white/5 backdrop-blur-xs">
                  前世他害我惨死，今生我嫁给他弟。
                </p>
              )}
            </div>

            {/* Bottom Actions: 收藏 & 进入 */}
            <div className="space-y-3 pb-8">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFavorited(!isFavorited);
                    onShowToast(isFavorited ? '已取消收藏' : '⭐ 成功收藏该小剧场！');
                  }}
                  className={`flex-1 py-3.5 rounded-2xl backdrop-blur-md border text-xs font-extrabold flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                    isFavorited
                      ? 'bg-pink-600 text-white border-pink-400 shadow-lg shadow-pink-600/30'
                      : 'bg-black/60 hover:bg-black/80 text-white border-white/20'
                  }`}
                >
                  <Heart size={16} className={isFavorited ? 'fill-white' : ''} />
                  <span>{isFavorited ? '已收藏' : '收藏'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStage('reader')}
                  className="flex-1 py-3.5 rounded-2xl bg-white hover:bg-white/95 text-slate-900 text-xs font-black flex items-center justify-center gap-1.5 shadow-xl transition active:scale-95 cursor-pointer"
                >
                  <Play size={15} className="fill-slate-900" />
                  <span>进入</span>
                </button>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-white/40 tracking-wider">内容由AI生成</span>
              </div>
            </div>
          </div>
        ) : (
          /* ================= PHASE 2: READER SCREEN (3-STAGE SEQUENTIAL INTERACTION: NARRATION -> DIALOGUE -> CHOICES) ================= */
          <>
            {/* Right-Hand Vertical Action Toolbar */}
            <div className="absolute right-3.5 top-20 z-30 flex flex-col items-center gap-2.5">
              {/* Catalog Button */}
              <button
                type="button"
                onClick={() => setShowCatalogModal(true)}
                className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] font-bold text-xs shadow-lg transition active:scale-90 cursor-pointer"
                title="剧场章节目录"
              >
                目
              </button>

              {/* AI Settings Button */}
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] font-bold shadow-lg transition active:scale-90 cursor-pointer"
                title="AI 导演设置"
              >
                ✦
              </button>

              {/* Replay Button */}
              <button
                type="button"
                onClick={() => {
                  setCurrentSceneIdx(0);
                  setCustomDialogueHistory([]);
                  setInteractionStep('narration');
                  onShowToast('↺ 章节已重置到初始状态');
                }}
                className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] shadow-lg transition active:scale-90 cursor-pointer"
                title="重新播放"
              >
                <RotateCcw size={16} />
              </button>

              {/* Audio Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  setIsMusicPlaying(!isMusicPlaying);
                  onShowToast(isMusicPlaying ? '🔇 背景环境音效已暂停' : '♪ 已开启剧场微风星空沉浸环境音');
                }}
                className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] shadow-lg transition active:scale-90 cursor-pointer"
                title="背景音效"
              >
                <Music size={16} />
              </button>
            </div>

            {/* Chapter Pill Badge near Top */}
            <div className="relative z-20 flex justify-center pt-2 shrink-0">
              <div
                onClick={() => setShowCatalogModal(true)}
                className="px-5 py-1.5 rounded-full bg-[#e2d5cb]/20 border border-[#e2d5cb]/30 backdrop-blur-md text-xs font-bold text-[#f3ece7] tracking-wider shadow-lg hover:bg-[#e2d5cb]/35 cursor-pointer transition active:scale-95"
              >
                {formatChapterBadge(currentSceneIdx, currentScene.chapterTitle || theater.title)}
              </div>
            </div>

            {/* ================= STAGE 1: NARRATION (EXACT MATCH FOR IMAGE 1) ================= */}
            {interactionStep === 'narration' && (
              <div 
                onClick={() => setInteractionStep('dialogue')}
                className="flex-1 flex flex-col justify-end px-6 pb-10 pt-24 relative z-20 cursor-pointer select-none animate-fadeIn"
              >
                <p className="text-base sm:text-lg text-[#fdfbf7] font-normal leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                  {resolveNarrationText(theater.title, currentScene.speaker || role.name, currentScene.dialogue, currentScene.narrationText)}
                </p>

                <div className="flex justify-end pt-3 text-white/50 text-[10px] items-center gap-1">
                  <span className="animate-pulse">点击画面继续 ➔</span>
                </div>

                <div className="text-right pt-4">
                  <span className="text-[9px] text-white/40 tracking-wider">内容由AI生成</span>
                </div>
              </div>
            )}

            {/* ================= STAGE 2: DIALOGUE (EXACT MATCH FOR IMAGE 3) ================= */}
            {interactionStep === 'dialogue' && (
              <div 
                onClick={() => setInteractionStep('choices')}
                className="flex-1 flex flex-col justify-end px-4 pb-8 pt-24 relative z-20 cursor-pointer select-none animate-fadeIn"
              >
                {/* Male Main Lead Portrait Standee in Center */}
                <div className="absolute inset-x-0 bottom-28 top-16 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
                  <TransparentSprite
                    src={currentScene.roleAvatar || ROLE_MEDIA_MAP[role.id]?.portraitUrl || role.portraitUrl || role.avatarUrl || role.avatar || imgAnimeBully}
                    alt={role.name || '立绘'}
                    className="h-full max-h-[480px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Dialogue Box Area */}
                <div className="relative z-20 pt-3 group active:scale-[0.99] transition">
                  {/* Speaker Badge */}
                  <div className="absolute -top-2 left-4 z-30 px-4 py-1 rounded-2xl bg-white/95 text-slate-900 text-xs font-black shadow-lg border border-white/50 tracking-wider">
                    {currentScene.speaker || role.name}
                  </div>

                  {/* Light Semi-transparent Card */}
                  <div className="p-5 pt-6 rounded-3xl bg-[#f5f1eb]/90 backdrop-blur-md border border-white/80 shadow-2xl relative text-slate-800">
                    <p className="text-sm sm:text-base text-[#1e1a24] font-medium leading-relaxed tracking-wide">
                      {currentScene.dialogue || '你终于来了，以为躲着我就能当作一切没发生过么？'}
                    </p>

                    <div className="flex justify-end pt-2">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-900/5 px-2.5 py-1 rounded-full border border-slate-900/10 shadow-xs">
                        <span>点击画面继续</span>
                        <ChevronDown size={13} className="animate-bounce text-slate-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right pt-3">
                  <span className="text-[9px] text-white/40 tracking-wider">内容由AI生成</span>
                </div>
              </div>
            )}

            {/* ================= STAGE 3: CHOICES (EXACT MATCH FOR IMAGE 3) ================= */}
            {interactionStep === 'choices' && (
              <div className="flex-1 flex flex-col justify-end px-5 pb-8 relative z-20 space-y-4 select-none animate-fadeIn">
                {/* Option Prompt Banner */}
                <div className="w-full text-center py-3 px-6 rounded-2xl bg-[#e2d5cb]/30 border border-[#e2d5cb]/40 backdrop-blur-md text-[#f3ece7] text-sm font-bold shadow-lg">
                  这一刻，你可以——
                </div>

                {/* Interactive Choice Options */}
                <div className="space-y-3">
                  {resolveSceneChoices(currentScene.choices, role.name).map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onShowToast(opt.toastMsg || `选择：${opt.text}`);
                        handleNextScene();
                        setInteractionStep('narration');
                      }}
                      className="w-full text-left p-4 rounded-2xl bg-[#e2d5cb]/20 hover:bg-[#e2d5cb]/35 border border-[#e2d5cb]/30 text-[#f3ece7] font-bold text-xs sm:text-sm transition active:scale-98 shadow-xl backdrop-blur-md cursor-pointer"
                    >
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>

                <div className="text-right pt-2">
                  <span className="text-[9px] text-white/40 tracking-wider">内容由AI生成</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* ================= MODAL: CHAPTER CATALOG ================= */}
        {showCatalogModal && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
            <div className="bg-[#141225]/95 border-t border-purple-500/30 rounded-t-3xl p-5 max-h-[70vh] flex flex-col shadow-2xl backdrop-blur-lg">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BookOpen size={16} className="text-purple-400" />
                  <span>《{theater.title}》全景大章</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCatalogModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2">
                {allScenes.map((sc, idx) => (
                  <div
                    key={sc.id || idx}
                    onClick={() => {
                      setCurrentSceneIdx(idx);
                      setShowCatalogModal(false);
                      onShowToast(`📖 已切换至剧情第 ${idx + 1} 幕`);
                    }}
                    className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                      currentSceneIdx === idx
                        ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-purple-300">0{idx + 1}</span>
                      <span className="text-xs font-medium truncate max-w-[220px]">
                        {sc.dialogue.replace(/[\(（].*?[\)）]/g, '').slice(0, 18)}...
                      </span>
                    </div>
                    {currentSceneIdx === idx ? (
                      <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500 text-white font-extrabold animate-pulse">
                        当前位置
                      </span>
                    ) : (
                      <span className="text-[9px] text-white/30">跳转 ›</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: AI DIRECTOR SETTINGS ================= */}
        {showSettingsModal && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
            <div className="bg-[#141225]/95 border-t border-purple-500/30 rounded-t-3xl p-5 space-y-4 shadow-2xl backdrop-blur-lg">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Settings2 size={16} className="text-amber-300" />
                  <span>AI 交互环境与背景声色设定</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Weather Drive BG */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/80 block">1. 渲染当前气候与星空背景</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { key: 'starry', label: '星空' },
                    { key: 'rainy', label: '雨夜' },
                    { key: 'dawn', label: '晨曦' },
                    { key: 'cozy', label: '温存' },
                  ].map((w) => (
                    <button
                      key={w.key}
                      type="button"
                      onClick={() => {
                        setSelectedWeather(w.key as any);
                        onShowToast(`🎨 AI 氛围天气已切换为：${w.label}`);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        selectedWeather === w.key
                          ? 'bg-amber-500 text-black border-amber-300 shadow-md'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Character Voice Tone */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-xs font-bold text-white/80 block">2. 设定角色音调与回复性格</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'gentle', label: '温柔体贴' },
                    { key: 'tsundere', label: '傲娇心动' },
                    { key: 'possessive', label: '强制偏爱' },
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => {
                        setAiTone(t.key as any);
                        onShowToast(`🎭 性格倾向已切换至：${t.label}`);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        aiTone === t.key
                          ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Speech Trigger */}
              <div className="pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-lg transition active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <Volume2 size={15} />
                  <span>触发并试听当前台词配音</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition"
              >
                返回剧场
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
