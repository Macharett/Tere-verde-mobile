import { trilhas } from "../data/trilhas"

function Trilhas() {

  return (

    <section className="max-w-7xl mx-auto py-20 px-6">

      <h1 className="text-4xl md:text-5xl font-bold mb-16">
        Trilhas de Teresópolis
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">

        {trilhas.map((trilha, i) => (

          <div
            key={i}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer
            ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            ${i === 1 ? "md:row-span-2" : ""}
            `}
          >

            <img
              src={trilha.imagem}
              className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute bottom-4 left-4 text-white">

              <h2 className="text-2xl font-bold">
                {trilha.nome}
              </h2>

              <p className="text-sm">
                {trilha.distancia} • {trilha.dificuldade}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  )
}

export default Trilhas