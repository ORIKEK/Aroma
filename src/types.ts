export interface Ingredient {
  name: string;
  ratio: number; // Percentage or parts
}

export interface Formula {
  id: string;
  name: string;
  ingredients: Ingredient[];
  rawMaterials: string;
  rawMaterialMastery: string;
  maturationTime: string;
  technicalDetails: string[];
  experimentalSecrets: string;
  knowledgeEssay: string;
  marketEdge: string;
  createdAt: number;
}

export interface RareIngredient {
  id: string;
  name: string;
  breakdown: string[]; // 3 lines
}

export interface Discovery {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Substitute {
  id: string;
  expensiveIngredient: string;
  budgetMix: string[];
  mixingTip: string;
}

export type TabType = 'search' | 'discoveries' | 'substitute';
