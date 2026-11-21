import { TRAVEL_PROVIDERS, OFFICIAL, TRAVEL_PLACES } from '@/data/travel-links';

// Plain outbound links (no affiliate tracking). Shown only on place-based guides.
export default function TravelBox({ slug, place, officialLink, extra = [] }) {
  const t = slug && TRAVEL_PLACES[slug] ? TRAVEL_PLACES[slug] : place ? { place } : null;
  if (!t) return null;
  const official = officialLink || (t.official ? OFFICIAL[t.official] : null);
  const items = [...extra.map((e, i) => ({ id: 'x' + i, ...e })), ...TRAVEL_PROVIDERS];
  return (
    <section className="mt-12 rounded-2xl border border-[#c9922a]/25 bg-white p-6" aria-labelledby="travel-heading">
      <h2 id="travel-heading" className="font-cinzel text-xl font-bold text-[#8b1a00]">Planning to visit {t.place}?</h2>
      <p className="mt-1 font-garamond text-base text-[#3d1a00]/70">
        Check the dates and customs in this guide first, then compare trains, flights and stays on these booking sites. They open in a new tab, and prices and availability are set by each site.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-center gap-3 rounded-xl border border-[#c9922a]/25 bg-[#fff7e8] p-3 transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden="true">{p.icon}</span>
            <span>
              <span className="block font-cinzel text-sm font-bold text-[#8b1a00]">{p.name}</span>
              <span className="block font-garamond text-sm text-[#3d1a00]/65">{p.note}</span>
            </span>
          </a>
        ))}
        {official && (
          <a
            href={official.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-[#c9922a]/40 bg-[#fff1d1] p-3 transition-all hover:-translate-y-0.5 hover:border-[#c9922a] hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden="true">🏛️</span>
            <span>
              <span className="block font-cinzel text-sm font-bold text-[#8b1a00]">{official.name}</span>
              <span className="block font-garamond text-sm text-[#3d1a00]/65">Places to see and travel information</span>
            </span>
          </a>
        )}
      </div>
      <p className="mt-3 font-garamond text-xs text-[#3d1a00]/55">
        Festival dates can shift by a day between calendars, so confirm the date before you book. Book refundable options where possible.
      </p>
    </section>
  );
}
