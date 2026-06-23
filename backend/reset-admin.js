const bcrypt = require("bcrypt")
const prisma = require("./services/prisma")

async function resetarSenha() {
  const senhaCriptografada = await bcrypt.hash("123456", 10)

  await prisma.administrador.update({
    where: {
      email: "admin@tereverde.com"
    },
    data: {
      senha: senhaCriptografada
    }
  })

  console.log("Senha resetada com sucesso!")
  console.log("Email: admin@tereverde.com")
  console.log("Senha: 123456")

  await prisma.$disconnect()
}

resetarSenha()