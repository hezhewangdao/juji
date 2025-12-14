export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    // 移动端左右 padding-4，PC端 padding-8 且最大宽度居中
    <div className={`w-full px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
};