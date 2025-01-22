/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Note_id_key" ON "Note"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
