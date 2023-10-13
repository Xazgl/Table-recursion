
import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
import db from "../../../../../../../prisma";
export async function POST(req: NextRequest) {
    try {
        // const { jobTitle, salary, equipment, overheads, estimatedProfit, parentId  } = req.body as { parentId: number,jobTitle: string, salary: number, equipment: number, overheads: number, estimatedProfit: number };
        const { jobTitle, salary, equipment, overheads, estimatedProfit, parentId } = await req.json();
        const newRow = await db.outlayRow.create({
            data: {
                rowName: jobTitle,
                parentId: parentId? parentId : null,
                mainCosts: 0,
                equipmentCosts : equipment,
                machineOperatorSalary: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: overheads,
                salary: salary,
                supportCosts : 0,
                estimatedProfit: estimatedProfit,
                total: 0,
            },
        });

        return NextResponse.json({ newRow })

    } catch (error) {
        console.error(error);
        return new Response(
            "'Не получилось создать'",
            { status: 500 }
        )
    }
}

// const schema = z.object({
//     rowName: z.string(),
//     parentId: z.number().optional(),
//     mainCosts: z.number(),
//     equipmentCosts: z.number(),
//     machineOperatorSalary: z.number(),
//     materials: z.number(),
//     mimExploitation: z.number(),
//     overheads: z.number(),
//     salary: z.number(),
//     supportCosts: z.number(),
//     estimatedProfit: z.number(),
//     total: z.number()
// });


// export async function POST(req: NextRequest) {

//     try {
//         const data = schema.parse(req.body);
//         const { jobTitle, salary, equipment, overheads, estimatedProfit } = req.body as { jobTitle: string, salary: number, equipment: string, overheads: string, estimatedProfit: string }

//         const newRow = await db.outlayRow.create({
//             data: {
//                 rowName: jobTitle,                  Наименование работы
//                 parentId,                           Родительский ID (если не указан, значит объект не вложен)
//                 mainCosts,                          Основные расходы
//                 equipmentCosts: equipment,             Расходы на оборудование
//                 machineOperatorSalary,              Заработная плата машиниста
//                 materials,                          Затраты на материалы
//                 mimExploitation,                    Расходы на эксплуатацию
//                 overheads: overheads,                          Накладные расходы
//                 salary: salary,                             Заработная плата
//                 supportCosts,                       Затраты на поддержку
//                 estimatedProfit:estimatedProfit ,                    Оценочная прибыль
//                 total                               Общая сумма
//             },
//         });
//         return NextResponse.json({ newRow })
//     } catch (error) {
//         console.error(error);

//         return new Response(
//             "'Не получилось создать'",
//             { status: 500 }
//         )
//     }

// }
