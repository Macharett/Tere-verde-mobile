import { Link } from "react-router-dom"

function ParquesHome() {
  const cards = [
    {
      titulo: "Parques",
      texto: "Conheça as principais áreas verdes de Teresópolis.",
      icone: "🌳",
      link: "/parques",
      botao: "Ver parques"
    },
    {
      titulo: "Trilhas",
      texto: "Explore trilhas com distância, dificuldade e localização.",
      icone: "🥾",
      link: "/trilhas",
      botao: "Explorar trilhas"
    },
    {
      titulo: "Eventos",
      texto: "Acompanhe encontros e atividades na natureza.",
      icone: "📅",
      link: "/eventos",
      botao: "Ver eventos"
    }
  ]

  return (
    <section className="bg-green-950 text-white py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-green-800 text-green-100 px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-4">
            Comece por aqui
          </span>

          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Comece sua experiência
          </h2>

          <p className="text-green-100 text-sm md:text-lg max-w-2xl mx-auto">
            Escolha como deseja explorar Teresópolis: pelos parques, trilhas ou eventos ecológicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.titulo}
              to={card.link}
              className="group bg-white text-gray-900 rounded-2xl p-5 md:p-6 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{card.icone}</span>

                <h3 className="text-xl md:text-2xl font-black text-green-900">
                  {card.titulo}
                </h3>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                {card.texto}
              </p>

              <span className="inline-flex items-center justify-center bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-green-800 transition">
                {card.botao}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ParquesHome