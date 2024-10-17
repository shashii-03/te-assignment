import prisma from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        const project = await prisma.project.findUnique({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json({
            project
        })
    } catch (error) {
        return NextResponse.json({
            msg: "Something went wrong",
            error: error
        }, {
            status: 500
        })
    }
}