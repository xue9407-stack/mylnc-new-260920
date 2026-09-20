import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, Send, MessageSquare, ChevronRight, Video, Music, HelpCircle } from 'lucide-react';
import { StoryLineItem, Role } from '../types';
import { ROLE_MEDIA_MAP } from '../data/rolePortraits';
import { speakRoleDialogue } from '../utils/ttsHelper';

interface StoryReaderModalProps {
  isOpen: boolean;
  role: Role;
  story: StoryLineItem | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onStartChat: (role: Role, prompt?: string) => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({
  isOpen,
  role,
  story,
  onClose,
  onShowToast,
  onStartChat,
}) => {
  const [currentParaIdx, setCurrentParaIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [interactiveLogs, setInteractiveLogs] = useState<Array<{ type: 'user' | 'response'; text: string }>>([]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  useEffect(() => {
    setCurrentParaIdx(0);
    setSelectedChoice(null);
    setInteractiveLogs([]);
    setIsPlayingVoice(false);
  }, [story?.id]);

  if (!isOpen || !story) return null;

  // Resolve story setting cover image
  const defaultCovers: Record<string, string> = {
    lujingchen: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80', // Library Bookshelf
    linmubai: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80', // Rainy desk
  };
  const coverImg = defaultCovers[role.id] || ROLE_MEDIA_MAP[role.id]?.portraitUrl || role.portraitUrl || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80';

  // Get active dialogue paragraph
  const activeParagraph = story.paragraphs[currentParaIdx] || story.paragraphs[story.paragraphs.length - 1] || '';

  const handleChoiceClick = (text: string, response: string) => {
    setSelectedChoice(text);
    setInteractiveLogs((prev) => [
      ...prev,
      { type: 'user', text },
      { type: 'response', text: response },
    ]);
    onShowToast('✨ 决策已生效，故事向新方向延伸！');
    
    // Auto-advance to the next paragraph if possible
    if (currentParaIdx < story.paragraphs.length - 1) {
      setCurrentParaIdx((prev) => prev + 1);
    }
  };

  const handleSendCustomInput = () => {
    const trimmed = customInput.trim();
    if (!trimmed) return;
    setInteractiveLogs((prev) => [
      ...prev,
      { type: 'user', text: trimmed },
      {
        type: 'response',
        text: `【${role.name}】听完你的话，眼中掠过一丝温软，柔声说道：“你说得对，接下来无论发生什么，我们都一起面对。”`,
      },
    ]);
    setCustomInput('');
    onShowToast('互动成功，故事续写中……');

    // Auto-advance paragraph on interaction to simulate progression
    if (currentParaIdx < story.paragraphs.length - 1) {
      setCurrentParaIdx((prev) => prev + 1);
    }
  };

  // TTS Reader
  const toggleSpeech = () => {
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
      text: activeParagraph,
      roleName: role.name,
      roleTags: role.tags,
      roleTitle: role.title,
      onStart: () => setIsPlayingVoice(true),
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false),
    });

    if (success) {
      onShowToast(`🔊 正在原声情感配音【${role.name}】的台词对白...`);
    } else {
      onShowToast('语音播放失败');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center overflow-hidden animate-fadeIn select-none font-sans">
      {/* Mobile App View Frame */}
      <div className="w-full max-w-[420px] h-full bg-[#0a0915] text-white flex flex-col relative overflow-hidden sm:shadow-[0_25px_60px_rgba(0,0,0,0.9)] sm:border-x sm:border-white/10">
        
        {/* Top Header Cover Section */}
        <div className="relative w-full h-[240px] shrink-0 overflow-hidden">
          <img
            src={coverImg}
            alt="Story Line Setting Backdrop"
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
          />
          {/* Subtle vignette shadows */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0915] via-transparent to-black/50" />

          {/* Title label top left */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <span className="text-[10px] text-purple-400 font-extrabold uppercase tracking-widest">🎥 剧场专属</span>
            <h2 className="text-xs font-black text-white truncate max-w-[180px]">
              {story.title}
            </h2>
          </div>

          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
          >
            <X size={15} />
          </button>

          {/* Dynamic Scene Miniature GIF Thumbnail on Bottom-Right */}
          <div className="absolute bottom-4 right-4 z-10 w-[110px] rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-xl bg-black/60 p-0.5">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=200&auto=format&fit=crop&q=80"
                alt="Animated scenario preview"
                className="w-full h-full object-cover filter brightness-90 animate-pulse"
              />
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute bottom-1 right-1.5 px-1 py-0.5 rounded bg-black/60 text-[7.5px] font-black text-purple-300 tracking-wider">
                GIF 动态场景
              </span>
            </div>
          </div>
        </div>

        {/* Mid Section: Actor Profile Info Tag */}
        <div className="px-4 py-3 shrink-0 flex items-center justify-between border-b border-white/5 bg-[#121021]/30">
          <div className="flex items-center gap-3">
            {/* Avatar with colorful ring container */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full blur-[2px] opacity-75" />
              <img
                src={ROLE_MEDIA_MAP[role.id]?.avatarUrl || role.avatarUrl}
                alt={role.name}
                className="relative w-10 h-10 rounded-full object-cover border border-white/20"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-white">{role.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-[8.5px] font-black text-purple-200 uppercase tracking-widest shadow-sm">
                  剧场主角
                </span>
              </div>
              <p className="text-[10px] text-white/50 font-medium tracking-wide mt-0.5">
                实时文字演绎 + 背景原画 + 独白配音
              </p>
            </div>
          </div>

          {/* Click to Hear Voice Actor Voice pill button */}
          <button
            onClick={toggleSpeech}
            className={`px-3 py-2 rounded-full border text-[10px] font-extrabold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-md ${
              isPlayingVoice
                ? 'bg-purple-600 border-purple-400 text-white animate-pulse'
                : 'bg-purple-950/40 hover:bg-purple-900/40 border-purple-500/30 text-purple-300'
            }`}
          >
            <Volume2 size={12} />
            <span>点击听角色配音</span>
          </button>
        </div>

        {/* Bottom Core Dialogue Area - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 no-scrollbar">
          
          {/* Main Immersive Novel Dialogue Card (Purple Outline Card) */}
          <div 
            onClick={() => {
              if (currentParaIdx < story.paragraphs.length - 1) {
                setCurrentParaIdx((prev) => prev + 1);
                onShowToast(`📖 切换至下一幕剧情`);
              }
            }}
            className="p-5 rounded-3xl bg-[#141225]/85 border border-purple-500/30 shadow-2xl relative cursor-pointer active:scale-[0.99] transition duration-200"
          >
            <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed tracking-wide transition-all duration-300">
              {activeParagraph}
            </p>

            {/* If there are more paragraphs, display click to continue */}
            {currentParaIdx < story.paragraphs.length - 1 ? (
              <div className="flex justify-end pt-3 text-white/30 text-[9px] font-bold tracking-wider">
                <span className="animate-pulse">点击文字换幕 ▼</span>
              </div>
            ) : null}
          </div>

          {/* Interactive Choices Subheader */}
          {(story.choices && story.choices.length > 0) || interactiveLogs.length > 0 ? (
            <div className="space-y-3.5 pt-1">
              <div className="text-[11px] font-extrabold text-purple-300 flex items-center gap-1.5 tracking-wide">
                <Sparkles size={13} className="text-purple-400" />
                <span>输入或选择文字互动，影响故事发展：</span>
              </div>

              {/* Choices Rendering List */}
              {story.choices && story.choices.length > 0 && (
                <div className="space-y-2">
                  {story.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceClick(choice.text, choice.response)}
                      className={`w-full py-3 px-4 rounded-2xl border text-xs font-bold text-left transition flex items-center justify-between group active:scale-[0.99] cursor-pointer ${
                        selectedChoice === choice.text
                          ? 'bg-purple-600/25 border-purple-400 text-purple-100 shadow-lg'
                          : 'bg-[#181628]/60 border-white/5 hover:bg-[#201d36]/80 text-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MessageSquare size={13} className="text-purple-400 shrink-0" />
                        <span className="truncate pr-1">{choice.text}</span>
                      </div>
                      <span className="text-[9px] text-purple-400 font-extrabold flex items-center gap-0.5 shrink-0 group-hover:translate-x-1 transition">
                        <span>选择</span>
                        <ChevronRight size={10} />
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Log responses of choice branchings */}
              {interactiveLogs.map((log, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed border transition ${
                    log.type === 'user'
                      ? 'bg-pink-600/10 border-pink-500/20 text-pink-200 ml-8 text-right'
                      : 'bg-purple-950/20 border-purple-500/20 text-purple-100 mr-8'
                  }`}
                >
                  {log.type === 'user' ? `你：${log.text}` : log.text}
                </div>
              ))}
            </div>
          ) : null}

        </div>

        {/* Bottom Custom Text Input & Action Panel */}
        <div className="p-3.5 bg-[#0f0d22] border-t border-white/5 space-y-2 shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`跟【${role.name}】自定义互动，配音即刻因你变幻...`}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendCustomInput()}
              className="flex-1 px-4 py-3 rounded-2xl bg-[#1b192e] border border-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
            />
            <button
              onClick={handleSendCustomInput}
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 text-white text-xs font-black rounded-2xl transition active:scale-95 flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
            >
              <Send size={13} />
              <span>发送</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-white/30 pt-1">
            <span>支持任意自定义文本推动剧情发展</span>
            <button
              onClick={() => {
                onClose();
                onStartChat(role, `关于故事《${story.title}》，我想继续和你细聊一下……`);
              }}
              className="text-purple-400 hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
            >
              带入此故事进入主线聊天室 ›
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
