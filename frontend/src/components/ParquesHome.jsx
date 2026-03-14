import serraOrgaos from "../assets/parques/serra-orgaos.jpg"
import montanhasTere from "../assets/parques/montanhas-teresopolis.jpeg"
import tresPicos from "../assets/parques/tresPicos.jpg"

function ParquesHome() {

  const parques = [
    {
      nome: "Parque Nacional da Serra dos Órgãos",
      imagem: serraOrgaos
    },
    {
      nome: "Parque Natural Montanhas de Teresópolis",
      imagem: montanhasTere
    },
    {
      nome: "Parque Estadual dos Três Picos",
      imagem: tresPicos
    }
  ]

  return (

    <section className="max-w-6xl mx-auto py-20 px-6">

      <h2 className="text-3xl font-bold mb-10">
        Parques de Teresópolis
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {parques.map((parque, i) => (

          <div
            key={i}
            className="relative rounded-xl overflow-hidden group cursor-pointer"
          >

            {/* imagem */}

            <img
              src={parque.imagem}
              className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* texto */}

            <div className="absolute bottom-4 left-4 text-white">

              <h3 className="text-lg font-semibold">
                {parque.nome}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </section>

  )

}

export default ParquesHome