"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

// Dummy meditation data
const dummyMeditations = [
    {
        id: "1",
        title: "Morning Calm",
        category: "Focus",
        subCategory: "Beginner",
        audio: "morning-calm.mp3",
        tags: ["Productivity", "Focus"],
        addedDate: "2025-08-15",
    },
    {
        id: "2",
        title: "Sleep Deeply",
        category: "Sleep",
        subCategory: "Intermediate",
        audio: "sleep-deeply.mp3",
        tags: ["Sleep", "Relaxation"],
        addedDate: "2025-08-10",
    },
    {
        id: "3",
        title: "Breathe & Let Go",
        category: "Meditation",
        subCategory: "Advanced",
        audio: "breathe-let-go.mp3",
        tags: ["Anxiety", "Overthinking"],
        addedDate: "2025-08-12",
    },
]

// Column definitions
const columns: ColumnDef<any>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => row.original.category,
    },
    {
        accessorKey: "subCategory",
        header: "Sub Category",
        cell: ({ row }) => row.original.subCategory,
    },
    {
        accessorKey: "audio",
        header: "Audio File",
        cell: ({ row }) => (
            <Button variant="link" className="text-[#2b7272] p-0 h-auto text-sm">
                {row.original.audio}
            </Button>
        ),
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => (
            <div className="flex gap-1 flex-wrap">
                {row.original.tags.map((tag: string, index: number) => (
                    <Badge
                        key={index}
                        className="bg-[#eef5ff] text-[#2b7272] border border-[#c1ece8]"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>
        ),
    },
    {
        accessorKey: "addedDate",
        header: "Added Date",
        cell: ({ row }) => row.original.addedDate,
    },
]

export default function MeditationTable() {
    const [data, setData] = React.useState(dummyMeditations)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-[20px]  p-6">
            <div className="flex justify-between items-center">
                <div className="py-4 font-rubik-400">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Signup Method <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                className="capitalize"
                            >
                                Email
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="mx-5">
                            <Button variant="outline" className=" mx-2">
                                Subscription Plan <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Sort By <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Link href={"/dashboard/meditation/add"}><Button className="font-rubik-40">Add Meditation</Button></Link>
            </div>

            <div className="rounded-md border">
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
                                        <TableCell key={cell.id} className="py-4 font-rubik-400 bg-white">
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
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    )
}
