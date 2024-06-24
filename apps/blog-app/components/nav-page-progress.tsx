'use client'; // 使用 client 组件
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const PagePorgress = ({ children }: { children: React.ReactNode }) => {
  const carouselRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: carouselRef,
    layoutEffect: true,
  });

  return (
    <>
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <div
        ref={carouselRef}
        className="relative box-border flex h-full flex-col overflow-auto p-4 px-10"
      >
        {children}
      </div>
    </>
  );
};

export default PagePorgress;
