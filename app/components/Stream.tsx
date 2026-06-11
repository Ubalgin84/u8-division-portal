export default function Stream() {
  return (
    <section className="max-w-[1700px] mx-auto px-8 py-24">

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-5xl font-black uppercase text-white">
          LIVE STREAM
        </h2>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-red-500 font-bold uppercase">
            Online
          </span>
        </div>
      </div>

      <div className="border border-red-900 bg-black/70 rounded-xl overflow-hidden">

        <div className="grid lg:grid-cols-2">

          <div>
            <img
              src="/twitch-live.jpg"
              alt="Live Stream"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-10 flex flex-col justify-center">

            <p className="text-red-500 uppercase font-bold mb-3">
              Twitch Live
            </p>

            <h3 className="text-5xl font-black text-white mb-5">
              Ubalgin_8
            </h3>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Sleduj živě endurance závody, GT3 speciály,
              tréninky iRacingu, kvalifikace a zákulisí týmu
              U8 Divisione.
            </p>

            <div className="flex gap-10 mb-10">

              <div>
                <div className="text-3xl font-black text-white">
                  266+
                </div>
                <div className="text-gray-500">
                  Sledujících
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-white">
                  8+
                </div>
                <div className="text-gray-500">
                  Diváků
                </div>
              </div>

              <div>
                <div className="text-3xl font-black text-white">
                  40h
                </div>
                <div className="text-gray-500">
                  Týdně
                </div>
              </div>

            </div>

            <a
              href="https://www.twitch.tv/ubalgin_8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition w-fit"
            >
              🔴 SLEDOVAT ŽIVĚ
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}