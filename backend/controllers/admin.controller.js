const prisma = require("../services/prisma")
const bcrypt = require("bcrypt")

async function login(req, res) {
  try {
    const { email, senha } = req.body

    const admin = await prisma.administrador.findUnique({
      where: { email }
    })

    if (!admin) {
      return res.status(401).json({ erro: "Administrador não encontrado" })
    }

    const senhaValida = await bcrypt.compare(senha, admin.senha)

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta" })
    }

    res.json({
      mensagem: "Login realizado com sucesso",
      admin: {
        id: admin.id,
        nome: admin.nome,
        email: admin.email
      }
    })

  } catch (error) {
  console.error(error)   // <-- adiciona isso
  res.status(500).json({ erro: "Erro no login" })
  }
}

module.exports = {
  login
}