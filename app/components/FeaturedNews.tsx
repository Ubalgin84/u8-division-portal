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

export default function FeaturedNews({ article }: Props) {
    return (
        <section className="mb-20">

            <Link
                href={`/novinky/${article.slug}`}
                className="group block overflow-hidden rounded-2xl bg-black shadow-[0_25px_60px_rgba(0,0,0,.6)]"
            >

                {/* FOTO */}

                <div className="relative h-[560px]">

                    <Image
                        src={article.image_url || "/hero-bg.png"}
                        alt={article.title}
                        fill
                        priority
                        className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* Gradient */}

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black via-40% to-transparent" />

                    {/* Jemné ztmavení */}

                    <div className="absolute inset-0 bg-black/20" />

                    {/* TEXT */}

                    <div className="absolute inset-y-0 left-0 z-10 flex w-full max-w-[42%] flex-col justify-end p-10">

                        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-500">
                            HLAVNÍ REPORTÁŽ
                        </p>

                        <p className="mb-2 text-sm text-gray-400">
                            {article.race_date}
                        </p>

                        <h2 className="mb-4 text-4xl font-black leading-tight text-white">
                            {article.title}
                        </h2>

                        <p className="mb-8 text-lg font-semibold text-red-500">
                            {article.track}
                        </p>

                        <span
                            className="
      inline-flex
      w-fit
      rounded-xl
      border
      border-red-600
      px-6
      py-3
      text-sm
      font-semibold
      text-white
      transition
      group-hover:bg-red-600
    "
                        >
                            Číst reportáž
                        </span>

                    </div>

                </div>


            </Link>

        </section >
    );
}