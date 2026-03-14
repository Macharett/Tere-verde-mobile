import natureza from "../assets/motivos/natureza.jpg"
import trilha from "../assets/motivos/trilha.jpg"
import ar from "../assets/motivos/ar.jpg"
import aventura from "../assets/motivos/aventura.jpg"
import experiencia from "../assets/motivos/experiencia.jpg"

function Motivos() {

  const motivos = [
    {
      titulo: "Natureza incrível",
      texto: "Teresópolis está localizada em uma das áreas mais preservadas da Mata Atlântica. O Parque Nacional da Serra dos Órgãos abriga milhares de espécies de plantas, incluindo bromélias, orquídeas e o palmito-juçara, além de uma rica fauna com centenas de aves, mamíferos e anfíbios. Caminhar por essas trilhas é mergulhar em um dos ecossistemas mais biodiversos do Brasil.",
      imagem: natureza
    },
    {
      titulo: "Trilhas para todos",
      texto: "Com mais de 200 km de trilhas no Parque Nacional da Serra dos Órgãos, Teresópolis oferece percursos para todos os níveis: desde caminhadas leves ideais para famílias, estudantes e idosos, até travessias desafiadoras para montanhistas experientes, como a famosa travessia Petrópolis-Teresópolis.",
      imagem: trilha
    },
    {
      titulo: "Ar puro da serra",
      texto: "Localizada na região serrana do Rio de Janeiro e cercada por montanhas e florestas preservadas, Teresópolis é conhecida pelo clima agradável e pelo ar puro da serra. A vegetação da Mata Atlântica ajuda a manter o ambiente fresco e saudável, tornando a cidade um refúgio perfeito para quem busca tranquilidade e contato com a natureza.",
      imagem: ar
    },
    {
      titulo: "Aventura e paisagens únicas",
      texto: "As montanhas da Serra dos Órgãos oferecem alguns dos cenários mais impressionantes do Brasil. Mirantes naturais revelam vistas espetaculares do famoso Dedo de Deus, enquanto trilhas levam a cachoeiras, rios cristalinos e formações rochosas que atraem praticantes de trekking, escalada e fotografia de natureza.",
      imagem: aventura
    },
    {
      titulo: "Experiências únicas",
      texto: "Entre as experiências mais marcantes está a Trilha Suspensa do Parque Nacional da Serra dos Órgãos, uma passarela elevada que permite caminhar entre as copas das árvores observando a fauna e a flora da Mata Atlântica. Além disso, diversas trilhas levam a mirantes e paisagens inesquecíveis que fazem cada visita ser única.",
      imagem: experiencia
    }
  ]

  return (

    <section className="max-w-6xl mx-auto py-24 px-6">

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-24">
        Por que explorar Teresópolis?
      </h2>

      <div className="space-y-28">

        {motivos.map((motivo, i) => (

          <div
            key={i}
            className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
          >

            {/* IMAGEM */}

            <img
              src={motivo.imagem}
              className="rounded-2xl h-[450px] w-full md:w-[60%] object-cover shadow-lg transition-transform duration-500 hover:scale-105"
            />

            {/* TEXTO */}

            <div className="md:w-[40%]">

              <h3 className="text-3xl font-bold mb-4 text-green-700">
                {motivo.titulo}
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed">
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