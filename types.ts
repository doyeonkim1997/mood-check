export interface AuraResult {
  vibeTitle: string;
  auraColorHex: string;
  description: string;
  energyLevel: number;
  hashtags: string[];
  spiritEmoji: string;
}

export enum AppState {
  IDLE = 'IDLE',
  CAMERA = 'CAMERA',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
