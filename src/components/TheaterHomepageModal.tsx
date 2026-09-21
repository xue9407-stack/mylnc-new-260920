import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Heart, Play, Sparkles, Video, Mic, Bookmark, Check, Clapperboard, Star, Phone, RotateCcw, Music, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { DEFAULT_THEATERS } from '../data/storyTheaterPresetData';
import { ArtisticTheaterTitle } from './ArtisticTheaterTitle';
import { TransparentSprite } from './TransparentSprite';
import imgAnimeBully from '../assets/images/anime_sprite_bully_1789953827113.jpg';
import imgAnimeSpriteLinmubai from '../assets/images/anime_sprite_linmubai_1789953814729.jpg';
import imgAnimeWhitehair from '../assets/images/anime_whitehair_ceo_1789720004085.jpg';
import imgAnimeCgBullyMansion from '../assets/images/anime_cg_bully_mansion_1789954051013.jpg';
import imgMansionStudy from '../assets/images/mansion_study_night_1789897698411.jpg';
import imgYachtNight from '../assets/images/yacht_starry_night_1789897718059.jpg';
import imgFittingRoom from '../assets/images/luxury_fitting_room_1789897735600.jpg';
import imgCarRain from '../assets/images/car_interior_rain_night_1789897758793.jpg';
import imgObservatory from '../assets/images/observatory_stars_1789897778630.jpg';
import { ROLE_MEDIA_MAP } from '../data/rolePortraits';
import { resolveTheaterBg, resolveNarrationText, resolveSceneChoices, formatChapterBadge } from '../utils/theaterHelper';

interface TheaterHomepageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  userProfile: {
    nickname: string;
    avatar: string;
  };
  theaterFavorites: Record<string, boolean>;
  onToggleFavorite: (id: string) => void;
  initialTheater?: any;
}

interface DynamicTheater {
  id: string;
  title: string;
  desc: string;
  bgImage: string;
  roleName: string;
  scenes: any[];
}

