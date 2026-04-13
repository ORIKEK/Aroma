import { Formula } from "../types";

const VAULT_KEY = 'aroma_vault_formulas';
const HISTORY_KEY = 'aroma_search_history';

export const storageService = {
  getFormulas: (): Formula[] => {
    const data = localStorage.getItem(VAULT_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveFormula: (formula: Formula) => {
    const formulas = storageService.getFormulas();
    const updated = [formula, ...formulas];
    localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
  },

  deleteFormula: (id: string) => {
    const formulas = storageService.getFormulas();
    const updated = formulas.filter(f => f.id !== id);
    localStorage.setItem(VAULT_KEY, JSON.stringify(updated));
  },

  getHistory: (): string[] => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveHistory: (query: string) => {
    const history = storageService.getHistory();
    // Remove if already exists and add to front, limit to 10
    const filtered = history.filter(h => h.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, 10);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  },

  clearHistory: () => {
    localStorage.removeItem(HISTORY_KEY);
  }
};
