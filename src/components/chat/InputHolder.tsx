import { SendHorizonal } from 'lucide-react';
import Link from 'next/link';

export default function InputHolder() {
  return (
    <section className="flex flex-row">
      <input placeholder="Ask Anything...." />
      <Link href="/search/1">
        <SendHorizonal />
      </Link>
    </section>
  );
}
