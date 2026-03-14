import { useEffect, useState } from "react"

function TrilhasSection() {

  const [trilhas, setTrilhas] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/trilhas")
      .then(res => res.json())
      .then(data => setTrilhas(data))
  }, [])

  return (

    <section className="max-w-6xl mx-auto mt-16 px-4">

      <h2 className="text-3xl font-bold mb-8">
        Trilhas próximas 🥾
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {trilhas.map(trilha => (

          <div
            key={trilha.id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
          >

            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              className="h-40 w-full object-cover"
            />

            <div className="p-4">

              <h3 className="font-bold">
                {trilha.nome}
              </h3>

              <p className="text-sm text-gray-600">
                {trilha.descricao}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default TrilhasSection