// 分享海报主题背景组件
import { useState } from 'react';

export const PosterThemes = ({ isVisible }: { isVisible: boolean }) => {
  // 分享海报主题背景
  const themes = [
    { id: 1, name: '纸短情长', image: '/images/paper.png' },
    { id: 2, name: '光影斑驳', image: '/images/shadow.png' },
    { id: 3, name: '雨夜微醺', image: '/images/rain.png' },
    { id: 4, name: '旷野长空', image: '/images/sky.png' },
    { id: 5, name: '墨染流年', image: '/images/ink.png' },
    { id: 6, name: '温暖一隅', image: '/images/warm.png' },
  ];

  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="my-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">选择分享海报主题</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {themes.map((theme) => (
          <div 
            key={theme.id} 
            className={`rounded-lg overflow-hidden shadow-md cursor-pointer transition-all ${
              selectedTheme.id === theme.id 
                ? 'ring-4 ring-blue-500 scale-105' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedTheme(theme)}
          >
            <div className="aspect-[9/16] relative">
              <img 
                src={theme.image} 
                alt={theme.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-medium text-center px-1 text-xs">{theme.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">预览</h3>
        <div className="max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg">
          <div 
            className="aspect-[9/16] relative"
            style={{ backgroundImage: `url(${selectedTheme.image})`, backgroundSize: 'cover' }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-20">
              <div className="text-white text-center">
                <p className="text-lg mb-2">句子控</p>
                <p className="text-sm">每日一句，感悟人生</p>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          生成海报并分享
        </button>
      </div>
    </div>
  );
};