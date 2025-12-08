import React from 'react';
import { ViralAnalysis } from '../types';
import { TrendingUp, Zap, Heart, Layers, Lightbulb } from 'lucide-react';

interface AnalysisSectionProps {
  analysis: ViralAnalysis;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ analysis }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
        바이럴 요소 분석
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold">
            <Zap size={18} />
            <h3>후킹 전략 (Hook)</h3>
          </div>
          <p className="text-blue-900 text-sm leading-relaxed">{analysis.hookStrategy}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <div className="flex items-center gap-2 mb-2 text-purple-800 font-bold">
            <TrendingUp size={18} />
            <h3>전개 속도 (Pacing)</h3>
          </div>
          <p className="text-purple-900 text-sm leading-relaxed">{analysis.pacing}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 text-gray-800 font-bold text-sm uppercase tracking-wide">
          <Heart size={16} className="text-red-500" />
          감정 트리거
        </div>
        <div className="flex flex-wrap gap-2">
          {analysis.emotionalTriggers.map((trigger, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              #{trigger}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
           <div className="flex items-center gap-2 mb-2 text-gray-800 font-bold text-sm uppercase tracking-wide">
            <Layers size={16} className="text-indigo-500" />
            구조 분해
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
             <ol className="list-decimal list-inside space-y-1">
                {analysis.structureBreakdown.map((step, idx) => (
                  <li key={idx} className="text-gray-700 text-sm">{step}</li>
                ))}
             </ol>
          </div>
        </div>
        
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold">
            <Lightbulb size={18} />
            <h3>성공 요인 요약</h3>
          </div>
          <p className="text-amber-900 text-sm leading-relaxed">{analysis.whyItWorked}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;