import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../../prisma";


interface OutlayRowType {
    id: number,
    rowName: String
    parentId?: number,
    mainCosts: number,
    equipmentCosts: number,
    machineOperatorSalary: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    salary: number,
    supportCosts: number,
    estimatedProfit: number,
    total: number,
    children?: OutlayRowType[]; // Add children property here
}

interface TreeNode {
    id: number;
    children?: TreeNode[];
    // Другие свойства, если нужно
}



export async function GET(req: NextRequest) {
    try {
        const allRows = await db.outlayRow.findMany();

        //Найти элементы родительские, которые некуда не вложены у них пустой parentId
        const roots = allRows.filter(row => row.parentId === null);

        //Функция buildTree рекурсивно создает древовидную структуру
        const buildTree = (node: OutlayRowType,) => {

            // Найти всех потомков данного узла
            const children = allRows.filter(row => row.parentId === node.id);

            // Если у данного узла есть потомки, рекурсивно вызвать buildTree для каждого потомка
            if (children.length > 0) {
                node.children = children.map(child => buildTree(child));
            }

            // Вернуть узел с его потомками (если они есть)
            return node;
        };

        //Применить функцию buildTree к каждому корневому элементу, чтобы построить древовидную структуру
        const hierarchicalData = roots.map(root => buildTree(root));

        if (hierarchicalData.length === 0) {
            return new Response(
                "Нету данных в базе",
                { status: 404 }
            );
        }

        return NextResponse.json({ hierarchicalData });

    } catch (error) {
        console.error(error);
        return new Response(
            "Не получилось обратиться к базе данных",
            { status: 500 }
        );
    }
}