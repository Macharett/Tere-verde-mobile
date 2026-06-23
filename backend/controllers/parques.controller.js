const prisma = require("../services/prisma")

async function listarParques(req, res) {
  try {

    const parques = await prisma.parque.findMany({
      include: {
        _count: {
          select: {
            trilhas: true,
            eventos: true
          }
        }
      }
    })

    res.json(parques)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao buscar parques"
    })

  }
}

async function buscarParquePorId(req, res) {
  try {
    const { id } = req.params

    const parque = await prisma.parque.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        trilhas: true,
        eventos: true
      }
    })

    if (!parque) {
      return res.status(404).json({
        erro: "Parque não encontrado"
      })
    }

    res.json(parque)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      erro: "Erro ao buscar parque"
    })
  }
}

async function criarParque(req, res) {
  try {

    const {
      nome,
      descricao,
      localizacao,
      imagem
    } = req.body

    const parque = await prisma.parque.create({
      data: {
        nome,
        descricao,
        localizacao,
        imagem
      }
    })

    res.json(parque)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao criar parque"
    })

  }
}

async function atualizarParque(req, res) {
  try {

    const { id } = req.params

    const {
      nome,
      descricao,
      localizacao,
      imagem
    } = req.body

    const parque = await prisma.parque.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        descricao,
        localizacao,
        imagem
      }
    })

    res.json(parque)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao atualizar parque"
    })

  }
}

async function deletarParque(req, res) {
  try {

    const { id } = req.params

    await prisma.parque.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({
      mensagem: "Parque removido com sucesso"
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: "Erro ao remover parque"
    })

  }
}

module.exports = {
  listarParques,
  buscarParquePorId,
  criarParque,
  atualizarParque,
  deletarParque
}