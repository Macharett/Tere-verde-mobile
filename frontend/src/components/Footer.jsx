import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-black text-xl mb-3">
              TereVerde
            </h3>

            <p className="text-green-100 text-sm leading-relaxed">
              Explore trilhas, parques e eventos ecológicos em Teresópolis.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-3">
              Explorar
            </h4>

            <div className="flex flex-col gap-2 text-sm">
              <Link to="/parques">Parques</Link>
              <Link to="/trilhas">Trilhas</Link>
              <Link to="/eventos">Eventos</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3">
              Descubra
            </h4>

            <div className="flex flex-col gap-2 text-sm">
              <span>Natureza</span>
              <span>Ecoturismo</span>
              <span>Aventura</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3">
              Projeto
            </h4>

            <p className="text-sm text-green-100">
              MVP acadêmico sobre turismo ecológico em Teresópolis.
            </p>
          </div>
        </div>

        <div className="border-t border-green-700 mt-10 pt-6 text-center text-sm text-green-200">
          © 2026 TereVerde
        </div>
      </div>
    </footer>
  )
}

export default Footer