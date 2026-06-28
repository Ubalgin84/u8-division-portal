type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  className = "",
}: PageHeroProps) {
  return (
    <section className={`pt-20 pb-10 text-center ${className}`}>

      <p className="text-xs uppercase tracking-[0.45em] text-red-500">
        {eyebrow}
      </p>

      <h1 className="mt-4 text-5xl font-black uppercase text-white md:text-6xl">
        {title}
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
        {description}
      </p>

    </section>
  );
}