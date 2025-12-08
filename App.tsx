import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import AnalysisSection from './components/AnalysisSection';
import ScriptSection from './components/ScriptSection';
import { generateViralScript } from './services/geminiService';
import { GeneratedResult, ScriptFormData } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: ScriptFormData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedData = await generateViralScript(data.originalScript, data.newTopic);
      setResult(generatedData);
    } catch (err: any) {
      setError("스크립트 생성 중 오류가 발생했습니다. API 키를 확인하거나 잠시 후 다시 시도해주세요.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-gray-900 pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Banner */}
        {!result && !loading && (
          <div className="text-center py-10 sm:py-20 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">
              떡상하는 영상은 <br className="sm:hidden" />
              <span className="text-red-600">공식</span>이 있습니다.
            </h2>
            <p className="text-gray-500 text-lg sm:text-xl">
              성공한 영상의 대본을 가져오세요.<br/>
              AI가 구조를 훔쳐서 당신만의 주제로 다시 써드립니다.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input */}
          <div className={`lg:col-span-5 ${result ? '' : 'lg:col-start-4 lg:col-span-6'}`}>
             <InputSection onSubmit={handleGenerate} isLoading={loading} />
          </div>

          {/* Right Column: Results */}
          {(result || loading) && (
            <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
              
              {loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                  <Loader2 size={48} className="text-red-600 animate-spin mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">분석 및 작성 중...</h3>
                  <p className="text-gray-500">
                    떡상 포인트를 분석하고<br/>
                    새로운 주제에 대입하고 있습니다.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                  {error}
                </div>
              )}

              {result && !loading && (
                <>
                  <AnalysisSection analysis={result.analysis} />
                  <ScriptSection result={result} />
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;