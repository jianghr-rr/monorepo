'use client';
import { usePathname } from 'next/navigation';
import WujieReact from 'wujie-react';
import hostMap from '~/micro/hostmap';
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname().replace('/knowledge', '').replace('/', ''); /// /
  const react16Url = hostMap('//localhost:4001/') + path;

  const props = {
    jump: (name: string) => {
      console.log('name::', name);
    },
  };

  return (
    <WujieReact
      width="100%"
      height="100%"
      name="react16"
      url={react16Url}
      sync={!path}
      props={props}
    ></WujieReact>
  );
}
