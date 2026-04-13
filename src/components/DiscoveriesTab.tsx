import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw, ExternalLink, Star, Info } from 'lucide-react';
import { getDiscoveries, getDailyRareIngredient } from '../services/geminiService';
import { Discovery, RareIngredient } from '../types';
import { motion } from 'motion/react';

export function DiscoveriesTab() {
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  const [rareIngredient, setRareIngredient] = useState<RareIngredient | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [discoveriesData, rareData] = await Promise.all([
        getDiscoveries(),
        getDailyRareIngredient()
      ]);
      setDiscoveries(discoveriesData);
      setRareIngredient(rareData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 pb-40 w-full">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-gold mb-3 font-serif italic leading-tight">Discoveries</h1>
          <p className="text-xl text-cream/80 leading-relaxed">Ancient materials & modern breakthroughs.</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="p-5 bg-[#2D1B18] border-2 border-[#4E342E] rounded-3xl text-gold active:border-gold transition-all disabled:opacity-50 shadow-xl"
        >
          <RefreshCw className={cn(loading && "animate-spin")} size={32} />
        </button>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-gold mb-6" size={48} />
          <p className="text-xl text-gold font-black uppercase tracking-widest">Consulting Archives...</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Daily Rare Ingredient Section */}
          {rareIngredient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#2D1B18] rounded-[40px] p-8 text-cream shadow-2xl relative overflow-hidden border-2 border-gold/30"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Star size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="text-gold fill-gold" size={24} />
                  <span className="text-base font-black uppercase tracking-[0.3em] text-gold/80">Daily Rare Material</span>
                </div>
                <h2 className="text-4xl font-black mb-8 font-serif italic text-gold leading-tight">{rareIngredient.name}</h2>
                <div className="space-y-5">
                  {rareIngredient.breakdown.map((line, i) => (
                    <div key={i} className="flex items-start gap-4 text-xl font-medium leading-tight text-cream/90">
                      <div className="mt-2 w-3 h-3 rounded-full bg-gold shrink-0 shadow-[0_0_10px_rgba(255,193,7,0.5)]" />
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-8">
            <h3 className="text-2xl font-black text-gold uppercase tracking-[0.3em] flex items-center gap-3">
              <Info size={28} className="text-gold" /> Updates
            </h3>
            {discoveries.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#2D1B18] border-2 border-[#4E342E] rounded-[40px] p-8 shadow-2xl active:border-gold/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-black text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full">{item.date}</span>
                </div>
                <h2 className="text-2xl font-black text-cream mb-4 font-serif leading-tight">{item.title}</h2>
                <p className="text-lg text-cream/70 leading-relaxed mb-6">{item.content}</p>
                <div className="flex items-center text-gold font-black text-xl gap-2 active:opacity-70">
                  Examine Paper <ExternalLink size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { cn } from '../lib/utils';
