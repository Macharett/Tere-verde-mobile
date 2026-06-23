-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "horario" TEXT,
ADD COLUMN     "linkMapa" TEXT,
ADD COLUMN     "parqueId" INTEGER;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_parqueId_fkey" FOREIGN KEY ("parqueId") REFERENCES "Parque"("id") ON DELETE SET NULL ON UPDATE CASCADE;
