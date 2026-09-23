-- AlterTable
ALTER TABLE "clubs" ADD COLUMN     "external_id" INTEGER;

-- AlterTable
ALTER TABLE "fixtures" ADD COLUMN     "external_id" INTEGER;

-- AlterTable
ALTER TABLE "players" ADD COLUMN     "external_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "clubs_external_id_key" ON "clubs"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "fixtures_external_id_key" ON "fixtures"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "players_external_id_key" ON "players"("external_id");

