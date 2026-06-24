import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-red-900 mt-32">
      <Container className="py-12">

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white">
              U8
            </h3>

            <p className="text-red-500 font-bold uppercase">
              Divisione
            </p>

            <p className="text-gray-300 mt-3 text-base">
              Jeden tým. Jeden cíl.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-white text-sm font-bold uppercase mb-3 tracking-wider">
              Sleduj nás
            </h4>

            <div className="flex flex-wrap justify-center gap-4">

              <a
                href="https://www.twitch.tv/ubalgin_8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition"
              >
                Twitch
              </a>

              <a
                href="https://www.youtube.com/@Ubalgin_8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition"
              >
                YouTube
              </a>

              <a
                href="https://discord.gg/eyxrBHKVdR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition"
              >
                Discord
              </a>

            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              © 2026 U8 Divisione
            </p>

            <p className="text-gray-600 text-xs mt-1">
              Všechna práva vyhrazena.
            </p>
          </div>

        </div>

      </Container>
    </footer>
  );
}