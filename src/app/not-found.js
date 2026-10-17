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
