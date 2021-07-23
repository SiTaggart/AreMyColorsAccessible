-- CreateTable
CREATE TABLE "Installation" (
    "id" SERIAL NOT NULL,
    "workspace" TEXT NOT NULL,
    "workspace_id" INTEGER NOT NULL,
    "install_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
