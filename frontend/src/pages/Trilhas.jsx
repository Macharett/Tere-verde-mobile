import { useEffect, useState } from "react"

function Trilhas() {

  const [trilhas, setTrilhas] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/trilhas")
      .then(res => res.json())
      .then(data => setTrilhas(data))
  }, [])

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Trilhas 🥾
      </h1>

      {trilhas.map(trilha => (

        <div key={trilha.id} className="mb-4">

          <h2 className="text-xl font-bold">
            {trilha.nome}
          </h2>

          <p>{trilha.descricao}</p>

        </div>

      ))}

    </div>
  )
}

export default Trilhas