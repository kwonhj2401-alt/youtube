import React, { useState } from 'react';
import { ScriptFormData } from '../types';
import { Wand2, AlertCircle } from 'lucide-react';

interface InputSectionProps {
  onSubmit: (data: ScriptFormData) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [originalScript, setOriginalScript] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalScript.trim() || !newTopic.trim()) {
      setError('원본 대본과 새로운 주제를 모두 입력해주세요.');
      return;
    }
    setError('');
    onSubmit({ originalScript, newTopic });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
        대본 설정
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow">
        <div className="flex-grow flex flex-col">
          <label htmlFor="originalScript" className="block text-sm font-semibold text-gray-700 mb-2">
            떡상한 영상 대본 (복사/붙여넣기)
          </label>
          <textarea
            id="originalScript"
            className="w-full flex-grow p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none min-h-[200px] text-gray-700 placeholder-gray-400 text-sm leading-relaxed"
            placeholder="예시: 여러분, 이 영상 안 보시면 평생 후회합니다. 오늘 제가 소개할 꿀팁은..."
            value={originalScript}
            onChange={(e) => setOriginalScript(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="newTopic" className="block text-sm font-semibold text-gray-700 mb-2">
            새로 만들 주제
          </label>
          <input
            type="text"
            id="newTopic"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
            placeholder="예시: 다이어트 식단, 아이폰 16 리뷰, 주식 투자 기초"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
            isLoading ? 'bg-gray-400 shadow-none' : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              분석 및 생성 중...
            </>
          ) : (
            <>
              <Wand2 size={20} />
              새로운 대본 생성하기
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputSection;