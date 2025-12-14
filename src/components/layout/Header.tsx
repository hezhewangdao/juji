export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center px-4 md:px-8 h-16">
        {/* Logo */}
        <div className="text-xl font-serif font-bold">句子控.</div>

        {/* Desktop Nav: 仅在 md 以上显示 */}
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="/explore">发现</a>
          <a href="/category">分类</a>
        </nav>

        {/* Mobile Nav Trigger: 仅在 md 以下显示 */}
        <button className="md:hidden p-2">
           {/* 汉堡图标 Icon */}
           <span className="sr-only">菜单</span>
        </button>

        {/* Desktop Action */}
        <button className="hidden md:block bg-black text-white px-4 py-2 rounded-sm text-sm">
          分享句子
        </button>
      </div>
    </header>
  );
};