// Custom story scenes for "重生后撩个校霸带回家" with 3-stage flow
const BULLY_SCENES = [
  {
    id: 'start',
    chapterTitle: '书房外的名字',
    // Stage 1: Narration (Image 1)
    narrationText: '你站在门外等他。陆星野出来时已经恢复笑容，像刚才什么都没有发生，也像从来没人会问他疼不疼。',
    // Stage 2: Dialogue (Image 2)
    speaker: '陆星野',
    roleAvatar: imgAnimeBully,
    dialogue: '叔叔，知意不是联姻筹码。就算婚约明天取消，我今晚说的每个数字也一样作数。',
    callTime: '08:03',
    // Stage 3: Choices (Image 3)
    choicePrompt: '这一刻，你可以——',
    choices: [
      {
        text: '算了，别惹陆家',
        nextId: 'approach_soft',
        intimacyGain: 10,
        toastMsg: '选择忍气吞声，好感度 +10'
      },
      {
        text: '拉校霸入伙：一起干翻陆家',
        isHighlight: true,
        highlightTag: '高光剧情',
        nextId: 'approach_provoke',
        intimacyGain: 35,
        toastMsg: '✨ 开启霸气高光反杀路线！好感度 +35'
      }
    ]
  },
  {
    id: 'approach_soft',
    chapterTitle: '雨夜车棚的交集',
    narrationText: '重新睁开眼，看见的是十八岁时破旧的车棚和倾盆的大雨，陆星野正擦着脸上的血迹，眼神像一匹孤狼。前世你被命运捉弄，这一世，你发誓要扭转死局……',
    speaker: '陆星野',
    roleAvatar: imgAnimeBully,
    dialogue: '看够了吗？知道我是谁还敢靠这么近，不怕我也把你卷进来？',
    callTime: '08:15',
    choicePrompt: '面对冷冷注视你的他，你会选择——',
    choices: [
      {
        text: '（递上手帕）“陆星野，你流血了，我帮你擦擦。”',
        nextId: 'approach_soft_2',
        intimacyGain: 15,
        toastMsg: '主动关心，陆星野的心防动摇了 +15'
      },
      {
        text: '“我是来跟你联手的，从今以后我们是一个阵营。”',
        isHighlight: true,
        highlightTag: '高光剧情',
        nextId: 'approach_provoke',
        intimacyGain: 30,
        toastMsg: '✨ 达成狂野高光誓约！好感度 +30'
      }
    ]
  },
  {
    id: 'approach_soft_2',
    chapterTitle: '抓紧的手腕',
    narrationText: '他死死按住伤口，雨水混着血迹从发梢滑落。空气中弥漫着危险而诱惑的气息，他离你只有不到三厘米……',
    speaker: '陆星野',
    roleAvatar: imgAnimeBully,
    dialogue: '谁准你碰我的？前几天还躲着我走，今天倒投怀送抱了？',
    callTime: '08:22',
    choicePrompt: '被他抓紧手腕这一刻，你可以——',
    choices: [
      {
        text: '“放手，你弄疼我了……校霸就是这么不讲道理吗？”',
        nextId: 'happy_ending',
        intimacyGain: 15,
        toastMsg: '娇嗔抵抗，激起他的保护欲 +15'
      },
      {
        text: '“因为……我突然发现，最心疼你的人其实是我。”',
        isHighlight: true,
        highlightTag: '高光剧情',
        nextId: 'happy_ending',
        intimacyGain: 40,
        toastMsg: '✨ 告白暴击！开启专属羁绊结局 +40'
      }
    ]
  },
  {
    id: 'approach_provoke',
    chapterTitle: '反杀陆家的盟约',
    narrationText: '雨声轰鸣，他眼神中的阴沉逐渐被错愕替代，随后扬起一抹极度张扬危险的笑意。你终于握住了打破死局的钥匙。',
    speaker: '陆星野',
    roleAvatar: imgAnimeBully,
    dialogue: '干翻陆家？胆子不小啊……不过，我喜欢。今晚开始，你归我罩了。',
    callTime: '08:30',
    choicePrompt: '面对霸道宣誓的他，你可以——',
    choices: [
      {
        text: '（伸手击掌）“一言为定，合作愉快。”',
        nextId: 'happy_ending',
        intimacyGain: 20,
        toastMsg: '达成生死盟约 +20'
      },
      {
        text: '“不仅要合作，我还要做你唯一的底线。”',
        isHighlight: true,
        highlightTag: '高光剧情',
        nextId: 'happy_ending',
        intimacyGain: 50,
        toastMsg: '✨ 羁绊锁死！直接进入完美拯救结局 +50'
      }
    ]
  },
  {
    id: 'happy_ending',
    chapterTitle: '命运扭转之章',
    narrationText: '在暴雨与灯火交织的深夜，命运的齿轮在这一刻被彻底扭转。你不再是任人宰割的棋子，而陆星野也成为了你最坚不可摧的靠山。',
    speaker: '陆星野',
    roleAvatar: imgAnimeBully,
    dialogue: '以后有我在，没人敢让你受半分委屈。走，跟我回家。',
    callTime: '08:45',
    choicePrompt: '剧场第一章完美收官！你可以——',
    choices: [
      {
        text: '✨ 点击重新开始体验心动轮播 🔁',
        nextId: 'start',
        intimacyGain: 0,
        toastMsg: '重新开始心动轮播'
      }
    ]
  }
];

