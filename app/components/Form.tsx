"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { createProjectInput } from '@/schema'

interface ProjectFormProps {
    project?: {
        id?: string
        name: string
        description: string
        skils: string[]
        members: number
        isActive: boolean
    }
    onSubmit: (project: createProjectInput) => void
    onCancel: () => void
}

const skillOptions = [
    'Asp.Net', 'PHP', 'Java', 'ReactJs', 'React Native', 'AngularJs', 'NodeJs',
    'PWA', 'Flutter', 'VueJs', 'Vanilla Js', 'SQL Server', 'My SQL', 'MongoDB',
    'HTML', 'CSS', 'JavaScript/jQuery'
]

export default function Form({ project, onSubmit, onCancel }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        skils: [] as string[],
        members: '1',
        isActive: false
    })

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                description: project.description,
                skils: project.skils,
                members: project.members.toString(),
                isActive: project.isActive
            })
        }
    }, [project])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSkillChange = (skill: string) => {
        setFormData(prev => ({
            ...prev,
            skils: prev.skils.includes(skill)
                ? prev.skils.filter(s => s !== skill)
                : [...prev.skils, skill]
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
        onSubmit(formData)
    }

    return (
        <div className='bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen'>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">
                    {project ? 'Edit Project' : 'Add Project'}
                </h2>

                <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border-purple-300 focus:border-purple-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border-purple-300 focus:border-purple-500"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Skill Set *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {skillOptions.map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                                <Checkbox
                                    id={skill}
                                    checked={formData.skils.includes(skill)}
                                    onCheckedChange={() => handleSkillChange(skill)}
                                />
                                <label htmlFor={skill} className="text-sm">{skill}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="members">No of Members *</Label>
                    <Select
                        value={formData.members}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, members: value }))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select number of members" />
                        </SelectTrigger>
                        <SelectContent>
                            {['1', '2', '3', '4', '5 or 5+'].map((num) => (
                                <SelectItem key={num} value={num}>{num}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked as boolean }))}
                    />
                    <Label htmlFor="isActive">Is Active?</Label>
                </div>

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={onCancel} className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                        Back
                    </Button>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Save
                    </Button>
                </div>
            </form>
        </div>
    )
}