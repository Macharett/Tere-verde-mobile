const prisma = require("../services/prisma")

async function listarTrilhas(req, res) {
  try {
    const trilhas = await prisma.trilha.findMany({
      include: { parque: true }
    })

    res.json(trilhas)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar trilhas" })
  }
}

async function criarTrilha(req, res) {
  try {
    const { nome, dificuldade, distancia, parqueId } = req.body

    const trilha = await prisma.trilha.create({
      data: {
        nome,
        dificuldade,
        distancia,
        parqueId
      }
    })

    res.json(trilha)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar trilha" })
  }
}

module.exports = {
  listarTrilhas,
  criarTrilha
}