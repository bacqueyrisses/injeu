/*
  Warnings:

  - You are about to drop the column `activated` on the `Category` table. All the data in the column will be lost.
  - Added the required column `code` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "activated",
ADD COLUMN     "code" TEXT NOT NULL;
