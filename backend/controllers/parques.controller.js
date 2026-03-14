const prisma = require("../services/prisma")

async function listarParques(req, res) {
  try {
    const parques = await prisma.parque.findMany()
    res.json(parques)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar parques" })
  }
}

module.exports = {
  listarParques
}