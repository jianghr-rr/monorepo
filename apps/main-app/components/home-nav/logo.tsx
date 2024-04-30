import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="blog w-30 overflow-hidden">
      <h1 className="flex w-[85px] bg-muted text-xl font-bold">
        <span>&nbsp;think&nbsp;</span>
      </h1>
    </Link>
  );
}
