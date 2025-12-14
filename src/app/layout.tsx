import type { Metadata } from "next";
// 1. 引入 Noto Serif SC 字体
import { Noto_Serif_SC } from "next/font/google";
import "./globals.css"; // 2. 确保引入了全局样式

// 配置字体
const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-noto-serif", // 定义 CSS 变量
  preload: false, // 中文字体建议设为 false 或只 preload 常用字
});

export const metadata: Metadata = {
  title: "句子控 Juzikong",
  description: "捕捉文字的共鸣",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      {/* 3. 将字体变量注入 body */}
      <body className={`${notoSerif.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}