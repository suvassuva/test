export type GoldPurity = '24K' | '22K' | '18K';

export interface GoldRateConfig {
  purity: GoldPurity;
  purityPercentage: number;
  ratePerGram: number; // Demo configurable rate
  purityFactor: number;
  label: string;
}

export interface ValuationResult {
  weight: number;
  purity: GoldPurity;
  ratePerGram: number;
  rawEstimate: number;
  formattedEstimate: string;
  isPledged: boolean;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  landmark?: string;
  mapQuery: string;
  isVerified?: boolean;
}

export interface StoryAct {
  id: string;
  actNumber: number;
  title: string;
  subtitle: string;
}

