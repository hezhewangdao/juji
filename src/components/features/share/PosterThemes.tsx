// 分享海报主题背景组件
export const PosterThemes = () => {
  // 分享海报主题背景
  const themes = [
    { id: 1, name: '纸短情长', image: '/images/paper.png' },
    { id: 2, name: '光影斑驳', image: '/images/shadow.png' },
    { id: 3, name: '雨夜微醺', image: '/images/rain.png' },
    { id: 4, name: '旷野长空', image: '/images/sky.png' },
    { id: 5, name: '墨染流年', image: '/images/ink.png' },
    { id: 6, name: '温暖一隅', image: '/images/warm.png' },
  ];

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4 text-center">分享海报主题</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {themes.map((theme) => (
          <div key={theme.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="aspect-[9/16] relative">
              <img 
                src={theme.image} 
                alt={theme.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white font-medium text-center px-2">{theme.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};