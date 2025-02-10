/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/get-mdx-content.js

// pages/api/get-mdx-content.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export default async function handler(req: any, res: any, context: any) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'example.mdx');
    const source = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(source);
    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    });

    res.status(200).json({ mdxSource, data });
  } catch (error) {
    console.error('Error processing MDX content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
