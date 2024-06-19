'use client';
import dynamic from 'next/dynamic';
import { MDXWrapper } from '~/components/mdx-wrapper';

const Page = dynamic(() => import('./example.mdx'));

export default function Home() {
  return (
    <MDXWrapper>
      <Page />
    </MDXWrapper>
  );
}
