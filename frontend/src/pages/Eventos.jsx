import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import heroEventos from "../assets/hero3.jpg"

function formatarData(data) {
  if (!data) return { dia: "--", mes: "---", completa: "Data não informada" }

  const date = new Date(data)

  return {
    dia: date.toLocaleDateString("pt-BR", { day: "2-digit" }),
    mes: date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    completa: date.toLocaleDateString("pt-BR")
  }
}

function Eventos() {
  const [eventos, setEventos] = useState([])
  const [busca, setBusca] = useState("")
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarEventos() {
      try {
        const resposta = await fetch("http://localhost:3001/eventos")
        const dados = await resposta.json()

        const ordenados = dados.sort(
          (a, b) => new Date(a.data) - new Date(b.data)
        )

        setEventos(ordenados)
      } catch (error) {
        console.error("Erro ao buscar eventos:", error)
      } finally {
        setCarregando(false)
      }
    }

    buscarEventos()
  }, [])

  const eventosFiltrados = eventos.filter((evento) => {
    const texto = `
      ${evento.titulo || ""}
      ${evento.descricao || ""}
      ${evento.local || ""}
      ${evento.categoria || ""}
      ${evento.parque?.nome || ""}
    `.toLowerCase()

    return texto.includes(busca.toLowerCase())
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero
        imagens={[heroEventos]}
        titulo="Eventos em Teresópolis"
        descricao="Acompanhe caminhadas, encontros ecológicos e atividades na natureza"
        altura="60vh"
        mostrarBusca={false}
      />

      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="w-full bg-gray-50 rounded-2xl flex items-center px-6 py-4 border-2 border-transparent focus-within:border-green-600 focus-within:bg-white transition-all duration-300 shadow-inner">
            <span className="text-green-700 text-xl mr-3 font-bold">🔍</span>

            <input
              type="text"
              placeholder="Buscar evento..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 text-lg outline-none bg-transparent text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16 pb-24">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-green-900 mb-4">
            Agenda ecológica
          </h1>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Confira os próximos eventos, atividades ao ar livre e encontros
            relacionados à natureza em Teresópolis.
          </p>
        </div>

        {carregando && (
          <p className="text-center text-gray-600">Carregando eventos...</p>
        )}

        {!carregando && eventosFiltrados.length === 0 && (
          <p className="text-center text-gray-600">
            Nenhum evento encontrado.
          </p>
        )}

        <div className="space-y-6">
          {eventosFiltrados.map((evento) => {
            const dataFormatada = formatarData(evento.data)
            const linkMapa = evento.linkMapa || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evento.local || "")}`

            return (
              <div
                key={evento.id}
                className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:shadow-2xl transition"
              >
                <div className="flex md:flex-col items-center justify-center bg-green-800 text-white rounded-2xl w-full md:w-28 py-4 shrink-0">
                  <span className="text-4xl font-black leading-none">
                    {dataFormatada.dia}
                  </span>

                  <span className="uppercase font-bold tracking-widest md:mt-2 ml-3 md:ml-0">
                    {dataFormatada.mes}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {evento.categoria && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                        {evento.categoria}
                      </span>
                    )}

                    {evento.horario && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                        ⏰ {evento.horario}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black text-green-900 mb-3">
                    {evento.titulo}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-semibold mb-4">
                    <span>📅 {dataFormatada.completa}</span>

                    {evento.local && <span>📍 {evento.local}</span>}

                    {evento.parque && <span>🌳 {evento.parque.nome}</span>}
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {evento.descricao}
                  </p>

                  {(evento.linkMapa || evento.local) && (
                    <a
                      href={linkMapa}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition"
                    >
                      Ver localização
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Eventos