import React from 'react';
import { Youtube, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-lg text-white">
              <Youtube size={24} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                VIRAL<span className="text-red-600">CLONER</span>
              </h1>
              <span className="text-xs text-gray-500 font-medium">유튜브 떡상 대본 생성기</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              <Sparkles size={14} className="text-amber-500" />
              <span>Powered by Gemini 2.5 Flash</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;