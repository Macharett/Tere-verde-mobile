import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import heroTrilhas from "../assets/hero2.jpg"

function dificuldadeCor(dificuldade) {
  if (dificuldade === "Fácil") return "bg-green-500"
  if (dificuldade === "Moderada") return "bg-yellow-500"
  if (dificuldade === "Difícil") return "bg-red-500"
  return "bg-gray-500"
}

function TrilhaDetalhes() {
  const { id } = useParams()

  const [trilha, setTrilha] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarTrilha() {
      try {
        const resposta = await fetch(`http://localhost:3001/trilhas/${id}`)
        const dados = await resposta.json()

        setTrilha(dados)
      } catch (error) {
        console.error("Erro ao buscar trilha:", error)
      } finally {
        setCarregando(false)
      }
    }

    buscarTrilha()
  }, [id])

  if (carregando) {
    return (
      <div className="min-h-screen pt-28 text-center">
        Carregando trilha...
      </div>
    )
  }

  if (!trilha || trilha.erro) {
    return (
      <div className="min-h-screen pt-28 text-center">
        Trilha não encontrada.
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative h-[55vh]">
        <img
          src={trilha.imagem || heroTrilhas}
          alt={trilha.nome}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <span
              className={`inline-block px-4 py-2 rounded-xl font-bold mb-4 text-white ${dificuldadeCor(
                trilha.dificuldade
              )}`}
            >
              {trilha.dificuldade}
            </span>

            <h1 className="text-4xl md:text-6xl font-black mb-4">
              {trilha.nome}
            </h1>

            <p className="text-lg md:text-xl">
              📏 {trilha.distancia} km
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <h2 className="text-3xl font-black text-green-900 mb-4">
              Sobre a trilha
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              {trilha.descricao}
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">🥾</div>
                <h3 className="font-bold text-green-900">
                  Dificuldade
                </h3>
                <p className="text-gray-600">
                  {trilha.dificuldade}
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">📏</div>
                <h3 className="font-bold text-green-900">
                  Distância
                </h3>
                <p className="text-gray-600">
                  {trilha.distancia} km
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">🌳</div>
                <h3 className="font-bold text-green-900">
                  Parque
                </h3>
                <p className="text-gray-600">
                  {trilha.parque?.nome || "-"}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-black text-green-900 mb-4">
                Recomendações
              </h2>

              <ul className="space-y-3 text-gray-600">
                <li>💧 Leve água suficiente para todo o percurso.</li>
                <li>👟 Utilize calçados adequados para trilha.</li>
                <li>🌿 Não retire plantas ou animais do ambiente.</li>
                <li>🗑️ Recolha seu lixo e preserve a natureza.</li>
                <li>☀️ Consulte as condições climáticas antes da visita.</li>
              </ul>
            </div>
          </div>

          <aside className="bg-white rounded-3xl shadow-lg p-6 md:p-8 h-fit">
            <h2 className="text-2xl font-black text-green-900 mb-6">
              Informações rápidas
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">
                  Parque
                </p>

                <p className="font-bold text-green-900">
                  {trilha.parque?.nome || "Não informado"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Distância
                </p>

                <p className="font-bold text-green-900">
                  {trilha.distancia} km
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Dificuldade
                </p>

                <p className="font-bold text-green-900">
                  {trilha.dificuldade}
                </p>
              </div>
            </div>

            {trilha.latitude && trilha.longitude && (
              <a
                href={`https://www.google.com/maps?q=${trilha.latitude},${trilha.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="block text-center mt-8 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition"
              >
                📍 Abrir no mapa
              </a>
            )}

            {trilha.parque && (
              <Link
                to={`/parques/${trilha.parque.id}`}
                className="block text-center mt-4 border-2 border-green-700 text-green-700 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition"
              >
                Ver parque
              </Link>
            )}
          </aside>
        </div>
      </section>
    </div>
  )
}

export default TrilhaDetalhes