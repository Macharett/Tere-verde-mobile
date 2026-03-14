const express = require("express")
const router = express.Router()

const {
  listarEventos,
  criarEvento
} = require("../controllers/eventos.controller")

router.get("/", listarEventos)
router.post("/", criarEvento)

module.exports = router