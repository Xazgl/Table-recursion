import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";
import db from "../../../../../../../prisma";
export async function GET(req: NextRequest) {
    try {
        const allRows = await db.outlayRow.findMany()

        if (allRows.length === 0) {
            return new Response(
                "Нету данных в базе",
                { status: 404 } 
            );
        }
        
        return NextResponse.json({ allRows })

    } catch (error) {
        console.error(error);
        return new Response(
            "Не получилось обратиться к базе данных",
            { status: 500 }
        )
    }
}
