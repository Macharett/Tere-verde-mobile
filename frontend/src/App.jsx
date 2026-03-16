import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Parques from "./pages/Parques"
import Trilhas from "./pages/Trilhas"
import Eventos from "./pages/Eventos"

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/trilhas" element={<Trilhas />} />

        <Route path="/parques" element={<Parques />} />

        <Route path="/eventos" element={<Eventos />} />

      </Routes>

      <Footer />

    </BrowserRouter>

  )

}

export default App