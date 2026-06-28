import Image from "next/image";
import Link from "next/link";

type Props = {
  article: {
    title: string;
    excerpt: string;
    slug: string;
    image_url: string;
    race_date: string;
    track: string;
  };
};

export default function NewsCard({ article }: Props) {
  return (
    <Link
      href={`/novinky/${article.slug}`}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-red-900/70
        bg-black/80
        backdrop-blur-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-red-500
        hover:shadow-[0_20px_50px_rgba(220,38,38,0.25)]
      "
    >
      {/* Obrázek */}

      <div className="relative h-48 overflow-hidden">

        <Image
          src={article.image_url || "/hero-bg.png"}
          alt={article.title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Hover overlay */}

        <div
          className="
            absolute inset-0
            bg-red-600/0
            transition-all
            duration-500
            group-hover:bg-red-600/10
          "
        />
      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-6">

        <span
          className="
            inline-flex
            w-fit
            rounded-full
            border
            border-red-600/60
            bg-red-950/40
            px-3
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-red-400
          "
        >
          {article.track}
        </span>

        <p className="mt-3 text-xs text-gray-400">
          {article.race_date}
        </p>

        <h3 className="mt-4 line-clamp-2 text-2xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-red-500">
          {article.title}
        </h3>

        <p className="mt-4 line-clamp-2 text-sm leading-7 text-gray-400">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-8">

          <div className="h-px bg-red-900/40 mb-5" />

          <span
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-red-500
              transition-all
              duration-300
              group-hover:gap-3
            "
          >
            Číst reportáž →
          </span>

        </div>

      </div>
    </Link>
  );
}