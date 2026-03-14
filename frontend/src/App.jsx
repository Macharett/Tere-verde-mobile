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

        <Route
          path="/parques"
          element={
            <div className="max-w-6xl mx-auto p-6">
              <Parques />
            </div>
          }
        />

        <Route
          path="/trilhas"
          element={
            <div className="max-w-6xl mx-auto p-6">
              <Trilhas />
            </div>
          }
        />

        <Route
          path="/eventos"
          element={
            <div className="max-w-6xl mx-auto p-6">
              <Eventos />
            </div>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>

  )

}

export default App