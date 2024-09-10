-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "generation" INTEGER NOT NULL,
    "fanmade" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ball" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "hisui" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BattleType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CatchType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "detail" TEXT
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    CONSTRAINT "Location_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Species" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "form" TEXT,
    "dexNo" INTEGER NOT NULL,
    "generation" INTEGER NOT NULL,
    "type1Id" TEXT NOT NULL,
    "type2Id" TEXT,
    CONSTRAINT "Species_type1Id_fkey" FOREIGN KEY ("type1Id") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Species_type2Id_fkey" FOREIGN KEY ("type2Id") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Playthrough" (
    "idNo" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "versionId" TEXT NOT NULL,
    "adventureStarted" DATETIME NOT NULL,
    CONSTRAINT "Playthrough_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playthroughIdNo" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "nickname" TEXT,
    "caughtDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caughtLocationId" TEXT NOT NULL,
    "caughtSpeciesId" TEXT NOT NULL,
    "caughtLevel" INTEGER NOT NULL,
    "ballId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    CONSTRAINT "TeamMember_playthroughIdNo_fkey" FOREIGN KEY ("playthroughIdNo") REFERENCES "Playthrough" ("idNo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMember_caughtLocationId_fkey" FOREIGN KEY ("caughtLocationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMember_caughtSpeciesId_fkey" FOREIGN KEY ("caughtSpeciesId") REFERENCES "Species" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMember_ballId_fkey" FOREIGN KEY ("ballId") REFERENCES "Ball" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainerClass" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Trainer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "Trainer_classId_fkey" FOREIGN KEY ("classId") REFERENCES "TrainerClass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Event" (
    "no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playthroughIdNo" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Event_playthroughIdNo_fkey" FOREIGN KEY ("playthroughIdNo") REFERENCES "Playthrough" ("idNo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BattleEvent" (
    "no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "battleTypeId" TEXT NOT NULL,
    "opponent1Id" TEXT NOT NULL,
    "opponent2Id" TEXT,
    "partnerId" TEXT,
    "lost" BOOLEAN NOT NULL DEFAULT false,
    "round" INTEGER,
    CONSTRAINT "BattleEvent_no_fkey" FOREIGN KEY ("no") REFERENCES "Event" ("no") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BattleEvent_battleTypeId_fkey" FOREIGN KEY ("battleTypeId") REFERENCES "BattleType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BattleEvent_opponent1Id_fkey" FOREIGN KEY ("opponent1Id") REFERENCES "Trainer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BattleEvent_opponent2Id_fkey" FOREIGN KEY ("opponent2Id") REFERENCES "Trainer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "BattleEvent_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Trainer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ItemEvent" (
    "no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "ItemEvent_no_fkey" FOREIGN KEY ("no") REFERENCES "Event" ("no") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemEvent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CatchEvent" (
    "no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "catchTypeId" TEXT NOT NULL,
    "teamMemberId" TEXT NOT NULL,
    CONSTRAINT "CatchEvent_no_fkey" FOREIGN KEY ("no") REFERENCES "Event" ("no") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CatchEvent_catchTypeId_fkey" FOREIGN KEY ("catchTypeId") REFERENCES "CatchType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CatchEvent_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamMemberChange" (
    "teamMemberId" TEXT NOT NULL,
    "eventNo" INTEGER NOT NULL,
    "level" INTEGER,
    "speciesId" TEXT,

    PRIMARY KEY ("teamMemberId", "eventNo"),
    CONSTRAINT "TeamMemberChange_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMemberChange_eventNo_fkey" FOREIGN KEY ("eventNo") REFERENCES "Event" ("no") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMemberChange_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Version_name_key" ON "Version"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ball_name_hisui_key" ON "Ball"("name", "hisui");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BattleType_name_key" ON "BattleType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CatchType_name_detail_key" ON "CatchType"("name", "detail");

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_regionId_key" ON "Location"("name", "regionId");

-- CreateIndex
CREATE UNIQUE INDEX "Species_name_form_key" ON "Species"("name", "form");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_playthroughIdNo_slot_key" ON "TeamMember"("playthroughIdNo", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerClass_name_key" ON "TrainerClass"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_name_classId_key" ON "Trainer"("name", "classId");
