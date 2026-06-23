import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import logoWhite from "../assets/logo1.png"
import logoGreen from "../assets/logo2.png"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const location = useLocation()
  const adminPage = location.pathname === "/admin"

  const token = localStorage.getItem("token")

  function sair() {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navbarClara = adminPage || scrolled

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClara
        ? "bg-white shadow-md text-black"
        : "bg-transparent text-white"
        }`}
    >
      <div className="flex justify-between items-center px-4 md:px-10 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={navbarClara ? logoGreen : logoWhite}
            alt="TereVerde"
            className="h-8 transition-all"
          />
        </Link>

        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/parques" className="hover:text-green-600">
            Parques
          </Link>

          <Link to="/trilhas" className="hover:text-green-600">
            Trilhas
          </Link>

          <Link to="/eventos" className="hover:text-green-600">
            Eventos
          </Link>

          {token && (
            <>
              <Link to="/admin" className="hover:text-green-600">
                Admin
              </Link>

              <button
                onClick={sair}
                className="hover:text-red-600 font-medium"
              >
                Sair
              </button>
            </>
          )}
        </div>



        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl font-bold"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white text-black shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            <Link
              to="/parques"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              Parques
            </Link>

            <Link
              to="/trilhas"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              Trilhas
            </Link>

            <Link
              to="/eventos"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              Eventos
            </Link>

            {token && (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium"
                >
                  Admin
                </Link>

                <button
                  onClick={sair}
                  className="font-medium text-left text-red-600"
                >
                  Sair
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar