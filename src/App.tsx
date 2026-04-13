/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { BottomNav } from './components/BottomNav';
import { SearchTab } from './components/SearchTab';
import { DiscoveriesTab } from './components/DiscoveriesTab';
import { SubstituteTab } from './components/SubstituteTab';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('search');

  const renderTab = () => {
    switch (activeTab) {
      case 'search':
        return <SearchTab />;
      case 'discoveries':
        return <DiscoveriesTab />;
      case 'substitute':
        return <SubstituteTab />;
      default:
        return <SearchTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0F0E] flex justify-center selection:bg-gold selection:text-earth-brown">
      {/* Mobile Container */}
      <div className="w-full max-w-[500px] bg-earth-brown min-h-screen shadow-[0_0_100px_rgba(0,0,0,0.5)] relative flex flex-col">
        {/* Main Content Area */}
        <main className="flex-1 relative overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <div className="sticky bottom-0 z-50">
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="bg-[#2D1B18] h-[env(safe-area-inset-bottom)] w-full" />
        </div>
      </div>

      {/* Global Styles for Mobile Feel */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
}

