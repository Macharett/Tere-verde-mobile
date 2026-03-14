function Motivos() {

  const motivos = [
    {
      titulo: "Natureza incrível",
      texto: "Parques e trilhas com paisagens únicas da serra."
    },
    {
      titulo: "Trilhas para todos",
      texto: "Caminhadas leves até desafios para aventureiros."
    },
    {
      titulo: "Ar puro",
      texto: "Respire o ar da serra e fuja da correria da cidade."
    },
    {
      titulo: "Aventura",
      texto: "Explore cachoeiras, mirantes e montanhas."
    },
    {
      titulo: "Experiências únicas",
      texto: "Cada trilha oferece uma vista diferente."
    }
  ]

  return (

    <section className="max-w-6xl mx-auto py-20 px-6">

      <h2 className="text-3xl font-bold text-center mb-14">
        Por que explorar Teresópolis?
      </h2>

      <div className="grid md:grid-cols-5 gap-8 text-center">

        {motivos.map((m, i) => (

          <div key={i}>

            <h3 className="font-semibold text-lg mb-2">
              {m.titulo}
            </h3>

            <p className="text-gray-600 text-sm">
              {m.texto}
            </p>

          </div>

        ))}

      </div>

    </section>

  )

}

export default Motivos