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

async function buscarTrilhaPorId(req, res) {
  try {
    const { id } = req.params

    const trilha = await prisma.trilha.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        parque: true
      }
    })

    if (!trilha) {
      return res.status(404).json({
        erro: "Trilha não encontrada"
      })
    }

    res.json(trilha)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      erro: "Erro ao buscar trilha"
    })
  }
}

async function criarTrilha(req, res) {
  try {
    const {
      nome,
      dificuldade,
      distancia,
      descricao,
      imagem,
      latitude,
      longitude,
      parqueId
    } = req.body

    const trilha = await prisma.trilha.create({
      data: {
        nome,
        dificuldade,
        distancia: Number(distancia),
        descricao,
        imagem,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
        parqueId: Number(parqueId)
      }
    })

    res.json(trilha)
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao criar trilha" })
  }
}

async function atualizarTrilha(req, res) {
  try {

    const { id } = req.params
    const {
      nome,
      dificuldade,
      distancia,
      descricao,
      imagem,
      latitude,
      longitude,
      parqueId
    } = req.body

    const trilha = await prisma.trilha.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        dificuldade,
        distancia: Number(distancia),
        descricao,
        imagem,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
        parqueId: Number(parqueId)
      }
    })

    res.json(trilha)

  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao atualizar trilha" })
  }
}

async function deletarTrilha(req, res) {
  try {

    const { id } = req.params

    await prisma.trilha.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({
      mensagem: "Trilha removida com sucesso"
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao remover trilha" })
  }
}

module.exports = {
  listarTrilhas,
  buscarTrilhaPorId,
  criarTrilha,
  atualizarTrilha,
  deletarTrilha
}