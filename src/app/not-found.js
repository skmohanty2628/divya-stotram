import Link from 'next/link';
import SiteShell from '@/components/SiteShell';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const links = [
    ['/hanuman-chalisa', 'Hanuman Chalisa'],
    ['/shiva-tandav', 'Shiva Tandav Stotram'],
    ['/durga-stotram', 'Durga Stotram'],
    ['/gayatri-mantra', 'Gayatri Mantra'],
    ['/vishnu-sahasranamam', 'Vishnu Sahasranamam'],
    ['/festivals', 'Festival calendar'],
    ['/guides', 'All guides'],
    ['/all-stotrams', 'All stotrams'],
  ];
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-6xl">🪔</p>
        <h1 className="mt-4 font-cinzel text-3xl font-bold text-[#8b1a00]">This page could not be found</h1>
        <p className="mt-3 font-garamond text-lg text-[#3d1a00]/75">
          The link may be old or mistyped. These pages are a good place to continue your reading.
        </p>
        <form action="/search" method="get" role="search" className="mx-auto mt-8 flex max-w-md gap-2">
          <label htmlFor="nf-q" className="sr-only">Search stotrams and guides</label>
          <input
            id="nf-q"
            name="q"
            type="search"
            placeholder="Search a prayer or topic"
            className="min-w-0 flex-1 rounded-full border border-[#c9922a]/50 bg-white px-5 py-3 font-garamond text-lg outline-none focus:border-[#8b1a00]"
          />
          <button type="submit" className="rounded-full bg-[#8b1a00] px-5 font-cinzel-reg text-xs uppercase tracking-[2px] text-white">Search</button>
        </form>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-[#c9922a]/30 bg-white px-4 py-3 font-garamond text-lg text-[#8b1a00] transition-all hover:border-[#c9922a] hover:shadow-md"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
