/*
  Warnings:

  - The primary key for the `Installation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Installation" DROP CONSTRAINT "Installation_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "enterprise_name" DROP NOT NULL,
ALTER COLUMN "enterprise_id" DROP NOT NULL,
ADD PRIMARY KEY ("id");
