'use client';

import { useEffect, useState } from 'react';
import { poetryService } from '@/data/poetry/poetryService';
import type { Sentence } from '@/types';

export const Hero = () => {
  const [featuredSentence, setFeaturedSentence] = useState<Sentence | null>(null);

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
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">每日一句</h1>
        {featuredSentence ? (
          <>
            <p className="text-xl md:text-3xl font-medium mb-6 text-gray-800">
              "{featuredSentence.content}"
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              —— {featuredSentence.author}
              {featuredSentence.origin && (
                <span className="block text-base text-gray-500 mt-1">
                  《{featuredSentence.origin}》
                </span>
              )}
            </p>
          </>
        ) : (
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            正在加载今日佳句...
          </p>
        )}
        <button className="bg-black text-white px-6 py-3 rounded-lg text-sm md:text-base hover:bg-gray-800 transition">
          开始探索
        </button>
      </div>
    </div>
  );
};