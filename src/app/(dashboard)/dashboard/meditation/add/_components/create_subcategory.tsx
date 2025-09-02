'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { HexColorPicker } from 'react-colorful'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { fetcher } from '@/lib/fetcher'
import { categoryApi } from '@/lib/api'

type FormData = {
    title: string
    description: string
    category: Record<any, any> | string
}

function CreateSubCategory({ addCategory, categoryId }: { addCategory: (item: any) => void, categoryId: string }) {
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState('Not selected')
    const [loading, setLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<FormData>()



    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true)

            const body = {
                name: data.title,
                description: data.description,
                categoryId,
                color
            }
            const res = await fetcher(categoryApi.createSubCategory, {
                method: 'POST',
                data: body,
            })

            if (res) {
                addCategory(res)
                setOpen(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus()
        }
    }, [open])


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-[#2b7272] my-1 lg:my-0 hover:bg-[#1f5d57] text-white px-3 font-rubik-400">
                        <Plus className="w-4 h-4 mr-1" /> Add New
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-auto hide-scrollbar">

                    <form noValidate className="font-rubik-400">
                        {/* Title */}
                        <div className="my-3">
                            <Label htmlFor="title" className="mb-1 text-[14px] font-light text-base">
                                Subcategory Name
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter the subcategory name"
                                {...register('title', { required: 'Title is required' })}
                                aria-invalid={errors.title ? 'true' : 'false'}
                                aria-describedby="title-error"
                            />
                            {errors.title && (
                                <p id="title-error" className="text-red-600 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="my-3">
                            <Label htmlFor="description" className="mb-1 text-[14px] font-light text-base">
                                Description
                            </Label>
                            <textarea
                                id="description"
                                rows={4}
                                placeholder="Enter a detailed description"
                                className="border rounded-md px-3 py-2 w-full"
                                {...register('description', {
                                    required: 'Description is required',
                                })}
                                aria-invalid={errors.description ? 'true' : 'false'}
                                aria-describedby="description-error"
                            />
                            {errors.description && (
                                <p id="description-error" className="text-red-600 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Color Picker */}
                        <div className="mt-4 space-y-2">
                            <Label className="font-rubik-400 text-base">Pick a color</Label>
                            <HexColorPicker color={color} onChange={setColor} className="w-full!" />
                            <div className="flex items-center gap-2 mt-2">
                                <div
                                    className="w-6 h-6 rounded-full border"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-sm text-muted-foreground">{color}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                            className="bg-[#2b7272] my-3 hover:bg-[#1f5d57] text-white px-3 font-rubik-400"
                        >
                            {loading ? 'Saving...' : 'Save Subcategory'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateSubCategory
