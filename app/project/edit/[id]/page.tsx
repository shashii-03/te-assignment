"use client"
import { useEffect, useState } from "react";
import Form from "../../../components/Form";
import { updateProjectInput } from "@/schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";

type proejctType = {
    id?: string
    name: string
    description: string
    skils: string[]
    members: number
    isActive: boolean

}
export default function ({ params }: { params: { id: number } }) {
    const [project, setProject] = useState<proejctType | null>(null)
    const [laoding, setLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        setLoading(true)
        //api/projects/id?id=11
        axios.get(`/api/projects/id?id=${params.id}`).then(r => {
            setProject(r.data.project)
            setLoading(false)
        })
    }, [params.id])

    const handleSubmit = async (projectData: updateProjectInput) => {
        try {
            const projectWithId = { ...projectData, id: params.id }
            console.log(projectWithId)
            await axios.put("/api/projects", projectWithId).then(r => {
                alert("Project updated Success")
                router.push("/")
            })
        } catch (error) {
            alert("Error while updating proejct")
            console.log(error);
        }
    }

    const onCancel = () => {
        router.push("/")
    }

    if (laoding) {
        return <div>
            <Loader />
        </div>
    }
    return <div>
        {project ?
            <Form project={project}
                onSubmit={handleSubmit}
                onCancel={onCancel} /> : <Loader />
        }
    </div>
}