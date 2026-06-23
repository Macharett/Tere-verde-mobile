const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10)

  await prisma.administrador.upsert({
    where: { email: "admin@tereverde.com" },
    update: { senha: senhaHash },
    create: {
      nome: "Administrador",
      email: "admin@tereverde.com",
      senha: senhaHash
    }
  })

  const serra = await prisma.parque.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: "Parque Nacional da Serra dos Órgãos",
      descricao: "Um dos principais destinos ecológicos de Teresópolis, com trilhas, mirantes e grande área preservada de Mata Atlântica.",
      localizacao: "Teresópolis - RJ",
      imagem: ""
    }
  })

  const montanhas = await prisma.parque.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: "Parque Natural Montanhas de Teresópolis",
      descricao: "Área natural protegida com belas paisagens, trilhas e contato direto com a natureza da região serrana.",
      localizacao: "Teresópolis - RJ",
      imagem: ""
    }
  })

  const tresPicos = await prisma.parque.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nome: "Parque Estadual dos Três Picos",
      descricao: "Maior parque estadual do Rio de Janeiro, com montanhas, biodiversidade e atrativos para ecoturismo.",
      localizacao: "Região Serrana - RJ",
      imagem: ""
    }
  })

  await prisma.trilha.createMany({
    data: [
      {
        nome: "Trilha Dois Bicos",
        dificuldade: "Moderada",
        distancia: 3,
        descricao: "Trilha de dificuldade moderada, indicada para quem busca uma caminhada com belas paisagens naturais.",
        imagem: "",
        latitude: null,
        longitude: null,
        parqueId: serra.id
      },
      {
        nome: "Mirante da Agulha do Diabo",
        dificuldade: "Difícil",
        distancia: 5,
        descricao: "Percurso mais desafiador, com vista para uma das formações rochosas mais conhecidas da Serra dos Órgãos.",
        imagem: "",
        latitude: null,
        longitude: null,
        parqueId: serra.id
      },
      {
        nome: "Trilha Mozart Catão",
        dificuldade: "Moderada",
        distancia: 0.8,
        descricao: "Trilha curta e agradável, ideal para contato rápido com a natureza.",
        imagem: "",
        latitude: null,
        longitude: null,
        parqueId: serra.id
      },
      {
        nome: "Pedra do Sino",
        dificuldade: "Difícil",
        distancia: 11,
        descricao: "Uma das trilhas mais famosas da região, com percurso longo e vista panorâmica no topo.",
        imagem: "",
        latitude: null,
        longitude: null,
        parqueId: serra.id
      },
      {
        nome: "Trilha Suspensa",
        dificuldade: "Fácil",
        distancia: 1.3,
        descricao: "Trilha leve e acessível, ótima para famílias e visitantes que desejam uma experiência tranquila.",
        imagem: "",
        latitude: null,
        longitude: null,
        parqueId: serra.id
      },
      {
        nome: "Travessia Teresópolis – Petrópolis",
        dificuldade: "Difícil",
        distancia: 30,
        descricao: "Travessia clássica da Serra dos Órgãos, indicada para pessoas experientes em trilhas longas.",
        imagem: "",
        latitude: null,
        longitude: null,
        parqueId: serra.id
      },
      {
        nome: "Torre do Bom Sucesso",
        dificuldade: "Moderada",
        distancia: 6,
        descricao: "Trilha com percurso moderado e bela vista da região.",
        imagem: "",
        latitude: null,
        longitude: null,
        parqueId: montanhas.id
      }
    ]
  })

  await prisma.evento.createMany({
    data: [
      {
        titulo: "Caminhada Ecológica",
        descricao: "Atividade guiada para conhecer trilhas e áreas naturais de Teresópolis.",
        data: new Date("2026-07-15"),
        local: "Parque Nacional da Serra dos Órgãos"
      },
      {
        titulo: "Observação de Aves",
        descricao: "Encontro voltado para observação da fauna local e educação ambiental.",
        data: new Date("2026-08-10"),
        local: "Teresópolis - RJ"
      }
    ]
  })

  console.log("Seed concluído!")
  console.log("Login admin: admin@tereverde.com")
  console.log("Senha: 123456")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })