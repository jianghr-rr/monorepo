'use client';
/* eslint-disable react/no-unknown-property */
import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="loader">
        <Loader />
      </div>
      <span className="ml-2">Loading...</span>
    </div>
  );
}
