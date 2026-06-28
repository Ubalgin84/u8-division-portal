type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <section className="pt-32 pb-16 text-center">

      <p className="text-sm uppercase tracking-[0.4em] text-red-500">
        {eyebrow}
      </p>

      <h1 className="mt-6 text-6xl xl:text-7xl font-black">
        {title}
      </h1>

      <p className="mt-5 text-lg text-gray-400 max-w-3xl mx-auto">
        {description}
      </p>

    </section>
  );
}