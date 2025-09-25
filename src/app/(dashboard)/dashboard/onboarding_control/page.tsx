'use client'
import { CustomModal } from '@/components/custom-modal'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Question from './_components/question'
import { fetcher } from '@/lib/fetcher'
import { categoryApi, onboardingApis } from '@/lib/api'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { onboardingColumns } from '@/lib/coulmns/onboardingColumns'
import { Badge } from '@/components/ui/badge'


function Onboarding_control() {

    const [tags, setTags] = useState<any[]>([])
    const [questions, setQuestions] = useState<any[]>([])
    const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true)

    const openModalWithQuestion = (question: any) => {
        setSelectedQuestion({
            id: question.id,
            question: question.question,
            options: question.options.map((item: any) => {
                return {
                    optionText: item.option,
                    tags: item.tags.map((item: any) => item.tag)
                }
            })
        });
        setModalOpen(true);
    };

    const onUpdate = (data: any) => {
        setQuestions((prev) => prev.map((item) => {
            if (item.id === data.id) {
                return data
            }
            return item
        }))
    }

    const onDelete = (id: string) => {
        setQuestions((prev) => prev.filter((item) => item.id !== id));
    }


    const onCreate = (data: any) => {
        setQuestions((prev) => [...prev, data])
        setModalOpen(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const results = await Promise.allSettled([
                    fetcher(categoryApi.createTag, { method: 'GET' }),
                    fetcher(onboardingApis.getAll, { method: 'GET' }),
                ])

                const [tagsResult, categoriesResult] = results

                if (tagsResult.status === 'fulfilled') {
                    setTags(tagsResult.value as any)
                } else {
                    console.error('Failed to fetch tags:', tagsResult.reason)
                }

                if (categoriesResult.status === 'fulfilled') {
                    setQuestions((categoriesResult.value as any).data)
                } else {
                    console.error('Failed to fetch categories:', categoriesResult.reason)
                }
            } catch (err) {
                // console.error('Unexpected error:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const extendedColumns = React.useMemo(() => [
        ...onboardingColumns,
        {
            accessorKey: "action",
            header: ({ column }) => (
                <div className="text-[#2B7272]">Action</div>
            ),
            cell: ({ row }) => <div className="capitalize cursor-pointer">
                <Badge
                    variant="outline"
                    className="text-rubik-400 rounded-2xl text-[14px] font-light"
                    onClick={() => openModalWithQuestion(row.original)}
                >
                    View
                </Badge>
            </div>,
        },
    ], [onboardingColumns, questions]);

    const table = useReactTable({
        data: questions,
        columns: extendedColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className='p-6' >
            <div className='flex justify-end'>
                <Button className="font-rubik-400 bg-[#2B7272] py-3 text-white hover:bg-[#2B7272]" onClick={() => setModalOpen(true)}>Add Questions</Button>
            </div >
            <div className="rounded-md border my-3">
                <Table>
                    <TableHeader className="bg-[#DDF3E5] font-rubik-600 text-[#2B7272]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4 font-rubik-400 bg-white ">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={onboardingColumns.length} className="h-24 text-center font-rubik-400">
                                    {loading ? "Loading ..." : "No data available"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <CustomModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                title="View Question"
            >

                <Question initialData={selectedQuestion} tagsList={tags} closeModal={() => setModalOpen(false)} onUpdate={onUpdate} onDelete={onDelete} onCreate={onCreate} />


            </CustomModal>
        </div >
    )
}

export default Onboarding_control