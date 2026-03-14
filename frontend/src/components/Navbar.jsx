import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import logoWhite from "../assets/logo1.png"
import logoGreen from "../assets/logo2.png"

function Navbar() {

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {

    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (

    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white shadow-md text-black"
          : "bg-transparent text-white"
        }`}
    >

      <div className="flex justify-between items-center px-10 py-4">

        {/* logo */}

        <Link to="/" className="flex items-center gap-2">

          <img
            src={scrolled ? logoGreen : logoWhite}
            alt="TereVerde"
            className="h-8 transition-all"
          />

        </Link>

        {/* menu */}

        <div className="flex gap-8 font-medium">

          <Link to="/parques" className="hover:text-green-600">
            Parques
          </Link>

          <Link to="/trilhas" className="hover:text-green-600">
            Trilhas
          </Link>

          <Link to="/eventos" className="hover:text-green-600">
            Eventos
          </Link>

        </div>

      </div>

    </nav>

  )

}

export default Navbar