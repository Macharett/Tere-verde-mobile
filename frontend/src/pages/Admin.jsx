import { useEffect, useState } from "react"

const API_URL = "http://localhost:3001"

function Admin() {
  const [aba, setAba] = useState("parques")

  const [parques, setParques] = useState([])
  const [trilhas, setTrilhas] = useState([])
  const [eventos, setEventos] = useState([])

  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")

  const [parqueEditandoId, setParqueEditandoId] = useState(null)
  const [trilhaEditandoId, setTrilhaEditandoId] = useState(null)
  const [eventoEditandoId, setEventoEditandoId] = useState(null)

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [localizacao, setLocalizacao] = useState("")
  const [imagem, setImagem] = useState("")

  const [nomeTrilha, setNomeTrilha] = useState("")
  const [dificuldadeTrilha, setDificuldadeTrilha] = useState("")
  const [distanciaTrilha, setDistanciaTrilha] = useState("")
  const [descricaoTrilha, setDescricaoTrilha] = useState("")
  const [parqueIdTrilha, setParqueIdTrilha] = useState("")
  const [imagemTrilha, setImagemTrilha] = useState("")
  const [latitudeTrilha, setLatitudeTrilha] = useState("")
  const [longitudeTrilha, setLongitudeTrilha] = useState("")

  const [tituloEvento, setTituloEvento] = useState("")
  const [descricaoEvento, setDescricaoEvento] = useState("")
  const [dataEvento, setDataEvento] = useState("")
  const [localEvento, setLocalEvento] = useState("")
  const [horarioEvento, setHorarioEvento] = useState("")
  const [categoriaEvento, setCategoriaEvento] = useState("")
  const [linkMapaEvento, setLinkMapaEvento] = useState("")
  const [parqueIdEvento, setParqueIdEvento] = useState("")


  function getToken() {
    return localStorage.getItem("token")
  }

  function limparMensagens() {
    setMensagem("")
    setErro("")
  }

  async function carregarDados() {
    try {
      setCarregando(true)

      const [resParques, resTrilhas, resEventos] = await Promise.all([
        fetch(`${API_URL}/parques`),
        fetch(`${API_URL}/trilhas`),
        fetch(`${API_URL}/eventos`)
      ])

      setParques(await resParques.json())
      setTrilhas(await resTrilhas.json())
      setEventos(await resEventos.json())
    } catch {
      setErro("Erro ao carregar dados do painel.")
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  function limparFormularioParque() {
    setParqueEditandoId(null)
    setNome("")
    setDescricao("")
    setLocalizacao("")
    setImagem("")
  }

  function limparFormularioTrilha() {
    setTrilhaEditandoId(null)
    setNomeTrilha("")
    setDificuldadeTrilha("")
    setDistanciaTrilha("")
    setDescricaoTrilha("")
    setParqueIdTrilha("")
    setImagemTrilha("")
    setLatitudeTrilha("")
    setLongitudeTrilha("")
  }

  function limparFormularioEvento() {
    setEventoEditandoId(null)
    setTituloEvento("")
    setDescricaoEvento("")
    setDataEvento("")
    setLocalEvento("")
    setHorarioEvento("")
    setCategoriaEvento("")
    setLinkMapaEvento("")
    setParqueIdEvento("")
  }

  async function salvarParque(e) {
    e.preventDefault()
    limparMensagens()

    const editando = parqueEditandoId !== null

    try {
      const resposta = await fetch(
        editando
          ? `${API_URL}/parques/${parqueEditandoId}`
          : `${API_URL}/parques`,
        {
          method: editando ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({ nome, descricao, localizacao, imagem })
        }
      )

      if (!resposta.ok) throw new Error()

      setMensagem(editando ? "Parque atualizado com sucesso!" : "Parque cadastrado com sucesso!")
      limparFormularioParque()
      carregarDados()
    } catch {
      setErro(editando ? "Erro ao atualizar parque." : "Erro ao cadastrar parque.")
    }
  }

  async function salvarTrilha(e) {
    e.preventDefault()
    limparMensagens()

    const editando = trilhaEditandoId !== null

    try {
      const resposta = await fetch(
        editando
          ? `${API_URL}/trilhas/${trilhaEditandoId}`
          : `${API_URL}/trilhas`,
        {
          method: editando ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            nome: nomeTrilha,
            dificuldade: dificuldadeTrilha,
            distancia: distanciaTrilha,
            descricao: descricaoTrilha,
            imagem: imagemTrilha,
            latitude: latitudeTrilha,
            longitude: longitudeTrilha,
            parqueId: parqueIdTrilha
          })
        }
      )

      if (!resposta.ok) throw new Error()

      setMensagem(editando ? "Trilha atualizada com sucesso!" : "Trilha cadastrada com sucesso!")
      limparFormularioTrilha()
      carregarDados()
    } catch {
      setErro(editando ? "Erro ao atualizar trilha." : "Erro ao cadastrar trilha.")
    }
  }

  async function salvarEvento(e) {
    e.preventDefault()
    limparMensagens()

    const editando = eventoEditandoId !== null

    try {
      const resposta = await fetch(
        editando
          ? `${API_URL}/eventos/${eventoEditandoId}`
          : `${API_URL}/eventos`,
        {
          method: editando ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            titulo: tituloEvento,
            descricao: descricaoEvento,
            data: dataEvento,
            local: localEvento,
            horario: horarioEvento,
            categoria: categoriaEvento,
            linkMapa: linkMapaEvento,
            parqueId: parqueIdEvento
          })
        }
      )

      if (!resposta.ok) throw new Error()

      setMensagem(editando ? "Evento atualizado com sucesso!" : "Evento cadastrado com sucesso!")
      limparFormularioEvento()
      carregarDados()
    } catch {
      setErro(editando ? "Erro ao atualizar evento." : "Erro ao cadastrar evento.")
    }
  }

  async function excluirItem(tipo, id) {
    limparMensagens()

    if (!window.confirm("Tem certeza que deseja excluir?")) return

    try {
      const resposta = await fetch(`${API_URL}/${tipo}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })

      if (!resposta.ok) throw new Error()

      setMensagem("Item excluído com sucesso!")
      carregarDados()
    } catch {
      setErro("Erro ao excluir item.")
    }
  }

  function editarParque(parque) {
    limparMensagens()
    setAba("parques")
    setParqueEditandoId(parque.id)
    setNome(parque.nome || "")
    setDescricao(parque.descricao || "")
    setLocalizacao(parque.localizacao || "")
    setImagem(parque.imagem || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function editarTrilha(trilha) {
    limparMensagens()
    setAba("trilhas")
    setTrilhaEditandoId(trilha.id)
    setNomeTrilha(trilha.nome || "")
    setDificuldadeTrilha(trilha.dificuldade || "")
    setDistanciaTrilha(trilha.distancia || "")
    setDescricaoTrilha(trilha.descricao || "")
    setParqueIdTrilha(trilha.parqueId || "")
    setImagemTrilha(trilha.imagem || "")
    setLatitudeTrilha(trilha.latitude || "")
    setLongitudeTrilha(trilha.longitude || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function editarEvento(evento) {
    limparMensagens()
    setAba("eventos")
    setEventoEditandoId(evento.id)
    setTituloEvento(evento.titulo || "")
    setDescricaoEvento(evento.descricao || "")
    setLocalEvento(evento.local || "")
    setDataEvento(evento.data ? new Date(evento.data).toISOString().split("T")[0] : "")
    setHorarioEvento(evento.horario || "")
    setCategoriaEvento(evento.categoria || "")
    setLinkMapaEvento(evento.linkMapa || "")
    setParqueIdEvento(evento.parqueId || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function botaoAba(id, texto, icone) {
    return (
      <button
        type="button"
        onClick={() => {
          setAba(id)
          limparMensagens()
        }}
        className={`flex-1 md:flex-none px-4 md:px-6 py-3 rounded-2xl font-bold transition text-sm md:text-base ${aba === id
          ? "bg-green-700 text-white shadow-lg"
          : "bg-white text-green-800 border border-green-100 hover:bg-green-50"
          }`}
      >
        <span className="mr-1">{icone}</span>
        {texto}
      </button>
    )
  }

  const inputClass =
    "w-full min-w-0 border border-gray-200 bg-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"

  const cardClass =
    "bg-white/95 border border-green-100 p-5 md:p-6 rounded-3xl shadow-lg shadow-green-900/5"

  const actionPrimary =
    "w-full md:w-auto bg-green-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition"

  const actionSecondary =
    "w-full md:w-auto bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition"

  return (
    <div className="min-h-screen pt-28 px-4 md:px-6 pb-20 bg-gradient-to-br from-green-50 via-white to-emerald-100 overflow-x-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <span className="inline-block bg-green-700 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            Área administrativa
          </span>

          <h1 className="text-3xl md:text-4xl font-black text-green-900 mb-2">
            Painel Administrativo
          </h1>

          <p className="text-gray-600">
            Gerencie parques, trilhas e eventos exibidos no TereVerde.
          </p>
        </div>

        <div className="flex gap-2 md:gap-3 mb-8 overflow-x-auto pb-2">
          {botaoAba("parques", "Parques", "🌳")}
          {botaoAba("trilhas", "Trilhas", "🥾")}
          {botaoAba("eventos", "Eventos", "📅")}
        </div>

        {mensagem && (
          <p className="bg-green-100 text-green-800 border border-green-200 p-4 rounded-2xl mb-6 font-semibold">
            {mensagem}
          </p>
        )}

        {erro && (
          <p className="bg-red-100 text-red-700 border border-red-200 p-4 rounded-2xl mb-6 font-semibold">
            {erro}
          </p>
        )}

        {carregando && (
          <p className="text-gray-600 mb-6">Carregando dados...</p>
        )}

        {aba === "parques" && (
          <>
            <form onSubmit={salvarParque} className={`${cardClass} mb-8`}>
              <h2 className="text-2xl font-black text-green-900 mb-6">
                {parqueEditandoId ? "Editar Parque" : "Cadastrar Parque"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nome do parque" value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} required />

                <input type="text" placeholder="Localização" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} className={inputClass} required />
              </div>

              <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} className={`${inputClass} mt-4 min-h-28 resize-none`} required />

              <input type="text" placeholder="URL da imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} className={`${inputClass} mt-4`} />

              <div className="flex flex-col md:flex-row gap-3 mt-6">
                <button className={actionPrimary}>
                  {parqueEditandoId ? "Atualizar Parque" : "Cadastrar Parque"}
                </button>

                {parqueEditandoId && (
                  <button type="button" onClick={limparFormularioParque} className={actionSecondary}>
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>

            <section className={cardClass}>
              <h2 className="text-xl font-black mb-4 text-green-900">Parques cadastrados</h2>

              {parques.length === 0 && <p className="text-gray-500">Nenhum parque cadastrado.</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parques.map((parque) => (
                  <div key={parque.id} className="border border-gray-100 rounded-2xl p-4 bg-gray-50">
                    <h3 className="font-bold text-green-900">{parque.nome}</h3>
                    <p className="text-sm text-gray-600">{parque.localizacao}</p>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <button onClick={() => editarParque(parque)} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700">
                        Editar
                      </button>

                      <button onClick={() => excluirItem("parques", parque.id)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700">
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {aba === "trilhas" && (
          <>
            <form onSubmit={salvarTrilha} className={`${cardClass} mb-8`}>
              <h2 className="text-2xl font-black text-green-900 mb-6">
                {trilhaEditandoId ? "Editar Trilha" : "Cadastrar Trilha"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Nome da trilha" value={nomeTrilha} onChange={(e) => setNomeTrilha(e.target.value)} className={inputClass} required />

                <select value={dificuldadeTrilha} onChange={(e) => setDificuldadeTrilha(e.target.value)} className={inputClass} required>
                  <option value="">Selecione a dificuldade</option>
                  <option value="Fácil">Fácil</option>
                  <option value="Moderada">Moderada</option>
                  <option value="Difícil">Difícil</option>
                </select>

                <input type="number" step="0.1" placeholder="Distância em km" value={distanciaTrilha} onChange={(e) => setDistanciaTrilha(e.target.value)} className={inputClass} required />

                <select value={parqueIdTrilha} onChange={(e) => setParqueIdTrilha(e.target.value)} className={inputClass} required>
                  <option value="">Selecione o parque</option>
                  {parques.map((parque) => (
                    <option key={parque.id} value={parque.id}>
                      {parque.nome}
                    </option>
                  ))}
                </select>

                <input type="text" placeholder="URL da imagem da trilha" value={imagemTrilha} onChange={(e) => setImagemTrilha(e.target.value)} className={inputClass} />

                <input type="number" step="any" placeholder="Latitude" value={latitudeTrilha} onChange={(e) => setLatitudeTrilha(e.target.value)} className={inputClass} />

                <input type="number" step="any" placeholder="Longitude" value={longitudeTrilha} onChange={(e) => setLongitudeTrilha(e.target.value)} className={inputClass} />
              </div>

              <textarea placeholder="Descrição da trilha" value={descricaoTrilha} onChange={(e) => setDescricaoTrilha(e.target.value)} className={`${inputClass} mt-4 min-h-28 resize-none`} required />

              <div className="flex flex-col md:flex-row gap-3 mt-6">
                <button className={actionPrimary}>
                  {trilhaEditandoId ? "Atualizar Trilha" : "Cadastrar Trilha"}
                </button>

                {trilhaEditandoId && (
                  <button type="button" onClick={limparFormularioTrilha} className={actionSecondary}>
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>

            <section className={cardClass}>
              <h2 className="text-xl font-black mb-4 text-green-900">Trilhas cadastradas</h2>

              {trilhas.length === 0 && <p className="text-gray-500">Nenhuma trilha cadastrada.</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trilhas.map((trilha) => (
                  <div key={trilha.id} className="border border-gray-100 rounded-2xl p-4 bg-gray-50">
                    <h3 className="font-bold text-green-900">{trilha.nome}</h3>
                    <p className="text-sm text-gray-600">{trilha.dificuldade} • {trilha.distancia} km</p>
                    <p className="text-sm text-gray-600">Parque: {trilha.parque?.nome || "Não informado"}</p>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <button onClick={() => editarTrilha(trilha)} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700">
                        Editar
                      </button>

                      <button onClick={() => excluirItem("trilhas", trilha.id)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700">
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {aba === "eventos" && (
          <>
            <form onSubmit={salvarEvento} className={`${cardClass} mb-8`}>
              <h2 className="text-2xl font-black text-green-900 mb-6">
                {eventoEditandoId ? "Editar Evento" : "Cadastrar Evento"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Título do evento"
                  value={tituloEvento}
                  onChange={(e) => setTituloEvento(e.target.value)}
                  className={inputClass}
                  required
                />

                <input
                  type="date"
                  value={dataEvento}
                  onChange={(e) => setDataEvento(e.target.value)}
                  className={inputClass}
                  required
                />

                <input
                  type="time"
                  value={horarioEvento}
                  onChange={(e) => setHorarioEvento(e.target.value)}
                  className={inputClass}
                />

                <input
                  type="text"
                  placeholder="Local do evento"
                  value={localEvento}
                  onChange={(e) => setLocalEvento(e.target.value)}
                  className={inputClass}
                  required
                />

                <select
                  value={categoriaEvento}
                  onChange={(e) => setCategoriaEvento(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Categoria do evento</option>
                  <option value="Caminhada">Caminhada</option>
                  <option value="Educação ambiental">Educação ambiental</option>
                  <option value="Observação de aves">Observação de aves</option>
                  <option value="Mutirão">Mutirão</option>
                  <option value="Palestra">Palestra</option>
                </select>

                <select
                  value={parqueIdEvento}
                  onChange={(e) => setParqueIdEvento(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Evento sem parque específico</option>

                  {parques.map((parque) => (
                    <option key={parque.id} value={parque.id}>
                      {parque.nome}
                    </option>
                  ))}
                </select>

              </div>

              <input
                type="text"
                placeholder="Link do Google Maps"
                value={linkMapaEvento}
                onChange={(e) => setLinkMapaEvento(e.target.value)}
                className={`${inputClass} mt-4`}
              />

              <textarea placeholder="Descrição do evento" value={descricaoEvento} onChange={(e) => setDescricaoEvento(e.target.value)} className={`${inputClass} mt-4 min-h-28 resize-none`} required />

              <div className="flex flex-col md:flex-row gap-3 mt-6">
                <button className={actionPrimary}>
                  {eventoEditandoId ? "Atualizar Evento" : "Cadastrar Evento"}
                </button>

                {eventoEditandoId && (
                  <button type="button" onClick={limparFormularioEvento} className={actionSecondary}>
                    Cancelar edição
                  </button>
                )}
              </div>
            </form>

            <section className={cardClass}>
              <h2 className="text-xl font-black mb-4 text-green-900">Eventos cadastrados</h2>

              {eventos.length === 0 && <p className="text-gray-500">Nenhum evento cadastrado.</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventos.map((evento) => (
                  <div key={evento.id} className="border border-gray-100 rounded-2xl p-4 bg-gray-50">
                    <h3 className="font-bold text-green-900">{evento.titulo}</h3>
                    <p className="text-sm text-gray-600">{evento.local}</p>
                    <p className="text-sm text-gray-600">
                      {evento.data ? new Date(evento.data).toLocaleDateString("pt-BR") : "Data não informada"}
                    </p>

                    {evento.horario && (
                      <p className="text-sm text-gray-600">
                        ⏰ {evento.horario}
                      </p>
                    )}

                    {evento.categoria && (
                      <p className="text-sm text-gray-600">
                        🏷️ {evento.categoria}
                      </p>
                    )}

                    {evento.parque && (
                      <p className="text-sm text-gray-600">
                        🌳 {evento.parque.nome}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <button onClick={() => editarEvento(evento)} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700">
                        Editar
                      </button>

                      <button onClick={() => excluirItem("eventos", evento.id)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-700">
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default Admin