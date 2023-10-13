import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../../../prisma";
import { number } from "zod";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { jobTitle, salary, equipment, overheads, estimatedProfit, parentId } = await req.json();
        
        console.log(req.url);

        const id = parseFloat(params.id);

        try {
            if (!isNaN(id)) {
                const updatateRow = await db.outlayRow.update({
                    where: {
                        id: id,
                    },
                    data: {
                        rowName: jobTitle,
                        parentId: parentId ? parentId : null,
                        mainCosts: 0,
                        equipmentCosts: equipment,
                        machineOperatorSalary: 0,
                        materials: 0,
                        mimExploitation: 0,
                        overheads: overheads,
                        salary: salary,
                        supportCosts: 0,
                        estimatedProfit: estimatedProfit,
                        total: 0,
                    }
                });
                return NextResponse.json({ updatateRow });
            }
            else {
                return new Response(
                    "Работа не нейдена",
                    { status: 404 }
                );
            }
        } catch {
            return new Response(
                "id не является числом",
                { status: 404 }
            );
        }
    } catch (error) {
        console.error(error);
        return new Response(
            "Ошибка запроса",
            { status: 500 }
        );
    }
}
