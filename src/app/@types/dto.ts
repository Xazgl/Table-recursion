
export type NodeType = {
    id: number;
    rowName: string;
    parentId?: number | null;
    mainCosts: number;
    equipmentCosts: number;
    machineOperatorSalary: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    salary: number;
    supportCosts: number;
    estimatedProfit: number;
    total: number;
    children: NodeType[]; // Потомки всегда присутствуют
    parent: NodeType | null; // Родитель может быть null
    createdAt: Date;
    updatedAt: Date;
}



