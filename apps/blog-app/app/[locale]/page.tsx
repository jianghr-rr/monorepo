/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(() => import('./page-jojo'), {
  ssr: false,
});

const HomePage = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <DynamicComponentWithNoSSR />
    </div>
  );
};
export default HomePage;
