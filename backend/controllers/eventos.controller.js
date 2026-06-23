const prisma = require("../services/prisma")

async function listarEventos(req, res) {
  try {
    const eventos = await prisma.evento.findMany({
      include: {
        parque: true
      },
      orderBy: {
        data: "asc"
      }
    })

    res.json(eventos)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar eventos" })
  }
}

async function criarEvento(req, res) {
  try {
    const {
      titulo,
      descricao,
      data,
      local,
      horario,
      categoria,
      linkMapa,
      parqueId
    } = req.body

    const evento = await prisma.evento.create({
      data: {
        titulo,
        descricao,
        data: new Date(data),
        local,
        horario,
        categoria,
        linkMapa,
        parqueId: parqueId ? Number(parqueId) : null
      }
    })

    res.json(evento)
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao criar evento" })
  }
}

async function atualizarEvento(req, res) {
  try {
    const { id } = req.params

    const {
      titulo,
      descricao,
      data,
      local,
      horario,
      categoria,
      linkMapa,
      parqueId
    } = req.body

    const evento = await prisma.evento.update({
      where: {
        id: Number(id)
      },
      data: {
        titulo,
        descricao,
        data: new Date(data),
        local,
        horario,
        categoria,
        linkMapa,
        parqueId: parqueId ? Number(parqueId) : null
      }
    })

    res.json(evento)
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao atualizar evento" })
  }
}

async function deletarEvento(req, res) {
  try {
    const { id } = req.params

    await prisma.evento.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({
      mensagem: "Evento removido com sucesso"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao remover evento" })
  }
}

module.exports = {
  listarEventos,
  criarEvento,
  atualizarEvento,
  deletarEvento
}