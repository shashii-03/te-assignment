"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { PlusCircle, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createProjectInput } from '@/schema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Loader from './Loader'


type projectResponse = createProjectInput & {
    id: number
}
const HomePage = () => {
    const [projects, setProjects] = useState<projectResponse[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        axios.get("/api/projects").then(r => {
            setProjects(r.data.projects)
            setLoading(false)
        })
    }, [])
    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const deletedProject = filteredProjects.find(project => project.id === id)
            try {
                setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
                await axios.delete("/api/projects", {
                    data: { id }
                });

            } catch (error) {
                console.error(error);
                alert("There was a problem deleting the project.");
                if (deletedProject) {
                    setProjects((prevProjects) => [...prevProjects, deletedProject]);
                }
            }
        }
    }
    const handleAddProject = () => {
        router.push("/project/add")
    }


    return (
        <div className="flex flex-col mx-auto p-4  bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen">

            <h1 className='text-2xl text-center font-bold mb-6 md:text-3xl lg:text-4xl text-purple-800'>My Project</h1>
            <div className='border-2 px-5 border-none'>
                <div className='flex justify-between flex-col md:flex-row mb-6 gap-4'>
                    <Button onClick={handleAddProject} className='bg-purple-600 text-white font-bold hover:bg-purple-700 py-2 px-4 rounded-full'>
                        <PlusCircle className='mr-2 w-5 h-5'></PlusCircle>
                        Add Project</Button>
                    <div className='relative'>
                        <Input onChange={(e) => setSearchTerm(e.target.value)} className='pl-10 pr-4 py-2 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none' placeholder='Search projects...'>
                        </Input>
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />

                    </div>
                </div>
                <div className='overflow-x-auto bg-white rounded-lg shadow-lg'>
                    {loading ? (<Loader />) :
                        (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='font-bold'>Project Name</TableHead>
                                        <TableHead className='font-bold hidden md:table-cell'>Project Description</TableHead>
                                        <TableHead className='font-bold hidden lg:table-cell'>Skills</TableHead>
                                        <TableHead className='font-bold hidden sm:table-cell'>Members</TableHead>
                                        <TableHead className='font-bold hidden md:table-cell'>Active</TableHead>
                                        <TableHead className='font-bold hidden md:table-cell'>Date</TableHead>
                                        <TableHead className='font-bold'>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        filteredProjects.map(project => (
                                            <TableRow key={project.id}>
                                                <TableCell className="font-medium">{project.name}</TableCell>
                                                <TableCell className="hidden md:table-cell">{project.description}</TableCell>
                                                <TableCell className="hidden lg:table-cell">{project.skils.join()}</TableCell>
                                                <TableCell>{project.members}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{project.isActive ? 'Yes' : 'No'}</TableCell>
                                                <TableCell className="hidden md:table-cell">{project.createdAt ? (project.createdAt).toLocaleString().split('T')[0] : "Not Available"}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <Link href={`/project/edit/${project.id}`}>
                                                            <Button variant="outline" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 border-indigo-300">Edit</Button>
                                                        </Link>
                                                        <Button variant="destructive" onClick={() => handleDelete(project.id)} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        )}
                </div>
            </div>
        </div>
    )
}

export default HomePage