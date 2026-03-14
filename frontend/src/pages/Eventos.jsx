import { useEffect, useState } from "react"

function Eventos() {

  const [eventos, setEventos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/eventos")
      .then(res => res.json())
      .then(data => setEventos(data))
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Eventos 📅
      </h1>

      {eventos.map(evento => (

        <div key={evento.id} className="mb-4">

          <h2 className="text-xl font-bold">
            {evento.nome}
          </h2>

          <p>{evento.descricao}</p>

        </div>

      ))}

    </div>
  )
}

export default Eventos