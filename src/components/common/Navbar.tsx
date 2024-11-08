import Link from 'next/link';

export default function Navbar({ userName }: { userName: string }) {
  return (
    <nav className="w-full flex flex-row py-5 px-10 bg-background text-primaryText justify-between">
      <Link prefetch={true} href={'/home'}>
        gpt
      </Link>
      <Link href={'/settings'}>{userName}</Link>
    </nav>
  );
}
