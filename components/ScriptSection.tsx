import React, { useState } from 'react';
import { GeneratedResult } from '../types';
import { Copy, Check, Video, Clock } from 'lucide-react';

interface ScriptSectionProps {
  result: GeneratedResult;
}

const ScriptSection: React.FC<ScriptSectionProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = result.newScript.sections
      .map(s => `[${s.estimatedDuration}] (${s.sectionName})\n화면: ${s.visualCue}\n대사: ${s.content}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(`제목: ${result.newScript.title}\n\n${textToCopy}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
          생성된 대본
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          {copied ? '복사됨!' : '전체 복사'}
        </button>
      </div>

      <div className="bg-gray-900 text-white p-5 rounded-xl mb-6 shadow-lg">
        <span className="text-red-400 text-xs font-bold tracking-wider uppercase mb-1 block">추천 제목</span>
        <h3 className="text-xl md:text-2xl font-black leading-tight">{result.newScript.title}</h3>
      </div>

      <div className="space-y-6">
        {result.newScript.sections.map((section, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-gray-200 hover:border-red-400 transition-colors">
            <div className="absolute -left-[9px] top-0 bg-white border-2 border-red-500 w-4 h-4 rounded-full"></div>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded uppercase">
                {section.sectionName}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400 font-mono">
                <Clock size={12} />
                {section.estimatedDuration}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
               <div className="flex items-start gap-2 text-xs text-gray-500 mb-1">
                 <Video size={14} className="mt-0.5 flex-shrink-0 text-blue-500" />
                 <span className="font-semibold text-blue-600">화면 가이드:</span>
               </div>
               <p className="text-sm text-gray-600 italic pl-6">{section.visualCue}</p>
            </div>

            <p className="text-gray-900 font-medium leading-relaxed whitespace-pre-wrap text-[15px]">
              "{section.content}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptSection;