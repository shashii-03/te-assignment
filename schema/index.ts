import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(1, "Project Name is required"),
    description: z.string().min(1, "Description is required"),
    skils: z.array(z.string()).min(1, "Atleast 1 skill is required"),
    members: z.string().min(1, "Minimum 1 member is required"),
    isActive: z.boolean(),
    createdAt: z.date().optional()
})

export const updateProjectSchema = createProjectSchema.partial();
export type updateProjectInput = z.infer<typeof updateProjectSchema>;

export type createProjectInput = z.infer<typeof createProjectSchema>;