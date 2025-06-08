export interface Deceased {
  gender: 'male' | 'female';
  totalEstate: number;
  debts: number;
  funeralExpenses: number;
  wasiyyah: number; // Will/bequest (max 1/3 of net estate)
}

export interface Heir {
  id: string;
  relationship: string;
  gender: 'male' | 'female';
  count: number;
  isAlive: boolean;
}

export interface InheritanceResult {
  heir: Heir;
  share: number;
  amount: number;
  basis: string; // Quranic verse or hadith reference
}

export interface CalculationSummary {
  netEstate: number;
  totalDistributed: number;
  remainingAmount: number;
  results: InheritanceResult[];
  notes: string[];
}

export type RelationshipType = 
  | 'spouse'
  | 'father'
  | 'mother'
  | 'son'
  | 'daughter'
  | 'brother_full'
  | 'sister_full'
  | 'brother_paternal'
  | 'sister_paternal'
  | 'brother_maternal'
  | 'sister_maternal'
  | 'grandfather_paternal'
  | 'grandmother_paternal'
  | 'grandmother_maternal'
  | 'son_of_son'
  | 'daughter_of_son'
  | 'uncle_paternal'
  | 'cousin_paternal';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}