import React, { useState } from 'react';
import { Repeat, Loader2, ArrowRight, Info } from 'lucide-react';
import { getSubstitute } from '../services/geminiService';
import { Substitute } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function SubstituteTab() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Substitute | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const substitute = await getSubstitute(query);
      setResult(substitute);
    } catch (error) {
      console.error(error);
      alert('Failed to find substitute. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 pb-40 w-full">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gold mb-3 font-serif italic leading-tight">Smart Substitute</h1>
        <p className="text-xl text-cream/80 leading-relaxed">Find affordable alternatives for precious raw materials.</p>
      </header>

      <form onSubmit={handleSearch} className="mb-12">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Oud Oil, Jasmine"
            className="w-full h-20 pl-16 pr-4 text-xl bg-[#2D1B18] border-2 border-[#4E342E] rounded-3xl text-cream focus:border-gold outline-none shadow-2xl transition-all"
          />
          <Repeat className="absolute left-6 top-1/2 -translate-y-1/2 text-gold" size={32} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 btn-mobile bg-gold text-earth-brown text-xl font-black rounded-3xl shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin" size={32} /> : 'Seek Budget Swap'}
        </button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
          >
            {/* Before & After Style */}
            <div className="bg-[#2D1B18] border-2 border-[#4E342E] rounded-[40px] p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16" />
              
              <div className="relative z-10 space-y-10">
                {/* Expensive Section */}
                <div className="space-y-4">
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-red-400 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" /> Expensive
                  </span>
                  <h2 className="text-3xl font-black text-cream leading-tight font-serif italic">
                    {result.expensiveIngredient}
                  </h2>
                </div>

                {/* Arrow Divider */}
                <div className="flex justify-center">
                  <div className="bg-gold/10 p-4 rounded-full border-2 border-gold/20">
                    <ArrowRight className="text-gold" size={32} />
                  </div>
                </div>

                {/* Budget Mix Section */}
                <div className="space-y-6">
                  <span className="text-sm font-black uppercase tracking-[0.3em] text-green-400 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" /> The Budget Mix
                  </span>
                  <div className="space-y-4">
                    {result.budgetMix.map((item, i) => (
                      <div key={i} className="bg-earth-brown p-6 rounded-2xl border-2 border-[#4E342E] shadow-inner">
                        <span className="text-xl font-black text-gold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mixing Tip Section */}
                <div className="bg-gold rounded-[32px] p-8 text-earth-brown shadow-2xl border-2 border-amber-accent/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={24} className="text-earth-brown/60" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-earth-brown/60">Mixing Wisdom</span>
                  </div>
                  <p className="text-xl font-black leading-tight italic font-serif">
                    "{result.mixingTip}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
