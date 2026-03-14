function Footer() {

  return (

    <footer className="bg-green-900 text-white mt-20">

      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        <div>
          <h3 className="font-bold mb-3">TereVerde</h3>
          <p>Explore trilhas e natureza em Teresópolis.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Explorar</h4>
          <p>Parques</p>
          <p>Trilhas</p>
          <p>Eventos</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Comunidade</h4>
          <p>Guias</p>
          <p>Fotos</p>
          <p>Avaliações</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contato</h4>
          <p>Email</p>
          <p>Instagram</p>
        </div>

      </div>

    </footer>

  )
}

export default Footer