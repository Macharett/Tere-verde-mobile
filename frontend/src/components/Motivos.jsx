import natureza from "../assets/motivos/natureza.jpg"
import trilha from "../assets/motivos/trilha.jpg"
import ar from "../assets/motivos/ar.jpg"
import aventura from "../assets/motivos/aventura.jpg"
import experiencia from "../assets/motivos/experiencia.jpg"

function Motivos() {
  const motivos = [
    {
      titulo: "Natureza incrível",
      texto: "Teresópolis está localizada em uma das áreas mais preservadas da Mata Atlântica. O Parque Nacional da Serra dos Órgãos abriga milhares de espécies de plantas, incluindo bromélias, orquídeas e o palmito-juçara, além de uma rica fauna com centenas de aves, mamíferos e anfíbios.",
      imagem: natureza
    },
    {
      titulo: "Trilhas para todos",
      texto: "Com mais de 200 km de trilhas no Parque Nacional da Serra dos Órgãos, Teresópolis oferece percursos para todos os níveis, desde caminhadas leves até travessias desafiadoras para montanhistas experientes.",
      imagem: trilha
    },
    {
      titulo: "Ar puro da serra",
      texto: "Localizada na região serrana do Rio de Janeiro, Teresópolis é conhecida pelo clima agradável, pelas montanhas e pelo ar puro da Mata Atlântica.",
      imagem: ar
    },
    {
      titulo: "Aventura e paisagens únicas",
      texto: "Mirantes naturais revelam vistas espetaculares do Dedo de Deus, enquanto trilhas levam a cachoeiras, rios cristalinos e formações rochosas impressionantes.",
      imagem: aventura
    },
    {
      titulo: "Experiências únicas",
      texto: "A Trilha Suspensa e diversos mirantes proporcionam experiências inesquecíveis para quem busca contato com a natureza.",
      imagem: experiencia
    }
  ]

  return (
    <section className="max-w-6xl mx-auto py-12 md:py-24 px-4 md:px-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-24">
        Por que explorar Teresópolis?
      </h2>

      <div className="space-y-16 md:space-y-28">
        {motivos.map((motivo, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <img
              src={motivo.imagem}
              alt={motivo.titulo}
              className="rounded-2xl h-[260px] md:h-[450px] w-full md:w-[60%] object-cover shadow-lg transition-transform duration-500 hover:scale-105"
            />

            <div className="w-full md:w-[40%]">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-green-700">
                {motivo.titulo}
              </h3>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {motivo.texto}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Motivos