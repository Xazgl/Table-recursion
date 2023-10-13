-- CreateTable
CREATE TABLE "OutlayRow" (
    "id" SERIAL NOT NULL,
    "rowName" TEXT NOT NULL,
    "parentId" INTEGER,
    "mainCosts" INTEGER NOT NULL,
    "equipmentCosts" INTEGER NOT NULL,
    "machineOperatorSalary" INTEGER NOT NULL,
    "materials" INTEGER NOT NULL,
    "mimExploitation" INTEGER NOT NULL,
    "overheads" INTEGER NOT NULL,
    "salary" INTEGER NOT NULL,
    "supportCosts" INTEGER NOT NULL,
    "estimatedProfit" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutlayRow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OutlayRow" ADD CONSTRAINT "OutlayRow_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OutlayRow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
