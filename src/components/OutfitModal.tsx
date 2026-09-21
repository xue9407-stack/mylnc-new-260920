import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shirt, Sparkles, RefreshCw, Undo2, Redo2, Check, Palette, Gem, ShoppingBag, Heart, Sparkle } from 'lucide-react';
import { Role } from '../types';
import { ROLE_MEDIA_MAP } from '../data/rolePortraits';

// Import realistic photos
import imgLuJingchenReal from '../assets/images/ceo_lujingchen_real_1789719543268.jpg';
import imgLinMubaiReal from '../assets/images/senpai_mubai_real_1789719562943.jpg';
import imgGuBeichenReal from '../assets/images/sunny_beichen_real_1789719582562.jpg';
import imgGuYebaiReal from '../assets/images/yandere_yebai_real_1789719606303.jpg';
import imgGuYanchuanReal from '../assets/images/doctor_yanchuan_real_1789719623405.jpg';
import imgLinXiaorouReal from '../assets/images/girl_xiaorou_real_1789719641724.jpg';
import imgLinXiaomanReal from '../assets/images/lively_xiaoman_real_1789719749753.jpg';
import imgShenQinghuanReal from '../assets/images/queen_qinghuan_real_1789719662262.jpg';
import imgTangtangReal from '../assets/images/loli_tangtang_real_1789719708711.jpg';
import imgLinZhixiaReal from '../assets/images/intellectual_zhixia_real_1789719727614.jpg';
import imgGuWanqingReal from '../assets/images/heiress_wanqing_real_1789719686818.jpg';

// Import alternative anime photo
import imgLuJingchenAlt from '../assets/images/anime_ceo_lujingchen_1789543303270.jpg';

// Import newly generated high-quality anime outfits wearing clothes
import imgLuJingchenAcademy from '../assets/images/lujingchen_academy_1789892517909.jpg';
import imgLuJingchenHome from '../assets/images/lujingchen_home_1789892572872.jpg';
import imgLuJingchenParty from '../assets/images/lujingchen_party_1789892532677.jpg';
import imgLuJingchenSporty from '../assets/images/lujingchen_sporty_1789893870538.jpg';
import imgLuJingchenUniform from '../assets/images/lujingchen_uniform_1789893888707.jpg';
import imgXiaorouAcademy from '../assets/images/xiaorou_academy_1789892545753.jpg';
import imgXiaorouParty from '../assets/images/xiaorou_party_1789892559233.jpg';
import imgXiaorouSporty from '../assets/images/xiaorou_sporty_1789893907494.jpg';
import imgXiaorouHome from '../assets/images/xiaorou_home_1789893921043.jpg';
import imgXiaorouUniform from '../assets/images/xiaorou_uniform_1789893933360.jpg';

// Import newly generated high-quality assets for Mubai and Wanqing
import imgMubaiAcademy from '../assets/images/mubai_academy_1789893973332.jpg';
import imgMubaiParty from '../assets/images/mubai_party_1789893986232.jpg';
import imgMubaiHome from '../assets/images/mubai_home_1789894413378.jpg';
import imgMubaiSporty from '../assets/images/mubai_sporty_1789894422764.jpg';
import imgMubaiUniform from '../assets/images/mubai_uniform_1789894434163.jpg';
import imgWanqingAcademy from '../assets/images/wanqing_academy_1789893997358.jpg';
import imgWanqingParty from '../assets/images/wanqing_party_1789894009773.jpg';
import imgWanqingHome from '../assets/images/wanqing_home_1789894376742.jpg';
import imgWanqingSporty from '../assets/images/wanqing_sporty_1789894389623.jpg';
import imgWanqingUniform from '../assets/images/wanqing_uniform_1789894401305.jpg';

