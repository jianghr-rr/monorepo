'use client'; // 使用 client 组件
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  out: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
  },
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  // 计算路径深度
  const pathSegments = pathname?.split('/').filter((segment) => segment !== '');
  const pathDepth = pathSegments?.length;

  // 检查路径深度，二级路由应用动画
  const enableAnimation = pathDepth === 1;

  return (
    <AnimatePresence mode="wait">
      {enableAnimation ? (
        <motion.div
          className="size-full"
          key={pathname}
          variants={variants}
          initial="in"
          animate="in"
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        <div key={pathname}>{children}</div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
