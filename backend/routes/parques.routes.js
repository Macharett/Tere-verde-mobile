const express = require("express")
const router = express.Router()

const auth = require("../middlewares/auth")

const {
  listarParques,
  buscarParquePorId,
  criarParque,
  atualizarParque,
  deletarParque
} = require("../controllers/parques.controller")

router.get("/", listarParques)

router.get("/:id", buscarParquePorId)

router.post("/", auth, criarParque)

router.put("/:id", auth, atualizarParque)

router.delete("/:id", auth, deletarParque)

module.exports = router