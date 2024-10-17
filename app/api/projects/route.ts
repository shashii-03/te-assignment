import prisma from "@/app/lib/db";
import { createProjectInput, createProjectSchema, updateProjectSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest) {
    try {
        const data: createProjectInput = createProjectSchema.parse(await req.json());
        console.log("Post data " + JSON.stringify(data))
        const project = await prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                skils: data.skils,
                members: data.members,
                isActive: data.isActive,

            }

        })
        return NextResponse.json({
            project
        })
    } catch (e) {
        return NextResponse.json({
            msg: "Error while Adding stream",
            error: e
        }, {
            status: 411
        })
    }

}

export async function GET() {
    try {
        const projects = await prisma.project.findMany({})
        // await new Promise(r => setTimeout(r, 4000))
        return NextResponse.json({
            projects
        })
    } catch (error) {
        return NextResponse.json({
            msg: "Error While getting the Proejcts",
            error: error
        }, {
            status: 500
        })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const validateData = updateProjectSchema.parse(data);
        const existingProject = await prisma.project.findUnique({
            where: {
                id: Number(data.id)
            }
        })

        if (!existingProject) {
            return NextResponse.json({
                msg: "Project does not exist"
            }, {
                status: 404
            })
        }


        const updatedProjectData = {
            ...existingProject,
            ...validateData
        }

        const updateProject = await prisma.project.update({
            where: {
                id: Number(data.id)
            }, data: updatedProjectData
        })

        return NextResponse.json({
            updateProject
        })
    } catch (error) {
        return NextResponse.json({
            msg: "Error while updating project"
        }, {
            status: 500
        })
    }


}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();
        await prisma.project.delete({
            where: {
                id
            }
        })
        return NextResponse.json({
            msg: "proect Deleted Successfully"
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            msg: "Error while Deleting Project",
            error: error
        }, {
            status: 500
        })
    }


}