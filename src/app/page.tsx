// src/app/page.tsx
import { HeroSection } from "@/components/features/daily-quote/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* 确保 HeroSection 宽度占满 */}
      <div className="w-full">
        <HeroSection />
      </div>
      
      {/* 这里以后放瀑布流列表 */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center">最新收录</h2>
        <div className="text-center text-gray-400">内容列表区域</div>
      </div>
    </main>
  );
}
