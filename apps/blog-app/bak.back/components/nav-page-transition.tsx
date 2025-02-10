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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="size-full"
        key={pathname}
        variants={variants}
        initial="out"
        animate="in"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
