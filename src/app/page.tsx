'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/features/daily-quote/Hero';
import { SentenceList } from '@/components/features/sentence-list/SentenceList';
import { PosterThemes } from '@/components/features/share/PosterThemes';
import { poetryService } from '@/data/poetry/poetryService';
import type { Sentence } from '@/types';

export default function HomePage() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [filteredSentences, setFilteredSentences] = useState<Sentence[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const loadedSentences = poetryService.getAllSentences();
      setSentences(loadedSentences);
      setFilteredSentences(loadedSentences);
    } catch (error) {
      console.error('加载句子失败:', error);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSentences(sentences);
    } else {
      const filtered = sentences.filter(sentence =>
        sentence.content.includes(searchTerm) ||
        sentence.author.includes(searchTerm) ||
        (sentence.origin && sentence.origin.includes(searchTerm))
      );
      setFilteredSentences(filtered);
    }
  }, [searchTerm, sentences]);

  return (
    <main className="min-h-screen bg-paper pb-20 md:pb-0">
      {/* 搜索框 */}
      <div className="px-4 md:container md:mx-auto py-4">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="搜索诗词名句..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 
        Hero区域：
        - 移动端：h-screen (全屏沉浸)
        - PC端：min-h-[600px] (高度适中，留出下方内容)
      */}
      <section className="h-[80vh] md:min-h-[600px] md:h-auto w-full">
        <Hero />
      </section>
      
      {/* 分享海报主题背景 */}
      <div className="px-4 md:container md:mx-auto py-8">
        <PosterThemes />
      </div>
      
      {/* 
        内容区域：
        - 移动端：px-4 (小边距)
        - PC端：container mx-auto (居中且有最大宽度)
      */}
      <div className="px-4 md:container md:mx-auto py-8 md:py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {searchTerm ? `搜索"${searchTerm}"的结果` : '精选名句'}
        </h2>
        <SentenceList />
      </div>
    </main>
  );
}