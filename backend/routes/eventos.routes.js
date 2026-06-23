const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth")

const {
  listarEventos,
  criarEvento,
  atualizarEvento,
  deletarEvento
} = require("../controllers/eventos.controller")

router.get("/", listarEventos)

router.post("/", auth, criarEvento)

router.put("/:id", auth, atualizarEvento)

router.delete("/:id", auth, deletarEvento)

module.exports = router