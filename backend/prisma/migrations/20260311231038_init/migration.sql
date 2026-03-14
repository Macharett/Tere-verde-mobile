-- CreateTable
CREATE TABLE "Parque" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "imagem" TEXT,

    CONSTRAINT "Parque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trilha" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "dificuldade" TEXT NOT NULL,
    "distancia" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "parqueId" INTEGER NOT NULL,

    CONSTRAINT "Trilha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aviso" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aviso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Trilha" ADD CONSTRAINT "Trilha_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
