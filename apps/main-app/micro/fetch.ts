'use client';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function fetch(url: RequestInfo, options: any) {
  return window.fetch(url, { ...options, credentials: 'omit' });
}
