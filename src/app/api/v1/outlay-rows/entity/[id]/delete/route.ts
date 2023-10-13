import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../../../../prisma";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        console.log(req.url);
        const id = parseFloat(params.id);

        if (typeof id === 'number') {
            const deleteRow = await db.outlayRow.delete({
                where: {
                    id: id,
                },
            });
            return NextResponse.json({ deleteRow });
        } else {
            return new Response(
                "Работа не нейдена",
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
