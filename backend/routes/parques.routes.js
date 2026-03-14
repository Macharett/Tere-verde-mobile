const express = require("express")
const router = express.Router()

const { listarParques } = require("../controllers/parques.controller")

router.get("/", listarParques)

module.exports = router