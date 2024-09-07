-- CreateTable
CREATE TABLE "Ball" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "versionId" INTEGER NOT NULL,
    CONSTRAINT "Ball_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Ball_name_key" ON "Ball"("name");
