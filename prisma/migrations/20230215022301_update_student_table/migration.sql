/*
  Warnings:

  - You are about to drop the column `fatherName` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `students` table. All the data in the column will be lost.
  - Added the required column `adressId` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rg` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "fatherName",
DROP COLUMN "motherName",
ADD COLUMN     "adressId" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "rg" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "parents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT,
    "rg" TEXT,
    "phone" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parents_cpf_key" ON "parents"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "parents_rg_key" ON "parents"("rg");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
