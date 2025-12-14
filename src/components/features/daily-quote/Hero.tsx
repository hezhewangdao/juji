'use client';

import { useEffect, useState } from 'react';
import { poetryService } from '@/data/poetry/poetryService';
import type { Sentence } from '@/types';
import { PosterThemes } from '@/components/features/share/PosterThemes';

export const Hero = () => {
  const [featuredSentence, setFeaturedSentence] = useState<Sentence | null>(null);
  const [showPosterThemes, setShowPosterThemes] = useState(false);

  useEffect(() => {
    try {
      const famousSentences = poetryService.getFamousSentences();
      if (famousSentences.length > 0) {
        // 随机选择一句名句作为特色展示
        const randomIndex = Math.floor(Math.random() * famousSentences.length);
        setFeaturedSentence(famousSentences[randomIndex]);
      }
    } catch (error) {
      console.error('加载名句失败:', error);
      // Fallback to default
      setFeaturedSentence({
        id: 1,
        content: "读书破万卷，下笔如有神。",
        author: "杜甫"
      });
    }
  }, []);

  return (
    <div className="w-full bg-cover bg-center bg-no-repeat md:bg-[url('/images/desktop-bg.png')] bg-[url('/images/mobile-bg.png')]">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-lg">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-gray-800">每日一句</h1>
          {featuredSentence ? (
            <>
              <p className="text-xl md:text-2xl font-medium mb-6 text-gray-800 text-center italic">
                "{featuredSentence.content}"
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
                —— {featuredSentence.author}
                {featuredSentence.origin && (
                  <span className="block text-base text-gray-500 mt-1">
                    《{featuredSentence.origin}》
                  </span>
                )}
              </p>
            </>
          ) : (
            <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
              正在加载今日佳句...
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-lg text-sm md:text-base hover:bg-gray-800 transition">
              开始探索
            </button>
            <button 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm md:text-base hover:bg-gray-50 transition"
              onClick={() => setShowPosterThemes(!showPosterThemes)}
            >
              {showPosterThemes ? '隐藏分享' : '分享佳句'}
            </button>
          </div>
          
          <PosterThemes isVisible={showPosterThemes} />
        </div>
      </div>
    </div>
  );
};