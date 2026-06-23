const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth")

const {
  listarTrilhas,
  buscarTrilhaPorId,
  criarTrilha,
  atualizarTrilha,
  deletarTrilha
} = require("../controllers/trilhas.controller")

router.get("/", listarTrilhas)

router.get("/:id", buscarTrilhaPorId)

router.post("/", auth, criarTrilha)

router.put("/:id", auth, atualizarTrilha)

router.delete("/:id", auth, deletarTrilha)

module.exports = router