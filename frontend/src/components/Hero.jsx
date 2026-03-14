import { useEffect, useState } from "react"

import hero1 from "../assets/hero1.webp"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"

const imagens = [hero1, hero2, hero3]

function Hero() {

  const [index, setIndex] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length)
    }, 5000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div className="relative h-[75vh] w-full overflow-hidden">

      {/* imagens */}

      {imagens.map((img, i) => (

        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === i ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >

          {/* overlay escuro */}

          <div className="absolute inset-0 bg-black/40"></div>

        </div>

      ))}

      {/* conteúdo */}

      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">

        <div className="max-w-2xl">

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Explore trilhas e parques 🌿
          </h1>

          <p className="mb-6 text-lg">
            Descubra a natureza de Teresópolis
          </p>

          <div className="bg-white rounded-full p-2 flex shadow-lg">

            <input
              type="text"
              placeholder="Buscar trilha ou parque..."
              className="flex-1 px-4 py-2 text-black outline-none rounded-full"
            />

            <button className="bg-green-600 text-white px-6 py-2 rounded-full">
              Buscar
            </button>

          </div>

        </div>

      </div>

      {/* bolinhas */}

      <div className="absolute bottom-6 w-full flex justify-center gap-3">

        {imagens.map((_, i) => (

          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          />

        ))}

      </div>

    </div>

  )
}

export default Hero