import { useEffect, useState } from "react"

function Parques() {

  const [parques, setParques] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/parques")
      .then(res => res.json())
      .then(data => setParques(data))
  }, [])

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Parques de Teresópolis 🌿
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {parques.map(parque => (

          <div
            key={parque.id}
            className="bg-white shadow-lg rounded-xl p-5 hover:scale-105 transition"
          >

            <h2 className="text-xl font-bold mb-2">
              {parque.nome}
            </h2>

            <p className="text-gray-600">
              {parque.descricao}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Parques