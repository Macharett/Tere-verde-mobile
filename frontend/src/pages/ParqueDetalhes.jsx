import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import heroParques from "../assets/hero1.webp"

function ParqueDetalhes() {
    const { id } = useParams()
    const [parque, setParque] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function buscarParque() {
            try {
                const resposta = await fetch(`http://localhost:3001/parques/${id}`)
                const dados = await resposta.json()
                setParque(dados)
            } catch (error) {
                console.error("Erro ao buscar parque:", error)
            } finally {
                setCarregando(false)
            }
        }

        buscarParque()
    }, [id])

    if (carregando) {
        return (
            <div className="min-h-screen pt-28 px-6 text-center">
                Carregando parque...
            </div>
        )
    }

    if (!parque || parque.erro) {
        return (
            <div className="min-h-screen pt-28 px-6 text-center">
                Parque não encontrado.
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <section className="relative h-[55vh]">
                <img
                    src={parque.imagem || heroParques}
                    alt={parque.nome}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4">
                            {parque.nome}
                        </h1>

                        <p className="text-lg md:text-xl">
                            📍 {parque.localizacao}
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-white rounded-3xl shadow-lg p-6 md:p-8">
                        <h2 className="text-3xl font-black text-green-900 mb-4">
                            Sobre o parque
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {parque.descricao}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-50 rounded-2xl p-5">
                                <h3 className="font-black text-green-900 mb-2">🌿 Flora</h3>
                                <p className="text-gray-600 text-sm">
                                    Área de Mata Atlântica com vegetação nativa, bromélias,
                                    orquídeas e espécies típicas da região serrana.
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-5">
                                <h3 className="font-black text-green-900 mb-2">🦜 Fauna</h3>
                                <p className="text-gray-600 text-sm">
                                    O parque abriga aves, pequenos mamíferos, anfíbios e outras
                                    espécies importantes para o equilíbrio ambiental.
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-5">
                                <h3 className="font-black text-green-900 mb-2">📚 História</h3>
                                <p className="text-gray-600 text-sm">
                                    A região possui forte relação com o ecoturismo e com a
                                    preservação das áreas naturais de Teresópolis.
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-5">
                                <h3 className="font-black text-green-900 mb-2">♻️ Conservação</h3>
                                <p className="text-gray-600 text-sm">
                                    A visitação consciente ajuda na proteção das trilhas, da
                                    vegetação e da fauna local.
                                </p>
                            </div>
                        </div>
                    </div>

                    <aside className="bg-white rounded-3xl shadow-lg p-6 md:p-8 h-fit">
                        <h2 className="text-2xl font-black text-green-900 mb-4">
                            Trilhas do parque
                        </h2>

                        {parque.trilhas?.length > 0 ? (
                            <div className="space-y-3">
                                {parque.trilhas.map((trilha) => (
                                    <Link
                                        key={trilha.id}
                                        to={`/trilhas/${trilha.id}`}
                                        className="block border border-gray-100 rounded-2xl p-4 hover:bg-green-50 transition"
                                    >
                                        <h3 className="font-bold text-green-900">
                                            {trilha.nome}
                                        </h3>

                                        <p className="text-sm text-gray-600">
                                            {trilha.dificuldade} • {trilha.distancia} km
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">
                                Nenhuma trilha cadastrada para este parque.
                            </p>
                        )}

                        <Link
                            to={`/trilhas?parqueId=${parque.id}`}
                            className="block text-center mt-6 bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition"
                        >
                            Ver todas as trilhas
                        </Link>

                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <h2 className="text-2xl font-black text-green-900 mb-4">
                                Próximos eventos
                            </h2>

                            {parque.eventos?.filter(
                                (evento) => new Date(evento.data) >= new Date()
                            ).length > 0 ? (
                                <div className="space-y-3">
                                    {parque.eventos
                                        .filter((evento) => new Date(evento.data) >= new Date())
                                        .slice(0, 3)
                                        .map((evento) => (
                                            <div
                                                key={evento.id}
                                                className="border border-gray-100 rounded-2xl p-4 bg-green-50"
                                            >
                                                <h3 className="font-bold text-green-900">
                                                    {evento.titulo}
                                                </h3>

                                                <p className="text-sm text-gray-600">
                                                    📅 {new Date(evento.data).toLocaleDateString("pt-BR")}
                                                </p>

                                                {evento.horario && (
                                                    <p className="text-sm text-gray-600">
                                                        ⏰ {evento.horario}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">
                                    Nenhum evento programado.
                                </p>
                            )}
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    )
}

export default ParqueDetalhes