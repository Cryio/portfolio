export interface CharacterSkin {
  id: string;
  name: string;
  bodyColor: number;
  wingColor: number;
  beakColor: number;
  combColor: number;
  feetColor: number;
  icon: string;
}

export const characterSkins: CharacterSkin[] = [
  {
    id: 'classic',
    name: 'Classic Chicken',
    bodyColor: 0xffffff,
    wingColor: 0xf5f5f5,
    beakColor: 0xff8c00,
    combColor: 0xdc143c,
    feetColor: 0xff8c00,
    icon: '🐔',
  },
  {
    id: 'golden',
    name: 'Golden Chicken',
    bodyColor: 0xffd700,
    wingColor: 0xf4c430,
    beakColor: 0xff6b00,
    combColor: 0xff4500,
    feetColor: 0xff6b00,
    icon: '✨',
  },
  {
    id: 'cyber',
    name: 'Cyber Chicken',
    bodyColor: 0x00ffff,
    wingColor: 0x00d4d4,
    beakColor: 0xff00ff,
    combColor: 0x8b00ff,
    feetColor: 0xff00ff,
    icon: '🤖',
  },
  {
    id: 'shadow',
    name: 'Shadow Chicken',
    bodyColor: 0x2d2d2d,
    wingColor: 0x1a1a1a,
    beakColor: 0x8b0000,
    combColor: 0x4a0000,
    feetColor: 0x8b0000,
    icon: '🌑',
  },
  {
    id: 'duck',
    name: 'Lucky Duck',
    bodyColor: 0xffeb3b,
    wingColor: 0xfdd835,
    beakColor: 0xff9800,
    combColor: 0xff9800,
    feetColor: 0xff9800,
    icon: '🦆',
  },
  {
    id: 'penguin',
    name: 'Cool Penguin',
    bodyColor: 0x1a1a2e,
    wingColor: 0x16213e,
    beakColor: 0xffa500,
    combColor: 0x1a1a2e,
    feetColor: 0xffa500,
    icon: '🐧',
  },
];

// Game state for selected skin
export let selectedSkin: CharacterSkin = characterSkins[0];

export function setSelectedSkin(skinId: string) {
  const skin = characterSkins.find(s => s.id === skinId);
  if (skin) {
    selectedSkin = skin;
  }
}

export function getSelectedSkin(): CharacterSkin {
  return selectedSkin;
}

// High scores management
const HIGH_SCORES_KEY = 'crossy-road-high-scores';

export interface HighScore {
  score: number;
  date: string;
  skin: string;
}

export function getHighScores(): HighScore[] {
  try {
    const stored = localStorage.getItem(HIGH_SCORES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load high scores', e);
  }
  return [];
}

export function saveHighScore(score: number, skinId: string): void {
  const highScores = getHighScores();
  const newScore: HighScore = {
    score,
    date: new Date().toLocaleDateString(),
    skin: skinId,
  };
  
  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  
  // Keep only top 5
  const top5 = highScores.slice(0, 5);
  
  try {
    localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(top5));
  } catch (e) {
    console.error('Failed to save high score', e);
  }
}

export function getTopScore(): number {
  const scores = getHighScores();
  return scores.length > 0 ? scores[0].score : 0;
}
