"use client"
import axios from "axios";
import Form from "../../components/Form";
import { createProjectInput } from "@/schema";
import { useRouter } from "next/navigation";


export default function () {
    const router = useRouter();
    const handleFormSubmit = async (newProject: createProjectInput) => {
        try {
            await axios.post("/api/projects", newProject);
            alert("New project added");
            router.push("/");
        } catch (error) {
            console.error("Error while adding project:", error);
            alert("Failed to add the project.");
        }
    };

    return <div>
        <Form onSubmit={handleFormSubmit} onCancel={() => router.push("/")} />
    </div>
}