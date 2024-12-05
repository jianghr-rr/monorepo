"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {userAPI} from "~api/user.api";
// import useSWR from 'swr'
export default function Home() {


  const onLogin = async () => {
    try {
      const response = await userAPI.login({
        username: 'joge',
        password: '123',
      });
      console.log('response', response);
    } catch (e: any) {
      console.log('error', e);
    } finally {
      console.log('finally');
    }
}

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div onClick={onLogin}>test login</div>
    </div>
  );
}
