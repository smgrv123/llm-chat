import Link from 'next/link';

export default function Sidebar() {
  const hrefHandler = (id: string) => `search/${id}`;

  return (
    <section className="h-full px-4 text-secondaryText bg-background">
      <article className="py-2">
        <Link href={hrefHandler('1')}>
          <div className="text-accent">Date</div>
          <div>dvnlidabnvaeijbndednv one dvoisnvoiaens vlekino</div>
        </Link>
      </article>
    </section>
  );
}
