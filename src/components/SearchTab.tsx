import React, { useState, useEffect } from 'react';
import { Search, Loader2, Save, Plus, History, X, Info, Sparkles, TrendingUp } from 'lucide-react';
import { generateFormula } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { Formula } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export function SearchTab() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Formula | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(storageService.getHistory());
  }, []);

  const handleSearch = async (e?: React.FormEvent, searchQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    setQuery(finalQuery);
    setLoading(true);
    setResult(null);
    try {
      const formula = await generateFormula(finalQuery);
      setResult(formula);
      storageService.saveHistory(finalQuery);
      setHistory(storageService.getHistory());
    } catch (error) {
      console.error(error);
      alert('Failed to generate formula. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear all recent searches?')) {
      storageService.clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="p-6 pb-40 w-full">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gold mb-3 font-serif italic leading-tight">Scholarly Search</h1>
        <p className="text-xl text-cream/80 leading-relaxed">Seek the deep wisdom of ancient and modern aroma chemistry.</p>
      </header>

      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Royal Mysore Sandalwood"
            className="w-full h-20 pl-16 pr-4 text-xl bg-[#2D1B18] border-2 border-[#4E342E] rounded-3xl text-cream focus:border-gold outline-none shadow-2xl transition-all"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold" size={32} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 btn-mobile bg-gold text-earth-brown text-xl font-black rounded-3xl shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin" size={32} /> : 'Invoke Master Chemist'}
        </button>
      </form>

      {/* Recent Searches */}
      <AnimatePresence>
        {history.length > 0 && !result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-gold uppercase tracking-[0.2em] flex items-center gap-3">
                <History size={24} /> Recent
              </h3>
              <button
                onClick={handleClearHistory}
                className="p-3 text-cream/40 active:text-red-400 transition-colors"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(undefined, h)}
                  className="px-5 py-4 bg-[#2D1B18] border-2 border-[#4E342E] rounded-2xl text-lg font-bold text-cream/80 active:border-gold active:text-gold transition-all shadow-md"
                >
                  {h}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-20"
          >
            {/* THE FORMULA */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-gold uppercase tracking-[0.3em] border-b-4 border-gold pb-3 inline-block">
                The Formula
              </h2>
              <div className="bg-[#2D1B18] rounded-[32px] border-2 border-[#4E342E] overflow-hidden shadow-2xl">
                {result.ingredients.map((ing, i) => (
                  <div key={i} className="flex justify-between items-center p-6 border-b-2 border-[#4E342E] last:border-0">
                    <span className="text-xl font-bold text-cream">{ing.name}</span>
                    <span className="text-2xl font-black text-gold bg-earth-brown px-4 py-2 rounded-xl min-w-[100px] text-center border border-gold/20">
                      {ing.ratio}%
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* RAW MATERIALS */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-gold uppercase tracking-[0.3em] flex items-center gap-3">
                <Plus className="text-gold" size={28} /> Raw Materials & Mastery
              </h2>
              <div className="bg-[#2D1B18] p-8 rounded-[32px] border-2 border-[#4E342E] shadow-xl space-y-6">
                <p className="text-xl text-cream/90 leading-relaxed font-medium italic font-serif">
                  {result.rawMaterials}
                </p>
                <div className="pt-6 border-t border-[#4E342E]">
                  <h4 className="text-lg font-black text-gold uppercase tracking-widest mb-3">Chemical Grade Mastery</h4>
                  <p className="text-lg text-cream/70 leading-relaxed">
                    {result.rawMaterialMastery}
                  </p>
                </div>
              </div>
            </section>

            {/* TIME & AGING */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-gold uppercase tracking-[0.3em] flex items-center gap-3">
                <History className="text-gold" size={28} /> Maturation Time
              </h2>
              <div className="bg-amber-accent/10 p-8 rounded-[32px] border-2 border-amber-accent/30 shadow-xl">
                <p className="text-3xl font-black text-gold text-center">
                  {result.maturationTime}
                </p>
              </div>
            </section>

            {/* EXPERIMENTAL SECRETS */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-gold uppercase tracking-[0.3em] flex items-center gap-3">
                <Sparkles className="text-gold" size={28} /> Experimental Secrets
              </h2>
              <div className="bg-indigo-900/20 p-8 rounded-[32px] border-2 border-indigo-500/30 shadow-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Info size={20} className="text-indigo-400" />
                  <span className="text-base font-black uppercase tracking-widest text-indigo-400">The Iceberg Rule</span>
                </div>
                <p className="text-xl text-cream/90 leading-relaxed italic">
                  {result.experimentalSecrets}
                </p>
              </div>
            </section>

            {/* TECHNICAL DETAILS */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-gold uppercase tracking-[0.3em] flex items-center gap-3">
                <Info className="text-gold" size={28} /> Technical Details & Secrets
              </h2>
              <div className="bg-[#2D1B18] p-8 rounded-[32px] border-2 border-[#4E342E] shadow-xl">
                <ul className="space-y-5">
                  {result.technicalDetails.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-xl text-cream/90 leading-relaxed font-medium">
                      <span className="mt-3 w-2.5 h-2.5 rounded-full bg-gold shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* THE KNOWLEDGE ESSAY */}
            <section className="space-y-8 pb-20">
              <h2 className="text-2xl font-black text-gold uppercase tracking-[0.3em] text-center">
                The Knowledge Essay
              </h2>
              <div className="bg-[#2D1B18] p-8 rounded-[40px] border-2 border-[#4E342E] shadow-2xl relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-earth-brown px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs">
                  Scholarly Insight
                </div>
                <div className="prose prose-invert max-w-none mb-10">
                  <p className="text-xl text-cream/80 leading-[1.8] font-serif italic first-letter:text-5xl first-letter:font-black first-letter:text-gold first-letter:mr-2 first-letter:float-left">
                    {result.knowledgeEssay}
                  </p>
                </div>

                {/* MARKET EDGE */}
                <div className="mt-10 pt-10 border-t-2 border-gold/20">
                  <div className="bg-gold/10 p-6 rounded-2xl border border-gold/30">
                    <h4 className="text-xl font-black text-gold uppercase tracking-widest mb-3 flex items-center gap-2">
                      <TrendingUp size={24} /> Market Edge
                    </h4>
                    <p className="text-lg text-gold/90 font-bold leading-relaxed">
                      {result.marketEdge}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
