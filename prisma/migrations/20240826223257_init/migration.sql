-- CreateTable
CREATE TABLE "Version" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "generation" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Version_name_key" ON "Version"("name");
