import { commonsUrl, commonsPage } from '@/data/festival-photos';

// Small credited photo cards shown beside (desktop, tablet) or under (phone) a section heading.
// Photos are Wikimedia Commons files under free licences.
export default function SectionPhotos({ photos }) {
  if (!photos || !photos.length) return null;
  return (
    <div
      className={`mb-5 grid gap-3 sm:gap-4 md:float-right md:mb-4 md:ml-6 md:flex md:w-72 md:flex-col lg:w-80 ${
        photos.length > 1 ? 'grid-cols-2' : 'max-w-[16rem] grid-cols-1 sm:max-w-xs'
      }`}
    >
      {photos.map((p) => (
        <figure key={p.file} className="m-0 overflow-hidden rounded-xl border border-[#c9922a]/30 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={commonsUrl(p.file, 800)}
            srcSet={`${commonsUrl(p.file, 480)} 480w, ${commonsUrl(p.file, 800)} 800w, ${commonsUrl(p.file, 1200)} 1200w`}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 90vw"
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
          <figcaption className="px-3 py-2 font-garamond text-sm leading-snug text-[#3d1a00]/75">
            <span className="block text-[#3d1a00]">{p.caption}</span>
            <a href={commonsPage(p.file)} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8a5f00] underline decoration-[#c9922a]/50">
              {p.credit}, {p.license}
            </a>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
