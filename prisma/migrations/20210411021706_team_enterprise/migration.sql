/*
  Warnings:

  - You are about to drop the column `workspace` on the `Installation` table. All the data in the column will be lost.
  - You are about to drop the column `workspace_id` on the `Installation` table. All the data in the column will be lost.
  - Added the required column `team_name` to the `Installation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `Installation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterprise_name` to the `Installation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enterprise_id` to the `Installation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Installation" DROP COLUMN "workspace",
DROP COLUMN "workspace_id",
ADD COLUMN     "team_name" TEXT NOT NULL,
ADD COLUMN     "team_id" INTEGER NOT NULL,
ADD COLUMN     "enterprise_name" TEXT NOT NULL,
ADD COLUMN     "enterprise_id" INTEGER NOT NULL;
