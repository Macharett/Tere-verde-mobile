const prisma = require("../services/prisma")

async function listarEventos(req, res) {
  try {
    const eventos = await prisma.evento.findMany()

    res.json(eventos)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar eventos" })
  }
}

async function criarEvento(req, res) {
  try {
    const { titulo, descricao, data } = req.body

    const evento = await prisma.evento.create({
      data: {
        titulo,
        descricao,
        data: new Date(data)
      }
    })

    res.json(evento)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar evento" })
  }
}

module.exports = {
  listarEventos,
  criarEvento
}