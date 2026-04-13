import React from 'react';
import { Search, Sparkles, Shield, Calculator, Repeat } from 'lucide-react';
import { TabType } from '../types';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'search', label: 'Search', icon: <Search size={28} /> },
    { id: 'discoveries', label: 'Discoveries', icon: <Sparkles size={28} /> },
    { id: 'substitute', label: 'Swap', icon: <Repeat size={28} /> },
  ];

  return (
    <nav className="bg-[#2D1B18] border-t border-[#4E342E] shadow-2xl">
      <div className="flex justify-around items-center h-24">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-all duration-150 active:bg-earth-brown",
              activeTab === item.id ? "text-gold" : "text-[#A1887F]"
            )}
          >
            <div className={cn(
              "p-2 rounded-xl transition-all",
              activeTab === item.id ? "bg-earth-brown shadow-inner" : "bg-transparent"
            )}>
              {item.icon}
            </div>
            <span className="text-[10px] font-black mt-1 uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
