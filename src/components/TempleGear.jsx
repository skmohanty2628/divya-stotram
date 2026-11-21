import { RETAILERS } from '@/data/gear-links';

// Packing list with plain retailer search links (no affiliate tracking).
export default function TempleGear({ gear }) {
  return (
    <div>
      <p className="font-garamond text-lg leading-relaxed text-[#3d1a00]/80">{gear.intro}</p>
      {gear.groups.map((g) => (
        <div key={g.who} className="mt-8">
          <h3 className="mb-3 font-cinzel text-lg font-bold text-[#8b1a00]">{g.who}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {g.items.map((it) => (
              <div key={it.name} className="flex flex-col rounded-xl border border-[#c9922a]/25 bg-[#fffaf1] p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-white text-2xl shadow-sm" aria-hidden="true">{it.icon}</span>
                  <div>
                    <p className="font-cinzel text-sm font-bold leading-snug text-[#8b1a00]">{it.name}</p>
                    <p className="mt-1 font-garamond text-base leading-snug text-[#3d1a00]/70">{it.why}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {RETAILERS.map((r) => (
                    <a
                      key={r.id}
                      href={r.url(it.q)}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="rounded-full border border-[#c9922a]/40 bg-white px-3 py-1 font-cinzel-reg text-[10px] uppercase tracking-[1.5px] text-[#8b1a00] transition-colors hover:border-[#c9922a] hover:bg-[#fff1d1]"
                    >
                      {r.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="mt-6 font-garamond text-sm text-[#3d1a00]/55">
        These buttons open search pages on other sites in a new tab. Prices, sizes and availability are set by each retailer, and we have no link with them. Choose by fit and quality, not by price alone.
      </p>
    </div>
  );
}
