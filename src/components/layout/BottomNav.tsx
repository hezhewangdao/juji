'use client';
// 仅在移动端显示，固定在底部
export const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50">
       <a href="/" className="flex flex-col items-center text-xs">
         <span>首页</span>
       </a>
       <a href="/share" className="flex flex-col items-center">
         <div className="bg-black text-white p-3 rounded-full -mt-6 shadow-lg">
           <span>+</span>
         </div>
       </a>
       <a href="/me" className="flex flex-col items-center text-xs">
         <span>我的</span>
       </a>
    </nav>
  );
};