export const TheaterHomepageModal: React.FC<TheaterHomepageModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  userProfile,
  theaterFavorites,
  onToggleFavorite,
  initialTheater,
}) => {
  const [selectedTheater, setSelectedTheater] = useState<DynamicTheater | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  React.useEffect(() => {
    if (isOpen && initialTheater) {
      const mappedTheater: DynamicTheater = {
        id: initialTheater.id,
        title: initialTheater.title,
        desc: initialTheater.desc,
        bgImage: initialTheater.bgImage,
        roleName: initialTheater.speaker || initialTheater.roleName || '陆景琛',
        scenes: initialTheater.scenes || []
      };
      setSelectedTheater(mappedTheater);
      setIsPlaying(true);
      setActiveSceneIndex(0);
      setCustomSceneId('start');
      setIntimacyScore(0);
      setInteractionStep('narration');
    }
  }, [isOpen, initialTheater]);
  
  // Active Scene Playing States
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [customSceneId, setCustomSceneId] = useState('start');
  const [intimacyScore, setIntimacyScore] = useState(0);
  const [interactionStep, setInteractionStep] = useState<'narration' | 'dialogue' | 'choices'>('narration');
  const [choiceDrivenBg, setChoiceDrivenBg] = useState<string | null>(null);

  const getSpeakerAvatar = (speaker?: string, sceneAvatar?: string, theaterRoleName?: string) => {
    if (sceneAvatar) return sceneAvatar;
    const name = speaker || theaterRoleName || '陆景琛';
    if (name.includes('陆景琛') || name.includes('陆星野') || name.includes('凌夜')) {
      return ROLE_MEDIA_MAP.lujingchen?.portraitUrl || imgAnimeBully;
    }
    if (name.includes('林慕白')) return ROLE_MEDIA_MAP.linmubai?.portraitUrl || imgAnimeSpriteLinmubai;
    if (name.includes('顾北辰')) return ROLE_MEDIA_MAP.gubeichen?.portraitUrl;
    if (name.includes('顾夜白')) return ROLE_MEDIA_MAP.guyebai?.portraitUrl;
    if (name.includes('顾言川')) return ROLE_MEDIA_MAP.guyanchuan?.portraitUrl;
    if (name.includes('林小柔')) return ROLE_MEDIA_MAP.linxiaorou?.portraitUrl;
    if (name.includes('林小满')) return ROLE_MEDIA_MAP.linxiaoman?.portraitUrl;
    if (name.includes('沈清欢')) return ROLE_MEDIA_MAP.shenqinghuan?.portraitUrl;
    if (name.includes('糖糖')) return ROLE_MEDIA_MAP.tangtang?.portraitUrl;
    if (name.includes('林知夏')) return ROLE_MEDIA_MAP.linzhixia?.portraitUrl;
    if (name.includes('顾婉清')) return ROLE_MEDIA_MAP.guwanqing?.portraitUrl;
    return imgAnimeBully;
  };

  if (!isOpen) return null;

  // Compile all available theaters with high fidelity customized generated backgrounds matching the title
  const allTheaters: DynamicTheater[] = [
    {
      id: 'theater_ljc_1',
      title: '《豪门书房的夜读演练》',
      desc: '文字互动 + 动态光影 + 沉浸原声语音 + 雨夜书房背景',
      bgImage: imgMansionStudy,
      roleName: '陆景琛',
      scenes: DEFAULT_THEATERS.lujingchen?.[0]?.scenes || []
    },
    {
      id: 'theater_ljc_2',
      title: '《游艇夜宴的星空拥吻》',
      desc: '文字抉择 + 海浪动态视觉 + 独白配音 + 豪华游艇背景',
      bgImage: imgYachtNight,
      roleName: '陆景琛',
      scenes: DEFAULT_THEATERS.lujingchen?.[1]?.scenes || []
    },
    {
      id: 'theater_ljc_3',
      title: '《试衣间里的霸道宣示》',
      desc: '互动对话 + 奢华场景 + 角色原声配音 + 高定试衣间',
      bgImage: imgFittingRoom,
      roleName: '陆景琛',
      scenes: DEFAULT_THEATERS.lujingchen?.[2]?.scenes || []
    },
    {
      id: 'theater_mb_1',
      title: '《雨夜车厢里的倾诉》',
      desc: '文字选择 + 动态雨丝 + 原音独白语音 + 复古车内背景',
      bgImage: imgCarRain,
      roleName: '林慕白',
      scenes: DEFAULT_THEATERS.linmubai?.[0]?.scenes || []
    },
    {
      id: 'theater_mb_2',
      title: '《天文台的夏夜看星》',
      desc: '文字选择 + 璀璨星空 GIF + 柔和原音 + 观测台背景',
      bgImage: imgObservatory,
      roleName: '林慕白',
      scenes: DEFAULT_THEATERS.linmubai?.[1]?.scenes || []
    },
    {
      id: 'theater_gbc_1',
      title: '《阳台小酌与心事倾诉》',
      desc: '文字互动 + 微风夜景 GIF + 暖心语调 + 阳台夜景背景',
      bgImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80',
      roleName: '顾北辰',
      scenes: DEFAULT_THEATERS.gubeichen?.[0]?.scenes || []
    },
    {
      id: 'theater_gyb_1',
      title: '《私人陈列室的永恒锁扣》',
      desc: '文字互动 + 幽暗光影 GIF + 磁性低语 + 奢华暗室背景',
      bgImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80',
      roleName: '顾夜白',
      scenes: DEFAULT_THEATERS.guyebai?.[0]?.scenes || []
    }
  ];

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  };

  const handleFavoriteToggle = (id: string) => {
    onToggleFavorite(id);
    const isFav = !theaterFavorites[id];
    onShowToast(isFav ? '❤️ 已加入私人剧场收藏夹' : '💔 已从收藏夹中移除');
  };

  const handleEnterTheater = (theater: DynamicTheater) => {
    playBeep();
    setIsPlaying(true);
    setActiveSceneIndex(0);
    setCustomSceneId('start');
    setIntimacyScore(0);
    setInteractionStep('narration');
    setChoiceDrivenBg(null);
    onShowToast(`🎬 正在加载：${theater.title}`);
  };

  // Dialogue selection action
  const handleNextStep = (choiceText: string, nextId?: string, intimacyGain: number = 10, toastMsg?: string) => {
    playBeep();

    // Choice driven background update
    const choiceBg = resolveTheaterBg(choiceText, undefined, true);
    if (choiceBg) setChoiceDrivenBg(choiceBg);

    if (toastMsg) {
      onShowToast(toastMsg);
    } else {
      onShowToast(`选择: "${choiceText}" 心动加深!`);
    }

    if (intimacyGain > 0) {
      setIntimacyScore(prev => prev + intimacyGain);
    }

    // Reset back to narration for next scene
    setInteractionStep('narration');

    if (selectedTheater?.id === 'theater_school_bully') {
      if (nextId) {
        setCustomSceneId(nextId);
      }
    } else {
      // Normal sequential scenes
      if (selectedTheater && activeSceneIndex < selectedTheater.scenes.length - 1) {
        setActiveSceneIndex(prev => prev + 1);
      } else {
        // End of scenes, loop or reset
        onShowToast('✨ 剧场剧情播放完成！已解锁专属心动日记');
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center bg-black/95">
      {/* Simulation Mobile Container */}
      <div className="relative w-full max-w-[390px] h-[844px] max-h-screen bg-black flex flex-col overflow-hidden text-white font-sans select-none shadow-[0_0_50px_rgba(139,92,246,0.3)]">
        
        {/* LOBBY / SELECTION SCREEN */}
        {!selectedTheater ? (
          <div className="w-full h-full flex flex-col pt-8 pb-4">
            
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 shrink-0">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center border border-white/5 active:scale-95 transition cursor-pointer"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <h2 className="text-sm font-black tracking-widest text-purple-300 flex items-center gap-1.5">
                <Clapperboard size={16} />
                <span>官方认证 互动影音剧场</span>
              </h2>
              <div className="w-9 h-9" />
            </div>

            {/* Scrolling list of all theaters */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar">
              <div className="space-y-1">
                <h3 className="text-lg font-black tracking-wider text-white">影视推荐</h3>
                <p className="text-[10px] text-white/50">点击剧本解锁专属沉浸视频，带你身临其境开启命运浪漫对决</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {allTheaters.map((th) => (
                  <div
                    key={th.id}
                    onClick={() => {
                      playBeep();
                      setSelectedTheater(th);
                    }}
                    className="group relative h-[180px] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition duration-300 cursor-pointer shadow-lg flex flex-col justify-end p-4"
                  >
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={th.bgImage}
                        alt={th.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>

                    {/* Meta info */}
                    <div className="relative z-10 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-purple-500 text-white font-black px-1.5 py-0.5 rounded uppercase">
                          {th.roleName}
                        </span>
                        {theaterFavorites[th.id] && <Star size={12} className="text-rose-400 fill-current animate-pulse" />}
                      </div>
                      <h4 className="text-sm font-black text-white drop-shadow-md group-hover:text-purple-300 transition-colors">
                        {th.title}
                      </h4>
                      <p className="text-[9px] text-white/70 line-clamp-1 drop-shadow-sm">
                        {th.desc}
                      </p>
                    </div>

                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/5 text-[8px] font-bold text-purple-200">
                      点击进入首页 ➔
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          
          /* THEATER DETAIL OR ACTIVE PLAY SCREEN */
          <div className="w-full h-full relative">
            
            {/* SCREEN 1: DYNAMIC COVER PAGE (EXACT MATCH OF SECOND SCREENSHOT) */}
            {!isPlaying ? (
              <div className="w-full h-full relative flex flex-col justify-between pt-24 pb-12 px-6">
                
                {/* DYNAMIC BACKGROUND IMAGE GENERATED BASED ON THE TITLE */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={selectedTheater.bgImage}
                    alt={selectedTheater.title}
                    className="w-full h-full object-cover scale-[1.01]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Rich dark vignettes matching the screenshot styling exactly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/80" />
                </div>

                {/* Top Title on header bar */}
                <div className="absolute top-8 inset-x-0 z-30 px-4 flex items-center justify-between">
                  <button
                    onClick={() => {
                      playBeep();
                      setSelectedTheater(null);
                    }}
                    className="w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center border border-white/10 active:scale-95 transition cursor-pointer"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <div />
                  <div className="w-9 h-9" />
                </div>

                {/* CENTER PIECE: BIG BOLD ARTISTIC TITLE */}
                <div className="flex-1 flex flex-col justify-center items-center text-center px-2 z-10 my-auto">
                  <ArtisticTheaterTitle title={selectedTheater.title} />

                  {/* Slogan only for school bully, empty for others */}
                  {selectedTheater.id === 'theater_school_bully' && (
                    <p className="mt-2 text-[10px] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] font-bold tracking-[0.1em] max-w-[280px] mx-auto bg-black/30 py-1.5 px-3 rounded-full border border-white/5 backdrop-blur-xs">
                      前世他害我惨死，今生我嫁给他弟。
                    </p>
                  )}
                </div>

                {/* BOTTOM ACTIONS (收藏 & 进入 - Styled exactly like the screenshot) */}
                <div className="grid grid-cols-2 gap-4 relative z-10 px-2">
                  {/* 收藏 */}
                  <button
                    onClick={() => handleFavoriteToggle(selectedTheater.id)}
                    className={`py-3 px-6 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs border backdrop-blur-md active:scale-95 transition cursor-pointer ${
                      theaterFavorites[selectedTheater.id]
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                        : 'bg-white/10 hover:bg-white/15 border-white/10 text-white/90'
                    }`}
                  >
                    {theaterFavorites[selectedTheater.id] ? <Check size={14} /> : <Bookmark size={14} />}
                    <span>{theaterFavorites[selectedTheater.id] ? '已收藏' : '收藏'}</span>
                  </button>

                  {/* 进入 */}
                  <button
                    onClick={() => handleEnterTheater(selectedTheater)}
                    className="py-3 px-6 bg-white/90 hover:bg-white text-black rounded-xl flex items-center justify-center gap-1.5 font-black text-xs shadow-lg active:scale-95 transition cursor-pointer"
                  >
                    <Play size={14} className="fill-current" />
                    <span>进入</span>
                  </button>
                </div>

                {/* AI generated tag */}
                <div className="absolute bottom-2.5 right-4 z-10 text-[8px] text-white/30 font-bold">
                  内容由AI生成
                </div>

              </div>
            ) : (
              
              /* SCREEN 2: ACTIVE PLAY EXPERIENCE (3-STAGE SEQUENTIAL INTERACTION: NARRATION -> DIALOGUE -> CHOICES) */
              (() => {
                const currentRawScene = selectedTheater.scenes[activeSceneIndex];
                const rawNarration = currentRawScene?.narrationText;
                const rawDialogue = currentRawScene?.dialogue;
                const speakerName = currentRawScene?.speaker || selectedTheater.roleName || 'Ta';

                let resolvedNarration = rawNarration;
                if (!resolvedNarration) {
                  if (rawDialogue?.startsWith('（')) {
                    const actionInParen = rawDialogue.slice(1, rawDialogue.indexOf('）'));
                    resolvedNarration = `${speakerName}${actionInParen}。空气中弥漫着柔和而令人怦然心动的气息，属于你们的独家故事悄然展开……`;
                  } else if (selectedTheater.title?.includes('星空') || selectedTheater.title?.includes('倾诉')) {
                    resolvedNarration = `${speakerName}站在无垠的星空下凝视着你，夜风拂过衣角，漫天繁星如璀璨碎钻洒满深蓝天幕……`;
                  } else if (selectedTheater.title?.includes('雨') || selectedTheater.title?.includes('阳台')) {
                    resolvedNarration = `阳台上雨丝淅沥，夜色深沉而宁静。${speakerName}转过身看向你，眼底漾着温柔的光采……`;
                  } else if (selectedTheater.title?.includes('甜品') || selectedTheater.title?.includes('午后')) {
                    resolvedNarration = `午后温馨的光影洒落在茶几上，甜美的香气随风漫延。${speakerName}微笑着招手示意你过去……`;
                  } else {
                    resolvedNarration = `${speakerName}立于温情弥漫的光影之中，眼含深情地注视着你，周围的一切都在这一刻安静下来……`;
                  }
                }

                const bgToUse = choiceDrivenBg || resolveTheaterBg(selectedTheater.title, selectedTheater.bgImage);

                const activeScene = selectedTheater.id === 'theater_school_bully'
                  ? (BULLY_SCENES.find(s => s.id === customSceneId) || BULLY_SCENES[0])
                  : {
                      id: `scene_${activeSceneIndex}`,
                      chapterTitle: currentRawScene?.chapterTitle?.replace(/^第\s*\d+\s*章\s*·\s*/, '') || selectedTheater.title?.replace(/[《》]/g, '') || '心动羁绊',
                      narrationText: resolvedNarration,
                      speaker: speakerName,
                      roleAvatar: imgAnimeBully,
                      dialogue: rawDialogue || '你终于来了。以为躲着我就能当作一切没发生过么？',
                      callTime: '08:03',
                      choicePrompt: '这一刻，你可以——',
                      choices: (currentRawScene?.choices && currentRawScene.choices.length > 0)
                        ? currentRawScene.choices.map((c: any) => typeof c === 'string' ? { text: c, intimacyGain: 10 } : c)
                        : [
                            { text: '◇ 保持克制，退后一步', intimacyGain: 10, toastMsg: '退后避让，好感度 +10' },
                            { text: '拉校霸入伙：一起干翻陆家', isHighlight: true, costDiamond: 100, highlightTag: '高光剧情', intimacyGain: 35, toastMsg: '💎 消耗100钻石！解锁反击高光剧情 +35' }
                          ]
                    };

                return (
                  <div className="w-full h-full relative flex flex-col justify-between pt-10 pb-6 bg-black overflow-hidden font-sans">
                    
                    {/* Full Screen HD Background Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={bgToUse}
                        alt="Play background"
                        className="w-full h-full object-cover brightness-[0.70] contrast-[1.05] transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
                    </div>

                    {/* Top Header Bar */}
                    <div className="relative z-30 px-4 flex items-center justify-between shrink-0">
                      <button
                        onClick={() => {
                          playBeep();
                          setIsPlaying(false);
                        }}
                        className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center border border-white/20 backdrop-blur-md cursor-pointer transition active:scale-90"
                      >
                        <ChevronLeft size={20} className="text-white" />
                      </button>

                      <h2 className="text-sm sm:text-base font-bold text-white tracking-wide truncate max-w-[200px] text-center drop-shadow-md">
                        {selectedTheater.title.replace(/[《》]/g, '')}
                      </h2>

                      <div className="w-9 h-9" />
                    </div>

                    {/* Chapter Pill Badge near Top */}
                    <div className="relative z-30 flex justify-center pt-2 shrink-0">
                      <div
                        onClick={() => onShowToast(`📖 当前正在阅读：《${selectedTheater.title}》`)}
                        className="px-5 py-1.5 rounded-full bg-[#e2d5cb]/20 border border-[#e2d5cb]/30 backdrop-blur-md text-xs font-bold text-[#f3ece7] tracking-wider shadow-lg hover:bg-[#e2d5cb]/35 cursor-pointer transition active:scale-95"
                      >
                        第 {selectedTheater.id === 'theater_school_bully' ? (BULLY_SCENES.findIndex(s => s.id === customSceneId) + 1) : (activeSceneIndex + 1)} 章 · {activeScene.chapterTitle.replace(/^第\s*\d+\s*章\s*·\s*/, '')}
                      </div>
                    </div>

                    {/* Right-Hand Vertical Action Toolbar (Matches Image 1, 2, 3) */}
                    <div className="absolute right-3.5 top-24 z-30 flex flex-col items-center gap-2.5">
                      {/* Catalog Button */}
                      <button
                        type="button"
                        onClick={() => onShowToast(`📖 当前在《${selectedTheater.title}》章节内`)}
                        className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] shadow-lg transition active:scale-90 cursor-pointer"
                        title="章节目录"
                      >
                        <BookOpen size={16} />
                      </button>

                      {/* AI Settings Button */}
                      <button
                        type="button"
                        onClick={() => onShowToast('✦ AI导演气场已调至极致沉浸状态')}
                        className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] shadow-lg transition active:scale-90 cursor-pointer"
                        title="AI设置"
                      >
                        <Sparkles size={16} className="text-amber-200 animate-pulse" />
                      </button>

                      {/* Replay Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setCustomSceneId('start');
                          setActiveSceneIndex(0);
                          setInteractionStep('narration');
                          setChoiceDrivenBg(null);
                          onShowToast('↺ 剧情已重置到章节开头');
                        }}
                        className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] shadow-lg transition active:scale-90 cursor-pointer"
                        title="重播"
                      >
                        <RotateCcw size={16} />
                      </button>

                      {/* Audio Toggle Button */}
                      <button
                        type="button"
                        onClick={() => onShowToast('♪ 沉浸原声背景音乐已开启')}
                        className="w-10 h-10 rounded-full bg-[#e2d5cb]/25 hover:bg-[#e2d5cb]/40 border border-[#e2d5cb]/30 backdrop-blur-md flex items-center justify-center text-[#f3ece7] shadow-lg transition active:scale-90 cursor-pointer"
                        title="背景音乐"
                      >
                        <Music size={16} />
                      </button>
                    </div>

                    {/* ================= STAGE 1: NARRATION (EXACT MATCH FOR IMAGE 1) ================= */}
                    {interactionStep === 'narration' && (
                      <div 
                        onClick={() => {
                          playBeep();
                          setInteractionStep('dialogue');
                          setChoiceDrivenBg(null);
                        }}
                        className="relative z-20 flex-1 flex flex-col justify-end px-6 pb-10 cursor-pointer select-none group animate-fadeIn"
                      >
                        <p className="text-base sm:text-lg text-[#fdfbf7] font-normal leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                          {activeScene.narrationText}
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
                        onClick={() => {
                          playBeep();
                          setInteractionStep('choices');
                          setChoiceDrivenBg(null);
                        }}
                        className="relative z-20 flex-1 flex flex-col justify-end px-4 pb-8 cursor-pointer select-none animate-fadeIn"
                      >
                        {/* Male Main Lead Portrait Standee in Center */}
                        <div className="absolute inset-x-0 bottom-28 top-16 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
                          <TransparentSprite
                            src={getSpeakerAvatar(activeScene.speaker, activeScene.roleAvatar, selectedTheater?.roleName)}
                            alt={activeScene.speaker || '角色'}
                            className="h-full max-h-[480px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                          />
                        </div>

                        {/* Dialogue Box Area */}
                        <div className="relative z-20 pt-3 group active:scale-[0.99] transition">
                          {/* Speaker Badge */}
                          <div className="absolute -top-2 left-4 z-30 px-4 py-1 rounded-2xl bg-white/95 text-slate-900 text-xs font-black shadow-lg border border-white/50 tracking-wider">
                            {activeScene.speaker || '陆星野'}
                          </div>

                          {/* Light Semi-transparent Card */}
                          <div className="p-5 pt-6 rounded-3xl bg-[#f5f1eb]/90 backdrop-blur-md border border-white/80 shadow-2xl relative text-slate-800">
                            <p className="text-sm sm:text-base text-[#1e1a24] font-medium leading-relaxed tracking-wide">
                              {activeScene.dialogue}
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
                      <div className="relative z-20 flex-1 flex flex-col justify-end px-5 pb-8 space-y-4 select-none animate-fadeIn">
                        
                        {/* Option Prompt Banner */}
                        <div className="w-full text-center py-3 px-6 rounded-2xl bg-[#e2d5cb]/30 border border-[#e2d5cb]/40 backdrop-blur-md text-[#f3ece7] text-sm font-bold shadow-lg">
                          {activeScene.choicePrompt || '这一刻，你可以——'}
                        </div>

                        {/* Interactive Choice Options */}
                        <div className="space-y-3">
                          {activeScene.choices.map((choice: any, idx: number) => {
                            const rawText = typeof choice === 'string' ? choice : (choice.text || '做出回应');
                            const cleanText = rawText.replace(/^◇\s*/, '');
                            return (
                              <button
                                key={idx}
                                onClick={() => handleNextStep(cleanText, choice.nextId, choice.intimacyGain, choice.toastMsg)}
                                className="w-full text-left p-4 rounded-2xl bg-[#e2d5cb]/20 hover:bg-[#e2d5cb]/35 border border-[#e2d5cb]/30 text-[#f3ece7] font-bold text-xs sm:text-sm transition active:scale-98 shadow-xl backdrop-blur-md cursor-pointer flex items-center group"
                              >
                                <span className="inline-flex items-center justify-center shrink-0 w-4 h-4 mr-2.5">
                                  <span className="w-2 h-2 rotate-45 border border-amber-300/80 bg-amber-300/30 group-hover:scale-125 group-hover:bg-amber-300 group-hover:shadow-[0_0_8px_rgba(252,211,77,0.8)] transition-all duration-200" />
                                </span>
                                <span className="leading-snug">{cleanText}</span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="text-right pt-2">
                          <span className="text-[9px] text-white/40 tracking-wider">内容由AI生成</span>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })()
            )}

          </div>
        )}

      </div>
    </div>
  );
};
