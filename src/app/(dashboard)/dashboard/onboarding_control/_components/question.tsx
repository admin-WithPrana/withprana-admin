'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Badge, X } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface OptionData {
    optionText: string;
    tag: string[];
}

interface QuestionFormData {
    question: string;
    options: OptionData[]; // 4 options
}

interface Props {
    initialData?: Partial<QuestionFormData>;
    tagsList?: any[];
}

export default function QuestionWithOptionsAndTags({ initialData, tagsList = [] }: Props) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<QuestionFormData>({
        defaultValues: {
            question: initialData?.question || '',
            options: initialData?.options || [
                { optionText: '', tag: [] },
                { optionText: '', tag: [] },
                { optionText: '', tag: [] },
                { optionText: '', tag: [] },
            ],
        },
    });

    const [filteredTags, setFilteredTags] = useState<any>([])
    const [showTagsIndexes, setShowTagsIndexes] = useState<number[]>([]);

    // Handle click outside to close dropdowns
    const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRefs.current.every(
                    (ref) => ref && !ref.contains(event.target as Node)
                )
            ) {
                setShowTagsIndexes([]);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helpers to open/close dropdown per option index
    function openDropdown(index: number) {
        setShowTagsIndexes((prev) => [...prev, index]);
    }

    function closeDropdown(index: number) {
        setShowTagsIndexes((prev) => prev.filter((i) => i !== index));
    }

    // Check if dropdown is open for given index
    function isDropdownOpen(index: number) {
        return showTagsIndexes.includes(index);
    }

    // Filter tags based on input value
    function getFilteredTags(index: number, value: string) {
        setValue(`options.${index}.tag` as any, value)
        setFilteredTags(tagsList.filter((tag) =>
            tag?.name?.toLowerCase()?.includes(value?.toLowerCase())
        ));
    }

    // Handle tag select for option
    function handleTagSelect(index: number, tagName: any) {
        const currentTags = watch(`options.${index}.tags` as any) || [];

        // Avoid duplicates
        if (!currentTags.find((tag: any) => tag.id == tagName.id)) {
            setValue(`options.${index}.tags` as any, [...currentTags, tagName], {
                shouldDirty: true,
                shouldValidate: true,
            });
        }
        closeDropdown(index);
    }

    function removeTagSelect(index: number, tagName: any) {
        const currentTags = watch(`options.${index}.tags` as any) || [];

        const removeTags = currentTags.filter((tag: any) => tag.id != tagName.id)
        setValue(`options.${index}.tags` as any, removeTags, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }

    const onFormSubmit: SubmitHandler<QuestionFormData> = (data) => {
        // onSubmit(data);
    };


    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="font-rubik-400 space-y-3 max-w-xl mx-auto">
            <div>
                <Label htmlFor="question" className="text-[14px] font-light text-[#484848]">
                    Question
                </Label>
                <Input
                    id="question"
                    placeholder="Enter your question"
                    {...register('question', { required: 'Question is required' })}
                    aria-invalid={!!errors.question}
                />
                {errors.question && (
                    <p role="alert" className="text-red-500 text-sm mt-1">
                        {errors.question.message}
                    </p>
                )}
            </div>

            {/* Options */}
            {Array.from({ length: 4 }).map((_, index) => {

                return (
                    <div>
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start">
                            {/* Option text */}
                            <div>
                                <Label htmlFor={`optionText-${index}`} className="text-[14px] font-light text-[#484848]">
                                    Option {index + 1}
                                </Label>
                                <Input
                                    id={`optionText-${index}`}
                                    placeholder={`Enter option ${index + 1}`}
                                    {...register(`options.${index}.optionText`, { required: `Option ${index + 1} is required` })}
                                    aria-invalid={!!errors.options?.[index]?.optionText}
                                />
                                {errors.options?.[index]?.optionText && (
                                    <p role="alert" className="text-red-500 text-sm mt-1">
                                        {errors.options[index]?.optionText?.message}
                                    </p>
                                )}
                            </div>

                            {/* Tag input */}
                            <div className="relative">
                                <Label htmlFor={`tag-${index}`} className="text-[14px] font-light text-[#484848]">
                                    Tag {index + 1}
                                </Label>
                                <Input
                                    id={`tag-${index}`}
                                    placeholder="Select a tag"
                                    autoComplete="off"
                                    {...register(`options.${index}.tag`)}
                                    onFocus={() => openDropdown(index)}
                                    onChange={(e) => {
                                        getFilteredTags(index, e.target.value || '');
                                        openDropdown(index);
                                    }}
                                    aria-invalid={!!errors.options?.[index]?.tag}
                                />
                                {errors.options?.[index]?.tag && (
                                    <p role="alert" className="text-red-500 text-sm mt-1">
                                        {errors.options[index]?.tag?.message}
                                    </p>
                                )}
                                {isDropdownOpen(index) && (
                                    <div
                                        ref={(el) => (dropdownRefs.current[index] = el) as any}
                                        className="absolute top-full mt-1 w-full bg-white border border-[#d9d9d9] rounded-md shadow-md max-h-60 overflow-y-auto z-10 hide-scrollbar"
                                    >
                                        {filteredTags.length === 0 ? (
                                            <div className="px-2 py-1.5 text-sm text-gray-500 m-1">No tags found</div>
                                        ) : (
                                            filteredTags.slice(0, 5).map((tag: any) => (
                                                <div
                                                    key={tag.id}
                                                    className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md m-1 cursor-pointer capitalize font-rubik-400"
                                                    onClick={() => handleTagSelect(index, tag)}
                                                >
                                                    {tag.name}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        </div >
                        <div className="flex flex-wrap gap-2 my-2">
                            {(getValues(`options.${index}.tags` as any) ?? []).map((tag: any, tagIndex: number) => (
                                <span
                                    key={tagIndex}
                                    className="font-rubik-400 inline-flex items-center text-sm text-[#2b7272] bg-white rounded-full border border-[#2b7272] px-3 py-1 capitalize"
                                >
                                    {tag.name}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            removeTagSelect(index, tag)
                                        }}
                                        className="ml-2 hover:text-[#1f5d57]"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div >
                );
            })}

            {/* Submit */}
            <Button type="submit" className=" font-rubik-400 bg-[#2B7272] py-3 text-white hover:bg-[#2B7272]"> Submit</Button>
        </form >
    );
}
