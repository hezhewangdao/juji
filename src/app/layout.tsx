import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '句子控 - 句子分享网站',
  description: '一个专注于分享精彩句子的平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-white bg-cover bg-center bg-no-repeat md:bg-[url('/images/desktop-bg.png')] bg-[url('/images/mobile-bg.png')]">
          {children}
        </div>
      </body>
    </html>
  )
}