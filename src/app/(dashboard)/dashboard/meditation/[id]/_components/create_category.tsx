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
import { Images, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { fetcher } from '@/lib/fetcher'
import { categoryApi } from '@/lib/api'

type FormData = {
    title: string
}

function CreateCategory({ addCategory }: { addCategory: (item: any) => void }) {
    const [open, setOpen] = useState(false)
    const [color, setColor] = useState('')
    const [emoji, setEmoji] = useState('')
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            const formData = new FormData();

            formData.append('name', data.title);
            formData.append('icon', emoji);
            formData.append('color', color);

            if (fileInputRef.current?.files?.[0]) {
                formData.append('backgroundImage', fileInputRef.current.files[0]);
            }

            const res = await fetcher(categoryApi.createCategory, { method: 'POST', data: formData });
            if (res) {
                addCategory(res)
                setOpen(false)
            }

        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setEmoji(emojiData.emoji)
    }

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-[#2b7272] my-1 lg:my-0 hover:bg-[#1f5d57] text-white px-3 font-rubik-400">
                        <Plus className="w-4 h-4 mr-1" /> Add New
                    </Button>
                </DialogTrigger>

                <DialogContent
                    className="sm:max-w-[800px] max-h-[80vh] overflow-auto hide-scrollbar"
                >

                    <form noValidate className="font-rubik-400">
                        <div className="">
                            <h4 className="text-base font-light text-[#000000] mb-2">Background Image</h4>
                            <div className="flex w-full h-full">
                                <div
                                    onClick={handleClick}
                                    className="border-2 border-dashed border-[#D9D9D9] flex flex-col justify-center items-center rounded-lg p-8 text-center bg-[#ffffff] w-full cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
                                    aria-label="Upload background image"
                                >
                                    <Images className="w-8 h-8 mx-auto mb-4" color={"#777777"} />
                                    <p className="text-[#777777] mb-2 font-rubik-400 text-[12px]">
                                        Drop here or Browse
                                        <br />
                                        images from device
                                    </p>
                                </div>
                            </div>

                            {previewUrl && (
                                <div className="relative mt-4 inline-block">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-full max-h-24 rounded-md object-contain"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPreviewUrl(null)}
                                        className="absolute top-1 right-1 bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-700"
                                        aria-label="Remove image"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <div className="my-3">
                            <Label htmlFor="title" className="mb-1 text-[14px] font-light text-base">
                                Category Name
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter the category name"
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

                        <div className="mt-6 space-y-2">
                            <Label className="text-base font-rubik-400">Pick an icon</Label>
                            {emoji && < div className="text-base font-rubik-400 mb-2">Selected: {emoji}</div>}

                            <div className="w-full h-[500px]  border rounded-md">
                                <EmojiPicker
                                    onEmojiClick={onEmojiClick}
                                    searchDisabled={false}
                                    skinTonesDisabled={true}
                                    className="w-full! h-full!"
                                />
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                            className="bg-[#2b7272] my-3  hover:bg-[#1f5d57] text-white px-3 font-rubik-400"
                        >
                            {loading ? 'Saving...' : 'Save Category'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default CreateCategory
