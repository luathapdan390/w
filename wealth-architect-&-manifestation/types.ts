export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface Affirmation {
  id: number;
  category: string; // e.g., "Certainty - Present Perfect"
  content: string;
}

export interface CalculationResult {
  year: number;
  principal: number;
  interest: number;
  total: number;
}

export interface ManifestationResponse {
  affirmations: Affirmation[];
}