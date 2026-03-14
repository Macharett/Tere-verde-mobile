const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function criarAdmin() {

  const senhaCriptografada = await bcrypt.hash("123456", 10)

  const admin = await prisma.administrador.create({
    data: {
      nome: "Admin",
      email: "admin@tereverde.com",
      senha: senhaCriptografada
    }
  })

  console.log("Admin criado:", admin)
}

criarAdmin()