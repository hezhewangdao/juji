'use client';

import { useEffect, useState } from 'react';
import { poetryService } from '@/data/poetry/poetryService';
import type { Sentence } from '@/types';

export const SentenceList = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const loadedSentences = poetryService.getAllSentences();
      setSentences(loadedSentences);
    } catch (error) {
      console.error('加载句子失败:', error);
      // Fallback to sample data
      setSentences([
        {
          id: 1,
          content: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。",
          author: "阿甘正传"
        },
        {
          id: 2,
          content: "成功的花，人们只惊羡她现时的明艳！然而当初她的芽儿，浸透了奋斗的泪泉，洒遍了牺牲的血雨。",
          author: "冰心"
        },
        {
          id: 3,
          content: "人生如逆旅，我亦是行人。",
          author: "苏轼"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sentences.map((sentence) => (
        <div key={sentence.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-lg mb-4">{sentence.content}</p>
          <p className="text-right text-gray-500">—— {sentence.author}</p>
          {sentence.origin && (
            <p className="text-right text-sm text-gray-400 mt-1">{sentence.origin}</p>
          )}
          {sentence.likes !== undefined && (
            <div className="flex items-center mt-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{sentence.likes}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};