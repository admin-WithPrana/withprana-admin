'use client'
import React from 'react'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    BarChart3,
    Users,
    Waves,
    CreditCard,
    UserCheck,
    MessageCircle,
    Bell,
    FileText,
    Zap,
    History,
    Settings,
    LogOut,
    Volume2,
    Video,
    Upload,
    Paperclip,
    Plus,
    X,
} from "lucide-react"
import { Label } from '@/components/ui/label'

function AddMeditation() {
    const [selectedType, setSelectedType] = useState("audio")
    const [tags, setTags] = useState(["Overthinking", "Night Routine"])
    return (
        <div className="flex-1 p-6 mx-2 bg-white rounded-[20px] font-rubik-400">

            {/* Select Type */}
            <div className="mb-6">
                <h3 className="text-[14px] font-rubik-400 font-medium text-[#000000] mb-4">Select Type</h3>
                <div className="flex gap-4">
                    <Badge className='p-1 border-2 bg-[#DDF3E5] text-[#2B7272] font-rubik-500 rounded-full' ><Volume2 className='h-8 w-8' /> Audio</Badge>

                </div>
            </div>

            {/* Form Content */}
            <div className=" gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Thumbnail Upload */}
                    <div className=' gap-2 items-center'>
                        <h4 className="text-base font-medium text-[#000000] mb-4">Thumbnail Upload</h4>
                        <div className='flex w-full gap-2'>
                            <div className="border-2  border-dashed border-[#D9D9D9] rounded-lg p-8 text-center bg-[#ffffff] w-1/4">
                                <Upload className="w-12 h-12 text-[#bebebe] mx-auto mb-4" />
                                <p className="text-[#777777] mb-2">Drop here or Browse</p>
                                <p className="text-sm text-[#a1a1a1]">images from device</p>
                            </div>
                            <div className='w-2/4'>
                                <div>
                                    <Label htmlFor="password" className='mb-1 text-[14px]'>
                                        <Paperclip className="w-4 h-4 text-[#777777]" />
                                        Upload file</Label>
                                    <Input
                                        id="password"
                                        type="text"
                                        placeholder="••••••••"
                                        className='w-full'
                                    />
                                </div>
                                <div className='my-3'>
                                    <Label htmlFor="title" className='mb-1 text-[14px]'>Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        placeholder="Enter the title of the meditation"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="duration" className='mb-1 text-[14px]'>Duration</Label>
                                    <Input
                                        id="duration"
                                        type="text"
                                        placeholder="Enter duration in minutes eg. 09:08"
                                    />
                                </div>
                            </div>
                            <div className='w-1/4'>
                                <div className="flex items-center gap-2 mb-1">
                                    <Paperclip className="w-4 h-4 text-[#777777]" />
                                    <span className="text-base font-medium text-[#000000]">Short Description</span>
                                </div>
                                <Textarea
                                    placeholder="enter short description"
                                    className="min-h-[200px] bg-[#ffffff] border-[#d9d9d9] resize-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}

            </div>

            {/* Category and Sub Category */}
            <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                    <label className="block text-base font-medium text-[#000000] mb-4">Category</label>
                    <div className="flex gap-2">
                        <Select>
                            <SelectTrigger className="bg-[#ffffff] border-[#d9d9d9] w-full">
                                <SelectValue placeholder="select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="meditation">Meditation</SelectItem>
                                <SelectItem value="sleep">Sleep</SelectItem>
                                <SelectItem value="focus">Focus</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-[#2b7272] hover:bg-[#1f5d57] text-white px-3">
                            <Plus className="w-4 h-4 mr-1" />
                            Add New
                        </Button>
                    </div>
                </div>

                <div>
                    <label className="block text-base font-medium text-[#000000] mb-4">Sub Category</label>
                    <div className="flex gap-2">
                        <Select>
                            <SelectTrigger className="bg-[#ffffff] border-[#d9d9d9] w-full">
                                <SelectValue placeholder="select sub category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-[#2b7272] hover:bg-[#1f5d57] text-white px-3">
                            <Plus className="w-4 h-4 mr-1" />
                            Add New
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="mt-8">
                <label className="block text-base font-medium text-[#000000] mb-4">Tags</label>
                <div className="flex items-center gap-2 flex-wrap">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-[#eef5ff] text-[#2b7272] border border-[#c1ece8] px-3 py-1"
                        >
                            {tag}
                            <button onClick={() => removeTag(tag)} className="ml-2 hover:text-[#1f5d57]">
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                    <span className="text-[#a1a1a1] italic">select tags</span>
                    <Button className="bg-[#2b7272] hover:bg-[#1f5d57] text-white px-3 py-1 h-auto text-sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add New
                    </Button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-12">
                <Button className="bg-[#2b7272] hover:bg-[#1f5d57] text-white px-8 py-2">Publish as Free</Button>
                <Button className="bg-[#fba515] hover:bg-[#e8940f] text-white px-8 py-2">Publish as Premium</Button>
            </div>
        </div >
    )
}

export default AddMeditation