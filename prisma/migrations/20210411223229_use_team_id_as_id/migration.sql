/*
  Warnings:

  - You are about to drop the column `team_id` on the `Installation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Installation" DROP COLUMN "team_id",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Installation_id_seq";
