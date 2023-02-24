/*
  Warnings:

  - You are about to drop the column `adressId` on the `students` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schooling` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_adressId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "adressId",
ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "schooling" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
