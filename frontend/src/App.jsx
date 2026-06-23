import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"

import Home from "./pages/Home"
import Parques from "./pages/Parques"
import Trilhas from "./pages/Trilhas"
import Eventos from "./pages/Eventos"
import Login from "./pages/Login"
import Admin from "./pages/Admin"

import ParqueDetalhes from "./pages/ParqueDetalhes"
import TrilhaDetalhes from "./pages/TrilhaDetalhes"


function App() {

  return (
    <div translate="no">
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/trilhas" element={<Trilhas />} />
          <Route path="/trilhas/:id" element={<TrilhaDetalhes />} />

          <Route path="/parques" element={<Parques />} />
          <Route path="/parques/:id" element={<ParqueDetalhes />} />

          <Route path="/eventos" element={<Eventos />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />

        </Routes>

        <Footer />

      </BrowserRouter>
    </div>

  )

}

export default App