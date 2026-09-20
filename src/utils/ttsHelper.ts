/**
 * Unified, High-Quality Character Voice TTS Helper
 * This provides expressive character speech synthesis by:
 * 1. Filtering out non-verbal action cues in brackets (e.g., "（深情地凝视着你）")
 * 2. Dynamically matching natural-sounding Microsoft/Google/Apple Chinese voices
 * 3. Tuning speech rate and pitch based on gender profiles to make the voice feel deep & charming (male) or sweet & lively (female)
 */

export interface TTSOptions {
  text: string;
  roleName: string;
  roleTags?: string[];
  roleTitle?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export function speakRoleDialogue({
  text,
  roleName,
  roleTags = [],
  roleTitle = '',
  onStart,
  onEnd,
  onError,
}: TTSOptions) {
  if (!('speechSynthesis' in window)) {
    return false;
  }

  // 1. Cancel previous speak actions to ensure immediate responsive transition
  window.speechSynthesis.cancel();

  // 2. Clean up text by removing bracketed action descriptions (e.g., （叹气） or (微微一笑) )
  const cleanText = text.replace(/\([^)]*\)|（[^）]*）/g, '').trim() || text;

  // 3. Create speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'zh-CN';

  // 4. Resolve character gender profile
  const tagsStr = (roleTags.join(' ') + ' ' + roleTitle + ' ' + roleName).toLowerCase();
  const isMale = /男|总裁|高冷|偏执|学长|将军|剑客|哥|琛|白|夜|白|羽|衡|臣/.test(tagsStr);
  const isFemale = /女|猫娘|少女|学姐|甜妹|师姐|娇妻|傲娇|千金|柔|夏|婷|萌|猫/.test(tagsStr);

  // 5. Query and select the best premium voice signature
  const voices = window.speechSynthesis.getVoices();
  let selectedVoice: SpeechSynthesisVoice | null = null;

  if (voices && voices.length > 0) {
    // Filter for Chinese voices
    const zhVoices = voices.filter(v => v.lang.includes('zh-CN') || v.lang.includes('zh-HK') || v.lang.includes('zh-TW'));

    if (zhVoices.length > 0) {
      if (isFemale) {
        // Look for premium sweet female voices (e.g. Microsoft Xiaoxiao, Apple Tingting, Sinji)
        selectedVoice = zhVoices.find(v => v.name.includes('Xiaoxiao') || v.name.includes('Tingting') || v.name.includes('Mei-Jia') || v.name.includes('Hsiao-Chen')) || zhVoices[0];
      } else if (isMale) {
        // Look for premium deep male voices (e.g. Microsoft Yunxi, Kangkang, Yunyang)
        selectedVoice = zhVoices.find(v => v.name.includes('Yunxi') || v.name.includes('Yunyang') || v.name.includes('Kangkang') || v.name.includes('Zhiwei')) || zhVoices[0];
      } else {
        selectedVoice = zhVoices[0];
      }
    }
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // 6. Tune prosody factors based on profile characteristics to prevent a mechanical feel
  if (isFemale) {
    utterance.pitch = 1.15;  // Slightly sweeter, higher pitch
    utterance.rate = 1.05;   // Energetic pacing
  } else if (isMale) {
    utterance.pitch = 0.85;  // Lower pitch for mature, masculine tone
    utterance.rate = 0.92;   // Slower, steady, magnetic delivery
  } else {
    utterance.pitch = 1.0;
    utterance.rate = 0.98;
  }

  // 7. Attach hooks
  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd(); // Fallback to reset playing states
    if (onError) onError();
  };

  // 8. Trigger Synthesis
  window.speechSynthesis.speak(utterance);
  return true;
}
