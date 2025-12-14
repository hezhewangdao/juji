'use client'; // 必须标记为客户端组件，因为涉及 useEffect 和 浏览器API

import { useEffect, useState } from 'react';

// --- 类型定义 ---
interface QuoteData {
  hitokoto: string;
  from: string;
  from_who: string | null;
}

interface WeatherData {
  city: string;
  temp: number;
  code: number; // WMO 天气代码
  desc: string;
}

export const HeroSection = () => {
  // --- State 状态管理 ---
  const [quote, setQuote] = useState<QuoteData>({
    hitokoto: "正在加载文字的灵魂...",
    from: "Loading",
    from_who: null
  });
  
  const [weather, setWeather] = useState<WeatherData>({
    city: "定位中",
    temp: 0,
    code: 0,
    desc: "..."
  });

  const [isLoading, setIsLoading] = useState(true);

  // --- 辅助函数：将 WMO 天气代码转为中文 ---
  const getWeatherDesc = (code: number): string => {
    // 简单映射 Open-Meteo 的 WMO code
    if (code === 0) return '晴朗';
    if (code >= 1 && code <= 3) return '多云';
    if (code >= 45 && code <= 48) return '雾';
    if (code >= 51 && code <= 67) return '细雨';
    if (code >= 71 && code <= 77) return '小雪';
    if (code >= 80 && code <= 82) return '阵雨';
    if (code >= 95 && code <= 99) return '雷雨';
    return '阴';
  };

  // --- 核心逻辑 1: 获取 Hitokoto 句子 ---
  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      // c=d(文学), c=i(诗词), c=k(哲学)
      const res = await fetch('https://v1.hitokoto.cn/?c=d&c=i&c=k');
      const data = await res.json();
      setQuote({
        hitokoto: data.hitokoto,
        from: data.from,
        from_who: data.from_who
      });
    } catch (error) {
      console.error("句子获取失败:", error);
      setQuote({ hitokoto: "生活明朗，万物可爱。", from: "网络", from_who: null });
    } finally {
      setIsLoading(false);
    }
  };

  // --- 核心逻辑 2: 获取 IP定位 + 天气 (无需 Key) ---
  const fetchWeather = async () => {
    try {
      // 1. 通过 GeoJS 获取粗略 IP 位置 (HTTPS, 免费)
      const geoRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
      const geoData = await geoRes.json();
      const { latitude, longitude, city } = geoData;

      // 2. 使用经纬度查询 Open-Meteo 天气 (HTTPS, 免费, 无需Key)
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
      
      const current = weatherData.current_weather;
      
      setWeather({
        city: city || "本地",
        temp: Math.round(current.temperature),
        code: current.weathercode,
        desc: getWeatherDesc(current.weathercode)
      });
    } catch (error) {
      console.error("天气获取失败:", error);
      setWeather(prev => ({ ...prev, city: "未知", desc: "暂无数据" }));
    }
  };

  // --- 生命周期 ---
  useEffect(() => {
    fetchQuote();
    fetchWeather();
  }, []);

  // --- 渲染 UI ---
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex flex-col justify-center items-center text-center px-6 bg-paper-texture">
      
      {/* 装饰性大引号 */}
      <div className="absolute top-10 left-4 md:left-20 text-8xl font-serif text-gray-200 select-none opacity-50">
        “
      </div>

      {/* 1. 句子显示区 */}
      <div className={`max-w-4xl transition-opacity duration-1000 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <h1 
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-ink-900 leading-tight cursor-pointer hover:opacity-80 transition"
          onClick={fetchQuote} // 点击文字也可以刷新
          title="点击切换一句"
        >
          {quote.hitokoto}
        </h1>
        
        <div className="mt-8 flex flex-col items-center space-y-2 text-gray-500 font-light">
          <p className="text-lg md:text-xl tracking-widest">
            —— {quote.from_who ? quote.from_who : ''} 「{quote.from}」
          </p>
        </div>
      </div>

      {/* 刷新按钮 (骰子图标) */}
      <button 
        onClick={fetchQuote}
        className="mt-12 p-3 text-gray-400 hover:text-ink-900 transition-all duration-500 hover:rotate-180"
        aria-label="换一句"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
      </button>

      {/* 2. 底部环境信息栏 (天气 + 日期) */}
      <div className="absolute bottom-6 md:bottom-10 flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-400 font-mono tracking-wide">
        
        {/* 城市 */}
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {weather.city}
        </span>
        
        <span className="h-3 w-px bg-gray-300"></span>
        
        {/* 天气状况 */}
        <span className="flex items-center">
           {/* 根据天气描述简单显示文字，也可以在这里加 Icon */}
           {weather.desc} · {weather.temp}°C
        </span>

        <span className="h-3 w-px bg-gray-300"></span>

        {/* 日期 */}
        <span>
          {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' })}
        </span>
      </div>

    </section>
  );
};