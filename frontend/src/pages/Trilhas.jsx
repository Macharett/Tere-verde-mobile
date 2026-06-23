import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Hero from "../components/Hero"
import heroTrilhas from "../assets/hero2.jpg"

import doisBicos from "../assets/trilhas/doisbicos.jpg"
import miranteAgulha from "../assets/trilhas/miranteagulha.webp"
import mozart from "../assets/trilhas/mozart.webp"
import sino from "../assets/trilhas/sino.webp"
import suspensa from "../assets/trilhas/suspensa.jpg"
import terePetro from "../assets/trilhas/terepetro.webp"
import torreBomSucesso from "../assets/trilhas/torrebomsucesso.jpg"

function dificuldadeCor(dificuldade) {
  if (dificuldade === "Fácil") return "bg-green-500"
  if (dificuldade === "Moderada") return "bg-yellow-500"
  if (dificuldade === "Difícil") return "bg-red-500"
  return "bg-gray-500"
}

function Trilhas() {
  const [trilhas, setTrilhas] = useState([])
  const [parques, setParques] = useState([])
  const [carregando, setCarregando] = useState(true)

  const [busca, setBusca] = useState("")
  const [filtroDificuldade, setFiltroDificuldade] = useState("Todas")
  const [filtroParque, setFiltroParque] = useState("Todos")

  const [searchParams, setSearchParams] = useSearchParams()

  const imagensTrilhas = {
    "Trilha Dois Bicos": doisBicos,
    "Mirante da Agulha do Diabo": miranteAgulha,
    "Trilha Mozart Catão": mozart,
    "Pedra do Sino": sino,
    "Trilha Suspensa": suspensa,
    "Travessia Teresópolis – Petrópolis": terePetro,
    "Torre do Bom Sucesso": torreBomSucesso
  }

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resTrilhas, resParques] = await Promise.all([
          fetch("http://localhost:3001/trilhas"),
          fetch("http://localhost:3001/parques")
        ])

        const dadosTrilhas = await resTrilhas.json()
        const dadosParques = await resParques.json()

        setTrilhas(dadosTrilhas)
        setParques(dadosParques)

        const parqueIdUrl = searchParams.get("parqueId")

        if (parqueIdUrl) {
          setFiltroParque(parqueIdUrl)
        } else {
          setFiltroParque("Todos")
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [searchParams])

  const getFiltroEstilo = (nivel) => {
    if (filtroDificuldade !== nivel) {
      return "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }

    switch (nivel) {
      case "Fácil":
        return "bg-green-500 text-white border-green-500 shadow-md"
      case "Moderada":
        return "bg-yellow-500 text-white border-yellow-500 shadow-md"
      case "Difícil":
        return "bg-red-500 text-white border-red-500 shadow-md"
      default:
        return "bg-green-800 text-white border-green-800 shadow-md"
    }
  }

  const trilhasFiltradas = trilhas.filter((trilha) => {
    const matchBusca = trilha.nome
      .toLowerCase()
      .includes(busca.toLowerCase())

    const matchDificuldade =
      filtroDificuldade === "Todas" ||
      trilha.dificuldade === filtroDificuldade

    const matchParque =
      filtroParque === "Todos" ||
      trilha.parqueId === Number(filtroParque)

    return matchBusca && matchDificuldade && matchParque
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero
        imagens={[heroTrilhas]}
        titulo="Trilhas de Teresópolis"
        descricao="Explore trilhas, parques e paisagens naturais da região"
        altura="60vh"
        mostrarBusca={false}
      />

      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="flex justify-center mb-6">
            <div className="w-full md:w-[700px] bg-gray-50 rounded-2xl flex items-center px-5 py-4 border-2 border-transparent focus-within:border-green-600 focus-within:bg-white transition-all duration-300 shadow-inner">
              <span className="text-green-700 text-xl mr-3 font-bold">
                🔍
              </span>

              <input
                type="text"
                placeholder="Qual será sua próxima aventura?"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="flex-1 text-base md:text-lg outline-none bg-transparent text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {["Todas", "Fácil", "Moderada", "Difícil"].map((nivel) => (
              <button
                key={nivel}
                type="button"
                onClick={() => setFiltroDificuldade(nivel)}
                className={`px-5 md:px-8 py-2.5 rounded-xl border-2 transition-all duration-300 font-bold text-xs md:text-sm uppercase tracking-wider ${getFiltroEstilo(
                  nivel
                )}`}
              >
                {nivel}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <select
              value={filtroParque}
              onChange={(e) => {
                const valor = e.target.value
                setFiltroParque(valor)

                if (valor === "Todos") {
                  setSearchParams({})
                } else {
                  setSearchParams({ parqueId: valor })
                }
              }}
              className="w-full md:w-[500px] mx-auto block border-2 border-gray-200 rounded-2xl px-5 py-4 font-semibold text-gray-700 outline-none focus:border-green-600 bg-white"
            >
              <option value="Todos">Todos os parques</option>

              {parques.map((parque) => (
                <option key={parque.id} value={parque.id}>
                  {parque.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {filtroParque !== "Todos" && (
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="bg-green-100 border border-green-200 text-green-900 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">
                Mostrando trilhas do parque:
              </p>

              <p className="font-black">
                {parques.find((parque) => parque.id === Number(filtroParque))?.nome}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFiltroParque("Todos")
                setSearchParams({})
              }}
              className="bg-green-700 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-800 transition"
            >
              Ver todas
            </button>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 mt-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
          {carregando && (
            <p className="text-center text-gray-600 col-span-full">
              Carregando trilhas...
            </p>
          )}

          {!carregando && trilhasFiltradas.length === 0 && (
            <p className="text-center text-gray-600 col-span-full">
              Nenhuma trilha encontrada.
            </p>
          )}

          {trilhasFiltradas.map((trilha, i) => (
            <div
              key={trilha.id}
              className={`group relative rounded-3xl overflow-hidden shadow-lg bg-white
              ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              ${i === 1 ? "md:row-span-2" : ""}
              `}
            >
              <img
                src={trilha.imagem || imagensTrilhas[trilha.nome] || heroTrilhas}
                alt={trilha.nome}
                className="absolute w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-lg ${dificuldadeCor(
                    trilha.dificuldade
                  )}`}
                >
                  {trilha.dificuldade}
                </span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 transform group-hover:-translate-y-2">
                <h2
                  className={`font-black text-white mb-2 leading-tight ${i === 0 ? "text-4xl" : "text-xl"
                    }`}
                >
                  {trilha.nome}
                </h2>

                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  {trilha.descricao}
                </p>

                <div className="flex items-center gap-4 text-white/80 text-sm mb-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    📏 {trilha.distancia} km
                  </span>

                  <span className="flex items-center gap-1">
                    🌿 {trilha.parque?.nome || "Parque não informado"}
                  </span>
                </div>

                {trilha.latitude && trilha.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${trilha.latitude},${trilha.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block mb-4 text-center bg-green-600 text-white font-bold py-2 rounded-xl hover:bg-green-700 transition"
                  >
                    📍 Abrir no mapa
                  </a>
                )}

                <Link
                  to={`/trilhas/${trilha.id}`}
                  translate="no"
                  className="block text-center w-full bg-white text-green-900 font-bold py-3 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl uppercase text-xs tracking-widest whitespace-nowrap"
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Trilhas