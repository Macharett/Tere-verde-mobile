function PageHero({ titulo, descricao, imagem, children }) {

  return (

    <div
      className="relative w-full h-[60vh] flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${imagem})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* overlay */}

      <div className="absolute inset-0 bg-black/40"></div>

      {/* conteúdo */}

      <div className="relative z-10 max-w-2xl px-4">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {titulo}
        </h1>

        <p className="text-lg mb-6">
          {descricao}
        </p>

        {children}

      </div>

    </div>

  )

}

export default PageHero