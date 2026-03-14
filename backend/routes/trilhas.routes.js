const express = require("express")
const router = express.Router()

const {
  listarTrilhas,
  criarTrilha
} = require("../controllers/trilhas.controller")

router.get("/", listarTrilhas)
router.post("/", criarTrilha)

module.exports = router