interface OutfitModalProps {
  isOpen: boolean;
  roles: Role[];
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

// 5 Main Outfit Styles Requested
interface OutfitSuit {
  id: string; // 'academy' | 'sporty' | 'home' | 'uniform' | 'party'
  name: string;
  slogan: string;
  desc: string;
  emoji: string;
  cost: number;
  colorThemes: { name: string; color: string; tint: string }[];
}

const OUTFIT_SUITS: OutfitSuit[] = [
  {
    id: 'academy',
    name: '学院风・青春纪念',
    slogan: '🏫 雅致英伦校服',
    desc: '经典双排扣制式徽章呢大衣、条纹领带与百褶裙/西裤，溢满青涩校园气息',
    emoji: '🏫',
    cost: 180,
    colorThemes: [
      { name: '经典藏蓝', color: '#1e3a8a', tint: 'rgba(30,58,138,0.18)' },
      { name: '常春藤绿', color: '#064e3b', tint: 'rgba(6,78,59,0.18)' },
      { name: '枫叶暗红', color: '#7f1d1d', tint: 'rgba(127,29,29,0.18)' }
    ]
  },
  {
    id: 'uniform',
    name: '职业制服・王牌气场',
    slogan: '👔 极简高奢定制正装',
    desc: '挺括修身意式剪裁西装外套、骨干立领免烫衬衫，展露从容不迫的职业风骨',
    emoji: '👔',
    cost: 260,
    colorThemes: [
      { name: '冷酷墨竹黑', color: '#111827', tint: 'rgba(17,24,39,0.22)' },
      { name: '深海幽邃蓝', color: '#1e3a8a', tint: 'rgba(30,58,138,0.22)' },
      { name: '琥珀焦糖棕', color: '#78350f', tint: 'rgba(120,53,15,0.22)' }
    ]
  },
  {
    id: 'sporty',
    name: '运动风・活力狂潮',
    slogan: '👟 潮酷拼接运动装',
    desc: '防风工装拼接外套、潮流束脚卫裤与厚底缓震板鞋，释放无拘无束的纯真活力',
    emoji: '👟',
    cost: 160,
    colorThemes: [
      { name: '晨曦活力橘', color: '#ea580c', tint: 'rgba(234,88,12,0.18)' },
      { name: '曜石酷冷黑', color: '#1f2937', tint: 'rgba(31,41,55,0.18)' },
      { name: '极地冰川蓝', color: '#0284c7', tint: 'rgba(2,132,199,0.18)' }
    ]
  },
  {
    id: 'home',
    name: '家居装扮・慵懒日常',
    slogan: '☕ 软糯绒毛居家服',
    desc: '宽松慵懒麻花针织衫、暖融云朵棉睡裤与羊羔绒小熊拖鞋，独享温馨治愈时光',
    emoji: '☕',
    cost: 120,
    colorThemes: [
      { name: '燕麦软糯奶', color: '#d97706', tint: 'rgba(217,119,6,0.15)' },
      { name: '樱花香蒲粉', color: '#ec4899', tint: 'rgba(236,72,153,0.15)' },
      { name: '清茶极简灰', color: '#9ca3af', tint: 'rgba(156,163,175,0.15)' }
    ]
  },
  {
    id: 'party',
    name: '派对装・璀璨星芒',
    slogan: '✨ 熠熠高定盛宴晚礼',
    desc: '奢华暗纹星光燕尾服或金丝亮片高定鱼尾裙，配极光颈链，今夜全场瞩目焦点',
    emoji: '✨',
    cost: 390,
    colorThemes: [
      { name: '璀璨流砂金', color: '#fbbf24', tint: 'rgba(251,191,36,0.2)' },
      { name: '极夜星辉紫', color: '#4c1d95', tint: 'rgba(76,29,149,0.2)' },
      { name: '玫瑰极夜红', color: '#be185d', tint: 'rgba(190,24,93,0.2)' }
    ]
  }
];

export const OutfitModal: React.FC<OutfitModalProps> = ({
  isOpen,
  roles,
  onClose,
  onShowToast,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [mode, setMode] = useState<'pick' | 'generate' | 'fitting'>('pick');
  const [selectedStyle, setSelectedStyle] = useState<'original' | 'anime' | 'cg' | 'realistic'>('anime');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasUnlockedFullBody, setHasUnlockedFullBody] = useState<Record<string, boolean>>({
    lujingchen: true,
    linxiaorou: false,
    guwanqing: false,
  });

  const [userDiamonds, setUserDiamonds] = useState(4850);
  
  // Equipped outfit state - Default is uniform
  const [activeOutfitId, setActiveOutfitId] = useState<string>('uniform');
  const [selectedColorIdx, setSelectedColorIdx] = useState<number>(0);

  // Undo/Redo historical outfits stack
  const [historyStack, setHistoryStack] = useState<{ id: string; colorIdx: number }[]>([
    { id: 'uniform', colorIdx: 0 }
  ]);
  const [historyPointer, setHistoryPointer] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setMode('pick');
      setSelectedRole(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Curate dynamic unified full-body portraits based on the active Outfit Set
  const getCoordinatedFullBodyImage = (roleId: string, outfitId: string, style: string) => {
    // If realistic style is chosen, return the real photo
    if (style === 'realistic') {
      const realImages: Record<string, string> = {
        lujingchen: imgLuJingchenReal,
        linmubai: imgLinMubaiReal,
        gubeichen: imgGuBeichenReal,
        guyebai: imgGuYebaiReal,
        guyanchuan: imgGuYanchuanReal,
        linxiaorou: imgLinXiaorouReal,
        linxiaoman: imgLinXiaomanReal,
        shenqinghuan: imgShenQinghuanReal,
        tangtang: imgTangtangReal,
        linzhixia: imgLinZhixiaReal,
        guwanqing: imgGuWanqingReal,
      };
      return realImages[roleId] || imgLuJingchenReal;
    }

    // Default/Anime/CG matching: Curate highly optimized images that match the role and selected suit theme
    // When uniform (极简高奢定制正装) is selected, return the gorgeous original initial/original HD portrait!
    if (outfitId === 'uniform') {
      return ROLE_MEDIA_MAP[roleId]?.portraitUrl || ROLE_MEDIA_MAP[roleId]?.avatarUrl || imgLuJingchenAlt;
    }

    if (roleId === 'lujingchen') {
      if (outfitId === 'sporty') return imgLuJingchenSporty; // Modern silver hair color-blocked windbreaker sporty outfit
      if (outfitId === 'academy') return imgLuJingchenAcademy; // Classic British navy insignia academy blazer coat
      if (outfitId === 'home') return imgLuJingchenHome; // Warm oversized cozy cream cable-knit knitwear
      return imgLuJingchenParty; // High-end stellar custom starry bespoke tuxedo party gown
    }

    if (roleId === 'linxiaorou') {
      if (outfitId === 'academy') return imgXiaorouAcademy; // Custom Private Academy Navy Suit and Pleated Plaid Skirt
      if (outfitId === 'party') return imgXiaorouParty; // Custom Pink Sequin High-end Sparkle Diamond Gala Evening Gown
      if (outfitId === 'sporty') return imgXiaorouSporty; // Pastel pink-and-white athletic windbreaker sporty set
      if (outfitId === 'home') return imgXiaorouHome; // Soft oversized cream knit pajama sweater holding warm cocoa mug
      return imgXiaorouUniform; // Neat customized navy blue office lady tailored suit blazer
    }

    if (roleId === 'linmubai') {
      if (outfitId === 'academy') return imgMubaiAcademy; // Elite cherry blossom dark navy school blazer & red stripe tie
      if (outfitId === 'party') return imgMubaiParty; // Elegant deep black silk dinner tuxedo with elegant black bow tie
      if (outfitId === 'home') return imgMubaiHome; // Gentle black-haired senpai in cozy warm cream turtleneck sweater
      if (outfitId === 'sporty') return imgMubaiSporty; // Gentle black-haired senpai in white athletic jacket with stripes
      return imgMubaiUniform; // Gentle black-haired senpai in slate-gray professional business suit
    }

    if (roleId === 'guwanqing') {
      if (outfitId === 'academy') return imgWanqingAcademy; // Elite proud princess academy blazer uniform with gold crown
      if (outfitId === 'party') return imgWanqingParty; // Starry starry night gold-accented luxurious black velvet evening dress
      if (outfitId === 'home') return imgWanqingHome; // Proud heiress in cozy soft fluffy pink lounge pajamas with warm fleece hoodie
      if (outfitId === 'sporty') return imgWanqingSporty; // Proud heiress in black-and-gold luxury athletic jacket with crown
      return imgWanqingUniform; // Proud heiress in navy blue tailored dress blazer with gold crown
    }

    // For all other roles, we return their OWN completely unique, distinct base anime portrait (100% unique face, look, and personality!)
    const portrait = ROLE_MEDIA_MAP[roleId]?.portraitUrl || ROLE_MEDIA_MAP[roleId]?.avatarUrl;
    return portrait || imgLuJingchenAlt;
  };

  const logStateChange = (newOutfitId: string, newColorIdx: number) => {
    const nextHistory = historyStack.slice(0, historyPointer + 1);
    nextHistory.push({ id: newOutfitId, colorIdx: newColorIdx });
    setHistoryStack(nextHistory);
    setHistoryPointer(nextHistory.length - 1);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (hasUnlockedFullBody[role.id]) {
      setMode('fitting');
      setActiveOutfitId('uniform');
      setSelectedColorIdx(0);
      setHistoryStack([{ id: 'uniform', colorIdx: 0 }]);
      setHistoryPointer(0);
    } else {
      setMode('generate');
    }
  };

  const handleGenerateFullBody = () => {
    if (!selectedRole) return;
    setIsGenerating(true);
    onShowToast(`⚡ 正在绘制【${selectedRole.name}】的专属全身比例模型...`);

    setTimeout(() => {
      setIsGenerating(false);
      setHasUnlockedFullBody(prev => ({ ...prev, [selectedRole.id]: true }));
      onShowToast(`🎉 ${selectedRole.name} 的全身形象配装工坊已成功开启！`);
      setMode('fitting');
      setActiveOutfitId('uniform');
      setSelectedColorIdx(0);
      setHistoryStack([{ id: 'uniform', colorIdx: 0 }]);
      setHistoryPointer(0);
    }, 1500);
  };

  const handleEquipOutfit = (outfit: OutfitSuit) => {
    setActiveOutfitId(outfit.id);
    setSelectedColorIdx(0);
    logStateChange(outfit.id, 0);
    onShowToast(`✨ 试穿套装：${outfit.name}`);
  };

  const handleSelectColorTheme = (colorIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColorIdx(colorIdx);
    logStateChange(activeOutfitId, colorIdx);
    onShowToast('🎨 套装色系已更新，配色完美契合！');
  };

  const handleUndo = () => {
    if (historyPointer > 0) {
      const prevPointer = historyPointer - 1;
      setHistoryPointer(prevPointer);
      const state = historyStack[prevPointer];
      setActiveOutfitId(state.id);
      setSelectedColorIdx(state.colorIdx);
      onShowToast('↩️ 已撤销至上一次搭配');
    } else {
      onShowToast('已经是最初的搭配了');
    }
  };

  const handleRedo = () => {
    if (historyPointer < historyStack.length - 1) {
      const nextPointer = historyPointer + 1;
      setHistoryPointer(nextPointer);
      const state = historyStack[nextPointer];
      setActiveOutfitId(state.id);
      setSelectedColorIdx(state.colorIdx);
      onShowToast('↪️ 已重做至下一个搭配');
    } else {
      onShowToast('已经是最新搭配了');
    }
  };

  const handleReset = () => {
    setActiveOutfitId('uniform');
    setSelectedColorIdx(0);
    logStateChange('uniform', 0);
    onShowToast('🧹 已重置为初始原画形象');
  };

  const handleSaveAndApply = () => {
    if (!selectedRole) return;
    const suit = OUTFIT_SUITS.find(s => s.id === activeOutfitId);
    onShowToast(`💖 ${selectedRole.name}的【${suit?.name}】套装形象已成功保存！`);
    onClose();
  };

  // Helper to get active tint lighting color based on selected theme
  const getActiveTintColor = () => {
    const suit = OUTFIT_SUITS.find(s => s.id === activeOutfitId);
    if (suit && suit.colorThemes[selectedColorIdx]) {
      return suit.colorThemes[selectedColorIdx].tint;
    }
    return null;
  };

  // Helper to get matching paper tags based on gender and style selection for realistic detail matching Image 1
  const getOutfitAnnotationTags = (roleId: string, outfitId: string) => {
    const isFemale = ['linxiaorou', 'linxiaoman', 'shenqinghuan', 'tangtang', 'linzhixia', 'guwanqing'].includes(roleId);
    
    if (outfitId === 'academy') {
      return [
        { emoji: '🧥', title: '英伦徽章呢大衣' },
        { emoji: isFemale ? '👗' : '👖', title: isFemale ? '格纹百褶校服裙' : '格纹制式西装裤' },
        { emoji: '👞', title: '乐福学院风皮鞋' }
      ];
    }
    if (outfitId === 'sporty') {
      return [
        { emoji: '🧥', title: '抽绳工装卫衣' },
        { emoji: '👖', title: '撞色束脚运动裤' },
        { emoji: '👟', title: '气垫缓震板鞋' }
      ];
    }
    if (outfitId === 'home') {
      return [
        { emoji: '🧥', title: '粗线麻花针织衫' },
        { emoji: '👖', title: '抓绒亲肤云朵裤' },
        { emoji: '🧸', title: '羊羔绒保暖棉拖' }
      ];
    }
    if (outfitId === 'uniform') {
      return [
        { emoji: '👔', title: '意式双排扣西服' },
        { emoji: '👔', title: '免烫骨干衬衫' },
        { emoji: '👞', title: '手工意式擦色皮鞋' }
      ];
    }
    // Party
    return [
      { emoji: isFemale ? '👗' : '🧥', title: isFemale ? '星芒高定礼服裙' : '奢华暗纹燕尾服' },
      { emoji: '💎', title: '极光碎钻吊坠颈链' },
      { emoji: isFemale ? '👠' : '👞', title: isFemale ? '星钻漆光细高跟' : '漆皮正装德比鞋' }
    ];
  };

  const stylesList = [
    { id: 'original', name: '原图', desc: '唯美立绘原画', img: ROLE_MEDIA_MAP.lujingchen?.avatarUrl || imgLuJingchenAlt },
    { id: 'anime', name: '动漫', desc: '轻奢二次元漫画', img: ROLE_MEDIA_MAP.linxiaorou?.avatarUrl || imgLuJingchenAlt },
    { id: 'cg', name: 'CG', desc: '精致影视级建模', img: ROLE_MEDIA_MAP.shenqinghuan?.avatarUrl || imgLuJingchenAlt },
    { id: 'realistic', name: '真人', desc: '唯美超写真质感', img: imgLuJingchenReal },
  ];

  const currentSuit = OUTFIT_SUITS.find(s => s.id === activeOutfitId) || OUTFIT_SUITS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center overflow-hidden font-sans" id="outfit-modal-backdrop">
      
      {/* Container Device-Like Frame matching exactly Image 1's warm premium dark brown palette */}
      <div className="w-full max-w-[410px] h-[92vh] sm:h-[840px] bg-gradient-to-b from-[#3a3030] via-[#2c2323] to-[#1e1717] border border-white/10 rounded-3xl text-white flex flex-col relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]" id="outfit-modal-container">
        
        {/* Dynamic Warm Ambient Light Overlays */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/3 -right-12 w-52 h-52 bg-pink-500/5 rounded-full blur-[90px] pointer-events-none" />

        {/* Header styling matching Image 1 perfectly (Title on left, Close button on right) */}
        <div className="px-5 py-4 shrink-0 flex items-center justify-between border-b border-white/[0.06] bg-[#271f1f]/80 backdrop-blur-md relative z-10" id="outfit-modal-header">
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-white/60" id="outfit-modal-title">
            ✦ 伴侣专属衣橱
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition active:scale-90 border border-white/10 cursor-pointer"
            id="outfit-modal-close-btn"
          >
            <X size={15} />
          </button>
        </div>

        {/* MAIN BODY LAYOUT CONTAINER */}
        <div className="flex-1 overflow-hidden flex flex-col relative z-10">
          <AnimatePresence mode="wait">
            
            {/* STAGE 1: PARTNER SELECTION */}
            {mode === 'pick' && (
              <motion.div
                key="pick"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar flex flex-col justify-between"
                id="stage-pick"
              >
                <div className="space-y-4">
                  <div className="text-center py-2">
                    <h2 className="text-lg font-black tracking-tight text-white flex items-center justify-center gap-1.5">
                      <Shirt className="text-amber-400 animate-pulse" size={18} />
                      选择搭档开启套装试穿
                    </h2>
                    <p className="text-[10px] text-white/40 mt-1 font-medium">解锁全身形象，一键体验五大主题精品套装</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    {roles.map((role) => {
                      const isUnlocked = hasUnlockedFullBody[role.id];
                      return (
                        <div
                          key={role.id}
                          onClick={() => handleRoleSelect(role)}
                          className="group p-4 rounded-2xl bg-[#231b1b] border border-white/[0.05] hover:border-amber-500/40 flex flex-col items-center text-center justify-between min-h-[175px] transition cursor-pointer relative hover:shadow-[0_8px_25px_rgba(245,158,11,0.1)] active:scale-[0.98]"
                        >
                          <div className="flex flex-col items-center gap-2 flex-1 justify-center">
                            <div className="relative">
                              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-300" />
                              <img
                                src={ROLE_MEDIA_MAP[role.id]?.avatarUrl || role.avatarUrl}
                                alt={role.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-white/10 group-hover:border-amber-400/50 transition relative z-10 shadow-lg"
                              />
                              {isUnlocked && (
                                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-[8px] font-black text-white shadow-lg border border-white/10 relative z-20 scale-90">
                                  已解锁
                                </span>
                              )}
                            </div>
                            
                            <div>
                              <div className="text-xs font-black text-white/90 group-hover:text-white transition">{role.name}</div>
                              <p className="text-[9px] text-white/30 mt-0.5 font-medium truncate max-w-[120px]">{role.title}</p>
                            </div>
                          </div>

                          <div className="w-full mt-3">
                            <div className="w-full h-8 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold text-white/80 group-hover:text-white transition flex items-center justify-center gap-1.5 whitespace-nowrap">
                              <span>{isUnlocked ? '进入套装试衣间' : '解锁形象'}</span>
                              <span className="text-[10px] opacity-70">➔</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[9px] text-white/20 font-medium">挑选您最心动的伴侣，塑造精美全身立绘套装</p>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: GENERATION PREVIEW SCREEN (MATCHES IMAGE 1 PERFECTLY) */}
            {mode === 'generate' && selectedRole && (
              <motion.div
                key="generate"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto p-5 flex flex-col justify-between no-scrollbar"
                id="stage-generate"
              >
                <div className="space-y-4">
                  
                  {/* Text Header setup from Image 1 */}
                  <div>
                    <h2 className="text-xl font-black text-white tracking-tight">为 TA 创建全身形象</h2>
                    <p className="text-[10px] text-white/40 mt-1 font-semibold leading-relaxed">
                      拥有全身形象后，可一键在衣橱中为 TA 换装精美套装哦 ~
                    </p>
                  </div>

                  {/* Photo comparison grid with curved pointing arrow */}
                  <div className="flex items-center justify-center gap-3 relative py-4">
                    
                    {/* Left Polaroid Card: Portrait */}
                    <div className="w-[120px] shrink-0 rounded-sm bg-white p-2 pb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rotate-[-4deg] relative border border-black/5">
                      <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                        <img
                          src={ROLE_MEDIA_MAP[selectedRole.id]?.portraitUrl || selectedRole.portraitUrl}
                          alt="Portrait"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-1.5 left-0 right-0 text-center">
                        <span className="text-[11px] font-serif italic font-extrabold text-[#3a3030] tracking-wide">
                          {selectedRole.name}
                        </span>
                      </div>
                    </div>

                    {/* Center thin curved arrow */}
                    <div className="flex flex-col items-center justify-center text-white/30 shrink-0 relative px-1">
                      <svg className="w-10 h-8 text-white/40 overflow-visible" fill="none" viewBox="0 0 40 30" stroke="currentColor" strokeWidth="1.5">
                        <path d="M 5,20 C 15,10 25,10 35,5" strokeLinecap="round" />
                        <path d="M 31,4 L 36,5 L 34,10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>

                    {/* Right Polaroid Card: Stunning cohesive full-body mockup */}
                    <div className="w-[145px] shrink-0 rounded-sm bg-white p-2.5 pb-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] rotate-[3deg] relative border border-black/5">
                      <div className="aspect-[3/4.5] w-full overflow-hidden relative bg-neutral-100">
                        <img
                          src={ROLE_MEDIA_MAP[selectedRole.id]?.portraitUrl || imgLuJingchenAlt}
                          alt="Mannequin full body"
                          className="w-full h-full object-cover filter brightness-[0.97]"
                        />
                      </div>

                      <div className="absolute bottom-2.5 left-0 right-0 text-center">
                        <span className="text-[9px] font-bold text-[#5c4f4f] tracking-wide">
                          # 套装装扮系列
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Description note instead of complex style selection */}
                  <div className="pt-2">
                    <p className="text-[11px] text-white/50 leading-relaxed font-semibold bg-white/5 p-3 rounded-xl border border-white/5">
                      💡 绘制成功后，TA 将解锁专属的精致二次元全身动漫形象，支持在衣橱内一键随心换装。
                    </p>
                  </div>
                </div>

                {/* Bottom Trigger button from Image 1 */}
                <div className="pt-4 space-y-2.5">
                  <button
                    onClick={handleGenerateFullBody}
                    disabled={isGenerating}
                    className="w-full py-4 bg-white hover:bg-white/95 text-[#2c2323] font-black text-xs rounded-full shadow-2xl transition active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="animate-spin text-[#2c2323]" size={13} />
                        <span>画作绘制中，请稍候...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-black">¥9.9 立即创建</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setMode('pick')}
                    className="w-full text-center text-[10px] font-semibold text-white/40 hover:text-white/60 hover:underline cursor-pointer"
                  >
                    返回搭档列表
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE 3: INTERACTIVE MANNEQUIN FITTING ROOM EDITOR (VISUALLY STUNNING RECONSTRUCTION) */}
            {mode === 'fitting' && selectedRole && (
              <motion.div
                key="fitting"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-hidden flex flex-col justify-between"
                id="stage-fitting"
              >
                {/* Mannequin Stage - Styled as an elegant Polaroid display to match Image 1 aesthetic */}
                <div className="relative flex-1 bg-gradient-to-b from-[#2e2626] to-[#1e1717] p-4 flex flex-col items-center justify-center overflow-hidden">
                  
                  {/* Central mannequin canvas: Beautiful White Polaroid Card */}
                  <div className="relative h-[315px] w-[190px] rounded-sm bg-white p-3 pb-9 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between border border-black/5 rotate-[1deg]">
                    
                    {/* The Full Body Portrait Card */}
                    <div className="relative w-full aspect-[3/4.2] rounded-sm overflow-hidden bg-neutral-100 border border-black/[0.03]">
                      <img
                        src={getCoordinatedFullBodyImage(selectedRole.id, activeOutfitId, selectedStyle)}
                        alt="Mannequin display portrait"
                        className="w-full h-full object-cover transition-all duration-500"
                      />

                      {/* Dynamic Color-Mood Lighting Filter based on equipped upper color */}
                      {getActiveTintColor() && selectedStyle !== 'realistic' && (
                        <div 
                          className="absolute inset-0 pointer-events-none transition-all duration-500 mix-blend-color"
                          style={{
                            background: `linear-gradient(135deg, ${currentSuit.colorThemes[selectedColorIdx].color}2b, ${currentSuit.colorThemes[selectedColorIdx].color}3d)`,
                          }}
                        />
                      )}

                      {/* Custom backlighting glow matching high end visual atmosphere */}
                      {selectedStyle !== 'realistic' && (
                        <div 
                          className="absolute inset-0 pointer-events-none mix-blend-screen z-10 transition-all duration-500"
                          style={{
                            background: `radial-gradient(circle at 50% 30%, ${currentSuit.colorThemes[selectedColorIdx].color}33, transparent 65%)`
                          }}
                        />
                      )}

                      {/* Character Name tag overlapping */}
                      <div className="absolute top-2 left-2 z-10 bg-black/80 px-2 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-wider scale-90 border border-white/10 shadow">
                        {selectedRole.name}
                      </div>

                      {/* Outfit Theme Badge in the corner */}
                      <div className="absolute bottom-2 right-2 z-10 bg-[#3a3030]/90 border border-amber-400/30 px-1.5 py-0.5 rounded-full text-[6px] font-black text-amber-300 shadow flex items-center gap-0.5 scale-90">
                        <Sparkle size={6} className="text-amber-400 animate-spin-slow" />
                        <span>{currentSuit.emoji} {currentSuit.name.split('・')[0]}</span>
                      </div>

                      {/* Accent gradient layer */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                    </div>

                    {/* Polaroid Bottom handwritten band showing the style tag */}
                    <div className="text-center pt-2">
                      <span className="text-[9px] font-black text-[#4a3535] tracking-wide block max-w-full truncate">
                        {currentSuit.slogan}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Theme Bar Header */}
                <div className="px-4 py-2 bg-[#2c2222] border-y border-white/[0.05] flex items-center justify-between">
                  <span className="text-[10px] font-black text-white/40 tracking-wider uppercase">精品套装选择</span>
                  <span className="text-[10px] font-bold text-amber-300 flex items-center gap-0.5">
                    <Sparkles size={10} className="text-amber-400" />
                    根据角色动漫形象深度定制
                  </span>
                </div>

                {/* Bottom Outfits Catalogue Drawer */}
                <div className="h-[185px] bg-[#1a1414] overflow-y-auto px-4 py-3 space-y-3 no-scrollbar border-b border-white/[0.05]">
                  <div className="grid grid-cols-1 gap-2.5">
                    {OUTFIT_SUITS.map((suit) => {
                      const isEquipped = activeOutfitId === suit.id;
                      return (
                        <div
                          key={suit.id}
                          onClick={() => handleEquipOutfit(suit)}
                          className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer relative ${
                            isEquipped
                              ? 'bg-[#332727] border-amber-500 shadow-md'
                              : 'bg-[#231b1b] border-white/[0.04] hover:border-white/10'
                          }`}
                        >
                          <div className="flex gap-2.5 min-w-0 items-center">
                            {/* Emoji representation bubble */}
                            <div className="w-9 h-9 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-lg shadow-inner shrink-0">
                              {suit.emoji}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-xs font-black text-white/90 leading-tight">
                                {suit.name}
                              </h3>
                              <p className="text-[9px] text-white/40 truncate max-w-[190px] mt-0.5">
                                {suit.desc}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end shrink-0 gap-1.5">
                            {/* Selected Equipped tick or cost */}
                            {isEquipped ? (
                              <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-white z-10 shadow-md">
                                <Check size={10} strokeWidth={4} />
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-extrabold text-amber-300">
                                ¥9.9 解锁
                              </span>
                            )}

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Save Outfits Bottom Panel (Solid luxury white design) */}
                <div className="px-5 py-4 bg-[#211919] border-t border-white/[0.05] space-y-2 shrink-0">
                  <button
                    onClick={handleSaveAndApply}
                    className="w-full py-3.5 bg-white hover:bg-white/95 text-[#211919] text-xs font-black rounded-full transition active:scale-95 flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
                    id="save-outfit-btn"
                  >
                    <ShoppingBag size={13} />
                    <span>一键试穿并保存此套装</span>
                  </button>
                  
                  <button
                    onClick={() => setMode('pick')}
                    className="w-full text-center text-[9px] text-white/30 hover:text-white/60 font-semibold tracking-wide cursor-pointer"
                  >
                    返回更换选定搭档
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
