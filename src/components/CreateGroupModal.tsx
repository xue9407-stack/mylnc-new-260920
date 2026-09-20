import React, { useState } from 'react';
import { Role } from '../types';
import { X, Sparkles, Check, Wand2 } from 'lucide-react';
import { RoleAvatar } from './RoleAvatar';
import { ROLE_MEDIA_MAP } from '../data/rolePortraits';

interface CreateGroupModalProps {
  roles: Role[];
  onClose: () => void;
  onCreateGroup: (name: string, topic: string, roleIds: string[]) => void;
  onShowToast: (msg: string) => void;
}

interface PresetParty {
  label: string;
  name: string;
  topic: string;
  prompt: string;
  roleIds: string[];
}

const PRESET_GROUPS: PresetParty[] = [
  {
    label: '霸道总裁',
    name: '👑 霸道总裁·吃醋修罗场',
    topic: '极具嫉妒心的豪门霸总角色聚在一起，因你展开暗流涌动的交锋与争夺',
    prompt: '生成一个霸道总裁群，让陆景琛和林修远两个霸总为我吃醋争风相对…',
    roleIds: ['1', '2', '8'],
  },
  {
    label: '治愈学长',
    name: '🍵 治愈系学长茶话会',
    topic: '倾听你的烦恼，用温柔无微不至的关怀陪伴你度过每一个难眠之夜',
    prompt: '建立一个治愈学长茶话会，温柔听你倾诉心事与疲惫…',
    roleIds: ['2', '3', '7'],
  },
  {
    label: '傲娇猫娘',
    name: '🐾 傲娇甜宠喵喵屋',
    topic: '可爱又嘴硬的猫系角色围绕在你身边，体验软萌撒娇与傲娇日常',
    prompt: '组建一个傲娇猫娘陪伴群，互动甜宠撒娇…',
    roleIds: ['3', '7', '5'],
  },
  {
    label: '神秘魔法师',
    name: '✨ 奇幻魔导师联盟',
    topic: '跨越次元与时空的大魔导师与守护者，为你开启奇幻浪漫之门',
    prompt: '召唤魔法守护者们，开启奇幻浪漫之门…',
    roleIds: ['4', '1', '2'],
  },
  {
    label: '顶尖电竞',
    name: '🎮 顶尖电竞开黑车队',
    topic: '全员大神聚集，商讨战术，带你在峡谷/赛场极速上分',
    prompt: '组建电竞大神极速车队，带你开黑上分…',
    roleIds: ['6', '5', '1'],
  },
];

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  roles,
  onClose,
  onCreateGroup,
  onShowToast,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [groupName, setGroupName] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(['1', '2']);
  const [activePresetLabel, setActivePresetLabel] = useState<string>('');

  const toggleRoleSelection = (roleId: string) => {
    if (selectedRoleIds.includes(roleId)) {
      if (selectedRoleIds.length <= 2) {
        onShowToast('群聊至少需要保留 2 位 AI 角色哦！');
        return;
      }
      setSelectedRoleIds(selectedRoleIds.filter((id) => id !== roleId));
    } else {
      setSelectedRoleIds([...selectedRoleIds, roleId]);
    }
  };

  const applyPreset = (preset: PresetParty) => {
    setGroupName(preset.name);
    setTopic(preset.topic);
    setPromptInput(preset.prompt);
    // filter valid role ids
    const validIds = preset.roleIds.filter((id) => roles.some((r) => r.id === id));
    if (validIds.length >= 2) {
      setSelectedRoleIds(validIds);
    } else {
      setSelectedRoleIds(roles.slice(0, 3).map((r) => r.id));
    }
    onShowToast(`✨ 已载入【${preset.label}】经典剧情预设！`);
  };

  const handleCreate = () => {
    let finalName = groupName.trim();
    if (!finalName) {
      if (promptInput.trim()) {
        finalName = promptInput.trim().slice(0, 12);
      } else {
        onShowToast('请输入群聊名称！');
        return;
      }
    }
    if (selectedRoleIds.length < 2) {
      onShowToast('请至少选择 2 位 AI 角色加入群聊！');
      return;
    }
    onCreateGroup(finalName, topic.trim(), selectedRoleIds);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center overflow-hidden animate-fadeIn">
      {/* Centered App Phone Shell (Strictly max 420px width for mobile App view) */}
      <div className="w-full max-w-[420px] h-full bg-[#0a0a0f] text-white flex flex-col relative overflow-hidden sm:shadow-[0_25px_60px_rgba(0,0,0,0.8)] sm:border-x sm:border-white/10 animate-slideUp select-none">
        {/* Top App Bar Header */}
      <div className="pt-4 pb-3 px-4 bg-gradient-to-b from-[#180f2d] via-[#110c21] to-[#0a0a0f] border-b border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 border border-white/20 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wide">发起多角 AI 派对群聊</h2>
              <p className="text-[11px] text-purple-200/60 mt-0.5">让多位心动角色同时与你热聊、修罗场碰撞</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition cursor-pointer shrink-0"
            aria-label="关闭"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Main App Scrollable Area */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Presets Tag Chips Section (Image 2 style) */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-white/70 flex items-center gap-1.5">
              <Wand2 size={13} className="text-purple-400" />
              <span>一键预设经典派对剧情：</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {PRESET_GROUPS.map((preset, idx) => {
                const isActive = activePresetLabel === preset.label;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActivePresetLabel(preset.label);
                      applyPreset(preset);
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-medium shrink-0 transition-all duration-200 active:scale-95 cursor-pointer border ${
                      isActive
                        ? 'bg-purple-600/35 text-purple-100 border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.35)] font-bold'
                        : 'bg-[#1a122e]/80 hover:bg-purple-900/30 text-purple-200/90 border-purple-500/30 hover:border-purple-400/50'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Card Section */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 space-y-3">
            <div>
              <label className="text-white/90 font-bold block mb-1 text-xs">
                群聊名称 <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="例：修罗场·我的后宫们 / 豪门吃醋群"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition"
              />
            </div>

            <div>
              <label className="text-white/90 font-bold block mb-1 text-xs">
                剧情设定 / 聊天主题 <span className="text-white/40 font-normal">(可选)</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="例：在豪门酒会上，大家发现你同时答应了多人的约会..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/40 transition"
              />
            </div>
          </div>

          {/* Member Selector Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-white/90 font-bold flex items-center gap-1.5 text-xs">
                <span>选择入群 AI 角色</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-extrabold border border-purple-500/30">
                  已选 {selectedRoleIds.length} 位
                </span>
              </label>
              <span className="text-[10px] text-white/40">点击勾选/取消</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => {
                const isSelected = selectedRoleIds.includes(r.id);
                return (
                  <div
                    key={r.id}
                    onClick={() => toggleRoleSelection(r.id)}
                    className={`p-2.5 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition active:scale-98 ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-900/30'
                        : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <RoleAvatar
                        name={r.name}
                        avatarUrl={ROLE_MEDIA_MAP[r.id]?.avatarUrl || r.avatarUrl}
                        emoji={r.emoji}
                        coverClass={r.cover}
                        size="md"
                      />
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center text-[9px]">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate text-white">{r.name}</div>
                      <div className="text-[10px] text-white/40 truncate">{r.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* App Fixed Bottom Action Bar */}
      <div className="p-4 bg-[#0d0a17]/95 border-t border-white/10 shrink-0 flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="w-28 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/80 font-bold text-xs border border-white/10 active:scale-95 transition cursor-pointer"
        >
          取消
        </button>
        <button
          type="button"
          onClick={handleCreate}
          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer border border-purple-400/30"
        >
          <Wand2 size={15} />
          <span>开启多角 AI 群聊</span>
        </button>
      </div>
    </div>
  </div>
);
};
