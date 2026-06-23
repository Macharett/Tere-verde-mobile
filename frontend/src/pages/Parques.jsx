import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import heroParques from "../assets/hero1.webp"

function Parques() {
  const [parques, setParques] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarParques() {
      try {
        const resposta = await fetch("http://localhost:3001/parques")
        const dados = await resposta.json()
        setParques(dados)
      } catch (error) {
        console.error("Erro ao buscar parques:", error)
      } finally {
        setCarregando(false)
      }
    }

    buscarParques()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero
        imagens={[heroParques]}
        titulo="Parques de Teresópolis"
        descricao="Conheça os principais parques ecológicos da região serrana"
        altura="60vh"
        mostrarBusca={false}
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-green-900 mb-4">
            Natureza preservada para explorar
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Teresópolis reúne áreas de preservação, trilhas, mirantes e paisagens
            naturais que tornam a cidade um dos principais destinos ecológicos da
            região serrana.
          </p>
        </div>

        {carregando && (
          <p className="text-center text-gray-600">Carregando parques...</p>
        )}

        {!carregando && parques.length === 0 && (
          <p className="text-center text-gray-600">
            Nenhum parque cadastrado.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {parques.map((parque) => (
            <div
              key={parque.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={parque.imagem || heroParques}
                  alt={parque.nome}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                    {parque.nome}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {parque.localizacao && (
                  <p className="text-green-800 font-bold mb-3">
                    📍 {parque.localizacao}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-green-50 text-green-800 px-3 py-2 rounded-xl text-sm font-bold">
                    🌿 {parque._count?.trilhas || 0} trilhas
                  </span>

                  <span className="bg-green-50 text-green-800 px-3 py-2 rounded-xl text-sm font-bold">
                    📅 {parque._count?.eventos || 0} eventos
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {parque.descricao}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/parques/${parque.id}`}
                    className="flex-1 text-center bg-white border-2 border-green-700 text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition"
                  >
                    Ver parque
                  </Link>

                  <Link
                    to={`/trilhas?parqueId=${parque.id}`}
                    className="flex-1 text-center bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition"
                  >
                    Ver trilhas
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Parques