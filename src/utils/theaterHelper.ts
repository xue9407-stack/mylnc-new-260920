import imgMansionStudy from '../assets/images/mansion_study_night_1789897698411.jpg';
import imgYachtNight from '../assets/images/yacht_starry_night_1789897718059.jpg';
import imgFittingRoom from '../assets/images/luxury_fitting_room_1789897735600.jpg';
import imgCarRain from '../assets/images/car_interior_rain_night_1789897758793.jpg';
import imgObservatory from '../assets/images/observatory_stars_1789897778630.jpg';
import imgSchoolBullyCover from '../assets/images/school_bully_theater_cover_1789897411115.jpg';

export function resolveTheaterBg(title: string = '', explicitBg?: string): string {
  // If explicitly provided a valid bundled asset or http URL (and NOT a raw unbundled /src/ path), use it
  if (explicitBg && explicitBg.trim().length > 5 && !explicitBg.includes('/src/assets/images/')) {
    return explicitBg;
  }

  const t = title.toLowerCase();
  if (t.includes('书房') || t.includes('夜读')) return imgMansionStudy;
  if (t.includes('游艇') || t.includes('拥吻')) return imgYachtNight;
  if (t.includes('试衣间') || t.includes('宣示') || t.includes('高定')) return imgFittingRoom;
  if (t.includes('校霸') || t.includes('反击') || t.includes('复仇')) return imgSchoolBullyCover;
  if (t.includes('雨夜车厢') || t.includes('车内') || t.includes('车厢')) return imgCarRain;
  if (t.includes('星空') || t.includes('观星') || t.includes('天文台') || t.includes('即兴倾诉') || t.includes('誓约')) return imgObservatory;
  if (t.includes('雨夜') || t.includes('阳台') || t.includes('雨')) return imgCarRain;

  if (t.includes('办公室') || t.includes('热可可') || t.includes('图书馆')) {
    return imgMansionStudy;
  }
  if (t.includes('酒廊') || t.includes('温存') || t.includes('露台')) {
    return imgYachtNight;
  }
  if (t.includes('客厅') || t.includes('午后') || t.includes('甜品') || t.includes('茶歇') || t.includes('庄园') || t.includes('城堡')) {
    return 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80';
  }
  if (t.includes('单车') || t.includes('夕阳') || t.includes('巷口') || t.includes('老街')) {
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
  }

  if (explicitBg && explicitBg.trim().length > 5) {
    return explicitBg;
  }

  return imgObservatory;
}

export function formatChapterBadge(chapterIdx: number, rawTitle: string = ''): string {
  const cleanTitle = rawTitle.replace(/^第\s*\d+\s*章\s*·\s*/, '').replace(/[《》]/g, '');
  return `第 ${chapterIdx + 1} 章 · ${cleanTitle || '心动羁绊'}`;
}

export function resolveNarrationText(
  theaterTitle: string = '',
  speaker: string = 'Ta',
  dialogue: string = '',
  existingNarration?: string
): string {
  if (existingNarration && existingNarration.trim().length > 0) {
    return existingNarration;
  }

  if (dialogue.startsWith('（') || dialogue.startsWith('(')) {
    const endParenIdx = Math.max(dialogue.indexOf('）'), dialogue.indexOf(')'));
    if (endParenIdx > 1) {
      const action = dialogue.slice(1, endParenIdx);
      return `${speaker}${action}。室内弥漫着柔和而令人怦然心动的气息，属于你们的独家序幕悄然拉开……`;
    }
  }

  const t = theaterTitle.toLowerCase();
  if (t.includes('书房') || t.includes('夜读')) {
    return `深色木质书房里只有一盏绿荫台灯散发着幽微的光芒，窗外雨声淅沥。${speaker}停下手中的工作，眼神深沉地凝视着推门而入的你……`;
  }
  if (t.includes('星空') || t.includes('倾诉') || t.includes('观星')) {
    return `${speaker}站在无垠的星空下，微风卷起衣角，目光深情而专注地凝视着你。夜空繁星如碎钻般闪烁……`;
  }
  if (t.includes('雨') || t.includes('阳台')) {
    return `阳台上夜雨斜织，远处的都市霓虹在水汽中模糊成斑斓光晕。${speaker}为你递来一杯温热的饮品，眼神温润宁静……`;
  }
  if (t.includes('甜品') || t.includes('午后') || t.includes('客厅')) {
    return `午后和煦的阳光透过落地窗洒在餐桌上，手作烘焙的香气在客厅漫延。${speaker}微笑着招呼你坐下……`;
  }

  return `${speaker}立于温情弥漫的光影之中，眼含深情地注视着你，周围的一切在此刻安静下来……`;
}

export interface InteractiveChoice {
  text: string;
  isHighlight?: boolean;
  costDiamond?: number;
  highlightTag?: string;
  intimacyGain?: number;
  toastMsg?: string;
}

export function resolveSceneChoices(
  rawChoices: any[],
  roleName: string = 'Ta'
): InteractiveChoice[] {
  if (Array.isArray(rawChoices) && rawChoices.length > 0) {
    return rawChoices.map((c: any) => {
      const rawText = typeof c === 'string' ? c : (c.text || '做出回应');
      const text = rawText.replace(/^◇\s*/, '');
      return {
        text,
        intimacyGain: typeof c === 'object' && c.intimacyGain ? c.intimacyGain : 10,
        toastMsg: typeof c === 'object' && c.toastMsg ? c.toastMsg : `选择：${text.slice(0, 10)}...`
      };
    });
  }

  return [
    {
      text: '“陆总，我是来送深夜咖啡的……”',
      intimacyGain: 10,
      toastMsg: '送上咖啡，好感度 +10'
    },
    {
      text: '“如果我说……我是想见你呢？”',
      intimacyGain: 20,
      toastMsg: '心动告白，好感度 +20'
    },
    {
      text: '默默把整理好的急件放在他桌上',
      intimacyGain: 15,
      toastMsg: '默默关怀，好感度 +15'
    }
  ];
}
